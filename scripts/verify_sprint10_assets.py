#!/usr/bin/env python3
"""Final Sprint 10 image, playable-video, naming, manifest, and ZIP QA."""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPRINT = ROOT / "QA-PORTFOLIO-ASSETS" / "Sprint-10"
MANIFEST_FILE = ROOT / "asset-browser" / "manifest-sprint-10.json"
ZIP_FILE = ROOT / "QA-Portfolio-Sprint-10-Assets.zip"
NAME = re.compile(r"^[a-z0-9][a-z0-9_.-]+$")
errors: list[str] = []

manifest = json.loads(MANIFEST_FILE.read_text())
projects = manifest.get("projects", [])
if len(projects) != 4:
    errors.append(f"Expected 4 projects, found {len(projects)}")

all_hashes: dict[str, Path] = {}
image_count = video_count = 0
durations: list[float] = []
PERCEPTUAL_DUPLICATE_RMSE = 4.0


def image_fingerprint(file: Path) -> bytes:
    """Normalize a JPEG to a tiny grayscale frame for near-duplicate QA."""
    result = subprocess.run(
        [
            "ffmpeg", "-v", "error", "-i", str(file), "-vf", "scale=32:32",
            "-frames:v", "1", "-pix_fmt", "gray", "-f", "rawvideo", "-",
        ],
        check=True,
        capture_output=True,
    )
    if len(result.stdout) != 32 * 32:
        raise RuntimeError(f"Unexpected fingerprint size for {file}")
    return result.stdout


def visual_distance(left: bytes, right: bytes) -> float:
    return (sum((a - b) ** 2 for a, b in zip(left, right)) / len(left)) ** 0.5


for project in projects:
    base = SPRINT / project["folder"]
    images = sorted((base / "images").glob("*.jpg"))
    videos = sorted((base / "video").glob("*.mp4"))
    posters = sorted((base / "video").glob("*.jpg"))
    image_count += len(images)
    video_count += len(videos)
    if len(images) < 10:
        errors.append(f"{project['folder']}: only {len(images)} static images")
    listed_images = {item.get("file") for item in project.get("images", [])}
    disk_images = {file.name for file in images}
    if listed_images != disk_images:
        errors.append(f"{project['folder']}: manifest image inventory does not match files on disk")
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
    project_fingerprints: list[tuple[Path, bytes]] = []
    for image in images:
        digest = hashlib.sha256(image.read_bytes()).hexdigest()
        if digest in all_hashes:
            errors.append(f"Exact duplicate: {image} equals {all_hashes[digest]}")
        all_hashes[digest] = image
        try:
            fingerprint = image_fingerprint(image)
            for previous, previous_fingerprint in project_fingerprints:
                distance = visual_distance(fingerprint, previous_fingerprint)
                if distance < PERCEPTUAL_DUPLICATE_RMSE:
                    errors.append(
                        f"Near duplicate: {image} visually matches {previous} "
                        f"(RMSE {distance:.2f})"
                    )
            project_fingerprints.append((image, fingerprint))
        except (subprocess.CalledProcessError, RuntimeError) as error:
            errors.append(f"{image}: perceptual image QA failed ({error})")

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
if image_count < 40 or video_count < 4:
    errors.append(f"Sprint minimum not met: {image_count} images, {video_count} videos")
if not ZIP_FILE.is_file():
    errors.append("Sprint 10 ZIP is missing")
else:
    with zipfile.ZipFile(ZIP_FILE) as archive:
        if archive.testzip():
            errors.append("Sprint 10 ZIP integrity failed")
        if "Sprint-10/README.md" not in archive.namelist():
            errors.append("Sprint 10 ZIP is missing the sprint README")

if errors:
    print("SPRINT 10 FINAL QA FAILED")
    print("\n".join(f"- {error}" for error in errors))
    raise SystemExit(1)

print("SPRINT 10 FINAL QA PASSED")
print(f"Projects: {len(projects)}")
print(f"Unique static images: {image_count}")
print(f"Playable MP4 videos: {video_count}")
print(f"Video duration range: {min(durations):.2f}s–{max(durations):.2f}s")
print(f"ZIP size: {ZIP_FILE.stat().st_size / 1024 / 1024:.1f} MiB")
