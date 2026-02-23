# Product page design

Design for the Primer product detail page, informed by:

- **Arhoj** (arhoj.com): clean hero image, breadcrumb, title + variant, price, CTA, short copy, specs, trust (shipping/returns), "You may also like".
- **Yestersen** (yestersen.com): large gallery, prominent price + secondary CTA (e.g. "Negotiate"), long description, dimensions block, delivery options, vintage/unique badges.
- **Westwing** (westwing.pl): image gallery with thumbnails, variant selector (e.g. colour), price + VAT/shipping note, delivery estimate, tabbed details (Dimensions, Product info, Reviews, Shipping & returns), trust line ("Designed in …", "Free returns").

---

## 1. Page structure (sections order)

1. **Breadcrumb** – Home > Category > Product name (or Series > Product).
2. **Main content** – Two-column on desktop: **gallery left**, **buy block + short info right**.
3. **Description** – Full-width below (rich text).
4. **Optional: specs / dimensions** – If we have attributes (dimensions, material, care), show in a clear block (Arhoj/Yestersen style).
5. **Trust** – Short line or links: shipping, returns, payment icons (optional).
6. **Creator** – Keep existing creator block when present.
7. **Related** – "You may also like" / "More in this series" (already partially there).

---

## 2. Layout (desktop)

- **Grid**: 12 columns, max-width container, consistent horizontal padding.
- **Gallery**: spans ~7 columns; sticky or at least aligned to top so it stays in view on scroll.
- **Sidebar**: spans ~5 columns; contains title, price, short description, primary CTA, optional variant/size, trust snippet.
- **Below fold**: description and specs full width (e.g. 8–10 columns centered or full), then creator, then related products.

---

## 3. Components (aligned with current codebase)

| Area                  | Current                                                        | Design direction                                                                                                                                          |
| --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Breadcrumb**        | Not present                                                    | Add above main grid: `[lang]` > products > category (and optional series) > product name. Use existing route structure.                                   |
| **Gallery**           | `ProductMedia` + `ImageSlider` (inline + thumbnails, lightbox) | Keep. Ensure thumbnails visible (Westwing/Arhoj style) and main image has clear aspect ratio (e.g. 1:1 or 4:5). Sticky on desktop.                        |
| **Title**             | `ProductSide`: H1 + price + short description                  | Keep H1; add optional subtitle/variant (e.g. "Pink & Yellow Mix") if we have variants.                                                                    |
| **Price**             | Single `retailPrice`                                           | Show prominent; optional "VAT included" / "ex. shipping" line if needed (Westwing style).                                                                 |
| **Short description** | In `ProductSide`                                               | Keep; consider 2–4 lines max, then "Read more" or scroll to full description.                                                                             |
| **CTA**               | Not in current view                                            | Add "Add to basket" primary button; optional "Save / Wishlist" secondary (Arhoj).                                                                         |
| **Description**       | `ProductDescription` (BlocksRenderer)                          | Keep; full width below fold, optional collapsible "Product details" (Westwing) or always expanded (Arhoj).                                                |
| **Specs**             | Not present                                                    | If backend adds dimensions/material/care: small "Specs" or "Details" block under description (Arhoj "Approx. 9.75 x 1cm", "Microwave & dishwasher safe"). |
| **Trust**             | Not present                                                    | One line: "Shipping & returns" link; optional payment icons in footer.                                                                                    |
| **Creator**           | `CreatorThumbnail`                                             | Keep; full width block after description.                                                                                                                 |
| **Related**           | Series list on same page                                       | Keep; optionally add "You may also like" heading and same product card component as elsewhere.                                                            |

---

## 4. Visual and UX notes

- **Typography**: Keep existing H1 for product name; price large and readable; short description one size below.
- **Spacing**: Consistent vertical rhythm (e.g. 6–8 spacing units between sections); sidebar sections clearly separated.
- **Mobile**: Single column: breadcrumb → gallery (thumbnails below or scroll) → title, price, CTA, short description → description → specs → creator → related. No sticky sidebar.
- **Accessibility**: Breadcrumb in `<nav aria-label="Breadcrumb">`; gallery with alt text; CTA and variant controls focusable and labeled.

---

## 5. Data and future extensions

- **Existing**: `name`, `description`, `shortDescription`, `retailPrice`, `media`, `creator`, `category`, `series` – enough for this layout.
- **Optional later**: Variants (e.g. colour), dimensions (w/h/d), material, care text, badges ("Limited", "Vintage") – can be added to `Product` type and rendered in "Specs" and/or sidebar.

---

## 6. Implementation checklist

- [ ] Add breadcrumb component and render on product page.
- [ ] Adjust product grid: gallery ~7 cols, sidebar ~5 cols; gallery sticky on lg.
- [ ] Add "Add to basket" (and optional "Save") in `ProductSide`.
- [ ] Optional: "Specs" block when attributes exist.
- [ ] Optional: trust line (shipping/returns) under CTA or in footer.
- [ ] Ensure "More in series" / related uses same card component and a clear heading.
- [ ] Mobile: single column, no sticky; same section order.

This keeps the current `ProductView` structure and Strapi-backed data while aligning the layout and content order with the three reference sites.
