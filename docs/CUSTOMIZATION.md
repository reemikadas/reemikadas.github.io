# Portfolio customization guide

All personal information is stored in `content/portfolio.config.js`. The `index.html` file is only an application shell and should not need to change when updating portfolio content.

Start by copying `content/portfolio.config.example.js` over `content/portfolio.config.js`, then replace the sample values. Keep a backup if you are modifying an existing portfolio.

## Site settings

Update the `site` object with the browser title, search description, short brand name, brand initial, résumé path, GitHub username, and optional `navigationCta`. Leave `analyticsId` empty if Google Analytics is not required.

The configured GitHub username is also used to fetch the public repository count. If that request is unavailable, the fallback KPI value remains visible.

## Section order and visibility

`sectionOrder` controls the page and navigation order:

```js
sectionOrder: ["home", "about", "experience", "skills", "projects", "contact"]
```

Each section has an `enabled` field. Set it to `false` to remove the section from both the page and navigation.

## Home

Update the name, welcome line, introduction, location, profile image, accessible image description, and buttons. A `\n` in the name creates a deliberate line break.

Button fields:

- `label`: visible button text
- `href`: section anchor, local file, or web address
- `primary`: optional emphasized style
- `download`: optional browser download behavior
- `icon`: optional local or HTTPS image displayed before the button label

## About and KPIs

The About section accepts any number of paragraphs and KPI cards. To make one KPI display the live GitHub repository count, add:

```js
{ value: "0", label: "Public GitHub repos", dynamic: "githubRepos" }
```

`value` is the fallback displayed if the GitHub API cannot be reached.

## Experience

Add roles from newest to oldest in `experience.items`. Set `featuredCount` to the number of recent roles that should appear as illustrated cards. Every remaining role is placed inside the collapsed `Earlier Experience` disclosure.

```js
{
  period: "Jan 2024 — Present",
  focus: "Your target field",
  illustrationPanel: "right",
  role: "Role Title",
  company: "Company Name",
  highlights: ["Achievement with a measurable result."]
}
```

Set `experience.illustration.src` to a three-panel image and provide accessible alternative text. Use `left`, `center`, and `right` for the featured roles' `illustrationPanel` values. Featured cards display the first two achievements; earlier roles retain all configured achievements.

## Skills

Each skill needs a name and icon URL. The URL may be a local file such as `assets/icons/python.svg` or an HTTPS icon provider URL.

```js
{ name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" }
```

## Projects

Each project supports a category, description, thumbnail, accessible thumbnail description, tags, and multiple links. Leave out a link or use an empty URL when it is unavailable.

```js
{
  name: "Project Name",
  type: "Data Engineering · BI",
  description: "The problem, solution, and outcome.",
  thumbnail: "assets/projects/project.webp",
  thumbnailAlt: "Description of the project image",
  tags: ["Technology", "Metric", "Outcome"],
  links: [
    { label: "Open website", url: "https://example.com" },
    { label: "View repository", url: "https://github.com/username/project" }
  ]
}
```

Use the optional `projects.cta` object to add one centered button below the project grid. The built-in `github` icon is available for a repository-list link.

## Contact links and form

Supported contact icons are `email`, `phone`, `linkedin`, `github`, and `resume`. Links with empty URLs are automatically hidden.

Set `contact.hiringPrompt` to a concise question for recruiters or hiring managers. The contact introduction appears beside the links and form on desktop and stacks above them on smaller screens.

The example contact form is disabled. Enable it only after supplying a service endpoint that accepts the JSON fields `name`, `email`, `role`, and `message` and returns `{ "result": "success" }`.

Do not commit private API keys or credentials. A public form endpoint may appear in browser code, but secrets used by that endpoint must remain on the service side.

The footer reuses `site.brandMark` and `site.brandName`. Use the `footer` object to customize only the specialty and location; the current year is generated automatically.

## Assets

- Use optimized WebP images for project thumbnails when practical.
- Give each image a specific accessible description.
- Keep file names URL-safe and update their paths in the configuration.
- Replace the sample résumé rather than editing the link in `index.html`.

## Preview and publish

Run a local server from the repository root:

```bash
python3 -m http.server 8000
```

Review desktop and mobile widths, test every link, and run:

```bash
npm test
npm run check
```

Push the finished changes to `main`. The included workflow packages the required files and publishes the site through GitHub Pages.
