# QA Portfolio Visual Assets — Sprint 1

This repository contains the capture, verification, packaging, and local browsing tools for a visual asset library covering these ten live products:

1. Fandiem
2. Revived Smiles
3. K-CAPS
4. Dr. Stengler
5. HER SHOP®
6. The Scaff Shop
7. Maison Khloe
8. Summit Sheets
9. Peak Scents
10. Green Beauty Expert

The deliverable is an asset archive for an **existing QA portfolio**. It is not a portfolio website.

## Finished output

After generation, the repository includes:

- `QA-PORTFOLIO-ASSETS/Sprint-01/` — project-organized images, videos, thumbnails, and capture notes
- `QA-Portfolio-Sprint-01-Assets.zip` — complete downloadable Sprint 1 package
- `asset-browser/` — local preview/download interface
- `capture-report.json` — machine-readable inventory and availability notes

## Open the local asset browser

```bash
python3 serve-assets.py --port 4173
```

Then open <http://localhost:4173/asset-browser/>.

The browser supports full-size previews, video playback, individual file downloads, on-demand project ZIP downloads, and complete Sprint ZIP download.

## Re-run capture and packaging

```bash
npm install
npx playwright install chromium
npm run capture
npm run package
python3 scripts/verify_assets.py
```

The automated capture uses public live-site UI only. It does not submit checkout, create accounts, make purchases, or invent QA defects.
