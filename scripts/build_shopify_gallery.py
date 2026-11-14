"""Build a browsable image gallery for the Shopify portfolio."""
from pathlib import Path

ROOT = Path("shopify-portfolio")
ORDER = [
    "modani", "magnolia", "gardena", "rifle-paper-co", "bartesian",
    "lightbox-jewelry", "ridge", "body-candy", "seiko-usa", "demellier-london",
    "lovisa", "baby-gold", "almagems", "momcozy", "zulily",
    "little-sleepies", "happiest-baby", "mamas-and-papas", "goodbuy-gear", "caden-lane",
    "nanit", "deryan", "kyte-baby", "newton-baby", "albee-baby",
]


def title_for(slug):
    p = ROOT / slug / "research.md"
    if p.exists():
        first = p.read_text().splitlines()[0]
        if "—" in first:
            return first.split("—")[0].replace("#", "").strip()
    return slug.replace("-", " ").title()


rows = []
for i, slug in enumerate(ORDER, 1):
    d = ROOT / slug / "images"
    home = d / "desktop-home.jpg"
    if not home.exists():
        home = d / "archive-desktop-home.jpg"
    comp = d / "responsive-comparison.jpg"
    if not comp.exists():
        comp = d / "archive-responsive-comparison.jpg"
    if not home.exists():
        continue
    label = "Archived capture (2025-02-10)" if home.name.startswith("archive-") else "Live capture (2026-11-14)"
    rows.append(f"""## {i}. {title_for(slug)}

[Open project folder]({slug}/) · {label}

[![{title_for(slug)} desktop and mobile]({home.relative_to(ROOT).as_posix()})]({comp.relative_to(ROOT).as_posix() if comp.exists() else home.relative_to(ROOT).as_posix()})

[Desktop home]({home.relative_to(ROOT).as_posix()}) · [Responsive comparison]({comp.relative_to(ROOT).as_posix()}) · [All images]({slug}/images/)
""")

gallery = f"""# Shopify Portfolio — Image Gallery

Authentic storefront captures for all 25 projects. Click any image for the desktop/mobile comparison.

- Desktop viewport: 1440 × 900
- Mobile viewport: 390 × 844
- Captured 2026-11-14 unless marked as archived
- No interface, product, price or result was generated or edited

{chr(10).join(rows)}
## Notes

- **Lightbox Jewelry** is closed. Its images are from a 2025-02-10 archive snapshot and are labelled as such.
- **Gardena** has no collection capture because no collection route was exposed.
- These are website references, not evidence that Abdul Rehman designed or developed a given store. See each project's `verification-notes.md`.
"""
(ROOT / "GALLERY.md").write_text(gallery)
print(f"gallery written with {len(rows)} projects")
