import { crest } from "../utils/svg.js";
import { profile } from "../utils/data.js";

/**
 * Slim cinematic top bar. Transparent at the top of the page,
 * condenses to a glass bar once scrolled (toggled in main.js).
 */
export default function Navbar() {
  return `
  <header class="topbar" id="topbar">
    <a href="#home" class="topbar__brand" data-nav="home">
      <span class="topbar__crest">${crest(34)}</span>
      <span class="topbar__name">${profile.name}</span>
    </a>
    <a href="#resume" class="btn btn--ghost topbar__cta" data-nav="resume">View Resume</a>
  </header>`;
}
