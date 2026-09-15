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
PROJECT_PATTERN = re.compile(r"^(?:0[1-9]|[12][0-9]|30)-[a-z0-9-]+$")


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
        project_number = int(project.split("-", 1)[0])
        sprint = "Sprint-01" if project_number <= 10 else "Sprint-02" if project_number <= 20 else "Sprint-03"
        project_dir = ASSET_ROOT / sprint / project
        if not project_dir.is_dir():
            self.send_error(404, "Project assets are not available")
            return

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
