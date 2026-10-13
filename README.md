# JC Ricarte Website

Responsive static JC Ricarte website and its approved brand assets.

- `preview/`: editable HTML, CSS, JavaScript, and optimized media.
- `assets/`: original logos, icons, badges, mascots, backgrounds, and portraits.
- `index.html`: redirects the root URL to the website in `preview/`.
- Root ZIP archives and PNG boards: original asset exports and brand references.

## Local preview

Run `python3 -m http.server 8765 --bind 127.0.0.1` from this directory, then open `http://127.0.0.1:8765/preview/`.

The hero rotates five mascots. The connected-system diagram adapts to desktop, tablet, and mobile, with accessible reduced-motion support. No framework or package installation is required.

## Hosting

Serve this directory as a static site over HTTPS. Preserve the relative paths between `preview/` and `assets/`. `.nojekyll` supports GitHub Pages when the repository/account plan permits it.

This remains a website preview: inquiries use the existing email contact links; resources and privacy content are draft placeholders. Credential artwork does not independently verify certification or partnership status.
