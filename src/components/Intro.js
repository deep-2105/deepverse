import { crest } from "../utils/svg.js";
import { profile } from "../utils/data.js";

/**
 * Fullscreen cinematic intro / preloader.
 * Animated by initIntro() in src/animations/intro.js.
 */
export default function Intro() {
  const letters = profile.name
    .split("")
    .map((ch) => `<span class="char">${ch}</span>`)
    .join("");

  return `
  <div class="intro" id="intro">
    <div class="intro__sky"></div>
    <div class="intro__moon" id="intro-moon"></div>

    <div class="intro__content">
      <div class="intro__crest" id="intro-crest">${crest(96)}</div>
      <div class="intro__titlewrap">
        <div class="intro__dust" aria-hidden="true"></div>
        <h1 class="intro__title gold-text" aria-label="${profile.name}">${letters}</h1>
      </div>
      <p class="intro__tagline" id="intro-tagline">${profile.tagline}</p>
      <div class="intro__enter" id="intro-enter">
        <button class="btn btn--gold" data-enter>Enter the Verse</button>
      </div>
    </div>

    <div class="intro__progress" id="intro-progress">
      <div class="intro__bar"><i id="intro-bar"></i></div>
      <div class="intro__count"><span id="intro-count">0</span>% · Summoning the night</div>
    </div>
  </div>`;
}
