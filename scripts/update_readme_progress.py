#!/usr/bin/env python3
"""Refresh the root README Sprint 1 tracker from capture-progress.json.

The capture job calls this after every website checkpoint. The final QA job calls
it with --final only after inventory, media, ZIP, and download checks succeed.
"""

from __future__ import annotations

import argparse
import json
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
README = ROOT / "README.md"
DEFAULT_STATE = ROOT / "capture-progress.json"
START = "<!-- SPRINT_PROGRESS_START -->"
END = "<!-- SPRINT_PROGRESS_END -->"

PROJECTS = [
    ("01", "Fandiem", "https://fandiem.com", "01-fandiem"),
    ("02", "Revived Smiles", "https://revivedsmiles.com", "02-revived-smiles"),
    ("03", "K-CAPS", "https://kcaps.com", "03-kcaps"),
    ("04", "Dr. Stengler", "https://drstengler.com", "04-dr-stengler"),
    ("05", "HER SHOP®", "https://hershop.com", "05-hershop"),
    ("06", "The Scaff Shop", "https://thescaffshop.com", "06-the-scaff-shop"),
    ("07", "Maison Khloe", "https://maisonkhloe.ca", "07-maison-khloe"),
    ("08", "Summit Sheets", "https://summitsheetsbedding.com", "08-summit-sheets-bedding"),
    ("09", "Peak Scents", "https://peakscents.com", "09-peak-scents"),
    ("10", "Green Beauty Expert", "https://greenbeautyexpert.ca", "10-green-beauty-expert"),
]

LABELS = {
    "pending": "⚪ Pending",
    "capturing": "🔵 Capturing",
    "captured": "🟡 Captured · QA pending",
    "complete": "🟢 Complete",
    "blocked": "🔴 Blocked",
}


def load_state(path: Path) -> dict:
    if not path.is_file():
        return {"stage": "Capture has not started", "projects": []}
    return json.loads(path.read_text(encoding="utf-8"))


def build_block(state: dict, final: bool) -> str:
    recorded = {item["id"]: item for item in state.get("projects", [])}
    rows = []
    total_images = 0
    total_videos = 0
    complete = 0

    for project_id, name, url, folder in PROJECTS:
        item = recorded.get(project_id, {})
        status = "complete" if final and item.get("status") == "captured" else item.get("status", "pending")
        images = int(item.get("images", 0))
        videos = int(item.get("videos", 0))
        total_images += images
        total_videos += videos
        if status == "complete":
            complete += 1
        default_note = {
            "pending": "Waiting to start",
            "capturing": "Live-site capture in progress",
            "captured": "Awaiting final media and download validation",
            "complete": "Project and Sprint-level checks passed",
            "blocked": "See project capture notes",
        }[status]
        note = default_note if status == "complete" else item.get("note") or default_note
        rows.append(
            f"| {project_id} | {name} | <{url}> | {LABELS[status]} | "
            f"{images or '—'} | {videos or '—'} | {note} |"
        )

    if final and complete == len(PROJECTS):
        sprint_status = "Complete"
        stage = "Final inventory, media, ZIP, asset-browser, and download QA passed"
    else:
        sprint_status = "In progress"
        stage = state.get("stage", "Capture in progress")

    updated = datetime.now(ZoneInfo("Asia/Karachi")).strftime("%Y-%m-%d %H:%M PKT")
    inventory = (
        f"**Current verified inventory:** {total_images} static images and {total_videos} videos.  "
        if final
        else f"**Current checkpoint inventory:** {total_images} static images and {total_videos} videos; completion remains subject to final QA.  "
    )
    return "\n".join([
        START,
        "",
        f"**Sprint status:** {sprint_status}  ",
        f"**Completed projects:** {complete} / {len(PROJECTS)}  ",
        f"**Latest pipeline stage:** {stage}  ",
        f"**Last updated:** {updated}",
        "",
        "| # | Project | Website | Status | Images | Videos | Notes |",
        "|---:|---|---|---|---:|---:|---|",
        *rows,
        "",
        inventory,
        "**Required minimum:** 100 static images and 10 videos.",
        "",
        END,
    ])


def update_readme(state: dict, final: bool) -> None:
    text = README.read_text(encoding="utf-8")
    if START not in text or END not in text:
        raise SystemExit("README progress markers are missing")
    before, remainder = text.split(START, 1)
    _, after = remainder.split(END, 1)
    README.write_text(before + build_block(state, final) + after, encoding="utf-8")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--state", type=Path, default=DEFAULT_STATE)
    parser.add_argument("--final", action="store_true", help="mark captured projects complete after final QA")
    args = parser.parse_args()
    update_readme(load_state(args.state), args.final)
    print(f"Updated {README.relative_to(ROOT)} from {args.state.name}")
