/* ============================================================
   DeepVerse — Shared SVG art & icon helpers
   All artwork is procedural (inline SVG) — no binary assets.
   ============================================================ */

/** The DeepVerse crest — a moon + rune sigil. */
export function crest(size = 96) {
  return `
  <svg viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true">
    <defs>
      <radialGradient id="crestGold" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#fbeec1"/>
        <stop offset="55%" stop-color="#e6b54a"/>
        <stop offset="100%" stop-color="#8d6a1c"/>
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="46" fill="none" stroke="url(#crestGold)" stroke-width="2"/>
    <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(229,181,74,0.35)" stroke-width="1"/>
    <path d="M62 28a26 26 0 1 0 0 44 30 30 0 0 1 0-44z" fill="url(#crestGold)"/>
    <path d="M50 16 L54 30 L50 44 L46 30 Z" fill="url(#crestGold)" opacity="0.9"/>
    <g stroke="url(#crestGold)" stroke-width="1.6" stroke-linecap="round">
      <path d="M50 60 L50 82"/>
      <path d="M42 70 L50 64 L58 70"/>
      <path d="M44 78 L50 73 L56 78"/>
    </g>
  </svg>`;
}

/** Stroke-style line icons (Feather-like). */
const ICON_PATHS = {
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  projects: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 4v5"/>',
  skills: '<path d="M12 3l2.5 6H21l-5 4 2 7-6-4-6 4 2-7-5-4h6.5z"/>',
  experience: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  resume: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h6"/>',
  contact: '<path d="M4 4h16v16H4z"/><path d="m4 6 8 6 8-6"/>',
  mail: '<path d="M4 4h16v16H4z"/><path d="m4 6 8 6 8-6"/>',
  phone: '<path d="M5 4h4l2 5-3 2a14 14 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  map: '<path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  code: '<path d="m8 9-4 3 4 3M16 9l4 3-4 3M13 6l-2 12"/>',
  ai: '<rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/><circle cx="10" cy="11" r="1"/><circle cx="14" cy="11" r="1"/>',
  cloud: '<path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A4 4 0 0 1 17 18z"/>',
  spark: '<path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  arrowL: '<path d="m15 6-6 6 6 6"/>',
  arrowR: '<path d="m9 6 6 6-6 6"/>',
};

export function icon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[name] || ICON_PATHS.spark}</svg>`;
}

/** Filled brand glyphs for social rows. */
const BRAND_PATHS = {
  github: 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.66.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z',
  linkedin: 'M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21H20v-5.4c0-1.3 0-2.95-1.8-2.95s-2.08 1.4-2.08 2.85V21H12z',
  x: 'M18.9 2H22l-7.5 8.6L23 22h-6.8l-5-6.6L5.5 22H2.4l8-9.2L1.6 2h6.9l4.5 6 5.9-6zm-2.4 18h1.9L7.6 3.9H5.6z',
  dribbble: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.6 4.6a8 8 0 0 1 1.8 5c-.3 0-3.3-.7-6.3-.3-.2-.4-.3-.8-.5-1.2 3.3-1.4 4.8-3.3 5-3.5zM12 4a8 8 0 0 1 5.2 1.9c-.2.3-1.5 2-4.7 3.3A40 40 0 0 0 9.3 4.4 8 8 0 0 1 12 4zM7.2 5.3a48 48 0 0 1 3.2 4.7c-4 1-7.5 1-8 1A8 8 0 0 1 7.2 5.3zM4 12v-.3c.5 0 4.6.1 9-1.3.2.5.5 1 .7 1.4-3.8 1.1-6.7 4.3-7.3 5A8 8 0 0 1 4 12zm8 8a8 8 0 0 1-5-1.7c.4-.8 2.4-3.6 6.5-5 .9 2.4 1.3 4.4 1.4 5a8 8 0 0 1-2.9.7zm4.8-1.7c-.1-.6-.5-2.4-1.3-4.7 2.7-.4 5 .3 5.3.4a8 8 0 0 1-4 4.3z',
};

export function brand(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${BRAND_PATHS[name] || BRAND_PATHS.github}"/></svg>`;
}
