# JC Ricarte Website

Responsive static JC Ricarte website and its approved brand assets.

- `preview/`: editable HTML, CSS, JavaScript, and optimized media.
- `assets/`: original logos, icons, badges, mascots, backgrounds, and portraits.
- `index.html`: generated homepage served directly at the repository URL.
- `preview/pages/`: editable Services Hub and starter service templates.
- `preview/data/services.json`: service copy, capabilities, icons, metadata, and related services.
- `services/` and the five service directories: generated pages for GitHub Pages; edit their source rather than the output.
- `scripts/build_root.py`: builds all seven routes and reuses the homepage header and footer.
- `scripts/validate_site.py`: checks page structure, links, assets, metadata, and optional HTTP delivery.
- Root ZIP archives and PNG boards: original asset exports and brand references.

## Local preview

After editing `preview/index.html`, the page templates, or service data, run `python3 scripts/build_root.py` before committing or publishing. CSS, JavaScript, and media remain in their existing directories.

Run `python3 -m http.server 8765 --bind 127.0.0.1` from this directory, then open `http://127.0.0.1:8765/`. The editable draft also remains available at `/preview/`.

The hero rotates five mascots. The connected-system workflow uses the supplied dark blueprint WebP background, white cards that alternate on desktop, and a single-column mobile timeline. Its progress line and stage highlights follow scrolling; cards remain readable without JavaScript and respect reduced motion. The organizations strip uses the 22 supplied logos, served locally, with a continuous left-to-right loop, pause control, and a static scrollable row for reduced motion. Original image URLs are recorded in `preview/media/organizations/sources.json`. No framework or package installation is required.

## Services drafts

The Services Hub and five starter pages are drafts for review:

- `/services/`
- `/seo-aeo-geo/`
- `/website-development/`
- `/gohighlevel-automation/`
- `/paid-advertising/`
- `/software-development/`

The hub uses the supplied commercial service-directory brief. The starter pages provide a service overview, capabilities, fit, related services, and inquiry actions. They are ready for expanded individual service briefs. The proof images show this website and its workflow visualization, clearly labeled as demonstrations, without client performance claims.

Contact, About, and portfolio actions lead to the existing homepage sections. Email inquiry links open an email draft; no new booking calendar, form backend, CRM handoff, or analytics implementation is included.

Run `python3 scripts/validate_site.py --base http://127.0.0.1:8765/` with the local server running. For deployment verification, pass the GitHub Pages base URL instead. Before WordPress migration, replace the GitHub Pages URLs in the new WebPage and BreadcrumbList schema with the approved production URLs and map templates, assets, and forms to their WordPress owners.

## Hosting

Serve this directory as a static site over HTTPS. Preserve the relative paths between `preview/` and `assets/`. `.nojekyll` supports GitHub Pages when the repository/account plan permits it.

This remains a website preview: inquiries use the existing email contact links; resources and privacy content are draft placeholders. Credential artwork does not independently verify certification or partnership status.
