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

import { initSmoothScroll, initScrollReveals } from "./animations/scroll.js";
import { initIntro, playHeroIntro } from "./animations/intro.js";
import { initSound } from "./animations/sound.js";
import { initCursor } from "./animations/cursor.js";
import { initInteractions } from "./utils/interactions.js";
import { initGithubDirectory } from "./components/GithubDirectory.js";
import { initGithubHall } from "./components/GithubHall.js";
import { initLumos } from "./components/Lumos.js";

/* ---------- Render the application shell ---------- */
const app = document.querySelector("#app");
app.innerHTML = `
  ${Intro()}
  ${Sidebar()}
  ${Navbar()}
  ${Home()}
`;
const hour = new Date().getHours();
document.documentElement.dataset.time = hour >= 7 && hour < 19 ? "day" : "night";

/* ---------- Boot sequence ---------- */
function boot() {
  // Native scrolling + one-shot scroll reveals
  const lenis = initSmoothScroll();
  initScrollReveals();

  // Navigation, scroll-spy, episode arrows, form, etc.
  initInteractions(lenis);
  initGithubDirectory(document.getElementById("github-directory"));
  initGithubHall(document.querySelector("[data-github-hall]"));
  initLumos(document.getElementById("lumos"));

  // Dormant user-enabled sound; no cursor or background render loop at boot
  initSound();
  initCursor();

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
document.addEventListener("visibilitychange", () => {
  document.body.classList.toggle("is-page-hidden", document.hidden);
});
