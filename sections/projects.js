import { escapeHtml, externalAttributes, renderSectionHeading, safeUrl } from "../js/render.js";

const githubIcon = '<svg class="button-icon brand-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.41-1.27.74-1.56-2.57-.29-5.27-1.29-5.27-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.96 10.96 0 0 1 5.75 0c2.19-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.71 5.38-5.29 5.67.42.36.79 1.07.79 2.16v3.2c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z"></path></svg>';

export function renderProjects(projects) {
  const cards = (projects.items ?? []).map((project) => {
    const metrics = (project.tags ?? []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    const links = (project.links ?? []).filter((link) => link.url).map((link) => `<a class="project-link" href="${safeUrl(link.url)}"${externalAttributes(link.url)}>${escapeHtml(link.label)} ↗</a>`).join("");
    return `<article class="project-card"><img src="${safeUrl(project.thumbnail)}" alt="${escapeHtml(project.thumbnailAlt)}"><div class="project-body"><span class="project-type">${escapeHtml(project.type)}</span><h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.description)}</p><div class="project-metrics">${metrics}</div><div class="project-links">${links}</div></div></article>`;
  }).join("");
  const cta = projects.cta?.url
    ? `<div class="projects-cta"><a class="button" href="${safeUrl(projects.cta.url)}"${externalAttributes(projects.cta.url)}>${projects.cta.icon === "github" ? githubIcon : ""}${escapeHtml(projects.cta.label)}</a></div>`
    : "";

  return `<section class="section shell" id="projects">${renderSectionHeading(projects)}<div class="projects-grid">${cards}</div>${cta}</section>`;
}
