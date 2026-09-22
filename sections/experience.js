import { escapeHtml, renderSectionHeading } from "../js/render.js";

export function renderExperience(experience) {
  const roles = (experience.items ?? []).map((item) => {
    const bullets = (item.highlights ?? []).map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join("");
    return `<article class="experience-item"><time>${escapeHtml(item.period)}</time><div><div class="role-head"><div><h3>${escapeHtml(item.role)}</h3><span class="company">${escapeHtml(item.company)}</span></div></div><ul>${bullets}</ul></div></article>`;
  }).join("");

  return `<section class="section shell" id="experience">${renderSectionHeading(experience)}<div class="experience-list">${roles}</div></section>`;
}
