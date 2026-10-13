# JC Ricarte | Hero Background Implementation Prompt for Codex

Inspect the existing hero section, CSS architecture, and design tokens before editing. Keep the existing five-mascot fade/rotation behavior, left-column copy, CTAs, certification badges, and current component positioning intact. Modify only the hero background styling.

Use `jc-hero-blueprint-background-1920x1080.webp` as the decorative hero background asset. Use its matching PNG as a fallback only if necessary. The artwork is a text-free deep navy (#0F2740) tech blueprint with subtle thin grid lines, ghosted website-browser and analytics-dashboard wireframes, workflow connectors, and restrained teal (#2E7D73) glow. The left half remains low-detail to protect headline and CTA contrast; the right half contains more technical decoration behind the existing rotating mascots.

Design requirements:
- Use background-size: cover; background-position: center center; no-repeat.
- Preserve responsive text readability, maintaining WCAG AA contrast.
- Keep mascots and foreground content at full opacity.
- Do not place opacity on the parent hero or fade its children.
- No extra text, logos, dashboards or icons overlaid as content.
- Keep the overlay modest on desktop, stronger on mobile if needed for contrast.
- Optimize asset loading and avoid layout shifts; honor the existing layout height.
- Do not change or recreate the existing mascots, badges, headings, buttons, or animation logic.
- Apply only localized style edits, test desktop/tablet/mobile, report changed files.

An example starting point is included in jc-hero-background.css; adapt class names to the existing project rather than duplicating components.
