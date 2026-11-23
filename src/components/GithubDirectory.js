import { fetchGithubRepositories } from "../utils/github.js";

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function safeExternalUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "#";
  } catch {
    return "#";
  }
}

function card(repo) {
  const topics = repo.topics?.length
    ? `<div class="github-card__topics">${repo.topics.map((topic) => `<span>${escapeHtml(topic)}</span>`).join("")}</div>`
    : "";
  const repoUrl = safeExternalUrl(repo.url);
  const homepageUrl = safeExternalUrl(repo.homepage);
  const live = repo.homepage && homepageUrl !== "#"
    ? `<a class="ecard__btn ecard__btn--gold" href="${escapeHtml(homepageUrl)}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
    : "";
  const updated = repo.updated
    ? new Date(repo.updated).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : "Not available";

  return `<article class="github-card glass" tabindex="0" data-repo-url="${escapeHtml(repoUrl)}" data-repo-search="${escapeHtml([repo.name, repo.description, repo.language, ...(repo.topics || [])].join(" ").toLowerCase())}">
    <div class="github-card__head"><span class="github-card__mark">✦</span><h3>${escapeHtml(repo.name)}</h3></div>
    <p>${escapeHtml(repo.description)}</p>${topics}
    <div class="github-card__stats"><span>${escapeHtml(repo.language)}</span><span>★ ${escapeHtml(repo.stars ?? "-")}</span><span>Forks ${escapeHtml(repo.forks ?? "-")}</span><span>Updated ${escapeHtml(updated)}</span></div>
    <div class="github-card__links"><a class="ecard__btn" href="${escapeHtml(repoUrl)}" target="_blank" rel="noopener noreferrer">Repository</a>${live}</div>
  </article>`;
}

export function initGithubDirectory(root) {
  if (!root) return;
  const input = root.querySelector("[data-github-search]");
  const list = root.querySelector("[data-github-list]");
  const status = root.querySelector("[data-github-status]");
  if (!input || !list || !status) return;

  let items = [];
  const render = () => {
    const query = input.value.trim().toLowerCase();
    const visible = items.filter((repo) => `${repo.name} ${repo.description} ${repo.language} ${(repo.topics || []).join(" ")}`.toLowerCase().includes(query));
    list.innerHTML = visible.map(card).join("") || `<p class="github-empty">No matching public repositories.</p>`;
    status.textContent = `${visible.length} public repositor${visible.length === 1 ? "y" : "ies"}`;
  };

  const openCard = (event) => {
    if (event.target.closest("a")) return;
    const cardElement = event.target.closest("[data-repo-url]");
    const url = cardElement?.dataset.repoUrl;
    if (url && url !== "#") window.open(url, "_blank", "noopener,noreferrer");
  };

  list.addEventListener("click", openCard);
  list.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCard(event);
    }
  });
  input.addEventListener("input", render);

  fetchGithubRepositories()
    .then((repos) => {
      items = repos;
      render();
    })
    .catch(() => {
      status.textContent = "Local project archive";
    });
}
