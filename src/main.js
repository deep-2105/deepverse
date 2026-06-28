import "./styles/globals.css";
import "./styles/intro.css";
import "./styles/sidebar.css";
import "./styles/hero.css";
import "./styles/netflix.css";
import "./styles/fx.css";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import Intro from "./components/Intro.js";
import Sidebar from "./components/Sidebar.js";
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";

import { initParticles } from "./animations/particles.js";
import { initSmoothScroll, initScrollReveals } from "./animations/scroll.js";
import { initParallax } from "./animations/parallax.js";
import { initIntro, playHeroIntro } from "./animations/intro.js";
import { initCursor } from "./animations/cursor.js";
import { initSound } from "./animations/sound.js";
import { initAmbientWorld } from "./animations/ambient.js";
import { initContactSpell } from "./animations/contactSpell.js";
import { initInteractions } from "./utils/interactions.js";

/* ---------- Render the application shell ---------- */
const app = document.querySelector("#app");
app.innerHTML = `
  ${Intro()}
  ${Sidebar()}
  ${Navbar()}
  ${Home()}
`;

/* ---------- Boot sequence ---------- */
function boot() {
  // Ambient three.js particle field (degrades gracefully without WebGL)
  try { initParticles("particles-canvas"); } catch (e) { console.warn(e); }

  // Procedural flying silhouettes (wizards, owls, dragons, airships…)
  try { initAmbientWorld(); } catch (e) { console.warn(e); }

  // Smooth scrolling + scroll-driven reveals
  const lenis = initSmoothScroll();
  initScrollReveals();

  // Hero mouse parallax
  initParallax();

  // Navigation, scroll-spy, episode arrows, form, etc.
  initInteractions(lenis);

  // Premium FX: custom cursor, ambient sound, magical contact particles
  initCursor();
  initSound();
  initContactSpell(document.getElementById("contact-spell"));

  // Make sure ScrollTrigger measures the final layout
  ScrollTrigger.refresh();

  // Cinematic intro → then play the hero entrance
  initIntro().then(() => {
    playHeroIntro();
    ScrollTrigger.refresh();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}

window.addEventListener("load", () => ScrollTrigger.refresh());
