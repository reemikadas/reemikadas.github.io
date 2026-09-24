import { escapeHtml, safeUrl, textWithBreaks } from "../js/render.js";

export function renderHome(home) {
  const actions = (home.actions ?? []).map((action) => {
    const icon = action.icon ? `<img class="button-icon" src="${safeUrl(action.icon)}" alt="" aria-hidden="true">` : "";
    return `<a class="button${action.primary ? " primary" : ""}" href="${safeUrl(action.href)}"${action.download ? " download" : ""}>${icon}${escapeHtml(action.label)}</a>`;
  }).join("");

  return `<section class="hero shell" id="home"><div class="hero-grid">
    <div class="hero-copy"><p class="eyebrow">${escapeHtml(home.eyebrow)}</p><h1>${textWithBreaks(home.name)}</h1><p class="lede"><span class="hero-intro">${escapeHtml(home.welcome)}</span> ${escapeHtml(home.introduction)}</p><div class="hero-actions">${actions}</div></div>
    <figure class="portrait-wrap" data-location="${escapeHtml(home.location)}"><img class="portrait" src="${safeUrl(home.profileImage)}" alt="${escapeHtml(home.profileImageAlt)}"></figure>
  </div></section>`;
}
