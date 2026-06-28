/**
 * Magical golden particle field for the contact section, drawn on a 2D canvas.
 * Embers rise and gather toward the cursor like fireflies. No WebGL required.
 * Returns a cleanup function.
 */
export function initContactSpell(canvas) {
  if (!canvas) return () => {};
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let w, h, raf, dpr = Math.min(window.devicePixelRatio || 1, 2);
  const mouse = { x: -999, y: -999 };
  const count = reduce ? 28 : 70;
  const parts = [];

  function size() {
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  for (let i = 0; i < count; i++) {
    parts.push({
      x: Math.random() * 1000, y: Math.random() * 600,
      r: Math.random() * 2 + 0.6,
      vy: -(Math.random() * 0.4 + 0.1),
      vx: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.6 + 0.2,
      hue: Math.random() > 0.7 ? 210 : 45,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy;
      if (mouse.x > 0) {
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d < 140) { p.x += dx / d * 0.6; p.y += dy / d * 0.6; }
      }
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue},85%,70%,${p.a})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsla(${p.hue},85%,65%,0.8)`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  }

  function onMove(e) {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  }
  function onLeave() { mouse.x = -999; mouse.y = -999; }

  size();
  window.addEventListener("resize", size);
  canvas.parentElement.addEventListener("pointermove", onMove);
  canvas.parentElement.addEventListener("pointerleave", onLeave);
  draw();

  return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); };
}
