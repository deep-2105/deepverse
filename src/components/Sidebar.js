import { crest, icon, brand } from "../utils/svg.js";
import { profile, navItems } from "../utils/data.js";

/**
 * Netflix-style hover-expand sidebar (desktop)
 * + a compact bottom bar for mobile.
 */
export default function Sidebar() {
  const links = navItems
    .map(
      (n, i) => `
      <a href="#${n.id}" class="nav-link${i === 0 ? " is-active" : ""}" data-nav="${n.id}">
        <span class="nav-link__icon">${icon(n.icon)}</span>
        <span class="nav-link__label">${n.label}</span>
      </a>`
    )
    .join("");

  const social = profile.socials
    .slice(0, 3)
    .map((s) => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}">${brand(s.brand)}</a>`)
    .join("");

  const mobile = navItems
    .map(
      (n, i) => `
      <a href="#${n.id}" class="${i === 0 ? "is-active" : ""}" data-nav="${n.id}">
        <span class="nav-link__icon">${icon(n.icon)}</span>
        ${n.label}
      </a>`
    )
    .join("");

  return `
  <aside class="sidebar" id="sidebar">
    <a href="#home" class="sidebar__brand" data-nav="home" aria-label="${profile.name} home">
      <span class="sidebar__crest">${crest(38)}</span>
      <span class="sidebar__brandtext">${profile.name}</span>
    </a>
    <nav class="sidebar__nav">${links}</nav>
    <div class="sidebar__foot">${social}</div>
  </aside>

  <nav class="mobilebar" id="mobilebar">${mobile}</nav>`;
}
