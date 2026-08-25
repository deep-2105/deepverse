import { fetchGithubRepositories } from "../utils/github.js";

function card(repo) {
  const topics = repo.topics?.length ? `<div class="github-card__topics">${repo.topics.map((topic) => `<span>${topic}</span>`).join("")}</div>` : "";
  const live = repo.homepage ? `<a class="ecard__btn ecard__btn--gold" href="${repo.homepage}" target="_blank" rel="noopener">Live Demo</a>` : "";
  const updated = repo.updated ? new Date(repo.updated).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Not available";
  return `<article class="github-card glass" tabindex="0" data-repo-url="${repo.url}" data-repo-search="${[repo.name, repo.description, repo.language, ...(repo.topics || [])].join(" ").toLowerCase()}">
    <div class="github-card__head"><span class="github-card__mark">✦</span><h3>${repo.name}</h3></div>
    <p>${repo.description}</p>${topics}
    <div class="github-card__stats"><span>${repo.language}</span><span>★ ${repo.stars ?? "-"}</span><span>Forks ${repo.forks ?? "-"}</span><span>Updated ${updated}</span></div>
    <div class="github-card__links"><a class="ecard__btn" href="${repo.url}" target="_blank" rel="noopener">Repository</a>${live}</div>
  </article>`;
}

export function initGithubDirectory(root) {
  if (!root) return;
  const input = root.querySelector("[data-github-search]");
  const list = root.querySelector("[data-github-list]");
  const status = root.querySelector("[data-github-status]");
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
    if (cardElement) window.open(cardElement.dataset.repoUrl, "_blank", "noopener");
  };
  list.addEventListener("click", openCard);
  list.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") openCard(event); });
  input.addEventListener("input", render);
  fetchGithubRepositories().then((repos) => { items = repos; render(); }).catch(() => { status.textContent = "Local project archive"; });
}
