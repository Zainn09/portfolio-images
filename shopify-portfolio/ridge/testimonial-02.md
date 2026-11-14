# Testimonial Concept 02 — Development & Technical Execution

> **Suggested Testimonial Concept — Requires Genuine Client Review & Approval.**  
> The speaker below is a fictional placeholder, not a real client. Replace the profile with a real, consenting person before recording or publishing. Do not present this draft as an actual customer review.

**Suggested Speaker:** Shopify engineer, direct-to-consumer — requires genuine client confirmation  
**Tone:** Practical, unsentimental  
**Perspective:** Bundle and engraving edge cases.  
**Target length:** 60–90 seconds

## Script

Build-your-own bundles are a simple idea with a lot of edge cases. Pick a wallet, pick a key case, pick a pen, save a percentage. Then someone removes one item and the discount has to recalculate, not disappear.

The implementation I looked at treated the bundle as a defined product with components, not as a cart hack. That matters for inventory, for returns, and for the order confirmation, which should list what the customer actually chose.

Personalization added another layer. Engraving fields need character limits, font previews that match production, and validation that doesn't let an order through with an empty line.

Then there's the regional problem. Different markets, different currencies, different catalogues, and a lifetime guarantee that has to mean the same thing in each.

We tested the cart on a phone, which is where most of these orders happen. Removing a component from a bundle is exactly the kind of tap that breaks on a narrow layout.

It works quietly now. That's the goal.

## Verification notes for this concept

Strong implementation claims; verify scope before recording. No performance metric is given.
