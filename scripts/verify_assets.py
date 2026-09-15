#!/usr/bin/env python3
"""Final inventory, media, naming, uniqueness, and ZIP QA checks."""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPRINT = ROOT / "QA-PORTFOLIO-ASSETS" / "Sprint-01"
MANIFEST = json.loads((ROOT / "asset-browser" / "manifest.json").read_text())
ZIP = ROOT / "QA-Portfolio-Sprint-01-Assets.zip"
NAME = re.compile(r"^[a-z0-9][a-z0-9_\-.]+$")

errors: list[str] = []
hashes: dict[str, Path] = {}
video_durations: list[float] = []

if len(MANIFEST.get("projects", [])) != 10:
    errors.append("Manifest does not contain exactly ten Sprint 1 projects")

for project in MANIFEST.get("projects", []):
    base = SPRINT / project["folder"]
    images = sorted((base / "images").glob("*.jpg"))
    videos = sorted((base / "video").glob("*.mp4"))
    thumbnails = sorted((base / "video").glob("*.jpg"))
    if len(images) < 10:
        errors.append(f"{project['folder']}: only {len(images)} images")
    if len(videos) < 1:
        errors.append(f"{project['folder']}: no video")
    if len(thumbnails) < 1:
        errors.append(f"{project['folder']}: no video thumbnail")
    if not any("mobile_home" in f.name for f in images):
        errors.append(f"{project['folder']}: no mobile homepage visual")
    if len([f for f in images if "mobile" in f.name]) < 2:
        errors.append(f"{project['folder']}: fewer than two mobile visuals")
    if not any("responsive_comparison" in f.name for f in images):
        errors.append(f"{project['folder']}: no responsive comparison")
    if not any("qa_user_flow" in f.name for f in images):
        errors.append(f"{project['folder']}: no QA flow visual")

    for file in images + videos + thumbnails:
        if file.name != file.name.lower() or not NAME.fullmatch(file.name):
            errors.append(f"Invalid filename: {file.name}")
        digest = hashlib.sha256(file.read_bytes()).hexdigest()
        if file.suffix == ".jpg" and file.parent.name == "images" and digest in hashes:
            errors.append(f"Exact duplicate images: {file} and {hashes[digest]}")
        hashes[digest] = file

    for video in videos:
        probe = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(video)],
            check=True, text=True, capture_output=True,
        )
        duration = float(probe.stdout.strip())
        video_durations.append(duration)
        if not 8 <= duration <= 50:
            errors.append(f"{video}: duration {duration:.1f}s is outside the useful short-video range")

if MANIFEST.get("totalImages", 0) < 100 or MANIFEST.get("totalVideos", 0) < 10:
    errors.append("Manifest totals do not meet the 100 image / 10 video minimum")

if not ZIP.is_file():
    errors.append("Complete Sprint ZIP is missing")
else:
    with zipfile.ZipFile(ZIP) as archive:
        if archive.testzip():
            errors.append("Complete Sprint ZIP failed integrity test")
        if not "Sprint-01/README.md" in archive.namelist():
            errors.append("Complete Sprint ZIP is missing Sprint-01/README.md")

if errors:
    print("FINAL QA FAILED")
    print("\n".join(f"- {error}" for error in errors))
    raise SystemExit(1)

print("FINAL QA PASSED")
print(f"Projects: {len(MANIFEST['projects'])}")
print(f"Static images: {MANIFEST['totalImages']}")
print(f"Videos: {MANIFEST['totalVideos']}")
print(f"Video duration range: {min(video_durations):.1f}s–{max(video_durations):.1f}s")
print(f"Unique static image hashes: {len([p for p in hashes.values() if p.parent.name == 'images'])}")
print(f"ZIP size: {ZIP.stat().st_size / 1024 / 1024:.1f} MiB")
