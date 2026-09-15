# QA Portfolio Visual Assets — Sprint 1

A professional visual asset archive for an **existing QA portfolio**. This repository does not build or replace the portfolio website.

## Live progress

<!-- SPRINT_PROGRESS_START -->

**Sprint status:** In progress  
**Completed projects:** 0 / 10  
**Latest pipeline stage:** K-CAPS asset set generated and published  
**Last updated:** 2026-09-16 00:06 PKT

| # | Project | Website | Status | Images | Videos | Notes |
|---:|---|---|---|---:|---:|---|
| 01 | Fandiem | <https://fandiem.com> | 🟡 Captured · QA pending | 13 | 1 | Project assets published; awaiting Sprint-level QA |
| 02 | Revived Smiles | <https://revivedsmiles.com> | 🟡 Captured · QA pending | 13 | 1 | Project assets published; awaiting Sprint-level QA |
| 03 | K-CAPS | <https://kcaps.com> | 🟡 Captured · QA pending | 13 | 1 | Project assets published; awaiting Sprint-level QA |
| 04 | Dr. Stengler | <https://drstengler.com> | ⚪ Pending | — | — | Waiting to start |
| 05 | HER SHOP® | <https://hershop.com> | ⚪ Pending | — | — | Waiting to start |
| 06 | The Scaff Shop | <https://thescaffshop.com> | ⚪ Pending | — | — | Waiting to start |
| 07 | Maison Khloe | <https://maisonkhloe.ca> | ⚪ Pending | — | — | Waiting to start |
| 08 | Summit Sheets | <https://summitsheetsbedding.com> | ⚪ Pending | — | — | Waiting to start |
| 09 | Peak Scents | <https://peakscents.com> | ⚪ Pending | — | — | Waiting to start |
| 10 | Green Beauty Expert | <https://greenbeautyexpert.ca> | ⚪ Pending | — | — | Waiting to start |

**Current checkpoint inventory:** 39 static images and 3 videos; completion remains subject to final QA.  
**Required minimum:** 100 static images and 10 videos.

<!-- SPRINT_PROGRESS_END -->

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
