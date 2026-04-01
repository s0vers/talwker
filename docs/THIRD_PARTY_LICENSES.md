# Third-party licenses

This project includes code and dependencies distributed under open-source licenses. Retain this notice with copies of the project where required by those licenses.

This document is for attribution and convenience; it is not legal advice.

## Magic UI (MIT)

**Source:** [magicuidesign/magicui](https://github.com/magicuidesign/magicui)  
**License:** [MIT](https://github.com/magicuidesign/magicui/blob/main/LICENSE.md)

Components initially added from the Magic UI registry (see `components.json`) include:

| Path | Notes |
|------|--------|
| `src/components/ui/dotted-map.tsx` | **Substantially extended** in this repo (routes, grid, motion, dot variance, hub spokes, etc.); core layout still uses `svg-dotted-map` as in the upstream pattern |

`src/components/ui/highlighter.tsx` follows the Magic UI pattern (`rough-notation` + Motion `useInView`) with **Talkwer-specific** timing, stroke weight, padding, and reduced-motion handling.

## rough-notation (MIT)

**Package:** `rough-notation` (see `package.json`)  
**License:** MIT — see `node_modules/rough-notation/LICENSE` after install  

Used by `src/components/ui/highlighter.tsx` for hand-drawn highlights and underlines.

Copyright and permission notices for Magic UI apply to the corresponding source files and derivatives.

## svg-dotted-map (MIT)

**Package:** `svg-dotted-map` (see `package.json`)  
**Repository:** [thejessewinton/svg-dotted-map](https://github.com/thejessewinton/svg-dotted-map)  
**License:** MIT — see `node_modules/svg-dotted-map/LICENSE` after install

Used by `src/components/ui/dotted-map.tsx` via `createMap` / `addMarkers` for projected land dots and marker positions.

## Full dependency license texts

Install dependencies (`pnpm install`), then inspect `node_modules/<package>/LICENSE` (or `LICENSE.md`) for each package. For SPDX metadata, many packages also declare `"license"` in their `package.json`.
