/* OpenSlide Papercut Zine Fest — MIT © 2026 Yiwei Ho.
 * Source commit 4f09a4e4875a0be7fb1083932709073af6377092.
 * rng, torn, tapeClip, dots and dotsDiag retain the official algorithms.
 * TypeScript annotations/React wrappers removed for the existing Jekyll site.
 */
(() => {
  const rng = (seed) => {
    let s = seed >>> 0;
    return () => {
      s = (s + 0x6d2b79f5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  const torn = (w, h, seed, amp = 6, step = 16) => {
    const r = rng(seed),
      pts = [];
    const p = (x, y) => pts.push(`${x.toFixed(1)}px ${y.toFixed(1)}px`);
    for (let x = 0; x < w; x += step) p(x, r() * amp);
    for (let y = 0; y < h; y += step) p(w - r() * amp, y);
    for (let x = w; x > 0; x -= step) p(x, h - r() * amp);
    for (let y = h; y > 0; y -= step) p(r() * amp, y);
    return `polygon(${pts.join(", ")})`;
  };
  const tapeClip = (w, h) => {
    const teeth = 5,
      t = h / teeth,
      pts = [];
    for (let i = 0; i <= teeth; i++)
      pts.push(`${i % 2 ? 6 : 0}px ${(i * t).toFixed(1)}px`);
    for (let i = teeth; i >= 0; i--)
      pts.push(`${w - (i % 2 ? 0 : 6)}px ${(i * t).toFixed(1)}px`);
    return `polygon(${pts.join(", ")})`;
  };
  const dots = (c, step = 12, r = 3) =>
    `radial-gradient(circle, ${c} ${r}px, transparent ${r + 0.8}px) 0 0 / ${step}px ${step}px`;
  const dotsDiag = (c, step = 12, r = 2.4) =>
    `radial-gradient(circle, ${c} ${r}px, transparent ${r + 0.8}px) 0 0 / ${step}px ${step}px, radial-gradient(circle, ${c} ${r}px, transparent ${r + 0.8}px) ${step / 2}px ${step / 2}px / ${step}px ${step}px`;
  window.Papercut = Object.freeze({ rng, torn, tapeClip, dots, dotsDiag });
})();
