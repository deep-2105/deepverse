/**
 * A single Netflix-style episode card representing a project.
 * @param {object} item  project data
 * @param {number} index 0-based position (for rank label)
 */
export default function EpisodeCard(item, index = 0) {
  const rank = item.rank || String(index + 1).padStart(2, "0");
  const meta = (item.meta || [])
    .map((m) => `<span>${m}</span>`)
    .join("");
  const duration = item.duration ? `<span class="ecard__dur">${item.duration}</span>` : "";
  const status = item.status ? `<span class="ecard__status">${item.status}</span>` : "";
  const progress = typeof item.progress === "number"
    ? `<div class="ecard__progress"><i style="width:${item.progress}%"></i></div>`
    : "";
  const target = item.target ? `data-nav="${item.target}"` : "";
  const links = [
    item.github ? `<a class="ecard__btn" href="${item.github}" target="_blank" rel="noopener" onclick="event.stopPropagation()">GitHub</a>` : "",
    item.demo ? `<a class="ecard__btn ecard__btn--gold" href="${item.demo}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Live Demo</a>` : "",
  ].filter(Boolean).join("");
  const linksHTML = links ? `<div class="ecard__links">${links}</div>` : "";

  return `
  <article class="ecard reveal" tabindex="0" ${target} aria-label="${item.name}">
    <div class="ecard__art" style="background-image:${item.poster}"></div>
    <div class="ecard__scrim"></div>
    <div class="ecard__rank">EP ${rank}</div>
    ${duration}
    ${status}
    <div class="ecard__play">▶</div>
    <div class="ecard__body">
      <div class="ecard__tag">${item.tag}</div>
      <h3 class="ecard__name">${item.name}</h3>
      <p class="ecard__desc">${item.desc}</p>
      <div class="ecard__meta">${meta}</div>
      ${linksHTML}
    </div>
    ${progress}
  </article>`;
}
