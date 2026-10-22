/* Crisp typography stays in HTML; the signature and portrait share a fine
   halftone. Canvas work is limited to those two small regions. */
(() => {
  const canvas = document.querySelector('#halftone-name');
  if (!canvas) return;
  const sheet = canvas.parentElement;
  const heading = sheet.querySelector('.wordmark h1');
  const portrait = sheet.querySelector('.portrait');
  let pending;
  let lastSize = '';

  function draw() {
    const width = Math.round(sheet.clientWidth);
    const height = Math.round(sheet.clientHeight);
    const ratio = Math.min(devicePixelRatio || 1, 2);
    const photoReady = portrait && portrait.complete && portrait.naturalWidth > 0;
    const key = `${width}/${height}/${ratio}/${Boolean(photoReady)}`;
    if (!width || !height || key === lastSize) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.scale(ratio, ratio);
    const bounds = sheet.getBoundingClientRect();
    const ink = getComputedStyle(sheet).getPropertyValue('--brand-ink').trim();
    const step = width < 768 ? 1.35 : 1.55;

    function dots(source, box, photo = false) {
      const {width:w,height:h} = source.canvas;
      const pixels = source.getImageData(0, 0, w, h).data;
      for (let y = step / 2; y < h; y += step) {
        for (let x = step / 2; x < w; x += step) {
          const offset = (Math.floor(y) * w + Math.floor(x)) * 4;
          const darkness = photo
            ? Math.pow(1 - (.2126*pixels[offset] + .7152*pixels[offset+1] + .0722*pixels[offset+2])/255, .85)
            : pixels[offset+3]/255;
          if (darkness < .015) continue;
          context.fillStyle = photo ? '#494246' : ink;
          context.beginPath();
          context.arc(box.left-bounds.left+x, box.top-bounds.top+y,
            step * .49 * Math.sqrt(darkness), 0, Math.PI * 2);
          context.fill();
        }
      }
    }

    const nameBox = heading.getBoundingClientRect();
    const nameRaster = document.createElement('canvas');
    nameRaster.width = Math.ceil(nameBox.width);
    nameRaster.height = Math.ceil(nameBox.height);
    const source = nameRaster.getContext('2d', {willReadFrequently:true});
    if (!source) return;
    const style = getComputedStyle(heading);
    source.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    if ('letterSpacing' in source) source.letterSpacing = style.letterSpacing;
    const metrics = source.measureText(heading.textContent);
    const ascent = metrics.actualBoundingBoxAscent;
    const descent = metrics.actualBoundingBoxDescent;
    const baseline = (nameBox.height - ascent - descent) / 2 + ascent;
    source.fillStyle = '#000';
    source.fillText(heading.textContent, 0, baseline, nameBox.width);
    dots(source, nameBox);
    sheet.classList.add('screen-ready');

    if (photoReady) {
      const box = portrait.getBoundingClientRect();
      const photoRaster = document.createElement('canvas');
      photoRaster.width = Math.ceil(box.width);
      photoRaster.height = Math.ceil(box.height);
      const photoSource = photoRaster.getContext('2d', {willReadFrequently:true});
      if (photoSource) {
        const scale = Math.max(box.width/portrait.naturalWidth, box.height/portrait.naturalHeight);
        const w = portrait.naturalWidth * scale, h = portrait.naturalHeight * scale;
        photoSource.fillStyle = '#fff';
        photoSource.fillRect(0, 0, box.width, box.height);
        photoSource.drawImage(portrait, (box.width-w)/2, (box.height-h)/2, w, h);
        dots(photoSource, box, true);
        sheet.classList.add('portrait-ready');
      }
    }
    lastSize = key;
  }

  Promise.all([
    document.fonts.load('500 64px Newsreader'),
    document.fonts.load('400 15px Manrope'),
    document.fonts.ready,
    portrait ? portrait.decode().catch(() => {}) : Promise.resolve()
  ]).then(() => {
    draw();
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(draw);
    });
    observer.observe(sheet);
    window.addEventListener('pagehide', event => {
      if (!event.persisted) observer.disconnect();
      cancelAnimationFrame(pending);
    });
  }).catch(() => { /* Native text and portrait remain readable if drawing fails. */ })
    .finally(() => window.dispatchEvent(new Event('homepage-ready')));
})();

// Project media has its own loading, retry, and failure state.
for (const figure of document.querySelectorAll('.project-media')) {
  const media = figure.querySelector('video,img');
  const label = figure.querySelector('.media-loading-label');
  const retry = figure.querySelector('.media-retry');
  if (!media || !label || !retry) continue;
  let delay;
  const loading = () => {
    clearTimeout(delay);
    figure.dataset.mediaState = 'loading';
    figure.setAttribute('aria-busy', 'true');
    label.textContent = 'Loading…';
    retry.hidden = true;
    delay = setTimeout(() => {
      label.textContent = 'Still loading…';
      retry.hidden = false;
    }, 12000);
  };
  const ready = () => {
    clearTimeout(delay);
    figure.dataset.mediaState = 'ready';
    figure.setAttribute('aria-busy', 'false');
  };
  const failed = () => {
    clearTimeout(delay);
    figure.dataset.mediaState = 'error';
    figure.setAttribute('aria-busy', 'false');
    label.textContent = 'Unable to load';
    retry.hidden = false;
  };
  media.addEventListener('error', failed);
  retry.addEventListener('click', () => {
    loading();
    if (media.tagName === 'VIDEO') {
      media.load();
      media.play().catch(() => { if (media.readyState >= 2) ready(); });
    } else {
      const url = new URL(media.src);
      url.searchParams.set('retry', Date.now());
      media.src = url.href;
    }
  });
  loading();
  if (media.tagName === 'VIDEO') {
    media.addEventListener('loadeddata', ready);
    media.addEventListener('playing', ready);
    media.addEventListener('waiting', loading);
    if (media.readyState >= 2) ready();
    else if (media.error) failed();
    // Older entries can still define a loop within a longer source file.
    if (media.dataset.clipEnd) {
      const start = Number(media.dataset.clipStart || 0);
      const end = Number(media.dataset.clipEnd);
      const rewind = () => {
        if (media.currentTime >= end || media.currentTime < start) media.currentTime = start;
      };
      media.addEventListener('loadedmetadata', rewind);
      media.addEventListener('timeupdate', rewind);
    }
  } else {
    const imageReady = () => media.decode().then(ready, ready);
    media.addEventListener('load', imageReady);
    if (media.complete) {
      if (media.naturalWidth > 0) imageReady();
      else failed();
    }
  }
}
