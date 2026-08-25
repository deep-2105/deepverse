export function initCursor() {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 769px)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduce) return () => {};
  const dot = document.createElement("div");
  const ring = document.createElement("div");
  dot.className = "cursor";
  ring.className = "cursor-ring";
  document.body.append(dot, ring);
  document.body.classList.add("has-custom-cursor");
  let raf = 0;
  const move = (event) => {
    cancelAnimationFrame(raf);
    const x = event.clientX;
    const y = event.clientY;
    raf = requestAnimationFrame(() => {
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    });
  };
  const over = (event) => { if (event.target.closest("a,button,.ecard,input,textarea,[data-nav]")) ring.classList.add("is-hot"); };
  const out = (event) => { if (event.target.closest("a,button,.ecard,input,textarea,[data-nav]")) ring.classList.remove("is-hot"); };
  window.addEventListener("pointermove", move, { passive: true });
  document.addEventListener("pointerover", over, { passive: true });
  document.addEventListener("pointerout", out, { passive: true });
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", move);
    document.removeEventListener("pointerover", over);
    document.removeEventListener("pointerout", out);
    document.body.classList.remove("has-custom-cursor");
    dot.remove(); ring.remove();
  };
}
