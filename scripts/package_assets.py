#!/usr/bin/env python3
"""Build and validate the downloadable Sprint 1 ZIP package."""

from __future__ import annotations

import json
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPRINT = ROOT / "QA-PORTFOLIO-ASSETS" / "Sprint-01"
MANIFEST = ROOT / "asset-browser" / "manifest.json"
OUTPUT = ROOT / "QA-Portfolio-Sprint-01-Assets.zip"
EXPECTED = [
    "01-fandiem", "02-revived-smiles", "03-kcaps", "04-dr-stengler",
    "05-hershop", "06-the-scaff-shop", "07-maison-khloe",
    "08-summit-sheets-bedding", "09-peak-scents", "10-green-beauty-expert",
]


def validate() -> dict:
    if not MANIFEST.is_file():
        raise SystemExit("Missing asset-browser/manifest.json")
    manifest = json.loads(MANIFEST.read_text())
    if manifest.get("totalImages", 0) < 100 or manifest.get("totalVideos", 0) < 10:
        raise SystemExit("Sprint minimum counts are not met")
    for folder in EXPECTED:
        base = SPRINT / folder
        images = sorted((base / "images").glob("*.jpg"))
        videos = sorted((base / "video").glob("*.mp4"))
        if len(images) < 10:
            raise SystemExit(f"{folder}: expected at least 10 images, found {len(images)}")
        if len(videos) < 1:
            raise SystemExit(f"{folder}: expected a video")
        if not (base / "README.md").is_file():
            raise SystemExit(f"{folder}: missing README.md")
        for file in images + videos:
            if file.stat().st_size < 10_000:
                raise SystemExit(f"{file}: asset appears unexpectedly small")
    return manifest


def package() -> None:
    manifest = validate()
    OUTPUT.unlink(missing_ok=True)
    with zipfile.ZipFile(OUTPUT, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
        for file in sorted(SPRINT.rglob("*")):
            if file.is_file():
                archive.write(file, Path("Sprint-01") / file.relative_to(SPRINT))
    with zipfile.ZipFile(OUTPUT) as archive:
        bad = archive.testzip()
        if bad:
            raise SystemExit(f"ZIP integrity check failed at {bad}")
        names = archive.namelist()
        for folder in EXPECTED:
            if not any(name.startswith(f"Sprint-01/{folder}/") for name in names):
                raise SystemExit(f"ZIP is missing {folder}")
    print(
        f"Created {OUTPUT.name}: {OUTPUT.stat().st_size / 1024 / 1024:.1f} MiB, "
        f"{manifest['totalImages']} images, {manifest['totalVideos']} videos"
    )


if __name__ == "__main__":
    package()
