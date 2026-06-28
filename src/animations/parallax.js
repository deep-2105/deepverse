import gsap from "gsap";

/**
 * Mouse parallax for hero layers. Each `.hero__layer[data-depth]`
 * shifts proportionally to its depth, producing a 3D cinematic feel.
 * Returns a cleanup function.
 */
export function initParallax() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return () => {};

  const hero = document.querySelector(".hero");
  const layers = [...document.querySelectorAll(".hero__layer")];
  if (!hero || !layers.length) return () => {};

  const setters = layers.map((el) => ({
    el,
    depth: parseFloat(el.dataset.depth || "0.1"),
    x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
    y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" }),
  }));

  function onMove(e) {
    const rx = e.clientX / window.innerWidth - 0.5;
    const ry = e.clientY / window.innerHeight - 0.5;
    setters.forEach((s) => {
      const shift = s.depth * 120;
      s.x(-rx * shift);
      s.y(-ry * shift);
    });
  }

  function onLeave() {
    setters.forEach((s) => {
      s.x(0);
      s.y(0);
    });
  }

  window.addEventListener("pointermove", onMove, { passive: true });
  hero.addEventListener("pointerleave", onLeave);

  return function cleanup() {
    window.removeEventListener("pointermove", onMove);
    hero.removeEventListener("pointerleave", onLeave);
  };
}
