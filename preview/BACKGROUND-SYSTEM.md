# JC Ricarte background system

Reusable decorative layers for hero, service, and CTA sections.

## Files and placement

Load `home.css`, then `blueprint.css`, then `glow.css` once. Keep `media/blueprints/` beside the stylesheets, or update the background URLs when migrating. Both SVGs are editable vector outlines with no raster dependencies.

## Dark hero example

```html
<section class="jc-hero-section jc-blueprint jc-blueprint--dark">
  <div class="jc-hero jc-container">
    <div class="jc-hero-copy">...</div>
    <div class="jc-hero-art jc-glow jc-glow--dark jc-glow--mascot">
      <div class="jc-mascot-stage">...</div>
    </div>
  </div>
</section>
```

The desktop hero uses a 45/55 text/artwork split after the column gap. `jc-glow--mascot` centers the ambient light in the artwork wrapper. It remains behind all five rotating mascots as they crossfade, and follows the wrapper when mobile stacks the artwork below the text. This local dark mascot variation peaks at 18%; mobile reduces that by 35%, to 11.7%. The image and the section are not dimmed. `jc-glow--hero` remains available for a section-wide right-centered glow.

## Light theme example

```html
<section class="jc-blueprint jc-blueprint--light jc-glow jc-glow--light jc-glow--hero">
  <div class="jc-container">...</div>
</section>
```

Use white or `#F1F5F9` as the component surface. The more visible blueprint variation uses navy strokes at 10% and teal at 14% on light backgrounds, with an 8% navy grid. Dark strokes use white at 16%, teal at 24%, and a white grid at 12%. Masks reduce density around text. Light glow peaks at 8%; the default dark glow peaks at 16% and the dark mascot variation at 18%.

## CTA example

```html
<section class="jc-final-cta jc-glow jc-glow--light jc-glow--cta jc-glow--subtle">
  <div class="jc-container">...</div>
</section>
```

The CTA preset centers the light. `jc-glow--subtle` scales the selected theme's intensity to 65%. Add `jc-blueprint jc-blueprint--light` if blueprint artwork is also needed. The local homepage FAQ section now uses this subtle centered glow.

## Custom properties

Override on the section with scoped CSS:

| Property | Meaning | Default |
| --- | --- | --- |
| `--jc-glow-color` | RGB channels | `46 125 115` (teal) |
| `--jc-glow-opacity` | Peak alpha | `.08` light / `.16` dark |
| `--jc-glow-width` | Horizontal ellipse radius | `42%` |
| `--jc-glow-height` | Vertical ellipse radius | `65%` |
| `--jc-glow-x` | Horizontal center | `76%` |
| `--jc-glow-y` | Vertical center | `50%` |
| `--jc-glow-falloff` | Transparent endpoint | `100%` |
| `--jc-glow-strength` | Intensity multiplier | `1` / `.65` subtle |

## Layers and integration

1. Section surface color.
2. Blueprint `::before`, z-index 0.
3. Glow `::after`, z-index 1.
4. Mascots, text, and controls in section content, z-index 2.

The pseudo-elements ignore pointer input and contain no accessible content. Alpha applies only to the decorations; content is not dimmed. The glow uses no animation, JavaScript, blur filter, or extra layout dimensions. Existing mascot crossfades and reduced-motion behavior remain independent.

These classes own both section pseudo-elements. If a component already uses them, apply the background classes to an outer Group. In Gutenberg, enter class names without leading dots in Advanced → Additional CSS class(es), and load shared styles once. Place actual text, artwork, and buttons inside a content Group. Verify the rendered WordPress section after migration; this is currently a local HTML implementation.
