import { experience } from "../utils/data.js";

export default function Experience() {
  const items = experience
    .map(
      (e) => `
      <div class="tl-item reveal">
        <div class="tl-item__time">${e.time}</div>
        <h3>${e.role}</h3>
        <div class="tl-item__org">${e.org}</div>
        <p>${e.desc}</p>
      </div>`
    )
    .join("");

  return `
  <section class="section experience" id="experience">
    <div class="section-head">
      <span class="eyebrow">The Chronicles</span>
      <h2 class="section-title gold-text">Experience</h2>
      <p class="section-sub">
        Seasons of work across studios and labs — a timeline forged through shipping real things.
      </p>
    </div>
    <div class="timeline">${items}</div>
  </section>`;
}
