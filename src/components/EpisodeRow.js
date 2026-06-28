import EpisodeCard from "./EpisodeCard.js";
import { icon } from "../utils/svg.js";

let rowCounter = 0;

/**
 * Horizontal, scrollable row of episode cards — Netflix style.
 * @param {object} opts
 * @param {string} opts.title    row heading
 * @param {string} opts.eyebrow  small label above heading
 * @param {Array}  opts.items    project data
 */
export default function EpisodeRow({ title, eyebrow = "Now Streaming", items = [] }) {
  const id = `eprow-${rowCounter++}`;
  const cards = items.map((it, i) => EpisodeCard(it, i)).join("");

  return `
  <div class="eprow">
    <div class="eprow__head">
      <h2 class="eprow__title"><small>${eyebrow}</small>${title}</h2>
      <div class="eprow__nav">
        <button data-scroll="${id}" data-dir="-1" aria-label="Scroll left">${icon("arrowL")}</button>
        <button data-scroll="${id}" data-dir="1" aria-label="Scroll right">${icon("arrowR")}</button>
      </div>
    </div>
    <div class="eprow__track" id="${id}">${cards}</div>
  </div>`;
}
