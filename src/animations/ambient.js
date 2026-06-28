/**
 * Ambient world — a RandomEventEngine that keeps the sky alive on EVERY page.
 * Every 2–8s it spawns a NEW original fantasy event (never the same twice in a
 * row): wizards, owls, phoenixes, dragons, carriages, books, ghost riders,
 * travellers, airships, castle fragments, butterflies, ravens, lanterns,
 * portals, comets, meteors, lightning, sky-fish, whales, deer, trains, spirits…
 * Each event gets a random size (15/25/40/60% screen) and depth (far behind,
 * mid, or right in front of the camera) and direction. Speeds mix fast (<2s)
 * and slow drifts. All artwork is original inline SVG. Sounds use stereo pan.
 * Object-pooled, pauses when hidden, reduced-motion safe.
 */
import { sfx } from "./sound.js";

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const ART = {
  wizard: `<g fill="currentColor"><path d="M6 40 L80 30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M78 28 q12 -2 19 5 q-10 0 -19 -1z"/><path d="M36 38 q5 -14 16 -14 q9 0 11 7 q-2 14 -14 19 q-10 2 -13 -12z"/><path d="M48 16 l4 -10 4 10z"/><circle cx="50" cy="22" r="4"/><path d="M28 38 q-9 4 -17 12 q12 -2 21 -7z"/></g>`,
  owl: `<g fill="currentColor"><ellipse cx="20" cy="14" rx="7" ry="8"/><circle cx="20" cy="7" r="6"/><path class="aw-wing" d="M20 12 Q8 4 2 9 Q10 14 20 16z"/><path class="aw-wing" d="M20 12 Q32 4 38 9 Q30 14 20 16z"/></g>`,
  raven: `<g fill="currentColor"><ellipse cx="20" cy="13" rx="6" ry="2.2"/><path class="aw-wing" d="M20 13 Q10 2 2 6 Q12 9 20 13z"/><path class="aw-wing" d="M20 13 Q30 2 38 6 Q28 9 20 13z"/></g>`,
  phoenix: `<g fill="currentColor"><path d="M20 14 q6 -10 16 -8 q-6 4 -10 8 q8 -4 16 -2 q-10 6 -18 6 q-8 0 -18 -6 q8 -2 16 2 q-4 -4 -10 -8 q10 -2 16 8z"/><path d="M18 14 q2 12 0 22 q-2 -10 0 -22z"/></g>`,
  dragon: `<g fill="currentColor"><path d="M2 20 Q18 8 36 16 Q46 6 56 14 Q48 18 42 18 Q56 22 70 14 Q64 26 48 26 Q40 34 28 28 Q16 32 2 20z"/><path d="M56 12 l8 -6 -2 8z"/></g>`,
  airship: `<g fill="currentColor"><ellipse cx="34" cy="14" rx="30" ry="11"/><rect x="22" y="24" width="24" height="6" rx="3"/><path d="M28 25 l4 6M40 25 l-4 6" stroke="currentColor" stroke-width="1"/><path d="M62 14 l8 -4 0 8z"/></g>`,
  carriage: `<g fill="currentColor"><rect x="14" y="10" width="28" height="14" rx="5"/><circle cx="20" cy="26" r="4"/><circle cx="36" cy="26" r="4"/><path class="aw-wing" d="M14 14 Q2 8 0 16 Q8 16 14 18z"/><path class="aw-wing" d="M42 14 Q54 8 56 16 Q48 16 42 18z"/></g>`,
  lantern: `<g fill="currentColor"><rect x="8" y="6" width="10" height="14" rx="4"/><path d="M10 6 q3 -5 6 0z"/><circle cx="13" cy="13" r="2.6" fill="rgba(255,220,120,.95)"/></g>`,
  book: `<g fill="currentColor"><path d="M4 8 L18 6 L18 20 L4 22z"/><path d="M18 6 L32 8 L32 24 L18 20z"/><path class="aw-wing" d="M4 12 Q-6 6 -8 14 Q0 14 4 16z"/><path class="aw-wing" d="M32 12 Q42 6 44 14 Q36 14 32 16z"/></g>`,
  island: `<g fill="currentColor"><ellipse cx="30" cy="14" rx="26" ry="7"/><path d="M6 16 Q30 44 54 16 Q40 26 30 24 Q20 26 6 16z"/></g>`,
  spirit: `<g fill="currentColor"><path d="M16 6 q9 0 11 12 q3 18 -3 26 q-8 4 -16 0 q-6 -8 -3 -26 q2 -12 11 -12z"/><circle cx="16" cy="9" r="5"/></g>`,
  butterfly: `<g fill="currentColor"><path class="aw-wing" d="M12 12 Q2 2 4 14 Q6 20 12 14z"/><path class="aw-wing" d="M12 12 Q22 2 20 14 Q18 20 12 14z"/><rect x="11" y="8" width="2" height="12" rx="1"/></g>`,
  rider: `<g fill="currentColor"><path d="M6 26 Q20 18 40 22 Q52 18 64 24 Q50 26 44 26 Q56 30 30 32 Q14 30 6 26z"/><path d="M30 22 q4 -12 12 -12 q-3 6 -6 12z"/><circle cx="40" cy="9" r="4"/></g>`,
  traveller: `<g fill="currentColor"><path d="M22 14 q9 -8 18 0 q-4 24 -8 28 q-8 4 -16 0 q-4 -22 6 -28z"/><path d="M30 8 l5 -8 5 8z"/><circle cx="31" cy="11" r="4"/></g>`,
  deer: `<g fill="currentColor"><path d="M10 30 Q20 18 38 22 Q48 18 52 24 Q40 28 30 26 Q18 28 10 30z"/><path d="M16 26 L16 38 M30 26 L30 38"/><path d="M48 22 l4 -8 m-4 8 l-4 -8" stroke="currentColor" stroke-width="2"/></g>`,
  whale: `<g fill="currentColor"><path d="M4 20 Q30 6 70 16 Q86 8 96 18 Q84 24 70 22 Q40 30 4 20z"/><path d="M2 18 q-4 -6 -2 -10 q6 4 8 10z"/></g>`,
  fish: `<g fill="currentColor"><path d="M4 14 Q22 4 40 14 Q22 24 4 14z"/><path d="M40 14 l10 -7 0 14z"/></g>`,
  train: `<g fill="currentColor"><rect x="2" y="14" width="20" height="10" rx="2"/><rect x="24" y="14" width="16" height="10"/><rect x="42" y="14" width="16" height="10"/><circle cx="8" cy="26" r="2"/><circle cx="30" cy="26" r="2"/><circle cx="50" cy="26" r="2"/><path d="M4 14 l4 -6 8 0 0 6z"/></g>`,
  rune: `<g fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 L12 22 M4 8 L20 8 M12 12 L20 20"/></g>`,
};

