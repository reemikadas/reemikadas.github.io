import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
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
});

test("configured text is escaped and unsafe URLs are rejected", () => {
  assert.equal(escapeHtml('<script>alert("x")</script>'), "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;");
  assert.equal(safeUrl("javascript:alert(1)"), "#");
  assert.equal(safeUrl("#projects"), "#projects");
  assert.equal(safeUrl("assets/profile.webp"), "assets/profile.webp");
});

test("all live local images and documents exist", () => {
  const paths = [
    portfolio.site.resume,
    portfolio.sections.home.profileImage,
    ...portfolio.sections.projects.items.map((project) => project.thumbnail)
  ];
  for (const path of paths) assert.ok(existsSync(path), `Missing configured asset: ${path}`);
});
