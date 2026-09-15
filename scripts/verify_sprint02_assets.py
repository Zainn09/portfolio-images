#!/usr/bin/env python3
"""Final Sprint 2 image, playable-video, naming, manifest, and ZIP QA."""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPRINT = ROOT / "QA-PORTFOLIO-ASSETS" / "Sprint-02"
MANIFEST_FILE = ROOT / "asset-browser" / "manifest-sprint-02.json"
ZIP_FILE = ROOT / "QA-Portfolio-Sprint-02-Assets.zip"
NAME = re.compile(r"^[a-z0-9][a-z0-9_.-]+$")
errors: list[str] = []

manifest = json.loads(MANIFEST_FILE.read_text())
projects = manifest.get("projects", [])
if len(projects) != 10:
    errors.append(f"Expected 10 projects, found {len(projects)}")

all_hashes: dict[str, Path] = {}
image_count = video_count = 0
durations: list[float] = []

for project in projects:
    base = SPRINT / project["folder"]
    images = sorted((base / "images").glob("*.jpg"))
    videos = sorted((base / "video").glob("*.mp4"))
    posters = sorted((base / "video").glob("*.jpg"))
    image_count += len(images)
    video_count += len(videos)
    if len(images) < 10:
        errors.append(f"{project['folder']}: only {len(images)} static images")
    if len(videos) != 1:
        errors.append(f"{project['folder']}: expected exactly one MP4")
    if not posters:
        errors.append(f"{project['folder']}: missing video poster")
    if len([file for file in images if "mobile" in file.name]) < 2:
        errors.append(f"{project['folder']}: fewer than two mobile visuals")
    if not any("responsive_comparison" in file.name for file in images):
        errors.append(f"{project['folder']}: missing responsive QA comparison")
    if not any("qa_user_flow" in file.name for file in images):
        errors.append(f"{project['folder']}: missing QA user-flow composition")

    for file in images + videos + posters:
        if file.name != file.name.lower() or not NAME.fullmatch(file.name):
            errors.append(f"Invalid filename: {file}")
    for image in images:
        digest = hashlib.sha256(image.read_bytes()).hexdigest()
        if digest in all_hashes:
            errors.append(f"Exact duplicate: {image} equals {all_hashes[digest]}")
        all_hashes[digest] = image

    for video in videos:
        result = subprocess.run(
            ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=codec_name,width,height,pix_fmt:format=duration", "-of", "json", str(video)],
            check=True, text=True, capture_output=True,
        )
        metadata = json.loads(result.stdout)
        stream = metadata.get("streams", [{}])[0]
        duration = float(metadata.get("format", {}).get("duration", 0))
        durations.append(duration)
        if stream.get("codec_name") != "h264" or stream.get("width") != 1280 or stream.get("height") != 720:
            errors.append(f"{video}: expected H.264 at 1280x720")
        if not str(stream.get("pix_fmt", "")).startswith("yuv420"):
            errors.append(f"{video}: browser-incompatible pixel format {stream.get('pix_fmt')}")
        if not 8 <= duration <= 50:
            errors.append(f"{video}: duration {duration:.2f}s is outside 8–50s")
        decode = subprocess.run(["ffmpeg", "-v", "error", "-i", str(video), "-f", "null", "-"], capture_output=True)
        if decode.returncode:
            errors.append(f"{video}: full playback decode failed")

if image_count != manifest.get("totalImages") or video_count != manifest.get("totalVideos"):
    errors.append("Manifest totals do not match files on disk")
if image_count < 100 or video_count < 10:
    errors.append(f"Sprint minimum not met: {image_count} images, {video_count} videos")
if not ZIP_FILE.is_file():
    errors.append("Sprint 2 ZIP is missing")
else:
    with zipfile.ZipFile(ZIP_FILE) as archive:
        if archive.testzip():
            errors.append("Sprint 2 ZIP integrity failed")
        if "Sprint-02/README.md" not in archive.namelist():
            errors.append("Sprint 2 ZIP is missing the sprint README")

if errors:
    print("SPRINT 2 FINAL QA FAILED")
    print("\n".join(f"- {error}" for error in errors))
    raise SystemExit(1)

print("SPRINT 2 FINAL QA PASSED")
print(f"Projects: {len(projects)}")
print(f"Unique static images: {image_count}")
print(f"Playable MP4 videos: {video_count}")
print(f"Video duration range: {min(durations):.2f}s–{max(durations):.2f}s")
print(f"ZIP size: {ZIP_FILE.stat().st_size / 1024 / 1024:.1f} MiB")
