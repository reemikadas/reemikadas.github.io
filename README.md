# Reemika Das — Portfolio Website

[![Deploy portfolio to GitHub Pages](https://github.com/reemikadas/reemikadas.github.io/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/reemikadas/reemikadas.github.io/actions/workflows/deploy-pages.yml)

A responsive, configuration-driven portfolio showcasing my work across applied AI, data science, business intelligence, and data engineering.

**[View the live portfolio →](https://reemikadas.github.io/)**

## What the portfolio includes

- A focused home page with profile, positioning, and résumé access
- Career introduction and dynamically updated public GitHub repository count
- Professional experience, technical skills, and featured project sections
- Project website and repository links, including the SQL Challenge Journal
- Accessible navigation, keyboard focus states, responsive layouts, and descriptive image text
- A contact area with icon tooltips and an optional message form
- Automatic GitHub Pages deployment from `main`

## Featured projects

| Project | Focus | Links |
| --- | --- | --- |
| SQL Challenge Journal | SQL learning and publishing | [Website](https://sql-challenge-publisher.das-reemika.chatgpt.site/) · [Repository](https://github.com/reemikadas/SQL-Challenge-Journal) |
| Uber vs Lyft Fare Analytics Platform | Data engineering, BI, and machine learning | [Repository](https://github.com/reemikadas/uber-lyft-fare-analytics-platform) |
| HealthMate | Conversational RAG and evaluation | [Repository](https://github.com/reemikadas/HealthMate_AI_Fitness_Nutrition_Guide) |
| IdeaCourt | Evidence-first agentic AI | [Repository](https://github.com/reemikadas/IdeaCourt) |

## Use this portfolio as a template

The layout is reusable. Personal content is separate from the HTML, so a new owner does not need to edit `index.html`.

1. Select **Use this template** on GitHub, then choose **Create a new repository**.
2. Name the repository `your-github-username.github.io` for a personal GitHub Pages site.
3. Replace `content/portfolio.config.js` with a copy of `content/portfolio.config.example.js`.
4. Update the sample values with your name, biography, experience, skills, projects, links, and target roles.
5. Add your profile image, résumé, project thumbnails, and any local skill icons.
6. Preview the site locally and push the changes to `main`.

The configuration supports:

- Reordering sections through `sectionOrder`
- Hiding any section with `enabled: false`
- Adding any number of roles, skills, projects, tags, and links
- Fetching the public repository count for the configured GitHub username
- Optional Google Analytics and contact-form integrations

See the complete [customization guide](docs/CUSTOMIZATION.md) and the commented [example configuration](content/portfolio.config.example.js).

## Run locally

No framework or dependency installation is required. ES modules must be served over HTTP rather than opened directly from the filesystem.

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

To run the lightweight validation suite:

```bash
npm test
npm run check
```

## Repository structure

```text
.
├── index.html                         # Stable application shell
├── content/
│   ├── portfolio.config.js            # Live portfolio content
│   └── portfolio.config.example.js    # Neutral starter content
├── sections/                          # Reusable section templates
│   ├── home.js
│   ├── about.js
│   ├── experience.js
│   ├── skills.js
│   ├── projects.js
│   └── contact.js
├── js/                                # Rendering and page behavior
├── assets/                            # Styles and project images
├── docs/CUSTOMIZATION.md              # Field-by-field setup guide
└── .github/workflows/deploy-pages.yml # Automatic Pages deployment
```

## Deployment

Every push to `main` runs the GitHub Actions workflow and deploys the packaged static site to GitHub Pages. Relative asset paths allow the same architecture to work locally and on Pages.

## Connect

- [Portfolio](https://reemikadas.github.io/)
- [LinkedIn](https://www.linkedin.com/in/reemikadas)
- [GitHub](https://github.com/reemikadas)

