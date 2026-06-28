import { stats, profile, skills, experience, achievements, certifications } from "../utils/data.js";

export default function Resume() {
  const cells = stats
    .map((s) => `<div class="resume__stat"><b>${s.value}</b><span>${s.label}</span></div>`)
    .join("");

  const blocks = [
    { t: "Professional Summary", d: `${profile.role} crafting cinematic, performant products at the intersection of engineering and imagination.` },
    { t: "Top Skills", d: skills.map((s) => s.title).join(" · ") },
    { t: "Experience", d: `${experience.length} roles across studios & labs — latest: ${experience[0].role}, ${experience[0].org}.` },
    { t: "Achievements", d: achievements.slice(0, 3).map((a) => a.title).join(" · ") },
    { t: "Certifications", d: certifications.map((c) => c.title).join(" · ") },
  ]
    .map((b) => `<div class="resume__block reveal"><h4>${b.t}</h4><p>${b.d}</p></div>`)
    .join("");

  return `
  <section class="section resume" id="resume">
    <div class="section-head" style="text-align:center">
      <span class="eyebrow">The Scroll</span>
      <h2 class="section-title gold-text">The Resume</h2>
    </div>
    <div class="resume__card glass reveal">
      <p class="about__lede" style="text-align:center">
        A single parchment summarising the journey — roles, results and the craft behind them.
      </p>
      <div class="resume__stats">${cells}</div>
      <div class="resume__blocks">${blocks}</div>
      <div class="resume__ats reveal" id="ats-meter">
        <span>ATS Score</span>
        <div class="resume__atsbar"><i id="ats-fill" style="width:0%"></i></div>
        <b id="ats-val">0%</b>
      </div>
      <div class="hero__actions" style="justify-content:center;flex-wrap:wrap">
        <a href="/resume.pdf" target="_blank" rel="noopener" class="btn btn--gold">▶ View Resume</a>
        <a href="/resume.pdf" download class="btn btn--ghost">⤓ Download</a>
        <button class="btn btn--ghost" data-resume="ats" type="button">🖨 Print / PDF</button>
        <button class="btn btn--ghost" data-resume="ats" type="button">✨ ATS Resume</button>
        <button class="btn btn--ghost" data-resume="modern" type="button">✦ Modern</button>
        <button class="btn btn--ghost" data-resume="onepage" type="button">📄 One Page</button>
        <button class="btn btn--ghost" data-resume="recruiter" type="button">💼 Recruiter</button>
      </div>
    </div>
  </section>`;
}
