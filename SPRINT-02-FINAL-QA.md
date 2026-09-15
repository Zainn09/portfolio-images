# Sprint 2 Final QA Report

**Date:** 2026-09-16  
**Scope:** Projects 11–20 only  
**Result:** Passed

## Inventory

| # | Project | Static images | MP4 | Duration |
|---:|---|---:|---:|---:|
| 11 | Glo by Glen Skin | 12 | 1 | 17.76 s |
| 12 | Funky Flickr Boyz Gear | 11 | 1 | 34.28 s |
| 13 | My Rug World | 13 | 1 | 35.12 s |
| 14 | Gorgeous Alpacas | 12 | 1 | 25.60 s |
| 15 | The Bread Essentials | 13 | 1 | 18.56 s |
| 16 | Something Pretty Floral | 11 | 1 | 34.44 s |
| 17 | London Flower Academy | 10 | 1 | 18.64 s |
| 18 | Monsoon Flowers | 12 | 1 | 33.76 s |
| 19 | ElectroCity Bikes | 12 | 1 | 23.12 s |
| 20 | Moor Body Care | 13 | 1 | 22.60 s |
| **Total** | **10 projects** | **119** | **10** | **17.76–35.12 s** |

## Validation results

- All 10 expected project folders exist under `QA-PORTFOLIO-ASSETS/Sprint-02/`.
- Every project contains 10 or more static JPEGs, one MP4, one video thumbnail, a README, and an asset manifest.
- SHA-256 comparison confirmed all **119 static images are byte-unique**.
- JPEG structure and dimensions passed for all static images and thumbnails.
- Every project includes a mobile homepage hero, at least two additional mobile-oriented visuals, and a responsive or interaction visual.
- Visual spot-checks of all 10 desktop hero captures confirmed recognizable live-site branding and project-specific content.
- Filename-prefix and lowercase descriptive naming checks passed for projects 11–20.
- All 10 MP4s contain H.264/AVC video at 1280 × 720. Durations are within the requested range.
- Each MP4 passed `ffprobe` metadata validation and a complete `ffmpeg` decode in GitHub Actions run `35017074294`; the run completed successfully.
- Project READMEs document unavailable live routes and rejected exact duplicates rather than substituting fabricated content or defect claims.

## Archive and download QA

- `QA-Portfolio-Sprint-02-Assets.zip` passed Python ZIP CRC/integrity validation.
- Archive size: **24,347,930 bytes**.
- Archive entries: **160**, all rooted under `Sprint-02/`.
- Archive SHA-256: `281ea70da04a2585d5b06c6f97204e55f9b3ba9d7f3eea65085132d5c8f78846`.
- The combined browser manifest contains **20 projects, 239 images, and 20 videos** across Sprints 1 and 2.
- Browser page and manifest requests returned HTTP 200.
- The complete Sprint 2 archive downloaded successfully and matched the repository file size.
- All 10 on-demand Sprint 2 project ZIP endpoints returned valid, CRC-clean archives.
- Individual Sprint 2 image and MP4 downloads returned the complete source files.

## Delivery decision

Sprint 2 meets the requested image, mobile/responsive, playable-video, naming, organization, archive, browser, and download criteria. Sprint 1 remains intact. No Sprint 3 work was started.
