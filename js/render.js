export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function textWithBreaks(value = "") {
  return escapeHtml(value).replaceAll("\n", "<br>");
}

export function safeUrl(value = "") {
  const url = String(value).trim();
  if (!url) return "";
  if (/^#[a-zA-Z][a-zA-Z0-9_-]*$/.test(url)) return escapeHtml(url);
  if (/^(https?:|mailto:|tel:)/i.test(url)) return escapeHtml(url);
  if (/^(?!\/\/)[a-zA-Z0-9_./-]+(?:\?[^<>]*)?$/.test(url)) return escapeHtml(url);
  return "#";
}

export function externalAttributes(url = "") {
  return /^https?:/i.test(String(url)) ? ' target="_blank" rel="noopener"' : "";
}

export function renderSectionHeading({ eyebrow, title, subtitle }) {
  return `<div class="section-heading"><div><p class="eyebrow">${escapeHtml(eyebrow)}</p><h2>${textWithBreaks(title)}</h2></div><p>${escapeHtml(subtitle)}</p></div>`;
}
