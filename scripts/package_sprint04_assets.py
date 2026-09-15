#!/usr/bin/env python3
"""Build and integrity-check the downloadable Sprint 4 package."""

from __future__ import annotations

import json
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPRINT = ROOT / "QA-PORTFOLIO-ASSETS" / "Sprint-04"
MANIFEST = ROOT / "asset-browser" / "manifest-sprint-04.json"
OUTPUT = ROOT / "QA-Portfolio-Sprint-04-Assets.zip"
EXPECTED = [
    "31-nine-am-roast",
    "32-lilly-jace-kids",
    "33-rad-childrens-furniture",
    "34-lalys-candles",
    "35-adonis-jewellery",
    "36-smovey-usa",
    "37-tinnie-tots",
    "38-la-petite-wardrobe",
    "39-koala-picks",
    "40-glisser-beauty",
]


def validate() -> dict:
    manifest = json.loads(MANIFEST.read_text())
    if len(manifest.get("projects", [])) != 10:
        raise SystemExit("Sprint 4 manifest must contain exactly ten projects")
    if manifest.get("totalImages", 0) < 100 or manifest.get("totalVideos", 0) < 10:
        raise SystemExit("Sprint 4 minimum counts are not met")
    for folder in EXPECTED:
        base = SPRINT / folder
        images = sorted((base / "images").glob("*.jpg"))
        videos = sorted((base / "video").glob("*.mp4"))
        posters = sorted((base / "video").glob("*.jpg"))
        if len(images) < 10 or len(videos) != 1 or len(posters) < 1:
            raise SystemExit(f"{folder}: incomplete image/video inventory")
        if not (base / "README.md").is_file() or not (base / "asset-manifest.json").is_file():
            raise SystemExit(f"{folder}: project documentation is incomplete")
        # Sparse but meaningful mobile menus can compress below 10 KB. Keep a
        # structural floor for JPEGs while retaining the stricter media floor
        # for thumbnails and playable video files.
        for file in images:
            if file.stat().st_size < 4_000:
                raise SystemExit(f"{file}: image appears unexpectedly small")
        for file in videos + posters:
            if file.stat().st_size < 10_000:
                raise SystemExit(f"{file}: media appears unexpectedly small")
    return manifest


def main() -> None:
    manifest = validate()
    OUTPUT.unlink(missing_ok=True)
    with zipfile.ZipFile(OUTPUT, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
        for file in sorted(SPRINT.rglob("*")):
            if file.is_file():
                archive.write(file, Path("Sprint-04") / file.relative_to(SPRINT))
    with zipfile.ZipFile(OUTPUT) as archive:
        if archive.testzip():
            raise SystemExit("Sprint 4 ZIP integrity test failed")
        for folder in EXPECTED:
            if not any(name.startswith(f"Sprint-04/{folder}/") for name in archive.namelist()):
                raise SystemExit(f"ZIP is missing {folder}")
    print(f"Created {OUTPUT.name}: {OUTPUT.stat().st_size / 1024 / 1024:.1f} MiB, {manifest['totalImages']} images, {manifest['totalVideos']} videos")


if __name__ == "__main__":
    main()
