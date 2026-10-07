/* A continuous page-wide screen for display type and background. Body copy,
   dates, affiliation and links keep native, high-contrast text for readability.
   The portrait shares the screen; institutional logos remain clear originals. */
(() => {
  const canvas = document.querySelector('#halftone-name');
  if (!canvas) return;
  const parent = canvas.parentElement;
  const portrait = parent.querySelector('.portrait');
  let pending;
  let lastSize = '';

  function draw() {
    const width = Math.round(parent.clientWidth);
    const height = Math.round(parent.clientHeight);
    if (!width || !height) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const photoReady = portrait && portrait.complete && portrait.naturalWidth > 0;
    const sizeKey = `${width}/${height}/${ratio}/${Boolean(photoReady)}`;
    if (sizeKey === lastSize) return;
    const mobile = width < 768;
    const raster = document.createElement('canvas');
    raster.width = width;
    raster.height = height;
    const source = raster.getContext('2d', {willReadFrequently:true});
    const context = canvas.getContext('2d');
    if (!source || !context) return;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.scale(ratio, ratio);
    const bounds = parent.getBoundingClientRect();
    const brandInk = getComputedStyle(parent).getPropertyValue('--brand-ink').trim() || '#272b2c';
    source.fillStyle = '#272b2c';
    source.strokeStyle = '#272b2c';
    source.textBaseline = 'alphabetic';

    // Match actual line wrapping and link/strong ranges, rather than copying
    // content into a second inaccessible layout with approximate line breaks.
    const walker = document.createTreeWalker(parent, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    let node;
    while ((node = walker.nextNode())) {
      const element = node.parentElement;
      if (!element || element.closest('canvas,script,h1') || !node.textContent.trim()) continue;
      if (!element.closest('h2,h3')) continue;
      const style = getComputedStyle(element);
      if (style.display === 'none' || style.visibility === 'hidden') continue;
      source.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const metrics = source.measureText('Hg');
      const ascent = metrics.fontBoundingBoxAscent || parseFloat(style.fontSize) * .9;
      for (let i = 0; i < node.textContent.length; i++) {
        let letter = node.textContent[i];
        if (/\s/.test(letter)) continue;
        if (style.textTransform === 'uppercase') letter = letter.toUpperCase();
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const rect = range.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        const x = rect.left - bounds.left;
        const y = rect.top - bounds.top + ascent;
        source.fillText(letter, x, y);
        // Keep subpixel strokes in small body type visible after sampling.
        source.lineWidth = .35;
        source.strokeText(letter, x, y);
      }
    }
    range.detach();

    // The artistic identity is now a compact top-left brand, not a hero block.
    const nameBox = parent.querySelector('.wordmark').getBoundingClientRect();
    const nameTop = nameBox.top - bounds.top;
    const nameLeft = nameBox.left - bounds.left;
    const lines = ['YIFAN LIU'];
    const fontSize = nameBox.height * .95;
    source.font = `${fontSize}px Anton`;
    const nameScale = (nameBox.width - 8) / source.measureText(lines[0]).width;
    source.save();
    source.translate(nameLeft + 4, nameTop);
    source.scale(nameScale, 1);
    const stagger = [0,.085,-.035,.12,.025,0,.07,-.045,.105];
    let characterIndex = 0;
    lines.forEach((line, lineIndex) => {
      const baseline = nameBox.height * .81;
      [...line].forEach((letter, index) => {
        const x = source.measureText(line.slice(0, index)).width;
        const offset = stagger[characterIndex % stagger.length] * fontSize;
        source.fillText(letter, x, baseline + offset);
        characterIndex++;
      });
    });
    source.restore();

    const headingZones = [...parent.querySelectorAll('h2,h3')].map(element => {
      const box = element.getBoundingClientRect();
      return {left:box.left-bounds.left,right:box.right-bounds.left,top:box.top-bounds.top,height:box.height};
    });
    let photo;
    if (photoReady) {
      const box = portrait.getBoundingClientRect();
      const imageCanvas = document.createElement('canvas');
      imageCanvas.width = Math.round(box.width);
      imageCanvas.height = Math.round(box.height);
      const imageContext = imageCanvas.getContext('2d', {willReadFrequently:true});
      const cover = Math.max(box.width / portrait.naturalWidth, box.height / portrait.naturalHeight);
      const imageWidth = portrait.naturalWidth * cover;
      const imageHeight = portrait.naturalHeight * cover;
      imageContext.drawImage(portrait, (box.width-imageWidth)/2, (box.height-imageHeight)/2, imageWidth, imageHeight);
      photo = {left:box.left-bounds.left,top:box.top-bounds.top,width:imageCanvas.width,height:imageCanvas.height,pixels:imageContext.getImageData(0,0,imageCanvas.width,imageCanvas.height).data};
    }

    const pixels = source.getImageData(0, 0, width, height).data;
    const step = mobile ? 1.8 : 2.4;
    const samples = [[0,0],[-.28,0],[.28,0],[0,-.28],[0,.28]];
    context.fillStyle = '#272b2c';
    for (let y = step / 2; y < height; y += step) {
      for (let x = step / 2; x < width; x += step) {
        let mask = 0;
        for (const [dx,dy] of samples) {
          const px = Math.max(0, Math.min(width - 1, Math.floor(x + dx * step)));
          const py = Math.max(0, Math.min(height - 1, Math.floor(y + dy * step)));
          mask += pixels[(py * width + px) * 4 + 3] / 1275;
        }
        // A single continuous background field passes through ALL type.
        const column = .5 + .5 * Math.sin(x * .032 + .35 * Math.sin(y * .012));
        const broad = .5 + .5 * Math.sin(x * .009 - y * .005);
        const paperTone = .01 + .026 * column + .013 * broad;
        let inkGain = .82 + .06 * column + .03 * broad;
        if (y >= nameTop && y <= nameTop + nameBox.height + 16 && x >= nameLeft && x <= nameLeft + nameBox.width) {
          const rowTop = nameTop + nameBox.height*.1;
          const progress = Math.max(0,Math.min(1,(y-rowTop)/(fontSize*.78)));
          inkGain *= 1 - .55*progress;
        } else if (mask > .01) {
          for (const zone of headingZones) {
            if (x>=zone.left && x<=zone.right && y>=zone.top && y<=zone.top+zone.height) {
              inkGain *= 1-.35*Math.max(0,Math.min(1,(y-zone.top)/zone.height));
              break;
            }
          }
        }
        let tone = paperTone + Math.pow(mask, .65) * inkGain;
        let photoDarkness;
        if (photo && x>=photo.left && x<photo.left+photo.width && y>=photo.top && y<photo.top+photo.height) {
          const px = Math.floor(x-photo.left), py = Math.floor(y-photo.top);
          const offset = (py*photo.width+px)*4;
          const luminance = (.2126*photo.pixels[offset]+.7152*photo.pixels[offset+1]+.0722*photo.pixels[offset+2])/255;
          photoDarkness = Math.pow(1-luminance,.8);
          tone = paperTone + .94*photoDarkness;
        }
        // Portrait tone controls BOTH dot diameter and ink color depth.
        // Dark image regions get larger, darker marks; highlights small, pale marks.
        const radius = photoDarkness === undefined
          ? step*.48*Math.sqrt(tone)
          : step*(.08 + .40*Math.sqrt(photoDarkness));
        if (photoDarkness === undefined) {
          // Brand and every screened heading share the same rose ink.
          // Unmasked background dots remain neutral; portrait tones stay intact.
          context.fillStyle = mask > .01 ? brandInk : '#272b2c';
        }
        else {
          const ink = Math.round(180 - 155*Math.pow(photoDarkness,.65));
          context.fillStyle = `rgb(${ink},${ink+3},${ink+4})`;
        }
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }
    }
    lastSize = sizeKey;
    parent.classList.add('screen-ready');
    parent.classList.toggle('portrait-ready', Boolean(photo));
  }

  Promise.all([
    document.fonts.load('40px Anton'),
    document.fonts.load('18px Barlow'),
    document.fonts.ready,
    portrait ? portrait.decode().catch(() => {}) : Promise.resolve()
  ]).then(() => {
    draw();
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(draw);
    });
    observer.observe(parent);
    window.addEventListener('pagehide', () => {
      observer.disconnect();
      cancelAnimationFrame(pending);
    }, {once:true});
  }).catch(() => { /* Keep readable ordinary HTML if fonts or drawing fail. */ });
})();
