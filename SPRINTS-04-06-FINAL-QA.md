# Sprints 4–6 Final QA

**Completed:** 2026-09-16  
**Scope:** 30 supplied live websites, project IDs 31–60

## Delivery summary

| Sprint | Projects | Unique static images | Playable MP4 videos | Video duration range | ZIP bytes | ZIP SHA-256 |
|---|---:|---:|---:|---:|---:|---|
| Sprint 4 | 10 | 119 | 10 | 23.88–40.48 s | 24,621,044 | `7f3f7c6ea780cb1d8ef342f84820fda2689e29c1be84fcd1e9851133a9b37a67` |
| Sprint 5 | 10 | 123 | 10 | 18.84–47.52 s | 22,704,692 | `0a916c9887343276fbf85ce0caf07ed43c98b93956f8cb7c7d4f16c342469867` |
| Sprint 6 | 10 | 116 | 10 | 20.08–44.20 s | 23,958,357 | `cc1f928615b5cceb9293c95cf1dc2df132c49c5f57a06122678ae71a4f5c1584` |
| **Sprints 4–6** | **30** | **358** | **30** | **18.84–47.52 s** | — | — |

The complete six-sprint library contains **713 static images and 60 playable MP4 videos across 60 projects**.

## Checks passed

- Exactly 10 documented project folders per sprint and 60 project manifests overall.
- At least 10 static images and exactly one MP4 per project.
- 713/713 static images are byte-unique across the complete six-sprint library.
- 60/60 MP4 files are byte-unique across the complete six-sprint library.
- JPEG decoding and structural dimension checks passed for every image.
- Every sprint workflow verified each MP4 as H.264, 1280×720, `yuv420`-compatible, within the allowed duration range, and fully decodable from beginning to end.
- Mobile coverage, responsive comparison, QA flow composition, descriptive filenames, project README, and project manifest checks passed.
- All three new ZIPs passed complete archive integrity checks and contain only their matching `Sprint-04/`, `Sprint-05/`, or `Sprint-06/` root.
- The combined asset-browser manifest contains all IDs 01–60 and every referenced image, video, and thumbnail exists.
- Local browser HTML and manifest requests passed.
- All six full-Sprint ZIP downloads passed through the local server.
- All 60 on-demand project ZIP downloads were generated, downloaded, and integrity-tested.
- Representative first/last individual image, video, and poster downloads passed.
- Desktop and mobile hero contact-sheet review was completed for Sprints 4–6. Transient newsletter, loyalty, and localization overlays found during review were dismissed and affected projects were recaptured before final packaging.

## Live-access notes

- Hugh McElvanna Menswear redirected ordinary automated traffic away from its supplied domain. The final capture used the official domain's indexed crawler rendering and only official live storefront pages and media.
- Pet Prestige UK returned a regional access-denied page to ordinary automated traffic. The final capture used its official indexed crawler rendering at the supplied domain and verified real catalogue, collection, and product states rather than retaining access-denied screenshots.
- These access accommodations did not introduce fabricated products, UI, text, interactions, or QA findings.

## Download packages

- `QA-Portfolio-Sprint-04-Assets.zip`
- `QA-Portfolio-Sprint-05-Assets.zip`
- `QA-Portfolio-Sprint-06-Assets.zip`

Each archive is independently downloadable and includes its sprint README plus all ten project-organized asset sets.
