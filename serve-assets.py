#!/usr/bin/env python3
"""Local browser and download server for the multi-sprint QA visual asset library."""

from __future__ import annotations

import argparse
import io
import os
import re
import zipfile
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ASSET_ROOT = ROOT / "QA-PORTFOLIO-ASSETS"
PROJECT_PATTERN = re.compile(r"^(?:0[1-9]|[1-8][0-9]|9[0-9])-[a-z0-9-]+$")


class AssetHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):  # noqa: N802
        if self.path in ("/", ""):
            self.send_response(302)
            self.send_header("Location", "/asset-browser/")
            self.end_headers()
            return
        if self.path.startswith("/download/project/"):
            project = self.path.removeprefix("/download/project/").split("?", 1)[0].strip("/")
            self.send_project_zip(project)
            return
        super().do_GET()

    def send_project_zip(self, project: str) -> None:
        if not PROJECT_PATTERN.fullmatch(project):
            self.send_error(400, "Invalid project name")
            return
        # Sprint folders no longer map one-to-one onto the first digit of the
        # project ID (Sprint 10 holds 91-94 and Sprint 11 holds 95-99), so the
        # project is located by searching the sprint folders.
        location = next(
            (
                (sprint_dir.name, sprint_dir / project)
                for sprint_dir in sorted(ASSET_ROOT.glob("Sprint-*"))
                if (sprint_dir / project).is_dir()
            ),
            None,
        )
        if location is None:
            self.send_error(404, "Project assets are not available")
            return
        sprint, project_dir = location

        stream = io.BytesIO()
        with zipfile.ZipFile(stream, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
            for file in sorted(project_dir.rglob("*")):
                if file.is_file():
                    archive.write(file, Path(sprint) / project / file.relative_to(project_dir))
        payload = stream.getvalue()
        filename = f"{project}-QA-assets.zip"
        self.send_response(200)
        self.send_header("Content-Type", "application/zip")
        self.send_header("Content-Disposition", f'attachment; filename="{filename}"')
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def end_headers(self) -> None:
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Serve the multi-sprint QA asset browser")
    parser.add_argument("--port", type=int, default=int(os.getenv("PORT", "4173")))
    args = parser.parse_args()
    server = ThreadingHTTPServer(("0.0.0.0", args.port), AssetHandler)
    print(f"QA asset browser: http://localhost:{args.port}/asset-browser/")
    server.serve_forever()
