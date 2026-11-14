# Portfolio Review Notes

A record of the sprint reviews, corrections and publication blockers for the 25-store Shopify portfolio.

## Sprint reviews

### Sprint 1 — Modani, Magnolia, Gardena, Rifle Paper Co., Bartesian
- Five distinct development angles: promotional hierarchy, collection templating, international specification data, pattern taxonomy, and bundle/subscription logic.
- Repeated disclaimer language removed from later drafts; no KPI claims.
- Script lengths checked at 150–170 words, roughly 60–70 seconds at a natural pace.

### Sprint 2 — Lightbox Jewelry, Ridge, Body Candy, Seiko USA, DeMellier London
- Repeated phrases "what I noticed in the work" and "what I can say is that" found in three scripts and rewritten.
- Technical angles separated: variant configurators, bundle components, attribute filtering, specification data, personalisation state.
- Verified pricing and product facts against public pages; all figures labelled as brand claims rather than results.

### Sprint 3 — Lovisa, Baby Gold, AlmaGems, Momcozy, Zulily
- **Correction — AlmaGems:** the store is a personalised-gift retailer spanning leather goods, drinkware, ornaments and keepsakes, not a gemstone jeweller. The research, description and scripts reflect the actual catalogue.
- **Correction — Zulily:** the storefront has changed ownership repeatedly and has been offline or in relaunch. The entry is written as a dated, archived project; no current live state is implied. Owner approval and archived screenshots are required before publication.
- Zulily scripts avoid present-tense claims that the site is live.

### Sprint 4 — Little Sleepies, Happiest Baby, Mamas & Papas, GoodBuy Gear, Caden Lane
- Angles differentiated: print-drop merchandising, rental versus purchase, travel-system compatibility, single-unit resale inventory, and name personalisation.
- Several scripts extended to reach the 60-second floor.
- No fabrication of customer anecdotes; the one anecdote in the Lightbox draft remains flagged for replacement.

### Sprint 5 — Nanit, Deryan, Kyte Baby, Newton Baby, Albee Baby
- Final repetition pass found a "no statistic" ending in 12 of 25 third concepts. Eight endings were rewritten to close on a concrete operational detail instead.
- Remaining disclaimers are retained only where the speaker's credibility depends on stating a limit.
- All 75 scripts now run 147+ words, approximately 59–75 seconds.

## Image capture

- 147 authentic storefront images were captured through a GitHub Actions Playwright run on 2026-11-14.
- Each available project has desktop home, desktop collection, desktop product, mobile home, mobile product and a responsive comparison at 1440×900 and 390×844.
- Cookie, newsletter and chat overlays were dismissed or hidden before capture. No interface, product or price was edited.
- Zulily rendered at capture time despite its ownership transition.
- Lightbox Jewelry returned "This store is unavailable"; its three images are an archive snapshot dated 2025-02-10 and are labelled accordingly.
- Gardena has no collection capture because no collection link was exposed; its other five images are present.
- The capture pipeline is `scripts/capture-shopify-portfolio.mjs`, run by `.github/workflows/generate-shopify-portfolio-images.yml`.

## Automated checks performed

- 25 project folders, each with the six required files.
- 75 testimonial drafts, no missing files.
- Script length floor of 147 words; no script above 190 words.
- Six-word phrase repetition check across all scripts: no phrase repeated more than twice.
- Unique opening six words across all 25 portfolio descriptions.

## Known blockers before publication

1. **Scope is unconfirmed for every project.** No brief, statement of work, repository or client message was supplied. Confirm what Abdul actually designed, built, customised or tested.
2. **No real client identities or consent.** Every speaker is a fictional placeholder and must be replaced or clearly labelled.
3. **Zulily requires an archive and owner approval.** The brand has changed hands and the storefront is not stable.
4. **Public claims are not project outcomes.** Per-carat pricing, review counts, product counts and similar figures are brand statements, not results of Abdul's work.
5. **No metrics.** Where a script refers to fewer support questions or easier store visits, that is a qualitative client observation requiring approval, not a measured result.

## Publishing workflow

1. Confirm scope with the project owner and record the date.
2. Replace fictional speaker profiles with consenting people, or label the video as a demo.
3. Rewrite any line that describes an outcome the client cannot support.
4. Remove unsupported figures from portfolio descriptions.
5. Publish the description and testimonial only after written approval.
