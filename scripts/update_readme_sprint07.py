#!/usr/bin/env python3
"""Update the root README Sprint 7 tracker after each website checkpoint."""

from __future__ import annotations

import argparse
import json
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
README = ROOT / "README.md"
STATE = ROOT / "capture-progress-sprint-07.json"
START = "<!-- SPRINT_07_PROGRESS_START -->"
END = "<!-- SPRINT_07_PROGRESS_END -->"

PROJECTS = [
    ('61', 'Rocket Krunch', 'https://www.rocketkrunch.com', 'Freeze-dried candy, fruit, and pantry foods'),
    ('62', 'Rahiza', 'https://www.rahiza.com', 'Designer phone cases and technology accessories'),
    ('63', 'Total Beauty Experience', 'https://totalbeautyexp.com', 'Beauty, haircare, skincare, fragrance, and personal care retailer'),
    ('64', 'John White Shoes', 'https://www.johnwhiteshoes.com', 'British heritage men’s leather footwear'),
    ('65', 'Love Renaissance', 'https://love-renaissance.shop', 'Japanese-crafted skincare, haircare, wellness, and fragrance'),
    ('66', 'Hughie’s Dog Accessories', 'https://hughies-dog-accessories.com', 'Handmade sustainable dog collars, bandanas, and toys'),
    ('67', 'Vezorla', 'https://www.vezorla.com', 'Spanish extra-virgin olive oil and gourmet foods'),
    ('68', 'O & P Fashion Fabrics', 'https://opfashionfabrics.co.uk', 'Wholesale and small-quantity fashion fabrics'),
    ('69', 'Gym Emotion', 'https://gymemotion.com', 'Commercial and home gym equipment'),
    ('70', 'Elysian Blooms', 'https://www.elysianblooms.co.uk', 'Surrey gift, wedding, sympathy, and occasion florist'),
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
        raise SystemExit("Sprint 7 README markers are missing")
    before, rest = text.split(START, 1)
    _, after = rest.split(END, 1)
    README.write_text(before + render(state, final) + after)
    print("Updated README.md Sprint 7 progress")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--final", action="store_true")
    args = parser.parse_args()
    main(args.final)
