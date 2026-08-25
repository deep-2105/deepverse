import EpisodeRow from "../components/EpisodeRow.js";
import { projects, episodes } from "../utils/data.js";

export default function Projects() {
  const featured = projects.slice(0, 3);
  const more = projects.slice(2);

  return `
  <section class="section projects" id="projects">
    <div class="section-head">
      <span class="eyebrow">The Series</span>
      <h2 class="section-title gold-text">Featured Episodes</h2>
      <p class="section-sub">
        A curated season of projects — each one an experiment in craft, performance and story.
      </p>
    </div>

    <div class="github-directory" id="github-directory">
      <div class="github-directory__head">
        <div><span class="eyebrow">Public Archive</span><h3>GitHub Repository Directory</h3></div>
        <span data-github-status>Loading public repositories...</span>
      </div>
      <label class="github-search"><span>Filter projects</span><input type="search" data-github-search placeholder="Name, language or topic" /></label>
      <div class="github-directory__list" data-github-list><p class="github-empty">Loading public repositories...</p></div>
    </div>

    ${EpisodeRow({ title: "Season One · The Portfolio", eyebrow: "Now Streaming", items: episodes })}
    ${EpisodeRow({ title: "Top Picks for You", eyebrow: "Featured", items: featured })}
    ${EpisodeRow({ title: "Continue Watching", eyebrow: "More to Explore", items: more })}
  </section>`;
}
