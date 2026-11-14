PROJECTS = [
    {
        "slug": "little-sleepies",
        "name": "Little Sleepies",
        "url": "https://littlesleepies.com/",
        "niche": "Baby & family sleepwear",
        "intro": "A bamboo sleepwear brand selling baby zippies, two-piece pyjamas and matching family sets in limited-edition prints.",
        "categories": [
            "Baby zippies, rompers and sleep bags",
            "Kids' and adult pyjama sets",
            "Family matching collections",
            "Swaddles, blankets and newborn gifts",
        ],
        "audience": "Parents and gift buyers who follow print drops, buy sizes ahead, and respond to fabric softness and family matching.",
        "identity": [
            "Playful, print-led and community-driven, with frequent limited drops.",
            "Soft bamboo fabric positioned as the core product benefit.",
            "Family matching treated as an emotional occasion, not a side collection.",
        ],
        "characteristics": [
            "Print drops with limited availability and restock demand.",
            "An unusually wide size range, from micro-preemie to adult 3X.",
            "Family matching bundlers and coordinated sets.",
            "Heavy email and social traffic around new releases.",
        ],
        "design_ops": [
            "Keep print launches exciting without making the grid unreadable.",
            "Show the same print across baby, child and adult scales.",
            "Make family-set assembly obvious rather than a puzzle.",
        ],
        "dev_ops": [
            "Handle a large size-by-print variant matrix without dead combinations.",
            "Keep bundle selection and pricing accurate in the cart.",
            "Support restock demand and sold-out states cleanly.",
        ],
        "angles": [
            "Print-drop merchandising at scale.",
            "A size range that runs from micro-preemie to adult.",
            "Assembling a family set without frustration.",
        ],
        "observed": "Print-led new arrivals; family matching bundlers; sizes from micro-preemie to 3X; zippies, two-piece sets and sleep bags; holiday and hospital matching collections; sold-out and restock behaviour.",
        "confirm": [
            "Which templates or components Abdul delivered.",
            "Whether family bundlers were part of his work.",
            "Whether sold-out and restock states were in scope.",
            "Any client-approved qualitative result.",
        ],
        "contribution": "Little Sleepies runs on print drops and family matching, which means the storefront has to sell the same pattern at three very different scales. The work focused on collection templates that keep a launch exciting without obscuring size and availability, family bundlers that make set assembly straightforward, and product cards that show the print clearly on baby, child and adult bodies. Sold-out states and restocks were treated as part of the experience rather than an error state.",
        "verify_desc": [
            "That Abdul implemented collection or bundler templates.",
            "That sold-out and restock behaviour was his work.",
            "That the print presentation was part of his scope.",
        ],
        "verify_tests": [
            "The speaker's role and consent.",
            "The claim that bundlers calculate set pricing correctly.",
            "Any claim about launch sell-through or email revenue.",
            "Any statement about restock conversion.",
        ],
        "tests": [
            {
                "label": "Design & Visual Experience",
                "speaker": "Apparel art director, childrenswear",
                "tone": "Lively, visual",
                "perspective": "Selling a print across baby, child and adult scales.",
                "script": """A print looks completely different on a newborn zippy and on an adult pyjama pant. That's the design problem at Little Sleepies, and it's more interesting than it sounds.

If you show the baby shot first, the parent can't tell how the pattern will read on a six-year-old. If you show the adult version, it stops feeling like a children's brand.

What worked was giving each print a consistent family of images: the zippy, the two-piece, the adult set, all on the same background with the same crop logic. You could scan a drop and understand the whole collection without clicking through nine products.

The seasonal drops got their own visual moment, which they need. But the product card stayed stable underneath, so the excitement didn't come at the cost of clarity.

It's playful without being chaotic, which is a hard balance when every print is competing.""",
                "notes": "Design observations only; confirm that these templates were Abdul's work.",
            },
            {
                "label": "Development & Technical Execution",
                "speaker": "Shopify engineer, apparel",
                "tone": "Technical, plain-spoken",
                "perspective": "Sizes from micro-preemie to 3X across every print.",
                "script": """Most apparel stores have a size problem. This one has a size-and-print problem.

Every drop introduces new prints, and every print exists in a size run that starts at micro-preemie and ends at adult 3X. Not every combination is real. A print might exist as a zippy and an adult set but not as a sleep bag.

The work I reviewed handled that as data, not as a hopeful dropdown. Available combinations were defined per product, so a customer couldn't select a size that was never made. Sold-out sizes stayed visible with a clear state, because hiding them breaks the size run and confuses people who are buying ahead.

The family bundler was the other piece. It had to collect sizes across several people, keep the print consistent, and calculate the set without turning the cart into a maths problem.

We tested it with a family of five, because that's where these things break.""",
                "notes": "Technical claims require confirmation against the actual build.",
            },
            {
                "label": "Overall Project & Shopping Experience",
                "speaker": "Ecommerce and community lead, childrenswear",
                "tone": "Warm, quick",
                "perspective": "Print drops, restocks and buying ahead.",
                "script": """Our customers don't shop for pyjamas. They shop for a drop.

That means the site has to work at a different tempo. A print goes live, people arrive from Instagram and email at the same time, and the popular sizes go quickly. If the page is slow or the size chart is missing, the moment passes.

What improved was the clarity around availability. Sold-out sizes were obvious without making the product look broken. Restock information was visible. The size guide was one tap away, which matters when a grandparent is buying for a baby they haven't met.

The family matching pages also got simpler. You could build a set for two or five people without losing the print you started with, and send the link to a partner or a grandparent who would land in the same place.

We still sell out. That's intentional. But the experience of missing a size is less confusing than it used to be.""",
                "notes": "The drop behaviour and restock observation are qualitative and need approval.",
            },
        ],
    },
    {
        "slug": "happiest-baby",
        "name": "Happiest Baby",
        "url": "https://www.happiestbaby.com/",
        "niche": "Baby sleep products",
        "intro": "A baby sleep company selling the SNOO smart sleeper, swaddles, sleep aids and parent education.",
        "categories": [
            "SNOO smart sleeper and rentals",
            "Swaddles and sleep sacks",
            "White noise and sleep aids",
            "Sleep courses and parent guides",
        ],
        "audience": "Exhausted new parents and gift buyers researching a high-commitment sleep product, often at night and under time pressure.",
        "identity": [
            "Paediatric expertise front and centre, associated with Dr. Harvey Karp.",
            "Calm, reassuring and evidence-informed rather than playful.",
            "A high-consideration product supported by rental, financing and returns.",
        ],
        "characteristics": [
            "Long-form education before purchase.",
            "Rental and purchase options presented together.",
            "Bundles combining the sleeper with sleep aids.",
            "Strong emphasis on safety, returns and support.",
        ],
        "design_ops": [
            "Balance clinical authority with warmth for a stressed reader.",
            "Make rental versus purchase immediately understandable.",
            "Keep safety and return information close to the decision.",
        ],
        "dev_ops": [
            "Handle rental terms, purchase and bundle options without ambiguity.",
            "Keep subscription or rental billing states clear in the account.",
            "Make long-form content scannable and link it to the right product.",
        ],
        "angles": [
            "Calm authority in a high-anxiety category.",
            "Rental, purchase and bundle logic.",
            "Supporting a sleep-deprived buyer at the point of decision.",
        ],
        "observed": "SNOO product pages with rental and purchase paths; swaddles, sleep sacks and sound machines; education content and courses; safety and return messaging; bundle offers.",
        "confirm": [
            "Which parts of the storefront Abdul worked on.",
            "Whether rental or bundle logic was in scope.",
            "Which education pages he built.",
            "Any approved qualitative outcome.",
        ],
        "contribution": "Happiest Baby sells a product that parents consider at their most vulnerable, so the storefront has to earn trust before it asks for a decision. The work focused on separating rental from purchase without burying either, keeping safety and return information near the choice, and shaping long-form education into short, scannable sections. The visual language stays calm and clinical without feeling cold, which suits a product that sits between medical advice and nursery furniture.",
        "verify_desc": [
            "That Abdul implemented rental, purchase or bundle options.",
            "That education page templates were his work.",
            "That safety and returns placement was in scope.",
        ],
        "verify_tests": [
            "The speaker's role and consent.",
            "The claim that rental terms are clear before checkout.",
            "Any claim about conversion, rentals or retention.",
            "Any medical or safety claim beyond the brand's own published wording.",
        ],
        "tests": [
            {
                "label": "Design & Visual Experience",
                "speaker": "Brand designer, family health products",
                "tone": "Calm, measured",
                "perspective": "Clinical authority without coldness.",
                "script": """A product for newborn sleep sits in an uncomfortable space. It's not a medical device, but it's not a toy either. Parents arrive scared, and the design has to respect that without sounding like a hospital leaflet.

What worked on the Happiest Baby pages was the pacing. The claim came first. The explanation came second. The safety detail sat close enough that you didn't have to go looking for it.

The palette is soft, the photography is domestic, but the structure is disciplined. Headings do real work. There's very little decoration competing with the information.

I noticed the rental block especially. It doesn't feel like a downgrade or a footnote. It's presented as a legitimate way to try the product, which is what a lot of parents actually need.

For a parent who has already bought three things that didn't work, that matters.

It's warm without being twee. In this category, that's a narrow target.""",
                "notes": "Design observations only; confirm the speaker and that the pages were Abdul's work.",
            },
            {
                "label": "Development & Technical Execution",
                "speaker": "Ecommerce engineer, subscription products",
                "tone": "Exact, practical",
                "perspective": "Rental, purchase and bundle states that stay unambiguous.",
                "script": """A rental is not a purchase with a different label. It has a term, a return condition, a billing schedule and a different support path.

The work I reviewed treated those as separate products rather than one product with a confusing toggle. Rental terms were stated at selection. The cart showed the commitment, not just the first payment. The account area reflected the ongoing state.

Bundles added complexity. A sleeper plus a swaddle plus a course is a different SKU from three separate items, and the confirmation needs to list what's included. Otherwise support spends its day explaining.

We tested the edge cases that generate refunds: changing from rental to purchase, cancelling before shipment, returning an accessory that came in a bundle.

None of this is visible when it works. The parent just sees a clear price and a clear commitment.

That clarity is the product here, as much as the sleeper.""",
                "notes": "Technical claims must be verified. No subscription or conversion metric is stated.",
            },
            {
                "label": "Overall Project & Shopping Experience",
                "speaker": "Parent support lead, baby sleep",
                "tone": "Empathetic, direct",
                "perspective": "A three-in-the-morning decision.",
                "script": """People buy this at three in the morning, after a week of no sleep. They are not reading a brand manifesto.

They want to know: will this help, how much is it really, and what happens if it doesn't work.

The site got better at answering those in the order people ask them. The rental option sits beside the purchase price, so nobody has to choose between a thousand-dollar commitment and walking away. The return window is stated in plain language. The safety information is not hidden behind a download.

The education content is still there, but it's chunked. You can read the short version and go deeper if you want.

Support is also visible, which sounds small until you are the person who needs it at two in the morning.

We can't promise anyone a sleeping baby. That would be dishonest. What we can do is make the decision less frightening, and that's what the page is for.""",
                "notes": "The support observation is qualitative and requires approval. No sleep or safety outcome is claimed.",
            },
        ],
    },
    {
        "slug": "mamas-and-papas",
        "name": "Mamas & Papas",
        "url": "https://www.mamasandpapas.com/",
        "niche": "Nursery & baby retail",
        "intro": "A British nursery retailer selling pushchairs, car seats, furniture, clothing and baby essentials.",
        "categories": [
            "Pushchairs and travel systems",
            "Car seats and bases",
            "Nursery furniture and bedding",
            "Baby clothing, toys and gifts",
        ],
        "audience": "Expectant and new parents making a small number of high-value purchases, often researching online before visiting a store.",
        "identity": [
            "Established British nursery brand with a design-led, practical tone.",
            "Showroom-style presentation of pushchairs and furniture.",
            "Bundles and appointments positioned around the reality of preparing a nursery.",
        ],
        "characteristics": [
            "Large product imagery with specification and compatibility detail.",
            "Travel-system bundles and furniture sets.",
            "Store locator and appointment booking.",
            "Delivery and assembly information for bulky items.",
        ],
        "design_ops": [
            "Make big-ticket comparison feel manageable.",
            "Show scale and fabric in a way that supports a store visit.",
            "Keep bundle contents clear rather than implied.",
        ],
        "dev_ops": [
            "Handle compatibility between pushchairs, seats and bases.",
            "Keep furniture delivery and assembly options distinct at checkout.",
            "Support appointment booking without fragmenting the journey.",
        ],
        "angles": [
            "Guided comparison for high-value nursery purchases.",
            "Compatibility across travel systems and car seats.",
            "The online research to in-store appointment handoff.",
        ],
        "observed": "Pushchair and travel-system ranges with specification detail; car seats and bases; nursery furniture sets; clothing and toys; store appointments; delivery and assembly information.",
        "confirm": [
            "Which templates or flows Abdul worked on.",
            "Whether compatibility or appointment booking was in scope.",
            "Which pages he designed or built.",
            "The brand's approved qualitative outcome.",
        ],
        "contribution": "Mamas & Papas sells a small number of expensive decisions, which calls for a different kind of storefront: less urgency, more guidance. The work focused on comparison that stays readable, compatibility between pushchairs, seats and bases, and a clear path from online research to a store appointment. Bulky-item delivery and assembly options were treated as part of the purchase rather than a postcode afterthought.",
        "verify_desc": [
            "That Abdul implemented comparison or compatibility features.",
            "That appointment booking was in scope.",
            "That delivery and assembly options were his work.",
        ],
        "verify_tests": [
            "The speaker's role and consent.",
            "The claim that compatibility is validated across products.",
            "Any claim about appointment bookings or store conversion.",
            "Any revenue or average-order-value implication.",
        ],
        "tests": [
            {
                "label": "Design & Visual Experience",
                "speaker": "Retail design lead, nursery",
                "tone": "Grounded, considered",
                "perspective": "Bringing showroom calm to a high-value online decision.",
                "script": """A pushchair is a considered purchase. People want to touch it, fold it, and see whether it fits in the boot. The website can't do that, but it can stop pretending the decision is casual.

What worked was the scale of the imagery and the honesty of the detail. You see the pushchair in a room, then folded, then with a child in it. The fabric is close enough to judge. The weight is stated.

The pages also resisted the urge to fill every gap with a badge. There's a lot of white space, which makes the specification easier to read.

Bundles were presented as real packages, with the carrycot and the car seat shown together, not as a list of SKUs.

The store locator is treated the same way: a real next step, not a footer link.

It feels like a shop that trusts you to make a decision, rather than a site trying to rush one.

That's rare in baby retail.""",
                "notes": "Design observations only; confirm scope.",
            },
            {
                "label": "Development & Technical Execution",
                "speaker": "Ecommerce developer, furniture and travel systems",
                "tone": "Methodical, low-key",
                "perspective": "Compatibility and bulky delivery.",
                "script": """Travel systems are a compatibility puzzle. A pushchair frame takes certain carrycots. A car seat needs a base, and the base depends on the car. Buy the wrong combination and you're returning three boxes.

The work I reviewed handled that with structured compatibility rather than a paragraph of guidance. Products declared what they worked with, and the bundle pages only offered combinations that were real.

Furniture introduced a different problem. A cot is not a parcel. Delivery options, room of choice, assembly and lead times all need to be separate choices at checkout, not a single 'shipping' line.

We tested the cart with one small item and one furniture piece, because that's where the logic usually collapses. The small item shouldn't inherit a six-week lead time.

Appointment booking sat alongside all this. It had to feel like a next step, not an exit from the store.

The build is mostly invisible. That's the point.""",
                "notes": "Technical claims require verification against the actual engagement.",
            },
            {
                "label": "Overall Project & Shopping Experience",
                "speaker": "Customer experience lead, nursery retail",
                "tone": "Warm, practical",
                "perspective": "Preparing a nursery without panic.",
                "script": """New parents don't know what they need. They know they need a lot of things, and they have about four months to figure it out.

The site has to work like a good shop assistant: answer the question behind the question. Not 'which pushchair is best' but 'which one fits my car and my hallway'.

What improved was the route from browsing to a real conversation. You could shortlist two models, see the differences in a table that didn't require a spreadsheet, and book an appointment without losing the products you'd chosen.

The delivery information also got clearer. Furniture has a lead time, and pretending otherwise creates a bad first week.

We don't have a statistic about appointment show rates, and I wouldn't trust one from a testimonial. What I can say is that people arrive at the store better prepared, which makes the visit shorter and the decision easier.""",
                "notes": "The appointment observation is qualitative and needs approval.",
            },
        ],
    },
    {
        "slug": "goodbuy-gear",
        "name": "GoodBuy Gear",
        "url": "https://goodbuygear.com/",
        "niche": "Baby gear resale",
        "intro": "A resale marketplace for used, open-box and overstock baby gear, from strollers to nursery furniture.",
        "categories": [
            "Strollers and travel systems",
            "Car seats and bases",
            "Nursery furniture and high chairs",
            "Baby carriers, bouncers and feeding gear",
        ],
        "audience": "Value-conscious parents who want premium baby brands at lower prices but need reassurance about condition and safety.",
        "identity": [
            "Sustainability-led resale positioned as smart, not second-hand.",
            "Condition grading presented as a trust mechanism.",
            "A marketplace model with unique, single-unit inventory.",
        ],
        "characteristics": [
            "Condition labels such as Open Box, Barely Used and Gently Used.",
            "Single-unit listings with 'only one left' messaging.",
            "Brand and retailer resale partnerships.",
            "Seller intake and consignment flows alongside shopping.",
        ],
        "design_ops": [
            "Make condition grades immediately understandable.",
            "Give unique items enough photography to substitute for inspection.",
            "Keep a marketplace assortment navigable without pretending it is stable.",
        ],
        "dev_ops": [
            "Handle single-quantity inventory without overselling.",
            "Structure condition as a filterable, trustworthy attribute.",
            "Support seller submissions and intake status.",
        ],
        "angles": [
            "Condition as the core trust signal.",
            "Marketplace inventory that exists once.",
            "Resale as a sustainable alternative to buying new.",
        ],
        "observed": "Condition-graded listings with 'only 1 left' messaging; brand partnerships for certified resale; strollers, car seats, furniture and feeding gear; seller and trade-in routes; discount comparisons against new prices.",
        "confirm": [
            "Which storefront surfaces Abdul worked on.",
            "Whether condition taxonomy or seller intake was in scope.",
            "Which templates he built or customised.",
            "Any approved qualitative result.",
        ],
        "contribution": "GoodBuy Gear's storefront has to make a single, used item feel as trustworthy as a new product with a warranty. The work focused on condition as a first-class attribute rather than a badge: consistent grading language, filters that reflect real availability, and product pages with enough photography and detail to substitute for handling the item. Single-unit inventory was treated as a design constraint, not an inconvenience, and the resale value proposition was kept factual rather than eco-sloganeering.",
        "verify_desc": [
            "That Abdul implemented condition filtering or listing templates.",
            "That seller intake or inventory handling was in scope.",
            "That any marketplace changes were his work.",
        ],
        "verify_tests": [
            "The speaker's role and consent.",
            "The claim that condition grades are applied consistently.",
            "Any claim about sell-through, listings or revenue.",
            "Any safety assertion beyond the brand's published policy.",
        ],
        "tests": [
            {
                "label": "Design & Visual Experience",
                "speaker": "Product design lead, resale marketplace",
                "tone": "Direct, thoughtful",
                "perspective": "Replacing the reassurance of holding the item.",
                "script": """Buying a used stroller online is a trust exercise. You can't check the fold, you can't smell the fabric, and you can't see the scratch the seller decided not to mention.

So the design has to over-deliver on evidence. GoodBuy Gear's listings lean into that. Multiple angles, close-ups of the wear points, and a condition grade that sits near the top rather than in a specification tab.

What I noticed was the consistency of that language. 'Gently used' means the same thing on a high chair as it does on a travel system. That sounds administrative, but it's actually the brand.

The layouts are plain. No glossy lifestyle campaign pretending the item is new. The product is the product, photographed honestly.

The condition grade is written in plain words, not a letter or a colour code you have to decode.

It feels like a marketplace that respects the buyer's intelligence, which is the only way resale works at this price point.""",
                "notes": "Design observations only; confirm the speaker and that these templates were Abdul's.",
            },
            {
                "label": "Development & Technical Execution",
                "speaker": "Ecommerce engineer, marketplace retail",
                "tone": "Dry, precise",
                "perspective": "Inventory that exists exactly once.",
                "script": """A resale marketplace breaks one of ecommerce's basic assumptions: that a product has stock.

Here, a listing is one physical object. There's one stroller, in one condition, with one set of photos. If two people add it to their carts, one of them is going to be disappointed.

The work I reviewed treated that as a first-class constraint. Listings were inventory-aware, so the second add failed visibly rather than silently. Condition was a structured attribute, which meant filters could be trusted and the same grade meant the same thing across categories.

Seller intake was the other half. A parent submitting a stroller needs to describe condition, upload photos and understand what happens next. That flow has to be simple enough to finish on a phone.

We tested the race condition deliberately, because marketplaces tend to discover it in production.

The storefront looks simple. Underneath, it's honest about scarcity.""",
                "notes": "Technical claims require verification. No sell-through metric is given.",
            },
            {
                "label": "Overall Project & Shopping Experience",
                "speaker": "Community and resale operations lead",
                "tone": "Friendly, pragmatic",
                "perspective": "Resale as a practical choice, not a compromise.",
                "script": """People come to resale for the price and stay for the reassurance.

The first question is always condition. The second is safety. If either feels vague, the saving doesn't matter.

What improved was how quickly those answers appeared. Condition was visible on the card, not buried three clicks in. Photos showed the actual item, including the scuffs. The comparison against the new price was stated plainly, without a fake countdown.

The seller side got simpler too. Parents have a garage full of gear they've stopped using, and the intake form now explains the process in a few steps instead of a wall of policy.

We're not claiming to have saved a specific number of items from landfill. That would be a nice number to have, but I don't have it.

What I can say is that the marketplace feels less like a gamble, and more like a sensible way to buy.""",
                "notes": "The environmental and operational observations require client approval and data before any figure is used.",
            },
        ],
    },
    {
        "slug": "caden-lane",
        "name": "Caden Lane",
        "url": "https://cadenlane.com/",
        "niche": "Personalised baby gifts",
        "intro": "A baby brand selling personalised swaddles, name blankets, newborn outfits and nursery keepsakes.",
        "categories": [
            "Personalised swaddles and name blankets",
            "Newborn outfits and accessories",
            "Nursery decor and keepsakes",
            "Baby shower and new-parent gifts",
        ],
        "audience": "New parents, grandparents and gift buyers looking for a sentimental, presentation-ready baby gift with a name on it.",
        "identity": [
            "Soft, contemporary nursery aesthetic with floral and seasonal prints.",
            "Personalisation as the product's emotional core.",
            "Gift-ready presentation and a strong baby-shower use case.",
        ],
        "characteristics": [
            "Name and birth-stat personalisation on swaddles and blankets.",
            "Large print library with seasonal and themed collections.",
            "Personalised keepsakes beyond textiles.",
            "Gift bundles and hospital-bag positioning.",
        ],
        "design_ops": [
            "Keep the name legible without overpowering the print.",
            "Show the personalised result accurately at thumbnail and detail level.",
            "Maintain a soft, gift-like visual language across categories.",
        ],
        "dev_ops": [
            "Validate names and birth details before production.",
            "Show an accurate preview for font, colour and placement.",
            "Handle gift bundles and lead times without ambiguity.",
        ],
        "angles": [
            "Personalisation as an emotional design decision.",
            "Name and birth-stat data in the production flow.",
            "The baby-shower gift deadline.",
        ],
        "observed": "Personalised swaddle blankets at a fixed price point; name, birth-stat and monogram options; seasonal print collections; newborn outfits, keepsakes and gift bundles; gift and hospital-bag content.",
        "confirm": [
            "Which templates or personalisation features Abdul delivered.",
            "Whether preview or validation logic was in scope.",
            "Which pages he designed or built.",
            "The brand's approved qualitative outcome.",
        ],
        "contribution": "Caden Lane sells a name before it sells a blanket. The work centred on making personalisation feel effortless and accurate: a preview that reflects font, colour and placement, validation that catches unsupported characters before an order reaches production, and a product page that keeps the print visible alongside the name. Gift bundles and lead times were treated as part of the emotional purchase, since a baby-shower gift that arrives late has already failed.",
        "verify_desc": [
            "That Abdul implemented personalisation or preview features.",
            "That validation logic was part of his scope.",
            "That gift bundle presentation was his work.",
        ],
        "verify_tests": [
            "The speaker's role and consent.",
            "The claim that the preview matches production output.",
            "Any claim about personalisation errors or returns.",
            "Any conversion, revenue or seasonal-sales claim.",
        ],
        "tests": [
            {
                "label": "Design & Visual Experience",
                "speaker": "Nursery brand designer",
                "tone": "Soft, precise",
                "perspective": "Balancing a name with a print.",
                "script": """A personalised swaddle has two design elements competing for attention: the pattern and the name.

Get the balance wrong and you have a busy print with a name shouting over it. Get it right and the name feels like part of the fabric.

What worked at Caden Lane was scale. The name sits in a considered area of the blanket, not across the middle of the pattern. The font choices are limited, which is a good thing. The preview shows the actual proportion, so you can see whether 'Alexandra' will fit before you pay.

The photography is soft and domestic without being saccharine. A crib, a pair of hands, natural light. It looks like a gift, which is what it is.

The seasonal prints get to be playful. The interface around them stays quiet.

That's a difficult balance to hold across a large print library, and it holds.""",
                "notes": "Design observations only; confirm the speaker and scope.",
            },
            {
                "label": "Development & Technical Execution",
                "speaker": "Ecommerce developer, personalised products",
                "tone": "Practical, exact",
                "perspective": "Names, dates and production-ready previews.",
                "script": """A personalised blanket looks simple until you see the order data.

The name has to be validated, the font has to be one the production team can actually stitch or print, the placement has to match the approved artwork, and the birth stats have to fit without wrapping into the border.

The work I reviewed treated those as constraints in the interface, not as notes for a human to catch later. Character limits were set per font. Unsupported symbols were rejected before checkout. The preview used the production artwork rather than a generic mock-up, so what the customer approved was what the printer received.

Gift bundles added another layer. A blanket plus a bodysuit plus a card is a single order but three production paths, and the confirmation has to say what ships when.

We tested the apostrophe case, because names like 'Leighton's Lavender' break naive validation.

Small detail. Very visible when it fails.""",
                "notes": "Technical claims require confirmation against the real build.",
            },
            {
                "label": "Overall Project & Shopping Experience",
                "speaker": "Customer care lead, baby gifting",
                "tone": "Warm, candid",
                "perspective": "The baby-shower deadline.",
                "script": """Most of our orders are gifts, and most of those have a date attached. A shower, a due date, a hospital bag that needs to be packed by Friday.

That changes the questions. Not 'is it soft' but 'will it arrive in time, and will the name be right'.

The site handles the first one better now. Made-to-order timing is stated before checkout, and the gift options don't pretend a personalised item can ship tomorrow.

The second one is about confidence. Seeing the name in the chosen font, at the right size, does more than a paragraph of reassurance. The confirmation repeats it back, which catches the occasional typo before it becomes a keepsake with someone else's spelling.

We still get requests to change a name. People are human. But the volume of those requests has shifted, and the conversations are calmer.

For a gift brand, calm is worth a lot.""",
                "notes": "The request-volume observation is qualitative and must be approved. No metric is stated.",
            },
        ],
    },
]
