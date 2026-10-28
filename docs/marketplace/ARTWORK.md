# Listing artwork

The active October 6, 2026 listing uses the **B-series theme showcase**: 15
generated 3D studio scenes, composed into 17 final images. B08 supplies separate
destination, tour, and story compositions. The upload set contains exactly 15
gallery images plus a cover, 590×300 main preview, thumbnail, and description
header.

The A-series lifestyle renders and all earlier compositions are retained for
future marketing. Their inventory is archived in
`docs/marketplace/artwork-assets-a-series.json`. The active listing HTML selects
only B-series files.

## Files

- `incoming-artwork/v2/b*.png`: original selected scene PNGs, including built-in
  OpenAI generation provenance. Preserved unchanged during composition.
- `incoming-artwork/v2/generation-manifest.json`: original prompts, final
  editing prompts, source paths, reviewed surface counts, and phone revisions.
- `incoming-artwork/v2/phone-revisions/originals/` and `rejected/`: retained
  prior variants.
- `incoming-artwork/v2/captures/`: real local production viewport captures,
  full-length homepages, tablet/mobile captures, and component crops, at 2×
  device scale.
- `incoming-artwork/v2/type/`: transparent Inter headings and Simple Icons
  technology marks, rendered in code.
- `scripts/theme-showcase.json`: screenshot assignments, surface corner seeds,
  aspect/fit settings, headlines, and gallery selection.
- `docs/marketplace/listing/v2/`: full-size JPEGs, cover, main preview,
  thumbnail, contact sheet, and composition evidence. Local and gitignored.
- `public/envato/b*.jpg`: 17 description images at 1180×787. Prepared for
  hosting and excluded from the buyer ZIP.
- `docs/marketplace/artwork-assets.json`: checksummed inventory for the active
  description set.

## Rebuild the active set

Use Node 22+ and Python with Pillow and NumPy. Playwright is supplied by an
external authoring runtime; it is not a template runtime dependency. Set
`ARTWORK_NODE_MODULES` to the external node_modules directory containing
Playwright. Google Chrome must be available. Set `ARTWORK_BASE_URL` if the local
production server uses a different address.

1. `pnpm build`, then `pnpm start --port 3000`.
2. `node scripts/capture-theme-showcase.mjs`.
3. Set `ARTWORK_MANIFEST=scripts/theme-showcase.json` and
   `ARTWORK_TYPE_DIR=incoming-artwork/v2/type`; run
   `node scripts/render-listing-type.mjs`.
4. `python scripts/compose-theme-showcase.py`.
5. Review `docs/marketplace/listing/v2/contact-sheet.jpg`, the full-size JPEGs,
   and the 590×300 preview.
6. `node scripts/finalize-theme-showcase.mjs`.
7. `pnpm verify` and `pnpm check:marketplace`.

Existing page captures are retained. Remove a specific capture to refresh it.
Component crops are refreshed from the rendered pages. Full-length pages are
captured with reduced motion and a scroll pass to load all sections.

## Perspective and masking

Every page and component is projected with an eight-coefficient homography onto
its own four-corner surface. Straight screen boundaries are fitted from the
chroma pixels; manual corner seeds reconstruct the full extent of partially
occluded windows. The visible connected green region supplies the mask,
retaining rounded corners, camera holes, and foreground frame occlusion. The
evidence JSON records the final corners and capture hashes for every insert.

Generated green floor light is neutralized separately. Faint real-page
reflections use their own reflected quadrilaterals and falloff. Reflection
pixels cannot become additional screen surfaces. Full-length homepages and
irregular component slabs use containment rather than stretching or losing
content. No scene is upscaled.

## Publication state

Local composition and review do not verify deployment. Publishing, checking the
deployed description URLs, and final author approval remain pending;
`listingArtworkReviewedAt` remains unset. Originality confirmation is also a
separate submission gate.

## Preserved A-series

The old sources remain in `incoming-artwork/`, its captures/type folders,
`docs/marketplace/listing/`, and the A-prefixed files under `public/envato/`.
The earlier `capture-listing.mjs`, `compose-listing.py`, and
`listing-artwork.json` remain available for future lifestyle marketing assets.
`finalize-listing.mjs` belongs to that earlier workflow and must not be used to
finalize the active B-series listing.
