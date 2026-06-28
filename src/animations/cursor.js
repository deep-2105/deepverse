import gsap from "gsap";

/**
 * Glowing dual-ring custom cursor that snaps to gold on interactive elements.
 * Disabled on touch / coarse pointers and reduced-motion.
 */
export function initCursor() {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduce) return () => {};

  const dot = document.createElement("div");
  dot.className = "cursor";
  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  document.body.append(dot, ring);

  const setDX = gsap.quickTo(dot, "x", { duration: 0.08 });
  const setDY = gsap.quickTo(dot, "y", { duration: 0.08 });
  const setRX = gsap.quickTo(ring, "x", { duration: 0.32, ease: "power3" });
  const setRY = gsap.quickTo(ring, "y", { duration: 0.32, ease: "power3" });

  function move(e) {
    setDX(e.clientX); setDY(e.clientY);
    setRX(e.clientX); setRY(e.clientY);
  }
  function hot(on) { ring.classList.toggle("is-hot", on); }

  window.addEventListener("pointermove", move, { passive: true });
  document.addEventListener("pointerover", (e) => {
    if (e.target.closest("a,button,.ecard,input,textarea,[data-nav]")) hot(true);
  });
  document.addEventListener("pointerout", (e) => {
    if (e.target.closest("a,button,.ecard,input,textarea,[data-nav]")) hot(false);
  });

  return () => window.removeEventListener("pointermove", move);
}
