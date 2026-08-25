import { fetchGithubRepositories } from "../utils/github.js";

export function initGithubHall(root) {
  if (!root) return;
  const repos = root.querySelector("[data-gh-repos]");
  const stars = root.querySelector("[data-gh-stars]");
  const forks = root.querySelector("[data-gh-forks]");
  fetchGithubRepositories().then((items) => {
    repos.textContent = items.length;
    stars.textContent = items.reduce((total, item) => total + (item.stars || 0), 0);
    forks.textContent = items.reduce((total, item) => total + (item.forks || 0), 0);
  });
}
