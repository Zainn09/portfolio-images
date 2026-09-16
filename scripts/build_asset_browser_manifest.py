#!/usr/bin/env python3
"""Merge completed Sprint manifests for the local asset browser."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BROWSER = ROOT / "asset-browser"
OUTPUT = BROWSER / "manifest.json"

sprints = []
projects = []
for number in range(1, 11):
    source = BROWSER / ("manifest.json" if number == 1 else f"manifest-sprint-{number:02d}.json")
    # Sprint 1 originally used manifest.json as its canonical file. Once the
    # combined file exists, capture-report.json remains its immutable source.
    if number == 1:
        source = ROOT / "capture-report.json"
    if not source.is_file():
        continue
    data = json.loads(source.read_text())
    sprint_projects = data.get("projects", [])
    projects.extend(sprint_projects)
    sprints.append({
        "number": number,
        "label": f"Sprint {number}",
        "images": sum(len(project.get("images", [])) for project in sprint_projects),
        "videos": sum(len(project.get("videos", [])) for project in sprint_projects),
        "projects": len(sprint_projects),
    })

combined = {
    "title": "QA Portfolio Visual Assets — Sprints 1–10",
    "generated": "2026-09-16",
    "totalImages": sum(len(project.get("images", [])) for project in projects),
    "totalVideos": sum(len(project.get("videos", [])) for project in projects),
    "projects": projects,
    "sprints": sprints,
}
OUTPUT.write_text(json.dumps(combined, indent=2) + "\n")
print(f"Asset browser manifest: {len(projects)} projects, {combined['totalImages']} images, {combined['totalVideos']} videos")
