"""Render the Shopify portfolio from the sprint data modules.

Run: python scripts/build_shopify_portfolio.py
"""
from pathlib import Path
import importlib.util
import sys

ROOT = Path(__file__).resolve().parent
OUT = ROOT.parent / "shopify-portfolio"

MODULES = ["shopify_data_sprint1", "shopify_data_sprint2"]


def load(name):
    path = ROOT / f"{name}.py"
    if not path.exists():
        return []
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    sys.modules[name] = mod
    spec.loader.exec_module(mod)
    return mod.PROJECTS


def bullets(items):
    return "\n".join(f"- {i}" for i in items)


def render_project(p):
    d = OUT / p["slug"]
    d.mkdir(parents=True, exist_ok=True)
    (d / "research.md").write_text(f"""# {p['name']} — Research Summary

**Brand:** {p['name']}  
**Website:** {p['url']}  
**Niche:** {p['niche']}  
**Research date:** 2026-10-03  
**Status:** Public-page research only. Abdul Rehman's actual project scope is not yet documented.

## Store introduction

{p['intro']}

## Main product categories

{bullets(p['categories'])}

## Target audience

{p['audience']}

## Brand identity

{bullets(p['identity'])}

## Distinctive storefront characteristics

{bullets(p['characteristics'])}

## Design opportunities

{bullets(p['design_ops'])}

## Development opportunities

{bullets(p['dev_ops'])}

## Possible contribution angles

{bullets(p['angles'])}

## Verified observations vs. assumptions

**Observed on the public storefront:** {p['observed']}

**Not verified:** No project brief, statement of work, repository access, design file, message thread or client confirmation has been supplied. Any statement that Abdul Rehman designed, built, customised or tested a specific element of this store is an assumption until the project owner confirms it.

## Information requiring confirmation

{bullets(p['confirm'])}
""")
    (d / "portfolio-description.md").write_text(f"""# {p['name']} — Shopify Design & Development

**Project Title:** {p['name']} — Shopify Design & Development  
**Niche:** {p['niche']}  
**Store Introduction:** {p['intro']}

## My Contribution

{p['contribution']}

---

*Draft portfolio copy. Confirm the listed scope before publishing; see `verification-notes.md`.*
""")
    for i, t in enumerate(p["tests"], 1):
        (d / f"testimonial-0{i}.md").write_text(f"""# Testimonial Concept 0{i} — {t['label']}

> **Suggested Testimonial Concept — Requires Genuine Client Review & Approval.**  
> The speaker below is a fictional placeholder, not a real client. Replace the profile with a real, consenting person before recording or publishing. Do not present this draft as an actual customer review.

**Suggested Speaker:** {t['speaker']} — requires genuine client confirmation  
**Tone:** {t['tone']}  
**Perspective:** {t['perspective']}  
**Target length:** {t.get('length', '60–90 seconds')}

## Script

{t['script']}

## Verification notes for this concept

{t['notes']}
""")
    (d / "verification-notes.md").write_text(f"""# {p['name']} — Verification Notes

Status: **Draft. Not approved for publication.**

## Claims in the portfolio description

{bullets(p['verify_desc'])}

## Claims in the testimonial concepts

{bullets(p['verify_tests'])}

## Required before publishing

- Written confirmation of the exact scope Abdul delivered (design, theme development, custom sections, QA, or a subset).
- Confirmation of which storefront elements are his work rather than the brand's existing build.
- Client approval of the final wording, including any qualitative outcome.
- A real, consenting speaker, or a clearly labelled fictional presenter for internal demo use.
- Removal of any metric, timeline or result that cannot be tied to a dated record.
""")
    return d


def build_index(projects):
    rows = "\n".join(
        f"| {i+1} | [{p['name']}]({p['slug']}/) | {p['niche']} | Draft | 3 concepts drafted | Scope unconfirmed |"
        for i, p in enumerate(projects)
    )
    (OUT / "PORTFOLIO-INDEX.md").write_text(f"""# Shopify Portfolio — Index

All 25 projects are independent portfolio entries. Every testimonial is a **suggested concept requiring genuine client review and approval**.

| # | Project | Niche | Description | Testimonials | Verification |
|---|---|---|---|---|---|
{rows}

## Status key

- **Draft** — written from public storefront research; no project brief supplied.
- **3 concepts drafted** — design, technical and shopping-experience angles.
- **Scope unconfirmed** — Abdul Rehman's actual contribution must be confirmed before publication.
""")


def build_readme(projects):
    names = "\n".join(f"{i+1}. {p['name']} — {p['niche']}" for i, p in enumerate(projects))
    (OUT / "README.md").write_text(f"""# Shopify Design & Development Portfolio

Portfolio content for **Abdul Rehman — Shopify Designer & Developer**. The collection covers {len(projects)} stores across furniture, home, technology, jewellery, fashion, baby and family retail.

## Developer profile

Abdul Rehman works on Shopify storefront design and development: theme customisation, custom sections, responsive UI implementation, navigation, product and collection layouts, and cross-device QA. The portfolio should show range across categories without pretending every store received the same service.

## Projects

{names}

## Research methodology

Each store was reviewed as a public storefront: homepage structure, navigation, category organisation, product-page patterns, and visible responsive behaviour. Observations are recorded separately from assumptions about Abdul's involvement. No analytics, sales data, client messages or internal project records were available.

## Sprint structure

- Sprint 1 — Modani, Magnolia, Gardena, Rifle Paper Co., Bartesian
- Sprint 2 — Lightbox Jewelry, Ridge, Body Candy, Seiko USA, DeMellier London
- Sprint 3 — Lovisa, Baby Gold, Alma Gems, Momcozy, Zulily
- Sprint 4 — Little Sleepies, Happiest Baby, Mamas & Papas, GoodBuy Gear, Caden Lane
- Sprint 5 — Nanit, Deryan, Kyte Baby, Newton Baby, Albee Baby

Every sprint is reviewed for repeated phrasing, repeated development angles and unsupported claims before it is committed.

## Content verification requirements

1. Confirm the scope delivered for each store.
2. Separate public storefront observations from project facts.
3. Never invent a client, quote, conversation, timeline or business result.
4. Label every testimonial draft as requiring client approval.
5. Use a real consenting speaker, or label the presenter as fictional for demo purposes.
6. Remove any performance, conversion or revenue claim that lacks a dated record.

## Publishing guidelines

Publish a project only after the description matches confirmed scope. Keep the testimonial label visible in internal documents. When a client supplies feedback, replace the draft rather than editing it into something that sounds like a quote they gave.
""")


def main():
    projects = []
    for m in MODULES:
        projects.extend(load(m))
    if not projects:
        raise SystemExit("No projects found")
    OUT.mkdir(exist_ok=True)
    for p in projects:
        render_project(p)
    slugs = [p["slug"] for p in projects]
    assert len(slugs) == len(set(slugs)), "duplicate slug"
    build_index(projects)
    build_readme(projects)
    print(f"rendered {len(projects)} projects")


if __name__ == "__main__":
    main()
