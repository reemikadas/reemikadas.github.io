import { escapeHtml, externalAttributes, renderSectionHeading, safeUrl } from "../js/render.js";

export function renderProjects(projects) {
  const cards = (projects.items ?? []).map((project) => {
    const metrics = (project.tags ?? []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    const links = (project.links ?? []).filter((link) => link.url).map((link) => `<a class="project-link" href="${safeUrl(link.url)}"${externalAttributes(link.url)}>${escapeHtml(link.label)} ↗</a>`).join("");
    return `<article class="project-card"><img src="${safeUrl(project.thumbnail)}" alt="${escapeHtml(project.thumbnailAlt)}"><div class="project-body"><span class="project-type">${escapeHtml(project.type)}</span><h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.description)}</p><div class="project-metrics">${metrics}</div><div class="project-links">${links}</div></div></article>`;
  }).join("");

  return `<section class="section shell" id="projects">${renderSectionHeading(projects)}<div class="projects-grid">${cards}</div></section>`;
}
