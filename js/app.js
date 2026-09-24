import portfolio from "../content/portfolio.config.js";
import { escapeHtml, safeUrl } from "./render.js";
import { renderHome } from "../sections/home.js";
import { renderAbout } from "../sections/about.js";
import { renderExperience } from "../sections/experience.js";
import { renderSkills } from "../sections/skills.js";
import { renderProjects } from "../sections/projects.js";
import { renderContact } from "../sections/contact.js";

const renderers = {
  home: renderHome,
  about: renderAbout,
  experience: renderExperience,
  skills: renderSkills,
  projects: renderProjects,
  contact: renderContact
};

function enabledSections() {
  return portfolio.sectionOrder.filter((name) => portfolio.sections[name]?.enabled && renderers[name]);
}

function renderNavigation(sectionNames) {
  const links = sectionNames.filter((name) => portfolio.navigation[name]).map((name) => `<a href="#${escapeHtml(name)}">${escapeHtml(portfolio.navigation[name])}</a>`).join("");
  const navigationCta = portfolio.site.navigationCta
    ? `<a class="nav-cta" href="${safeUrl(portfolio.site.navigationCta.href)}">${escapeHtml(portfolio.site.navigationCta.label)}</a>`
    : "";

  return `<header class="site-header"><nav class="nav" aria-label="Primary navigation">
    <a class="brand" href="#${escapeHtml(sectionNames[0] ?? "main")}"><span class="brand-mark">${escapeHtml(portfolio.site.brandMark)}</span><span>${escapeHtml(portfolio.site.brandName)}</span></a>
    <button class="menu-button" id="menuButton" type="button" aria-expanded="false" aria-controls="navLinks">Menu</button>
    <div class="nav-links" id="navLinks">${links}${navigationCta}</div>
  </nav></header>`;
}

function renderPortfolio() {
  const sectionNames = enabledSections();
  const sections = sectionNames.map((name) => renderers[name](portfolio.sections[name])).join("");
  const root = document.getElementById("portfolio-root");

  document.title = portfolio.site.title;
  document.querySelector('meta[name="description"]').setAttribute("content", portfolio.site.description);
  root.innerHTML = `${renderNavigation(sectionNames)}<main id="main">${sections}</main><footer>© <span id="year"></span> ${escapeHtml(portfolio.footer)}</footer>`;
}

function bindNavigation() {
  const menuButton = document.getElementById("menuButton");
  const navLinks = document.getElementById("navLinks");
  if (!menuButton || !navLinks) return;

  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));
}

function updateGithubRepositoryCount() {
  const repoCount = document.getElementById("repoCount");
  const username = portfolio.site.githubUsername;
  if (!repoCount || !username) return;

  fetch(`https://api.github.com/users/${encodeURIComponent(username)}`)
    .then((response) => response.ok ? response.json() : Promise.reject(new Error("GitHub profile request failed")))
    .then((profile) => {
      if (Number.isInteger(profile.public_repos)) repoCount.textContent = profile.public_repos;
    })
    .catch(() => {});
}

function bindContactForm() {
  const form = document.getElementById("connectForm");
  const formConfig = portfolio.sections.contact?.form;
  if (!form || !formConfig?.endpoint) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = document.getElementById("connectSubmitBtn");
    const success = document.getElementById("connectSuccess");
    const error = document.getElementById("connectError");
    success.classList.remove("show");
    error.classList.remove("show");
    button.disabled = true;
    button.textContent = "Sending…";

    try {
      const response = await fetch(formConfig.endpoint, {
        method: "POST",
        body: JSON.stringify({
          name: document.getElementById("cf-name").value.trim(),
          email: document.getElementById("cf-email").value.trim(),
          role: document.getElementById("cf-role").value.trim(),
          message: document.getElementById("cf-message").value.trim()
        })
      });
      const result = await response.json();
      if (result.result !== "success") throw new Error("Submission failed");
      success.classList.add("show");
      form.reset();
    } catch (_) {
      error.classList.add("show");
    } finally {
      button.disabled = false;
      button.textContent = formConfig.buttonLabel;
    }
  });
}

function enableAnalytics() {
  const analyticsId = portfolio.site.analyticsId?.trim();
  if (!analyticsId) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`;
  document.head.append(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", analyticsId);
}

try {
  renderPortfolio();
  bindNavigation();
  updateGithubRepositoryCount();
  bindContactForm();
  enableAnalytics();
  document.getElementById("year").textContent = new Date().getFullYear();
} catch (error) {
  document.getElementById("portfolio-root").innerHTML = '<main class="loading-shell" id="main"><h1>Portfolio unavailable</h1><p>Check the configuration file and reload the page.</p></main>';
  console.error(error);
}
