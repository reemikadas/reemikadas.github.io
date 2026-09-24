import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import portfolio from "../content/portfolio.config.js";
import example from "../content/portfolio.config.example.js";
import { escapeHtml, safeUrl } from "../js/render.js";
import { renderHome } from "../sections/home.js";
import { renderAbout } from "../sections/about.js";
import { renderExperience } from "../sections/experience.js";
import { renderSkills } from "../sections/skills.js";
import { renderProjects } from "../sections/projects.js";
import { renderContact } from "../sections/contact.js";

const renderers = { home: renderHome, about: renderAbout, experience: renderExperience, skills: renderSkills, projects: renderProjects, contact: renderContact };

test("live and example configurations define every supported section", () => {
  for (const config of [portfolio, example]) {
    assert.deepEqual(config.sectionOrder, Object.keys(renderers));
    for (const section of config.sectionOrder) assert.ok(config.sections[section]);
  }
});

test("every enabled live section renders its expected anchor", () => {
  for (const name of portfolio.sectionOrder) {
    const html = renderers[name](portfolio.sections[name]);
    assert.match(html, new RegExp(`id="${name}"`));
    assert.ok(html.length > 100);
  }
});

test("project renderer includes website and repository links", () => {
  const html = renderProjects(portfolio.sections.projects);
  assert.match(html, /SQL Challenge Journal/);
  assert.match(html, /Open website/);
  assert.match(html, /View repository/);
  assert.match(html, /View All Repositories/);
  assert.match(html, /github\.com\/reemikadas/);
});

test("experience highlights three target-aligned roles and hides earlier roles in a disclosure", () => {
  const html = renderExperience(portfolio.sections.experience);
  assert.match(html, /experience-featured/);
  assert.match(html, /assets\/experience\/career-roles-reemika\.webp/);
  assert.ok(html.indexOf("Process Executive MIS") < html.indexOf("Data Scientist Practicum"));
  assert.ok(html.indexOf("Data Scientist Practicum") < html.indexOf("Research Assistant"));
  assert.match(html, /<details class="earlier-experience">/);
  assert.match(html, /<summary[\s\S]*Earlier Experience[\s\S]*Credit Risk Analyst[\s\S]*Account Assistant/);
});

test("live configuration contains the requested navigation and content labels", () => {
  assert.equal(portfolio.site.brandName, "Reemika S Das");
  assert.equal(portfolio.navigation.contact, "");
  assert.deepEqual(portfolio.site.navigationCta, { label: "Let's Connect", href: "#contact" });
  assert.equal(portfolio.site.brandMark, "RD");
  assert.equal(portfolio.sections.home.eyebrow, "Open to Data Analytics and AI Engineering opportunities");
  assert.equal(portfolio.sections.home.location, "📍 SAN JOSE, CALIFORNIA");
  assert.equal(portfolio.sections.home.actions[0].label, "Explore my work ↓");
  assert.equal(portfolio.sections.home.actions[1].label, "Email Reemika");
  assert.equal(portfolio.sections.home.actions[1].icon, "assets/icons/gmail.svg");
  assert.deepEqual(portfolio.footer, {
    specialty: "Data Analytics · Applied AI Engineer",
    location: "San Jose, California"
  });
  assert.equal(portfolio.sections.experience.items[2].role, "Process Executive MIS");
  assert.ok(portfolio.sections.skills.items.some((skill) => skill.name === "PostgreSQL"));
});

test("contact uses a two-column hiring call to action without the old opportunity line", () => {
  const html = renderContact(portfolio.sections.contact);
  assert.match(html, /Hiring for Data Analytics or Applied AI Engineering\?/);
  assert.match(html, /contact-primary/);
  assert.match(html, /contact-secondary/);
  assert.match(html, /contact-primary[\s\S]*Let’s turn a hard problem[\s\S]*contact-links[\s\S]*contact-secondary[\s\S]*connectForm/);
  assert.doesNotMatch(html, /Looking for opportunities/);
});

test("the browser tab uses the RD favicon", () => {
  const html = readFileSync("index.html", "utf8");
  assert.match(html, /rel="icon" href="assets\/icons\/rd\.svg"/);
});

test("availability text uses the portfolio blue while the status dot keeps its active color", () => {
  const css = readFileSync("assets/styles.css", "utf8");
  assert.match(css, /\.hero \.eyebrow \{[^}]*color: var\(--blue\)/);
  assert.match(css, /\.hero \.eyebrow::before \{[^}]*background: var\(--teal\)/);
});

test("home renderer includes the configured email icon", () => {
  const html = renderHome(portfolio.sections.home);
  assert.match(html, /Email Reemika/);
  assert.match(html, /gmail/i);
});

test("configured text is escaped and unsafe URLs are rejected", () => {
  assert.equal(escapeHtml('<script>alert("x")</script>'), "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;");
  assert.equal(safeUrl("javascript:alert(1)"), "#");
  assert.equal(safeUrl("#projects"), "#projects");
  assert.equal(safeUrl("assets/profile.webp"), "assets/profile.webp");
});

test("all live local images and documents exist", () => {
  const paths = [
    "assets/icons/rd.svg",
    portfolio.sections.experience.illustration.src,
    portfolio.site.resume,
    portfolio.sections.home.profileImage,
    ...portfolio.sections.projects.items.map((project) => project.thumbnail)
  ];
  for (const path of paths) assert.ok(existsSync(path), `Missing configured asset: ${path}`);
});
