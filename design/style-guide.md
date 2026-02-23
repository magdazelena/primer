# Product page – local style guide

Derived from `apps/frontend/src/app/[lang]/globals.css`. Use these tokens in Pencil and in code for consistency.

## Colors (RGB components)

| Token            | R    | G    | B   | Usage                          |
|------------------|------|------|-----|--------------------------------|
| `--color-dark`   | 24   | 83   | 66  | Primary text, headings, HR, borders (`#185342`) |
| `--color-light`  | 255  | 255  | 255 | Backgrounds, primary button text |
| `--color-accentBright` | 235 | 182 | 86  | Accent highlight (`#EBB656`)   |
| `--color-accentDark`   | 217 | 102 | 78  | Links, primary CTA, rich-text links (`#D9664E`) |

In CSS use: `rgb(var(--color-dark))`, `rgb(var(--color-accentDark))`, etc.

## Layout

| Token            | Value   | Usage                |
|------------------|---------|----------------------|
| `--menu-height`  | 6rem    | Nav height           |
| `--border-radius`| 2px (@theme) / 4px (:root) | Buttons, cards, images, inputs |

## Typography

| Token / class   | Value                     | Usage                    |
|-----------------|---------------------------|--------------------------|
| `--font-body`   | "Roboto", sans-serif      | Body, labels, UI         |
| `--font-display`| "Playfair Display", serif | Headings (H1, section titles) |

Load via Google Fonts (see `@font-face` in globals.css).

## Links

- Default: `color: rgb(var(--color-accentDark))`
- Hover: same color at 0.5 opacity, `text-decoration: underline`
- Active/visited: same as default

## Buttons

- **Base**: `padding 0.5rem 1rem`, `border-radius: var(--border-radius)`, `border-width: 2px`.
- **Primary**: background and border `rgb(var(--color-accentDark))`, text `rgb(var(--color-light))`. Hover: accentDark at 0.7 opacity.
- **Secondary**: background `rgb(var(--color-light))`, text `rgb(var(--color-dark))`. Hover: light at 0.7 opacity.

## HR (divider)

- `margin: 2rem 0`, `height: 2px`, `background: rgb(var(--color-dark))`, no border.

## Rich text (`.rich-text`)

- Headings: `color: rgb(var(--color-dark))`, bold; sizes from `--text-3xl` (h1/h2) down to `--text-base` (h6).
- Links: same as Links above.
- Blockquote: `border-left: 4px solid rgb(var(--color-accentDark))`, padding left/top/bottom.
- Tables: border `rgb(var(--color-accentDark))`; th background accentDark, td borders same.

## Product page layout (grid)

- **Container**: 1 column mobile; 3 columns from `lg`; gap `0.5rem` / `1rem` at lg; `pb-10`; text color dark.
- **Gallery (ProductMedia)**: `col-span-12 lg:col-span-2`, `space-y-6`.
- **Side (ProductSide)**: `col-span-12 lg:col-span-2`, `space-y-6`; H1 `text-5xl font-bold leading-tight`, price in `h4`, short description below.
- **Description**: `col-span-12`, `lg:px-10`, divider above, `.rich-text` content.
- **Creator**: `col-span-12`.
