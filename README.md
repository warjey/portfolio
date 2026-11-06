# RJ Salundaga — Portfolio

Personal developer portfolio built with React 19 and Vite. No UI libraries — just React, CSS, and a few small hooks.

```bash
npm install      # first time only
npm run dev      # local development at http://localhost:5173
npm run lint     # ESLint
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

Deploying: see [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step Vercel instructions.

## Editing content

All text lives in `src/data/` — you shouldn't need to touch components to update the site.

| File | What it controls |
| --- | --- |
| `site.js` | Name, email, GitHub/LinkedIn URLs, resume file |
| `profile.js` | Hero text, profile photo, About section |
| `skills.js` | Skill groups and each skill's level (`applied`, `academic`, `learning`) |
| `projects.js` | Axioma (featured project) and additional project cards |
| `education.js` | Education timeline |
| `achievements.js` | Awards; `highlight: true` features an item at the top |
| `certifications.js` | Training and certificates |
| `navigation.js` | Navigation order and section numbering |

Empty values (like the GitHub and LinkedIn URLs in `site.js`) are hidden from the site until you fill them in.

## Adding your images and files

1. Put the file in `public/` (e.g. `public/images/projects/axioma/new-screen.jpg`).
2. Reference it in `src/data/` without `public/` and without a leading slash: `src: 'images/projects/axioma/new-screen.jpg'`.
3. For screenshots, set `ratio` to the image's real `width / height` (e.g. `'1919 / 946'`) so nothing is cropped.

| Asset | Location |
| --- | --- |
| Profile photo | `public/images/profile/rj-salundaga.jpg` |
| Axioma screenshots | `public/images/projects/axioma/` |
| Resume | `public/documents/RJ-Salundaga-Resume.pdf` (already linked from the header, hero, mobile menu, and contact section) |

Compress images before adding them (e.g. [Squoosh](https://squoosh.app)). Images below the fold load lazily.

## Additional projects

Entries in `projects` with `placeholder: true` show as quiet "Coming soon" cards. To publish a project, replace an entry with `name`, `role`, `summary`, `tech`, `thumbnail: { src, alt }`, and `links: { github, live }`, and remove `placeholder`. Add `overview` / `features` (same shape as Axioma) to give the card a **Details** button that opens the case-study dialog.

## Contact form

The form never pretends to send. It picks one of three modes automatically:

1. **Endpoint configured** — messages are POSTed as JSON (`{ name, email, subject, message }`) to `VITE_CONTACT_ENDPOINT`.
2. **No endpoint, but an email in `site.js`** — the visitor's email app opens with the message pre-filled.
3. **Neither** — the form is shown disabled with a notice.

To enable sending (for example with [Formspree](https://formspree.io)):

1. Create a form and copy its endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
2. Copy `.env.example` to `.env.local` and set `VITE_CONTACT_ENDPOINT=...`.
3. On your host (Vercel, Netlify…), add the same environment variable and redeploy.

Any service that accepts a JSON POST and returns a 2xx status works; see `src/services/contactService.js`.

## SEO

Title, description, and social-preview tags live in `index.html`. Once the site has a domain, consider making `og:image` an absolute URL (e.g. `https://your-domain/images/projects/axioma/dashboard-overview.jpg`) — some platforms require it.

## Project structure

```
src/
  components/
    layout/      Header (nav + mobile menu), Footer
    sections/    One component per page section
    projects/    FeaturedProject, ProjectCard, ProjectDetail (case study)
    ui/          Section, ImageSlot, Modal, Icon, ResumeButton, SocialLinks
  data/          All editable content
  hooks/         useActiveSection, useScrolled, useScrollLock
  services/      contactService (form delivery)
  styles/        tokens.css (colors, type, spacing), base.css
  utils/         asset paths, smooth scrolling, form validation
```

Colors, fonts and spacing are defined once in `src/styles/tokens.css`.
