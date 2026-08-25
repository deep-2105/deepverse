import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scrolling synced with GSAP ScrollTrigger.
 * Returns the Lenis instance so callers can scrollTo() anchors.
 */
export function initSmoothScroll() {
  return null;
}

/**
 * Reveal-on-scroll for every `.reveal` element + section heading flourishes.
 */
export function initScrollReveals() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
    return;
  }

  // Generic reveals (batched for performance)
  ScrollTrigger.batch(".reveal", {
    start: "top 86%",
    onEnter: (els) =>
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: true,
      }),
    onLeaveBack: (els) =>
      gsap.to(els, { opacity: 0, y: 34, duration: 0.4, overwrite: true }),
  });

  // Section titles: subtle scale + glow rise
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.from(title, {
      scrollTrigger: { trigger: title, start: "top 88%" },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power4.out",
    });
  });

  // Skill bars fill when in view
  gsap.utils.toArray(".skillcard").forEach((card) => {
    const bar = card.querySelector(".skill-bar i");
    const level = card.getAttribute("data-level") || 80;
    ScrollTrigger.create({
      trigger: card,
      start: "top 82%",
      once: true,
      onEnter: () => gsap.to(bar, { width: `${level}%`, duration: 1.3, ease: "power3.out" }),
    });
  });

}
