import { escapeHtml, renderSectionHeading, safeUrl } from "../js/render.js";

export function renderSkills(skills) {
  const cards = (skills.items ?? []).map((skill) => `<div class="skill"><img src="${safeUrl(skill.icon)}" alt="${escapeHtml(skill.name)} logo" loading="lazy"><span>${escapeHtml(skill.name)}</span></div>`).join("");
  return `<section class="skills-section" id="skills"><div class="shell section">${renderSectionHeading(skills)}<div class="skills-grid">${cards}</div></div></section>`;
}
