import { profile, skills, experience, projects, achievements, certifications, education } from "./data.js";

const gh = profile.socials.find((s) => s.brand === "github")?.url || "";
const li = profile.socials.find((s) => s.brand === "linkedin")?.url || "";

/* Full ATS-friendly (plain, single-column, parsable) resume body. */
function fullResume() {
  return `
  <h1>Deep Sharma</h1>
  <p>${profile.role} — ${profile.location}</p>
  <p>${profile.email} | ${profile.phone}</p>
  <p>GitHub: ${gh} | LinkedIn: ${li}</p>
  <h2>Professional Summary</h2>
  <p>${profile.summary}</p>
  <h2>Education</h2>
  <p><strong>${education[0].role}</strong> — ${education[0].org}. ${education[0].desc}</p>
  <h2>Technical Skills</h2>
  <ul>${skills.map((s) => `<li><strong>${s.title}:</strong> ${s.items}</li>`).join("")}</ul>
  <h2>Projects</h2>
  ${projects.map((p) => `<p><strong>${p.name}</strong> — ${p.desc} [${p.meta.join(", ")}]</p>`).join("")}
  <h2>Experience</h2>
  ${experience.map((e) => `<h3>${e.role} — ${e.org} (${e.time})</h3><p>${e.desc}</p>`).join("")}
  <h2>Certifications</h2>
  <ul>${certifications.map((c) => `<li>${c.title} — ${c.org}</li>`).join("")}</ul>
  <h2>Achievements</h2>
  <ul>${achievements.map((a) => `<li>${a.title}: ${a.desc}</li>`).join("")}</ul>
  <h2>Strengths</h2>
  <ul><li>Quick learner who rapidly adopts new engineering practices.</li><li>Strong problem-solving and analytical thinking.</li><li>Team collaboration and time management.</li><li>Focus on code quality, performance, reliability and continuous improvement.</li></ul>
  <h2>Languages</h2><p>English · Hindi</p>`;
}

function onePageResume() {
  return `
  <h1>Deep Sharma</h1>
  <p>${profile.role} | ${profile.email} | ${profile.phone} | ${profile.location}</p>
  <p>${gh} | ${li}</p>
  <h2>Summary</h2><p>${profile.summary}</p>
  <h2>Skills</h2><p>${skills.map((s) => s.items).join(" · ")}</p>
  <h2>Projects</h2>${projects.slice(0, 4).map((p) => `<p><strong>${p.name}:</strong> ${p.desc}</p>`).join("")}
  <h2>Experience</h2><p><strong>${experience[0].role}, ${experience[0].org}</strong> — ${experience[0].desc}</p>
  <h2>Certifications</h2><p>${certifications.map((c) => c.title).join(" · ")}</p>`;
}

function recruiterResume() {
  return `
  <h1>Deep Sharma</h1>
  <p>${profile.role} — ${profile.location}</p>
  <p>${profile.email} | ${profile.phone} | ${gh} | ${li}</p>
  <h2>Why Hire Me</h2><p>${profile.summary}</p>
  <h2>Top Highlights</h2><ul>${achievements.map((a) => `<li>${a.title}</li>`).join("")}</ul>
  <h2>Core Skills</h2><p>${skills.map((s) => s.title).join(" · ")}</p>
  <h2>Selected Projects</h2>${projects.slice(0, 3).map((p) => `<p><strong>${p.name}:</strong> ${p.desc}</p>`).join("")}
  <h2>Experience</h2><p>${experience[0].role}, ${experience[0].org}</p>`;
}

const ATS_CSS = `body{font-family:Arial,Helvetica,sans-serif;color:#111;max-width:800px;margin:40px auto;padding:0 24px;line-height:1.5}h1{font-size:24px;margin:0}h2{font-size:15px;border-bottom:1px solid #000;text-transform:uppercase;margin-top:20px}h3{font-size:13px;margin:10px 0 2px}p,li{font-size:12px}@media print{body{margin:0}}`;
const MODERN_CSS = `body{font-family:Georgia,serif;background:#0b0f1d;color:#f0e7d0;max-width:820px;margin:0 auto;padding:48px}h1{color:#f5d27a;font-size:34px;letter-spacing:2px;margin:0}h2{color:#e6b54a;border-bottom:1px solid #6b5520;text-transform:uppercase;letter-spacing:3px;font-size:14px;margin-top:26px}h3{margin:12px 0 2px;color:#fbeec1}a,p,li{color:#cfc7b3}@media print{body{background:#fff;color:#111}h1,h2,h3{color:#8a6d18}}`;

export function generateResume(type = "ats") {
  const w = window.open("", "_blank");
  if (!w) return;
  let body = fullResume();
  let css = ATS_CSS;
  if (type === "modern") css = MODERN_CSS;
  else if (type === "onepage") body = onePageResume();
  else if (type === "recruiter") body = recruiterResume();
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Deep Sharma — Resume (${type.toUpperCase()})</title><style>${css}</style></head><body>${body}<script>setTimeout(()=>window.print(),400)<\/script></body></html>`);
  w.document.close();
}

export function atsScore() {
  let score = 0;
  if (profile.email) score += 10;
  if (profile.phone) score += 10;
  if (gh) score += 10;
  if (li) score += 10;
  if (profile.summary && profile.summary.length > 80) score += 15;
  if (skills.length >= 5) score += 15;
  if (projects.length >= 3) score += 15;
  if (certifications.length >= 2) score += 10;
  if (experience.length >= 1) score += 5;
  return Math.min(score, 100);
}
