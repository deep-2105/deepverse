import { achievements, certifications } from "../utils/data.js";

export default function Achievements() {
  const cards = achievements
    .map(
      (a) => `
      <article class="ach-card glass reveal">
        <div class="ach-card__glow"></div>
        <div class="ach-card__trophy">${a.trophy}</div>
        <div class="ach-card__body">
          <span class="ach-card__tag">${a.tag}</span>
          <h3>${a.title}</h3>
          <p>${a.desc}</p>
        </div>
      </article>`
    )
    .join("");

  const certs = certifications
    .map(
      (c) => `
      <div class="cert reveal">
        <div class="cert__year">${c.year}</div>
        <div>
          <h4>${c.title}</h4>
          <span>${c.org}</span>
        </div>
        <div class="cert__sigil">✦</div>
      </div>`
    )
    .join("");

  return `
  <section class="section achievements" id="achievements">
    <div class="section-head">
      <span class="eyebrow">Hall of Honors</span>
      <h2 class="section-title gold-text">Achievements</h2>
      <p class="section-sub">
        Trophies, internships and recognitions earned across the journey.
      </p>
    </div>
    <div class="ach-grid">${cards}</div>

    <div class="section-head" style="margin-top:clamp(46px,7vw,84px)">
      <span class="eyebrow">The Sigils</span>
      <h2 class="section-title gold-text">Certifications</h2>
    </div>
    <div class="cert-list">${certs}</div>
  </section>`;
}
