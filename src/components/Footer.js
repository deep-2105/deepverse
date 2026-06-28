import { crest, brand } from "../utils/svg.js";
import { profile } from "../utils/data.js";

export default function Footer() {
  const year = new Date().getFullYear();
  const social = profile.socials
    .map((s) => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}">${brand(s.brand)}</a>`)
    .join("");

  return `
  <footer class="footer">
    <div class="footer__grid">
      <a href="#home" class="footer__brand" data-nav="home">
        ${crest(40)}
        <b>${profile.name}</b>
      </a>
      <div class="footer__social">${social}</div>
    </div>
    <p class="footer__copy">
      © ${year} <span>${profile.name}</span> — Crafted under moonlight with code &amp; magic.
    </p>
  </footer>`;
}
