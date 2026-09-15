# QA Portfolio Visual Assets — Sprints 1–2

A professional visual asset archive for an **existing QA portfolio**. This repository does not build or replace the portfolio website. Work is strictly limited to Sprint 1 and Sprint 2.

## Live progress

### Sprint 1 — Complete

<!-- SPRINT_PROGRESS_START -->

**Sprint status:** Complete  
**Completed projects:** 10 / 10  
**Latest pipeline stage:** Final inventory, media, ZIP, asset-browser, and download QA passed  
**Last updated:** 2026-09-16 01:01 PKT

| # | Project | Website | Status | Images | Videos | Notes |
|---:|---|---|---|---:|---:|---|
| 01 | Fandiem | <https://fandiem.com> | 🟢 Complete | 13 | 1 | Project and Sprint-level checks passed |
| 02 | Revived Smiles | <https://revivedsmiles.com> | 🟢 Complete | 13 | 1 | Project and Sprint-level checks passed |
| 03 | K-CAPS | <https://kcaps.com> | 🟢 Complete | 12 | 1 | Project and Sprint-level checks passed |
| 04 | Dr. Stengler | <https://drstengler.com> | 🟢 Complete | 12 | 1 | Project and Sprint-level checks passed |
| 05 | HER SHOP® | <https://hershop.com> | 🟢 Complete | 13 | 1 | Project and Sprint-level checks passed |
| 06 | The Scaff Shop | <https://thescaffshop.com> | 🟢 Complete | 11 | 1 | Project and Sprint-level checks passed |
| 07 | Maison Khloe | <https://maisonkhloe.ca> | 🟢 Complete | 12 | 1 | Project and Sprint-level checks passed |
| 08 | Summit Sheets | <https://summitsheetsbedding.com> | 🟢 Complete | 11 | 1 | Project and Sprint-level checks passed |
| 09 | Peak Scents | <https://peakscents.com> | 🟢 Complete | 12 | 1 | Project and Sprint-level checks passed |
| 10 | Green Beauty Expert | <https://greenbeautyexpert.ca> | 🟢 Complete | 11 | 1 | Project and Sprint-level checks passed |

**Current verified inventory:** 120 static images and 10 videos.  
**Required minimum:** 100 static images and 10 videos.

<!-- SPRINT_PROGRESS_END -->

### Sprint 2 — In progress

<!-- SPRINT_02_PROGRESS_START -->

**Sprint status:** In progress  
**Completed projects:** 0 / 10  
**Latest pipeline stage:** ElectroCity Bikes asset set generated and published  
**Last updated:** 2026-09-16 01:20 PKT

| # | Project | Website | Status | Images | Playable videos | Notes |
|---:|---|---|---|---:|---:|---|
| 11 | Glo by Glen Skin | <https://globyglenskin.com> | 🟡 Captured · QA pending | 12 | 1 | Project assets published; awaiting Sprint-level QA |
| 12 | Funky Flickr Boyz Gear | <https://funkyflickrboyzgear.com> | 🟡 Captured · QA pending | 11 | 1 | Project assets published; awaiting Sprint-level QA |
| 13 | My Rug World | <https://myrugworld.com> | 🟡 Captured · QA pending | 13 | 1 | Project assets published; awaiting Sprint-level QA |
| 14 | Gorgeous Alpacas | <https://gorgeousalpacas.co.uk> | 🟡 Captured · QA pending | 12 | 1 | Project assets published; awaiting Sprint-level QA |
| 15 | The Bread Essentials | <https://thebreadessentials.com> | 🟡 Captured · QA pending | 13 | 1 | Project assets published; awaiting Sprint-level QA |
| 16 | Something Pretty Floral | <https://somethingprettyfloral.com> | 🟡 Captured · QA pending | 11 | 1 | Project assets published; awaiting Sprint-level QA |
| 17 | London Flower Academy | <https://londonfloweracademy.com> | 🟡 Captured · QA pending | 10 | 1 | Project assets published; awaiting Sprint-level QA |
| 18 | Monsoon Flowers | <https://monsoonflowers.com> | 🟡 Captured · QA pending | 12 | 1 | Project assets published; awaiting Sprint-level QA |
| 19 | ElectroCity Bikes | <https://electrocitybikes.co.uk> | 🟡 Captured · QA pending | 12 | 1 | Project assets published; awaiting Sprint-level QA |
| 20 | Moor Body Care | <https://moorbodycare.co.uk> | ⚪ Pending | — | — | Moor therapy skincare |

**Current checkpoint inventory:** 106 static images and 9 playable MP4 videos.  
**Required minimum:** 100 unique static images and 10 verified playable MP4 videos.

<!-- SPRINT_02_PROGRESS_END -->

### Status legend

- ⚪ **Pending** — capture has not started.
- 🔵 **Capturing** — live-site asset generation is running.
- 🟡 **Captured · QA pending** — planned images and video exist, but final checks are not complete.
- 🟢 **Complete** — assets, video, README, ZIP packaging, and download checks passed.
- 🔴 **Blocked** — access or technical issue requires attention; the reason must be documented.

### Progress update policy

This README is the sprint status source of truth. It is updated whenever:

1. A website starts processing.
2. A website's image and video set is generated.
3. A website passes or fails its project-level QA.
4. Packaging, ZIP integrity, or download-interface status changes.
5. Sprint-level final QA completes.

A project is not marked **Complete** merely because files were generated. Completion requires the project inventory, media, naming, README, and download checks to pass.

## Delivery structure

When complete, the repository contains:

- `QA-PORTFOLIO-ASSETS/Sprint-01/` — project-organized images, videos, thumbnails, and capture notes
- `QA-Portfolio-Sprint-01-Assets.zip` — complete downloadable Sprint 1 package
- `asset-browser/` — local preview and download interface
- `capture-report.json` — machine-readable inventory and availability notes
- `capture-progress.json` — machine-readable project checkpoint status

## Open the local asset browser

```bash
python3 serve-assets.py --port 4173
```

Then open <http://localhost:4173/asset-browser/>.

The browser supports:

- All ten project inventories
- Full-size image previews
- Video thumbnails and playback
- Individual image and video downloads
- On-demand project ZIP downloads
- Complete Sprint 1 ZIP download

## Re-run capture and packaging

```bash
npm install
npx playwright install chromium
npm run capture
npm run package
python3 scripts/verify_assets.py
```

The capture process uses public live-site UI only. It does not submit checkout, create accounts, make purchases, enter personal data, or invent QA defects.
