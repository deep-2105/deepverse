import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navItems } from "./data.js";
import { generateResume, atsScore } from "./resume.js";

/**
 * Wires up all interactive behaviour:
 * smooth anchor navigation, scroll-spy active states,
 * episode-row arrows, sticky top bar and the contact form.
 */
export function initInteractions(lenis) {
  smoothAnchors(lenis);
  scrollSpy();
  episodeRowArrows();
  stickyTopbar();
  contactForm();
  cardTilt();
  episodeNav(lenis);
  resumeButtons();
}

function episodeNav(lenis) {
  document.querySelectorAll(".ecard[data-nav]").forEach((card) => {
    card.addEventListener("click", () => {
      const target = document.getElementById(card.dataset.nav);
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { offset: -10, duration: 1.2 });
      else target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function resumeButtons() {
  document.querySelectorAll("[data-resume]").forEach((btn) => {
    btn.addEventListener("click", () => generateResume(btn.dataset.resume));
  });

  const meter = document.getElementById("ats-meter");
  if (meter) {
    const fill = document.getElementById("ats-fill");
    const val = document.getElementById("ats-val");
    const score = atsScore();
    ScrollTrigger.create({
      trigger: meter,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(fill, { width: `${score}%`, duration: 1.4, ease: "power3.out" });
        const o = { v: 0 };
        gsap.to(o, { v: score, duration: 1.4, ease: "power3.out", onUpdate: () => { if (val) val.textContent = Math.round(o.v) + "%"; } });
      },
    });
  }
}

function smoothAnchors(lenis) {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -10, duration: 1.2 });
      else target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function setActive(id) {
  document.querySelectorAll("[data-nav]").forEach((el) => {
    el.classList.toggle("is-active", el.dataset.nav === id);
  });
}

function scrollSpy() {
  navItems.forEach((n) => {
    const sec = document.getElementById(n.id);
    if (!sec) return;
    ScrollTrigger.create({
      trigger: sec,
      start: "top 45%",
      end: "bottom 45%",
      onToggle: (self) => self.isActive && setActive(n.id),
    });
  });
}

function episodeRowArrows() {
  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const track = document.getElementById(btn.dataset.scroll);
      if (!track) return;
      const dir = parseInt(btn.dataset.dir, 10);
      const amount = Math.max(track.clientWidth * 0.8, 320);
      track.scrollBy({ left: dir * amount, behavior: "smooth" });
    });
  });
}

function stickyTopbar() {
  const topbar = document.getElementById("topbar");
  if (!topbar) return;
  ScrollTrigger.create({
    start: "top -80",
    end: 99999,
    onUpdate: (self) => topbar.classList.toggle("is-stuck", self.scroll() > 80),
  });
}

function cardTilt() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  document.querySelectorAll(".ecard").forEach((card) => {
    const setX = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power2.out" });
    const setY = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power2.out" });
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setX(px * 10);
      setY(-py * 10);
    });
    card.addEventListener("pointerleave", () => {
      setX(0);
      setY(0);
    });
  });
}

function contactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const note = document.getElementById("cf-note");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !validEmail || !message) {
      if (note) {
        note.textContent = "Please complete every field with a valid email.";
        note.style.color = "var(--ember)";
      }
      gsap.fromTo(form, { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
      return;
    }

    if (note) {
      note.textContent = `Owl dispatched, ${name}. I'll reply to ${email} shortly.`;
      note.style.color = "var(--gold-200)";
    }
    form.reset();
    gsap.fromTo(
      form.querySelector("button"),
      { scale: 0.96 },
      { scale: 1, duration: 0.5, ease: "back.out(2)" }
    );
  });
}
