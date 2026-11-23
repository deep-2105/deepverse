import { projects as localProjects } from "./data.js";

const CACHE_KEY = "deepverse-github-repositories-v3";
const USERNAME = "deep-2105";
const PAGE_SIZE = 100;
const MAX_PAGES = 5;

function localFallback() {
  return localProjects
    .filter((project) => project.github?.includes(`github.com/${USERNAME}/`))
    .map((project) => ({
      name: project.name,
      description: project.desc,
      language: project.meta?.[0] || "",
      topics: [],
      stars: null,
      forks: null,
      updated: null,
      url: project.github,
      homepage: project.demo || "",
    }));
}

function normalize(repo) {
  return {
    name: repo.name,
    description: repo.description || "No description provided.",
    language: repo.language || "Not specified",
    topics: Array.isArray(repo.topics) ? repo.topics : [],
    stars: Number(repo.stargazers_count || 0),
    forks: Number(repo.forks_count || 0),
    updated: repo.updated_at || null,
    url: repo.html_url,
    homepage: repo.homepage || "",
  };
}

function uniqueRepositories(repositories) {
  const seen = new Set();
  return repositories.filter((repo) => {
    const key = repo.name.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchRepositoryPages() {
  const repositories = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const response = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=${PAGE_SIZE}&page=${page}&sort=updated`,
      { headers: { Accept: "application/vnd.github+json" } },
    );
    if (!response.ok) throw new Error(`GitHub request failed: ${response.status}`);

    const batch = await response.json();
    if (!Array.isArray(batch)) throw new Error("Unexpected GitHub API response");

    repositories.push(...batch.map(normalize));
    if (batch.length < PAGE_SIZE) break;
  }

  return uniqueRepositories(repositories);
}

export async function fetchGithubRepositories() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (Array.isArray(cached?.items) && Date.now() - cached.time < 86400000) {
      return cached.items;
    }
  } catch {}

  try {
    const items = await fetchRepositoryPages();
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), items }));
    } catch {}
    return items.length ? items : localFallback();
  } catch {
    return localFallback();
  }
}

export { USERNAME };
