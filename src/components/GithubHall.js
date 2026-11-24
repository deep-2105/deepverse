import { fetchGithubRepositories } from "../utils/github.js";

export function initGithubHall(root) {
  if (!root) return;

  const repos = root.querySelector("[data-gh-repos]");
  const stars = root.querySelector("[data-gh-stars]");
  const forks = root.querySelector("[data-gh-forks]");
  if (!repos || !stars || !forks) return;

  const formatCount = (value) => new Intl.NumberFormat().format(value);

  fetchGithubRepositories()
    .then((items) => {
      const totals = items.reduce(
        (summary, item) => ({
          stars: summary.stars + (Number.isFinite(item.stars) ? item.stars : 0),
          forks: summary.forks + (Number.isFinite(item.forks) ? item.forks : 0),
        }),
        { stars: 0, forks: 0 },
      );

      repos.textContent = formatCount(items.length);
      stars.textContent = formatCount(totals.stars);
      forks.textContent = formatCount(totals.forks);
    })
    .catch(() => {
      // Keep the static fallback labels intact if repository loading fails.
    });
}
