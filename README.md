# JC Ricarte Website

Responsive static website for **JC Ricarte – Full-Funnel Growth Systems Builder** and its approved brand assets.

- `preview/`: editable HTML, CSS, JavaScript, and optimized media.
- `assets/`: original logos, icons, badges, mascots, backgrounds, and portraits.
- `index.html`: generated homepage served directly at the repository URL.
- `preview/pages/`: editable service-page templates. Previous About and Services Hub drafts are retained as unused source files.
- `preview/data/services.json`: service copy, capabilities, icons, metadata, and related services.
- The five service directories: generated pages for GitHub Pages; edit their source rather than the output.
- `scripts/build_root.py`: builds six routes (homepage plus five services) and reuses the homepage header and footer.
- `scripts/validate_site.py`: checks page structure, links, assets, metadata, and optional HTTP delivery.
- Root ZIP archives and PNG boards: original asset exports and brand references.

## Local preview

After editing `preview/index.html`, the page templates, or service data, run `python3 scripts/build_root.py` before committing or publishing. CSS, JavaScript, and media remain in their existing directories.

Run `python3 -m http.server 8765 --bind 127.0.0.1` from this directory, then open `http://127.0.0.1:8765/`. The editable draft also remains available at `/preview/`.

The hero rotates five mascots. The connected-system workflow uses the shared dark SVG/CSS blueprint background, white cards that alternate on desktop, and a single-column mobile timeline. Its progress line and stage highlights follow scrolling; cards remain readable without JavaScript and respect reduced motion. The organizations strip uses the 22 supplied logos, served locally, with a continuous left-to-right loop, pause on hover or keyboard focus, and a static scrollable row for reduced motion. Original image URLs are recorded in `preview/media/organizations/sources.json`. No framework or package installation is required.

## Services drafts

The five individual service pages are drafts for review:

- `/seo-aeo-geo/`
- `/website-development/`
- `/gohighlevel-automation/`
- `/paid-advertising/`
- `/software-development/`

Navigation displays the five service links directly, plus a Contact Me button. The service links collapse into a single mobile menu on smaller screens; there is no Services dropdown. There are no standalone Services Hub or About routes. About links lead to the existing homepage section. Earlier hub and About source drafts remain in `preview/pages/` for reference and are not generated. The shared header no longer includes the Why Hire JC link; Contact Me points to the existing homepage contact section.

Contact, About, and portfolio actions lead to the existing homepage sections. Email inquiry links open an email draft; no new booking calendar, form backend, CRM handoff, or analytics implementation is included.

Run `python3 scripts/validate_site.py --base http://127.0.0.1:8765/` with the local server running. For deployment verification, pass the GitHub Pages base URL instead. Before WordPress migration, replace the GitHub Pages URLs in the new WebPage and BreadcrumbList schema with the approved production URLs and map templates, assets, and forms to their WordPress owners.

### SEO / AEO / GEO draft

`preview/pages/seo-aeo-geo.html` overrides the generic starter template for this route. Its scoped styles live in `preview/seo.css`; SEO title and description remain in `preview/data/services.json`. Rebuild with the same command after edits.

The full page includes the supplied service scope, challenges, three project summaries, process, FAQs, portrait, and email inquiry. Project summaries remain visibly labeled as drafts: original evidence, attribution, and publication permission need verification. No audit screenshot, rankings, client identity, or numerical outcome was invented. Portfolio evidence remains a review item even when the site is published.

### Website Development draft

`preview/pages/website-development.html` expands the Website Development route. Scoped styles live in `preview/website.css`; metadata remains in `preview/data/services.json`. It includes six main content sections, a desktop/mobile demonstration of this website, and an email inquiry action. Portfolio categories remain proposed categories, not finalized project case studies. Keywords, original project evidence, ownership, permissions, and outcomes still need verification before publication.

### GoHighLevel CRM & Automation draft

`preview/pages/gohighlevel-automation.html` expands the CRM route with six main sections, five capability groups, six FAQs, and an email inquiry. It reuses the service detail layouts in `preview/website.css`; `preview/crm.css` adds the scoped workflow visual. The hero diagram is explicitly an illustrative workflow concept. Actual redacted GoHighLevel screenshots and approved project records remain pending. AI support and advanced integrations are scoped separately; email/SMS descriptions preserve the supplied consent requirements.

## Hosting

Serve this directory as a static site over HTTPS. Preserve the relative paths between `preview/` and `assets/`. `.nojekyll` supports GitHub Pages when the repository/account plan permits it.

This remains a website preview: inquiries use the existing email contact links; resources and privacy content are draft placeholders. Credential artwork does not independently verify certification or partnership status.

## Compact service pages

All five service pages have concise hero copy, four relevant platform/skills badges, and 50% less vertical section padding. Content height remains flexible for readability. `preview/service-compact.css` owns this variation; badge mappings are editable in `preview/data/service-badges.json`. Optimized additional badges live in `preview/media/service-badges/`. Source artwork remains in the supplied asset packs.

The Software Development brief is implemented in `preview/pages/software-development.html`. Its proposed portfolio examples remain drafts pending actual application evidence. Tool badge artwork does not independently verify credentials or client delivery.

The retired About draft is preserved in `preview/pages/about.html` and `preview/about.css` for future homepage work. It is not included in the generated site.

One Connected System uses the existing SVG/CSS blueprint layer in `preview/blueprint.css`, replacing the raster background. Its white cards and scroll timeline are preserved.

## Service mascots

Each service hero uses its matching existing optimized mascot in `preview/media/`. Page templates own the mapping; `preview/service-compact.css` owns the shared responsive layout and `preview/glow.css` supplies the ambient teal glow. The mascot replaces the former right-side hero visual, with text, CTAs, and badges retained. Images reserve their dimensions, stay fully opaque, and stack below content on mobile. No extra JavaScript or animation was added. Homepage mascot rotation and the map's circular profile portrait remain as approved.

## Why Choose JC overview

Why Choose JC combines centered brand copy with the existing white blueprint background and a six-service map. Desktop places three cards on each side of the circular profile. Mobile shows a compact connected map whose service pills link directly to the five service pages or homepage Work section; detail cards and duplicate journey text are hidden on mobile. The larger seated portrait and old process columns have been removed.

`preview/ownership.css` scopes the map styling. `preview/ownership.js` aligns the six SVG connections after layout, font loading and resize, and keeps keyboard focus accessible across breakpoints. The separate dark One Connected System timeline remains below this section. Motion respects reduced-motion preferences.

The hero shows the role label, five trust badges, headline, service description, and two CTAs in that order. Mobile CTAs share one row. The existing five rotating mascots are preserved.
