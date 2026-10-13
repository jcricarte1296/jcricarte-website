# JC Ricarte Website

Responsive static JC Ricarte website and its approved brand assets.

- `preview/`: editable HTML, CSS, JavaScript, and optimized media.
- `assets/`: original logos, icons, badges, mascots, backgrounds, and portraits.
- `index.html`: generated homepage served directly at the repository URL.
- `scripts/build_root.py`: builds the root homepage from the editable source.
- Root ZIP archives and PNG boards: original asset exports and brand references.

## Local preview

After editing `preview/index.html`, run `python3 scripts/build_root.py` before committing or publishing. CSS, JavaScript, and media remain in their existing directories.

Run `python3 -m http.server 8765 --bind 127.0.0.1` from this directory, then open `http://127.0.0.1:8765/`. The editable draft also remains available at `/preview/`.

The hero rotates five mascots. The connected-system workflow uses the supplied dark blueprint WebP background, white cards that alternate on desktop, and a single-column mobile timeline. Its progress line and stage highlights follow scrolling; cards remain readable without JavaScript and respect reduced motion. The organizations strip uses the 22 supplied logos, served locally, with a continuous left-to-right loop, pause control, and a static scrollable row for reduced motion. Original image URLs are recorded in `preview/media/organizations/sources.json`. No framework or package installation is required.

## Hosting

Serve this directory as a static site over HTTPS. Preserve the relative paths between `preview/` and `assets/`. `.nojekyll` supports GitHub Pages when the repository/account plan permits it.

This remains a website preview: inquiries use the existing email contact links; resources and privacy content are draft placeholders. Credential artwork does not independently verify certification or partnership status.
