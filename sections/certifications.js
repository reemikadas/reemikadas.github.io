import { escapeHtml, renderSectionHeading, safeUrl } from "../js/render.js";

function timestamp(value) {
  const parsed = Date.parse(value ?? "");
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function sortCertifications(items = []) {
  return [...items].sort((left, right) => {
    const dateDifference = timestamp(right.earnedOn) - timestamp(left.earnedOn);
    if (dateDifference) return dateDifference;
    const priorityDifference = Number(right.priority ?? 0) - Number(left.priority ?? 0);
    if (priorityDifference) return priorityDifference;
    return String(left.name ?? "").localeCompare(String(right.name ?? ""));
  });
}

function renderPagination(pageCount) {
  return Array.from({ length: pageCount }, (_, index) => `<button class="certification-dot${index === 0 ? " active" : ""}" type="button" data-certification-page="${index}" aria-label="Show credential page ${index + 1}"${index === 0 ? ' aria-current="true"' : ""}></button>`).join("");
}

function renderCard(item, index) {
  const number = String(index + 1).padStart(2, "0");
  const hidden = index >= 3 ? " hidden" : "";
  return `<article class="certification-card" data-certification-card data-category="${escapeHtml(item.category)}"${hidden}>
    <span class="certification-step" aria-hidden="true">${number}</span>
    <img class="certification-preview" src="${safeUrl(item.preview)}" alt="${escapeHtml(item.previewAlt)}" loading="lazy">
    <div class="certification-copy">
      <span class="certification-category">${escapeHtml(item.category)}</span>
      <h3>${escapeHtml(item.name)}</h3>
      <p class="certification-issuer"><span aria-hidden="true">H</span>${escapeHtml(item.issuer)}</p>
      <time datetime="${escapeHtml(item.earnedOn)}">${escapeHtml(item.earnedLabel)}</time>
      <a href="${safeUrl(item.url)}" target="_blank" rel="noopener">View credential ↗</a>
    </div>
  </article>`;
}

export function renderCertifications(certifications) {
  const items = sortCertifications(certifications.items ?? []);
  const categories = [...new Set(items.map((item) => item.category).filter(Boolean))];
  const filters = [certifications.allLabel ?? "All", ...categories].map((category, index) => `<button class="certification-filter${index === 0 ? " active" : ""}" type="button" data-certification-filter="${escapeHtml(category)}"${index === 0 ? ' aria-pressed="true"' : ' aria-pressed="false"'}>${escapeHtml(category)}</button>`).join("");
  const desktopPageCount = Math.max(1, Math.ceil(items.length / 3));
  const disabled = items.length <= 3 ? " disabled" : "";

  return `<section class="certifications-section" id="certifications" data-certifications data-all-label="${escapeHtml(certifications.allLabel ?? "All")}">
    <div class="shell section">
      ${renderSectionHeading(certifications)}
      <div class="certification-toolbar">
        <div class="certification-filters" role="group" aria-label="Filter certifications">${filters}</div>
        <div class="certification-summary"><span data-certification-count>${items.length} ${items.length === 1 ? "credential" : "credentials"}</span><span aria-hidden="true">·</span><span>${escapeHtml(certifications.sortLabel ?? "Latest first ↓")}</span></div>
        <div class="certification-arrows" aria-label="Certification pages">
          <button type="button" data-certification-prev aria-label="Show previous credentials" disabled>←</button>
          <button type="button" data-certification-next aria-label="Show next credentials"${disabled}>→</button>
        </div>
      </div>
      <div class="certification-track" data-certification-track aria-live="polite">${items.map(renderCard).join("")}</div>
      <div class="certification-pagination"><div data-certification-dots>${renderPagination(desktopPageCount)}</div><span data-certification-page-label>1 / ${desktopPageCount}</span></div>
    </div>
  </section>`;
}
