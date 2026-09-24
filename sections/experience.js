import { escapeHtml, renderSectionHeading, safeUrl } from "../js/render.js";

function renderHighlights(highlights, limit) {
  return (highlights ?? []).slice(0, limit).map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join("");
}

function panelClass(panel) {
  return ["left", "center", "right"].includes(panel) ? panel : "center";
}

export function renderExperience(experience) {
  const count = Math.max(0, experience.featuredCount ?? 3);
  const items = experience.items ?? [];
  const featured = items.slice(0, count).reverse().map((item) => {
    const artUrl = escapeHtml(safeUrl(experience.illustration?.src));
    return `<article class="experience-card"><time>${escapeHtml(item.period)}</time><div class="experience-card-inner"><div class="experience-art experience-art-${panelClass(item.illustrationPanel)}" style="background-image:url('${artUrl}')" role="img" aria-label="${escapeHtml(experience.illustration?.alt)}"></div><div class="experience-card-copy"><span class="experience-focus">${escapeHtml(item.focus)}</span><h3>${escapeHtml(item.role)}</h3><span class="company">${escapeHtml(item.company)}</span><ul>${renderHighlights(item.highlights, 2)}</ul></div></div></article>`;
  }).join("");
  const earlier = items.slice(count).map((item) => `<article class="earlier-item"><time>${escapeHtml(item.period)}</time><div><h3>${escapeHtml(item.role)}</h3><span class="company">${escapeHtml(item.company)}</span><ul>${renderHighlights(item.highlights)}</ul></div></article>`).join("");
  const earlierExperience = earlier ? `<details class="earlier-experience"><summary><span>${escapeHtml(experience.earlierLabel)}</span><small>${items.length - count} roles</small></summary><div class="earlier-list">${earlier}</div></details>` : "";

  return `<section class="section shell" id="experience">${renderSectionHeading(experience)}<div class="experience-featured">${featured}</div>${earlierExperience}</section>`;
}
