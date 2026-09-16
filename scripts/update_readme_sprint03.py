#!/usr/bin/env python3
"""Update the root README Sprint 3 tracker after each website checkpoint."""

from __future__ import annotations

import argparse
import json
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
README = ROOT / "README.md"
STATE = ROOT / "capture-progress-sprint-03.json"
START = "<!-- SPRINT_03_PROGRESS_START -->"
END = "<!-- SPRINT_03_PROGRESS_END -->"

PROJECTS = [
    ("21", "Moore Beauty", "https://moore-beauty.co.uk", "Home-based beauty treatments and holistic therapies"),
    ("22", "KUURTH", "https://kuurth.com", "Wearable-art jewelry and accessories"),
    ("23", "Biofield Resonator", "https://biofieldresonator.com", "Energy-field wearable and educational content"),
    ("24", "Xtinctio", "https://xtinctio.com", "Conservation jewelry and wildlife art"),
    ("25", "Wendy McCallum Art", "https://wendymccallumart.co.uk", "Frequency art, resin artwork, and prints"),
    ("26", "E & E Essentials", "https://eandeessentials.com", "Handcrafted natural soap and skincare"),
    ("27", "Anthom Design House", "https://anthomdesignhouse.com", "Furniture collections and project inspiration"),
    ("28", "Gabrielle Jewelry", "https://gabriellejewelry.com", "Handmade fine, estate, and contemporary jewelry"),
    ("29", "Black Arrow Gallery", "https://www.blackarrowgallery.com", "Native American jewelry and art"),
    ("30", "Cowbells.com", "https://cowbells.com", "Custom, event, and team cowbells"),
]
LABELS = {
    "pending": "⚪ Pending",
    "capturing": "🔵 Capturing",
    "captured": "🟡 Captured · QA pending",
    "complete": "🟢 Complete",
    "blocked": "🔴 Blocked",
}


def load_state() -> dict:
    return json.loads(STATE.read_text()) if STATE.is_file() else {"stage": "Website analysis and capture configuration", "projects": []}


def render(state: dict, final: bool) -> str:
    saved = {item["id"]: item for item in state.get("projects", [])}
    rows, image_total, video_total, complete = [], 0, 0, 0
    for project_id, name, url, description in PROJECTS:
        item = saved.get(project_id, {})
        status = item.get("status", "pending")
        if final and status == "captured":
            status = "complete"
        images, videos = int(item.get("images", 0)), int(item.get("videos", 0))
        image_total += images
        video_total += videos
        complete += status == "complete"
        default_note = "Website and playable video QA passed" if status == "complete" else item.get("note", description)
        rows.append(f"| {project_id} | {name} | <{url}> | {LABELS[status]} | {images or '—'} | {videos or '—'} | {default_note} |")
    done = final and complete == len(PROJECTS)
    stage = "Final image, playable-video, ZIP, browser, and download QA passed" if done else state.get("stage", "Capture in progress")
    inventory = "verified" if done else "checkpoint"
    updated = datetime.now(ZoneInfo("Asia/Karachi")).strftime("%Y-%m-%d %H:%M PKT")
    return "\n".join([
        START, "",
        f"**Sprint status:** {'Complete' if done else 'In progress'}<br>",
        f"**Completed projects:** {complete} / {len(PROJECTS)}<br>",
        f"**Latest pipeline stage:** {stage}<br>",
        f"**Last updated:** {updated}", "",
        "| # | Project | Website | Status | Images | Playable videos | Notes |",
        "|---:|---|---|---|---:|---:|---|", *rows, "",
        f"**Current {inventory} inventory:** {image_total} static images and {video_total} playable MP4 videos.<br>",
        "**Required minimum:** 100 unique static images and 10 verified playable MP4 videos.", "", END,
    ])


def main(final: bool) -> None:
    state = load_state()
    if final:
        state["stage"] = "Final image, playable-video, ZIP, browser, and download QA passed"
        for item in state.get("projects", []):
            if item.get("status") == "captured":
                item["status"] = "complete"
                item["note"] = "Website and playable video QA passed"
        STATE.write_text(json.dumps(state, indent=2) + "\n")

    text = README.read_text()
    if START not in text or END not in text:
        raise SystemExit("Sprint 3 README markers are missing")
    before, rest = text.split(START, 1)
    _, after = rest.split(END, 1)
    README.write_text(before + render(state, final) + after)
    print("Updated README.md Sprint 3 progress")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--final", action="store_true")
    args = parser.parse_args()
    main(args.final)