const DIRS = ["ltr", "rtl", "ttb", "diag", "diagU"];

export function initAmbientWorld() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const vw = () => window.innerWidth;

  const layer = document.createElement("div");
  layer.className = "ambient-world";
  layer.setAttribute("aria-hidden", "true");
  layer.innerHTML = `
    <div class="aw-layer aw-bg"></div>
    <div class="aw-layer aw-mid"></div>
    <div class="aw-layer aw-fg"></div>`;
  document.body.appendChild(layer);
  const bg = layer.querySelector(".aw-bg");
  const mid = layer.querySelector(".aw-mid");
  const fg = layer.querySelector(".aw-fg");
  const hosts = [bg, mid, fg];

  if (reduce) return () => layer.remove();

  let live = 0;
  const MAX = 28;

  function spawn(host, key, { w, top, dur, scale = 1, depth = 1, fog = false }) {
    if (live >= MAX) return 0;
    const dir = pick(DIRS);
    const wide = !["owl", "lantern", "spirit", "butterfly", "raven", "fish", "rune", "deer", "traveller"].includes(key);
    const el = document.createElement("div");
    el.className = `aw aw--${key} aw--${dir}${fog ? " aw--fog" : ""}`;
    el.style.width = Math.round(w * scale) + "px";
    el.style.setProperty("--dur", dur + "s");
    el.style.opacity = String(Math.min(1, 0.9 * depth));
    if (dir === "ttb") el.style.left = rand(8, 92) + "%";
    else { el.style.top = (top == null ? rand(8, 80) : top) + "%"; el.style.setProperty("--mv", rand(-16, 16) + "vh"); }
    el.innerHTML = `<svg viewBox="0 0 ${wide ? 100 : 56} 40">${ART[key]}</svg>`;
    host.appendChild(el); live++;
    setTimeout(() => { el.remove(); live--; }, dur * 1000 + 700);
    return dir === "rtl" ? 0.7 : dir === "ltr" ? -0.7 : 0;
  }
  const fast = () => rand(1.4, 3.5);
  const slow = () => rand(7, 16);
  const size = (f) => vw() * f;

  function shootingStar() {
    const s = document.createElement("div"); s.className = "aw-star";
    s.style.top = rand(2, 40) + "%"; s.style.left = rand(35, 95) + "%";
    s.style.setProperty("--dur", rand(0.7, 1.4) + "s");
    fg.appendChild(s); setTimeout(() => s.remove(), 1600);
  }
  function portal() { const p = document.createElement("div"); p.className = "aw-portal"; p.style.top = rand(18,65)+"%"; p.style.left = rand(12,82)+"%"; bg.appendChild(p); setTimeout(()=>p.remove(),2400); }
  function lightning() { const f = document.createElement("div"); f.className = "aw-flash"; layer.appendChild(f); setTimeout(()=>f.remove(),700); }

  const events = {
    WizardFly: () => sfx("swoosh", spawn(pick(hosts), "wizard", { w: size(pick([.25,.4,.6])), dur: fast(), depth: rand(.6,1) })),
    OwlFly: () => sfx("owl", spawn(mid, "owl", { w: size(.15), dur: rand(2.5,6) })),
    RavenFlock: () => { for (let i=0;i<6;i++) setTimeout(()=>spawn(mid,"raven",{w:size(.15),top:10+i*6,dur:fast()}),i*150); sfx("ravens"); },
    PhoenixCross: () => sfx("chime", spawn(mid, "phoenix", { w: size(.4), top: rand(8,28), dur: rand(3,7), depth:.9 })),
    DragonFly: () => sfx("dragon", spawn(bg, "dragon", { w: size(.6), dur: rand(4,9), depth:.5, fog: Math.random()<.4 })),
    AirshipPass: () => spawn(bg, "airship", { w: size(.4), dur: slow(), depth:.6 }),
    CarriageFly: () => sfx("swoosh", spawn(mid, "carriage", { w: size(.4), dur: fast(), depth:.9 })),
    LanternFlight: () => { for (let i=0;i<7;i++) setTimeout(()=>spawn(fg,"lantern",{w:size(.15),top:rand(35,90),dur:slow()}),i*500); sfx("lantern"); },
    FloatingBooks: () => { for (let i=0;i<4;i++) setTimeout(()=>spawn(mid,"book",{w:size(.15),dur:rand(3,7)}),i*400); sfx("page"); },
    FloatingIsland: () => spawn(bg, "island", { w: size(.6), dur: slow()+8, depth:.45, fog: Math.random()<.5 }),
    GhostRider: () => sfx("whoosh", spawn(fg, "rider", { w: size(.4), dur: fast(), depth:1 })),
    Traveller: () => spawn(mid, "traveller", { w: size(.25), top: rand(40,75), dur: slow() }),
    DeerRun: () => spawn(fg, "deer", { w: size(.25), top: rand(70,88), dur: rand(2,4) }),
    SkyWhale: () => sfx("dragon", spawn(bg, "whale", { w: size(.6), dur: slow()+6, depth:.5, fog:true })),
    SkyFish: () => { for (let i=0;i<5;i++) setTimeout(()=>spawn(mid,"fish",{w:size(.15),dur:rand(3,7)}),i*300); },
    SkyTrain: () => spawn(bg, "train", { w: size(.4), top: rand(55,72), dur: slow(), depth:.55 }),
    SpiritWalk: () => { for (let i=0;i<3;i++) setTimeout(()=>spawn(fg,"spirit",{w:size(.15),top:rand(55,85),dur:rand(6,12)}),i*700); },
    ButterflyDrift: () => { for (let i=0;i<9;i++) setTimeout(()=>spawn(fg,"butterfly",{w:size(.15),top:rand(40,88),dur:rand(4,9)}),i*250); },
    RuneStream: () => { for (let i=0;i<7;i++) setTimeout(()=>spawn(fg,"rune",{w:size(.15),top:rand(20,80),dur:rand(4,8)}),i*200); sfx("sparkle"); },
    MeteorRain: () => { for (let i=0;i<10;i++) setTimeout(shootingStar,i*rand(120,400)); sfx("comet"); },
    Comet: () => { shootingStar(); sfx("comet"); },
    PortalOpen: () => { portal(); sfx("portal"); },
    Lightning: () => { lightning(); sfx("thunder"); },
  };

  const keys = Object.keys(events);
  let last = "", timer = null;
  function next() {
    if (!document.hidden) {
      let k = pick(keys); while (k === last && keys.length > 1) k = pick(keys); last = k;
      try { events[k](); } catch {}
      if (Math.random() < 0.35) { let k2 = pick(keys); while (k2 === k) k2 = pick(keys); try { events[k2](); } catch {} }
    }
    timer = setTimeout(next, rand(2000, 8000));
  }
  timer = setTimeout(next, 1500);
  const onVis = () => { if (!document.hidden && timer == null) next(); };
  document.addEventListener("visibilitychange", onVis);
  return () => { clearTimeout(timer); document.removeEventListener("visibilitychange", onVis); layer.remove(); };
}
