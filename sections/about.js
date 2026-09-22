import { escapeHtml, textWithBreaks } from "../js/render.js";

export function renderAbout(about) {
  const paragraphs = (about.paragraphs ?? []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  const kpis = (about.kpis ?? []).map((kpi) => {
    const id = kpi.dynamic === "githubRepos" ? ' id="repoCount" aria-live="polite"' : "";
    return `<div class="kpi"><strong${id}>${escapeHtml(kpi.value)}</strong><span>${escapeHtml(kpi.label)}</span></div>`;
  }).join("");

  return `<section class="about-band" id="about"><div class="shell section"><div class="about-layout">
    <div><p class="eyebrow">${escapeHtml(about.eyebrow)}</p><h2>${textWithBreaks(about.title)}</h2><p class="tagline">${escapeHtml(about.tagline)}</p></div>
    <div class="about-copy">${paragraphs}<div class="kpis" aria-label="Career highlights">${kpis}</div></div>
  </div></div></section>`;
}
