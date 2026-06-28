import gsap from "gsap";

/**
 * Cinematic intro timeline: moon rises, crest glows, title letters
 * cascade in, fake "summoning" progress fills, then the curtain lifts.
 * Resolves the returned promise once the intro has been dismissed.
 */
export function initIntro() {
  return new Promise((resolve) => {
    const intro = document.getElementById("intro");
    if (!intro) return resolve();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bar = document.getElementById("intro-bar");
    const count = document.getElementById("intro-count");
    const enter = document.getElementById("intro-enter");
    const enterBtn = intro.querySelector("[data-enter]");

    let dismissed = false;
    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      const out = gsap.timeline({
        onComplete: () => {
          intro.classList.add("is-hidden");
          intro.style.display = "none";
          document.body.style.overflow = "";
          resolve();
        },
      });
      out
        .to("#intro-progress, #intro-enter, #intro-tagline", { opacity: 0, duration: 0.4 }, 0)
        .to(".intro__content", { y: -30, opacity: 0, duration: 0.7, ease: "power2.in" }, 0.1)
        .to("#intro-moon", { scale: 2.4, opacity: 0, duration: 1.1, ease: "power2.inOut" }, 0)
        .to(intro, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, 0.4);
    };

    document.body.style.overflow = "hidden";

    if (reduce) {
      gsap.set(["#intro-moon", "#intro-crest", "#intro-tagline", ".intro__title .char", "#intro-enter"], {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
      });
      enter?.classList.add("is-ready");
      enterBtn?.addEventListener("click", dismiss);
      // auto-dismiss quickly for reduced motion
      gsap.delayedCall(0.8, dismiss);
      return;
    }

    const tl = gsap.timeline();
    tl.to("#intro-moon", { opacity: 1, scale: 1, duration: 1.6, ease: "power3.out" }, 0.1)
      .to("#intro-crest", { opacity: 1, duration: 1, ease: "power2.out" }, 0.5)
      .fromTo(
        "#intro-crest",
        { rotate: -12 },
        { rotate: 0, duration: 1.4, ease: "elastic.out(1,0.6)" },
        0.5
      )
      .to(
        ".intro__title .char",
        { opacity: 1, y: 0, rotateX: 0, duration: 0.9, ease: "back.out(1.6)", stagger: 0.05 },
        0.8
      )
      .to("#intro-tagline", { opacity: 1, duration: 0.9, ease: "power2.out" }, 1.6);

    // Fake loading progress
    const prog = { v: 0 };
    gsap.to(prog, {
      v: 100,
      duration: 2.2,
      ease: "power1.inOut",
      onUpdate: () => {
        const val = Math.round(prog.v);
        if (bar) bar.style.width = val + "%";
        if (count) count.textContent = val;
      },
      onComplete: () => {
        gsap.to("#intro-enter", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
        enter?.classList.add("is-ready");
      },
    });

    enterBtn?.addEventListener("click", dismiss);
    // Safety auto-enter after a beat so the page is never stuck
    gsap.delayedCall(6, dismiss);
  });
}

/**
 * Hero entrance — runs after the intro lifts.
 */
export function playHeroIntro() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (reduce) {
    gsap.set([".hero__eyebrow", ".hero-char", ".hero__lede", ".hero__actions", ".hero__meta", ".hero__scroll"], {
      opacity: 1,
      y: 0,
    });
    return;
  }

  tl.from(".hero__eyebrow", { opacity: 0, x: -30, duration: 0.8 }, 0.1)
    .from(".hero-char", { opacity: 0, yPercent: 120, rotateZ: 6, duration: 1, stagger: 0.04 }, 0.2)
    .from(".hero__lede", { opacity: 0, y: 30, duration: 0.9 }, 0.7)
    .from(".hero__actions .btn", { opacity: 0, y: 24, duration: 0.7, stagger: 0.12 }, 0.9)
    .from(".hero__meta div", { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, 1.05)
    .from(".moon, .moon__halo", { opacity: 0, scale: 0.85, duration: 1.6, ease: "power2.out" }, 0)
    .from(".hero__castle", { opacity: 0, y: 50, duration: 1.4 }, 0.3)
    .from(".hero__scroll", { opacity: 0, y: 16, duration: 0.8 }, 1.3);
}
