/* A continuous page-wide screen for display type and background. Body copy,
   dates, affiliation and links keep native, high-contrast text for readability.
   Photos and institutional logos remain original, readable image assets. */
(() => {
  const canvas = document.querySelector('#halftone-name');
  if (!canvas) return;
  const parent = canvas.parentElement;
  let pending;
  let lastSize = '';

  function draw() {
    const width = Math.round(parent.clientWidth);
    const height = Math.round(parent.clientHeight);
    if (!width || !height) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const sizeKey = `${width}/${height}/${ratio}`;
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

    // Restore the original bold condensed display type, keeping shared dots.
    const nameBox = parent.querySelector('.name-art').getBoundingClientRect();
    const nameTop = nameBox.top - bounds.top;
    const nameLeft = nameBox.left - bounds.left;
    const lines = mobile ? ['YIFAN', 'LIU'] : ['YIFAN LIU'];
    const fontSize = nameBox.height * (mobile ? .50 : .90);
    source.font = `${fontSize}px Anton`;
    const nameScale = (nameBox.width - 8) / source.measureText(lines[0]).width;
    source.save();
    source.translate(nameLeft + 4, nameTop);
    source.scale(nameScale, 1);
    lines.forEach((line, lineIndex) => {
      const baseline = nameBox.height * (mobile ? .475 + lineIndex * .495 : .89);
      source.fillText(line, 0, baseline);
    });
    source.restore();

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
        const inkGain = .82 + .06 * column + .03 * broad;
        const tone = paperTone + Math.pow(mask, .65) * inkGain;
        context.beginPath();
        context.arc(x, y, step * .48 * Math.sqrt(tone), 0, Math.PI * 2);
        context.fill();
      }
    }
    lastSize = sizeKey;
    parent.classList.add('screen-ready');
  }

  Promise.all([
    document.fonts.load('40px Anton'),
    document.fonts.load('18px Barlow'),
    document.fonts.ready
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
