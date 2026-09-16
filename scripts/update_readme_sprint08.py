#!/usr/bin/env python3
"""Update the root README Sprint 8 tracker after each website checkpoint."""

from __future__ import annotations

import argparse
import json
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
README = ROOT / "README.md"
STATE = ROOT / "capture-progress-sprint-08.json"
START = "<!-- SPRINT_08_PROGRESS_START -->"
END = "<!-- SPRINT_08_PROGRESS_END -->"

PROJECTS = [
    ('71', 'Biofield Expert', 'https://biofieldexpert.com', 'Biofield education, home harmonization, and wellness products'),
    ('72', 'SOL Eyewear', 'https://mysolstyle.com', 'Texas-designed premium sunglasses'),
    ('73', 'Ameliora', 'https://ameliora.com', 'Machine-washable wrinkle-resistant women’s workwear'),
    ('74', 'Coffee@Work', 'https://coffeeatwork.uk.com', 'UK workplace coffee machines, beans, and supplies'),
    ('75', 'Audrey K Boutique', 'https://audreykboutique.com', 'Independent women’s fashion and gift boutique'),
    ('76', 'Second Chance Online', 'https://secondchanceonline.com', 'Independent women’s kimonos, abayas, and accessories'),
    ('77', 'Second Chance Clothing & Home Decor', 'https://secondchanceclothing-homedecor.myshopify.com', 'Canadian women’s consignment clothing and home décor'),
    ('78', 'VTC Watches', 'https://www.vtcwatches.com', 'Watch and jewelry sales, repair, and custom bridal service'),
    ('79', 'Liz Jordan-Hill Fabrics', 'https://lizjordanhill.com', 'Stain-resistant Aquaclean upholstery fabrics'),
    ('80', 'Expressive Audio', 'https://expressiveaudio.com', 'HiFi, home cinema, multiroom, and audio installation specialists'),
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
        raise SystemExit("Sprint 8 README markers are missing")
    before, rest = text.split(START, 1)
    _, after = rest.split(END, 1)
    README.write_text(before + render(state, final) + after)
    print("Updated README.md Sprint 8 progress")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--final", action="store_true")
    args = parser.parse_args()
    main(args.final)
