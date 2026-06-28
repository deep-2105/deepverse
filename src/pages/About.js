import { crest } from "../utils/svg.js";
import { profile, education, certifications } from "../utils/data.js";

export default function About() {
  const chips = ["Python", "Java · C++ · SQL", "Machine Learning", "AWS Cloud", "Data Structures & Algorithms"]
    .map((c) => `<span class="chip">${c}</span>`)
    .join("");

  const facts = [
    { icon: "📍", label: "Location", val: profile.location },
    { icon: "✉️", label: "Email", val: `<a href="mailto:${profile.email}">${profile.email}</a>` },
    { icon: "📞", label: "Phone", val: `<a href="tel:${profile.phone.replace(/\s/g, "")}">${profile.phone}</a>` },
    { icon: "💼", label: "LinkedIn", val: `<a href="${profile.socials[1].url}" target="_blank" rel="noopener">deep-sharma</a>` },
    { icon: "💻", label: "GitHub", val: `<a href="${profile.socials[0].url}" target="_blank" rel="noopener">deep-2105</a>` },
    { icon: "🎓", label: "Education", val: `${education[0].role}` },
  ]
    .map((f) => `<div class="about__fact"><span>${f.icon}</span><div><small>${f.label}</small><b>${f.val}</b></div></div>`)
    .join("");

  return `
  <section class="section about" id="about">
    <div class="about__grid">
      <div class="about__portrait reveal">
        <div class="about__sigil">${crest(220)}</div>
      </div>
      <div class="about__copy">
        <div class="section-head">
          <span class="eyebrow">Chapter One</span>
          <h2 class="section-title gold-text">About Deep Sharma</h2>
          <div class="rune-divider"><span>✦</span></div>
        </div>
        <p class="about__lede reveal">
          I'm <b>${profile.alias}</b> — a <b>${profile.role}</b> undergraduate
          building data-driven applications and scalable software systems.
        </p>
        <p class="about__text reveal">${profile.summary}</p>
        <p class="about__text reveal"><b>Career Goal:</b> ${profile.goal}</p>
        <div class="about__facts reveal">${facts}</div>
        <div class="about__chips reveal">${chips}</div>
      </div>
    </div>
  </section>`;
}
