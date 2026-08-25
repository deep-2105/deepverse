import { profile, stats } from "../utils/data.js";

/** Procedural Hogwarts-style castle silhouette. */
function castleSVG() {
  // windows generated as lit dots
  const win = (x, y) => `<rect class="castle-window" x="${x}" y="${y}" width="3" height="5" rx="1"/>`;
  let windows = "";
  const cols = [
    [150, [88, 100, 112]],
    [165, [82, 96, 110]],
    [250, [70, 86, 102, 118]],
    [330, [78, 94, 110]],
    [420, [66, 82, 98, 114]],
    [505, [84, 100]],
    [590, [74, 90, 106]],
  ];
  cols.forEach(([x, ys]) => ys.forEach((y) => (windows += win(x, y))));

  return `
  <svg viewBox="0 0 760 220" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
    <defs>
      <linearGradient id="castleFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0c1124"/>
        <stop offset="100%" stop-color="#05070f"/>
      </linearGradient>
    </defs>
    <g fill="url(#castleFill)" stroke="rgba(110,168,255,0.12)" stroke-width="0.6">
      <!-- ground ridge -->
      <path d="M0 220 L0 150 Q120 120 200 140 Q300 110 380 130 Q470 100 560 132 Q660 112 760 150 L760 220 Z"/>
      <!-- left tower -->
      <path d="M140 220 L140 92 L146 78 L152 92 L152 220 Z"/>
      <path d="M155 220 L155 70 L163 50 L171 70 L171 220 Z"/>
      <!-- main keep -->
      <path d="M230 220 L230 96 L246 60 L262 96 L262 220 Z"/>
      <rect x="240" y="120" width="40" height="100"/>
      <path d="M320 220 L320 88 L334 56 L348 88 L348 220 Z"/>
      <!-- grand spire -->
      <path d="M400 220 L400 110 L408 70 L412 36 L416 70 L424 110 L424 220 Z"/>
      <rect x="404" y="120" width="16" height="100"/>
      <!-- right wing -->
      <path d="M490 220 L490 100 L504 66 L518 100 L518 220 Z"/>
      <rect x="498" y="126" width="34" height="94"/>
      <path d="M580 220 L580 84 L590 54 L600 84 L600 220 Z"/>
      <path d="M610 220 L610 104 L618 84 L626 104 L626 220 Z"/>
    </g>
    <g>${windows}</g>
  </svg>`;
}

export default function Hero() {
  const titleChars = profile.name
    .split("")
    .map((c) => `<span class="hero-char" style="display:inline-block">${c}</span>`)
    .join("");

  const meta = stats
    .map((s) => `<div><b>${s.value}</b><span>${s.label}</span></div>`)
    .join("");

  return `
  <section class="hero" id="home">
    <div class="hero__stage">
      <div class="hero__layer" data-depth="0.12">
        <div class="moon__halo"></div>
        <div class="moon"></div>
      </div>

      <div class="hero__layer" data-depth="0.08">
        <div class="hero__hills"></div>
        <div class="hero__castle">${castleSVG()}</div>
      </div>

      <div class="hero__layer" data-depth="0.18">
        <div class="fog fog--3"></div>
        <div class="fog fog--2"></div>
        <div class="fog fog--1"></div>
      </div>
    </div>

    <div class="hero__overlay"></div>

    <div class="hero__content">
      <span class="hero__eyebrow eyebrow"><span class="line"></span>${profile.role}</span>
      <h1 class="hero__title gold-text" aria-label="${profile.name}">${titleChars}</h1>
      <p class="hero__lede">
        Welcome to a <b>cinematic universe</b> of code, AI and imagination —
        where every project is an episode and every line of magic is crafted with intent.
      </p>
      <div class="hero__actions">
        <a href="#projects" class="btn btn--gold" data-nav="projects">▶ Begin the Journey</a>
        <a href="#contact" class="btn btn--ghost" data-nav="contact">＋ Summon Me</a>
      </div>
      <div class="hero__meta">${meta}</div>
    </div>

    <div class="hero__scroll">Scroll<i></i></div>
  </section>`;
}
