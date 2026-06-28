import { icon } from "../utils/svg.js";
import { skills } from "../utils/data.js";

export default function Skills() {
  const cards = skills
    .map(
      (s) => `
      <article class="skillcard glass reveal" data-level="${s.level}">
        <div class="skillcard__icon">${icon(s.icon)}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <div class="skill-bar"><i style="width:0%"></i></div>
        <div class="skillcard__lvl"><span>${s.items}</span><span>${s.level}%</span></div>
      </article>`
    )
    .join("");

  return `
  <section class="section skills" id="skills">
    <div class="section-head">
      <span class="eyebrow">The Spellbook</span>
      <h2 class="section-title gold-text">Skills &amp; Magic</h2>
      <p class="section-sub">
        The crafts I've mastered — from front-of-stage interfaces to the engines humming beneath.
      </p>
    </div>
    <div class="skills__grid">${cards}</div>
  </section>`;
}
