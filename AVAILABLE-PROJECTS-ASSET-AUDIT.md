# Available Projects — Complete Asset Audit

**Date:** 2026-09-16  
**Scope:** Project IDs 01–94, excluding unavailable project 62 (Rahiza)  
**Result:** Passed — no image, poster, MP4, manifest, README, browser entry, or project download is missing for any of the 93 available projects.

> Sections below the Sprint 11 addendum describe the original 01–94 audit. The Sprint 11 addendum records the later 95–99 delivery.

## Inventory and project structure

- Expected and present project folders: **93 / 93** (IDs 01–61 and 63–94).
- Static images represented by project manifests: **1,109**.
- MP4 videos: **93** — exactly one per available project.
- Video posters: **93** — exactly one per available project.
- Every project has at least 10 distinct static images, at least two mobile-oriented visuals, a project README, and an asset manifest.
- Every manifest image, video, and poster path resolves to a real repository file.
- SHA-256 comparison found **1,109 / 1,109 byte-unique static images** and **93 / 93 byte-unique MP4 files**.
- The combined asset-browser manifest contains the same 93-project ID set and reports the matching **1,109 images / 93 videos** totals.

## Media decoding

- **1,202 / 1,202 JPEG files** fully decoded: 1,109 static images plus 93 video posters.
- **93 / 93 MP4 files** fully decoded from beginning to end, not merely metadata-probed.
- Every MP4 contains H.264 video at **1280 × 720**.
- Video duration range: **10.60–47.52 seconds**.
- Every decoded video produced real frames; no truncated or zero-frame MP4 was found.
- Sprint 1’s legacy manifest schema does not duplicate the later `duration` and `codec` fields, but all ten files retain purpose/path/poster records and passed direct duration, codec, resolution, frame-count, and complete-decode checks in this audit.

## Browser and download validation

- Browser HTML and combined manifest requests return HTTP 200 through the local asset server.
- **93 / 93 on-demand project ZIP downloads** returned valid, CRC-clean archives.
- Every downloaded project archive contained at least 10 static images and exactly one MP4.
- The project-download test transferred and checked **202.9 MiB** of generated ZIP data.
- Nine complete Sprint archives are present for Sprints 01–06 and 08–10. Every archive passed CRC/integrity validation and contains only its corresponding `Sprint-0N/` root.
- Sprint 07 intentionally has no final archive because Rahiza remains unavailable; its other nine project folders and nine MP4s are present and passed this audit.

## Corrective finding from this audit

The initial Wisconic set contained three technically decodable but visually incomplete desktop loading frames. Those frames also weakened its responsive/flow compositions and MP4. They were not retained:

- Replaced the three incomplete frames with current authentic media embedded by the live Wisconic website from its official Webflow CDN.
- Recorded each exact official source URL in the project manifest and README.
- Rebuilt the responsive comparison and user-flow composition.
- Rebuilt the MP4 as a purposeful visual sequence using the repaired authentic coverage.
- Re-ran image uniqueness, package, complete MP4 decode, browser, and download QA successfully in GitHub Actions run `35136181385`.

The repaired Sprint 9 archive is `QA-Portfolio-Sprint-09-Assets.zip` (22,515,016 bytes; SHA-256 `811b5ae212c43b530dccce031601d6914b49484c3bc0f329a7905bc1dae97a5d`).

## Remaining exception

Rahiza (ID 62) is the only missing project. Its public domains and DNS-declared Shopify origin return unavailable-store states, while product and sitemap endpoints return `Not Found`. No inaccessible-state screenshots, cached former products, or fabricated storefront material are accepted as Rahiza coverage.

## Sprint 11 addendum — project IDs 95–99

**Date:** 2026-09-20  
**Scope:** Project IDs 95–99, excluding unavailable project 98 (Vintage Art Garage)  
**Result:** Passed — projects 95, 96, 97, and 99 each delivered a complete, verified asset set.

### Inventory and project structure

- Available projects with assets: **4 / 4** publicly reachable storefronts (IDs 95, 96, 97, 99); ID 98 documents a password-protected storefront and contributes no assets.
- Static images represented by project manifests: **57** (Prime Baby Gear 15, Ollie Burwell 15, Nokoluxe Living 12, Paw by Four 15).
- MP4 videos: **4** — exactly one per available project, each H.264 at 1280 × 720 with yuv420p pixel format.
- Video posters: **4** — exactly one per available project.
- Every available project has at least 10 distinct static images, at least two mobile-oriented visuals, a responsive desktop/mobile comparison, a three-state QA user-flow composition, a project README, and an asset manifest.
- SHA-256 comparison found **65 / 65 byte-unique files** across the sprint (57 images, 4 MP4 files, 4 posters); no duplicates were retained.
- `QA-Portfolio-Sprint-11-Assets.zip` is a CRC-clean archive of about 13 MiB with 75 entries rooted only at `Sprint-11/`. It is rebuilt and re-verified by the capture workflow on every run, so the archive bytes are intentionally not pinned to a single hash.
- The combined asset-browser manifest now reports **97 projects, 1,166 images, and 97 videos** across Sprints 1–11.

### Media decoding

- All 57 static images and 4 posters decode, and every MP4 passed a full beginning-to-end decode on the capture runner, not merely a metadata probe.
- Video durations: 28.80 s, 29.20 s, 29.44 s, and 37.24 s — all within the 8–50 s delivery window.

### Browser and download validation

- Browser HTML, the combined manifest, and the Sprint 11 ZIP all return HTTP 200 through the local asset server.
- All four on-demand project ZIP downloads returned valid, CRC-clean archives, each containing at least 10 static images and exactly one MP4.
- The asset browser and download server were extended to resolve project IDs above 94 and the Sprint 11 folder layout.

### Remaining exceptions

- **Rahiza (ID 62)** — unchanged: its public domains and DNS-declared Shopify origin return unavailable-store states, while product and sitemap endpoints return `Not Found`.
- **Vintage Art Garage (ID 98)** — the storefront is password-protected while the owner is travelling. Every storefront route redirects to `/password`, the DNS-declared Shopify origin reports `Store unavailable`, and the sitemap and `products.json` endpoints return no storefront data. No inaccessible-state, password-page, cached, or previously indexed material is accepted as coverage, so the project carries a documentation folder only and is re-capturable once the storefront is public again.
