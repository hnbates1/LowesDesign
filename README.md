# Lowe's Design System

A framework-agnostic, general-purpose UI kit: design tokens, the Fellix
typeface, and a reusable component library. Values are traced to the
**TA Brand Guidelines (September 2025)** everywhere the guide defines them;
where it doesn't (spacing scale, radius, elevation, motion), this repo
layers on sensible system defaults tuned to Fellix's round, friendly
character, called out explicitly in code comments.

Open `index.html` in a browser (or serve the folder — token rendering on
the color page uses `fetch`, which needs `http://`, not `file://`) to
browse the living style guide.

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## What's in scope

This is a **general-purpose UI kit**, not a careers/hiring microsite. It
uses Lowe's brand colors, type, and a few brand motifs (the gable framing
device, the vest-badge shield shape) as optional accents — but the
component set (buttons, forms, cards, tables, nav, modals, etc.) is meant
for any product surface.

## File structure

```
tokens/
  tokens.css      CSS custom properties — the single source of truth
  tokens.json     Same values, portable (Figma / Style Dictionary / etc.)
css/
  fonts.css       @font-face declarations for all 7 Fellix weights
  base.css        Reset + base element styles built on tokens
  components.css  The component library (buttons, forms, cards, ...)
  docs.css        Layout for this style guide site only — not part of
                  the portable system, don't ship it with a consuming app
fonts/
  Fellix-*.woff2  Primary web format
  Fellix-*.ttf    Fallback / source
js/
  docs.js         Interactions for this style guide (tabs, modal, copy-
                  to-clipboard demos) — reference implementation, not a
                  required dependency of the CSS system
index.html        The style guide itself
```

## Using this in a product

Pull in four files, in order, and start writing markup with the documented
classes:

```html
<link rel="stylesheet" href="tokens/tokens.css" />
<link rel="stylesheet" href="css/fonts.css" />
<link rel="stylesheet" href="css/base.css" />
<link rel="stylesheet" href="css/components.css" />

<button class="btn btn-primary">Get started</button>
```

Nothing in `components.css` hard-codes a color, size, or radius — everything
resolves through a token. Retheming (dark mode, a rebrand, a white-label
variant) is a matter of overriding the custom properties in `tokens.css`,
not touching component code.

`tokens/tokens.json` mirrors `tokens.css` for tooling that can't read CSS
custom properties directly (Figma plugins, Style Dictionary pipelines,
native app design-token importers). Keep the two in sync by hand until a
build step is introduced to generate one from the other.

## Typography

Fellix ships in 7 static weights (Light 300 → Black 900). The brand guide
defines four approved weight-pairing "formulas" — see the Typography
section of the style guide for the full list. Don't introduce a weight
pairing outside those four on a single composition.

Brand rules encoded in `base.css`:
- Headings and body copy are always left-aligned, never centered, justified,
  or rotated.
- Sentence case for headlines/body; Title Case reserved for product names
  and taglines; full uppercase only for short CTAs, tags, and pricing —
  never a full headline or paragraph.

## Color

- **Primary palette** (`--color-ink-900` through `--color-blue-200`, plus
  white) drives all UI chrome — backgrounds, text, borders, primary
  actions.
- **Expressive palette** (greens, gold, yellow, reds) is for data
  visualization, illustration, and accenting — not for primary buttons or
  body text.
- Brand rule: Dark Blue / Blue / Light Blue may only sit on each other or
  on White, never on black — which is why there's no true black in the
  neutral scale; `--color-ink-900` is the darkest value in the system.

Always reference a **semantic token** (`--color-text-primary`,
`--color-bg-brand`, `--color-status-danger`, …) in product code, not a raw
palette value — see the Color section of the style guide for the full
mapping.

## Brand mark

`.gable-mark` is a CSS/`clip-path` reproduction of the brand guide's
documented "gable" roofline silhouette, provided for UI chrome like nav
lockups. It is **not** the official vector logo — swap in the real logo
asset for any customer-facing or trademark-sensitive placement.

## Contributing

- New tokens go in `tokens/tokens.css` **and** `tokens/tokens.json` —
  keep them in lockstep.
- New components go in `components.css`, styled only with `var(--...)`
  token references.
- Update `index.html` with a live demo + code sample for anything you add;
  an undocumented component doesn't count as shipped.
