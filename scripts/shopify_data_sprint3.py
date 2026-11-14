PROJECTS = [
    {
        "slug": "lovisa",
        "name": "Lovisa",
        "url": "https://www.lovisa.com/",
        "niche": "Fashion jewellery",
        "intro": "A trend-led fashion jewellery retailer selling earrings, body piercing jewellery and accessories online and through a large store network.",
        "categories": [
            "Earrings, ear stacks and ear cuffs",
            "Body and piercing jewellery",
            "Necklaces, rings and wristwear",
            "Hair accessories and gift items",
        ],
        "audience": "Young, trend-driven shoppers buying frequently at low price points, often combining an online browse with an in-store piercing appointment.",
        "identity": [
            "Fast, bold and trend-first, with frequent new-in drops.",
            "Highly visual merchandising built around ear stacks and styling combinations.",
            "Piercing services and aftercare treated as part of the retail offer, not an add-on.",
        ],
        "characteristics": [
            "Large, dense collection pages with strong promotional labelling.",
            "Shop-by-piercing navigation covering cartilage, nose, helix, belly and nipple.",
            "Store locator and piercing appointment information.",
            "Regional storefronts with local pricing and catalogues.",
        ],
        "design_ops": [
            "Keep new-in energy without turning collection pages into visual clutter.",
            "Make ear-stack styling easy to understand and replicate.",
            "Hold product photography consistent across a very fast-moving range.",
        ],
        "dev_ops": [
            "Handle a large variant matrix of finish, size and pack count.",
            "Keep piercing-placement filters accurate as the range changes.",
            "Support regional catalogues and pricing without duplicating templates.",
        ],
        "angles": [
            "Trend velocity as a design constraint.",
            "Piercing-placement navigation and variant accuracy.",
            "Connecting the online browse to the in-store piercing appointment.",
        ],
        "observed": "A dense, promotion-led storefront; new-in and best-seller rails; shop-by-piercing navigation; surgical steel and titanium callouts; store locator and piercing FAQ content; regional sites.",
        "confirm": [
            "Which storefront templates Abdul worked on.",
            "Whether piercing-placement filters or store locator were in scope.",
            "Whether regional storefront work was part of the engagement.",
            "Any approved qualitative result.",
        ],
        "contribution": "Lovisa's catalogue moves faster than most jewellery stores, which makes consistency the hard part. The work focused on collection templates that can absorb weekly drops without losing hierarchy: new-in and best-seller rails with clear entry points, product cards that keep finish and pack count readable, and piercing-placement navigation that reflects how customers actually shop for body jewellery. The storefront keeps its loud, trend-led character while staying navigable on a phone.",
        "verify_desc": [
            "That Abdul built or customised the collection template.",
            "That piercing-placement navigation was his work.",
            "That regional storefront support was in scope.",
        ],
        "verify_tests": [
            "The speaker's role and consent.",
            "The claim that new arrivals can be merchandised without developer involvement.",
            "Any statement about piercing bookings or store traffic.",
            "Any conversion or sales implication.",
        ],
        "tests": [
            {
                "label": "Design & Visual Experience",
                "speaker": "Trend and creative lead, fashion jewellery",
                "tone": "Quick, energetic",
                "perspective": "Keeping speed from becoming visual noise.",
                "script": """Fast jewellery is judged in about two seconds. You see a pair of earrings, you either want them or you keep scrolling. There's no room for a slow reveal.

Lovisa drops new pieces constantly, so the design can't depend on everything being perfectly art-directed. What worked was a consistent frame: the same crop, the same light, the same place for the price and the pack count. The trend changed; the frame didn't.

The ear stacks were the clearest example. Instead of showing one earring floating on white, the page showed a full ear, curated. That's how people actually wear the product, and it made the styling legible without a caption.

We kept the sale stickers, because that's the business. But they stopped covering the product.

The new-in rail became the front door, which is where our customer actually starts.

It still feels fast. It just doesn't feel messy.""",
                "notes": "Design observations only. Confirm the speaker and that these templates were Abdul's work.",
            },
            {
                "label": "Development & Technical Execution",
                "speaker": "Ecommerce engineer, multi-region retail",
                "tone": "Brisk, technical",
                "perspective": "A fast-moving variant matrix across regions.",
                "script": """A store like Lovisa isn't hard because of any single page. It's hard because the catalogue changes every week, in several countries, with finishes, sizes and pack counts that don't map cleanly between markets.

The work I looked at kept the templates generic enough to survive that. Product options were driven by structured values, so adding a gold finish to an existing shape didn't require a new page design. Regional catalogues could differ without forking the theme.

Piercing filters were the other piece. Cartilage, helix, nose, belly: those aren't decorative tags, they're how someone decides whether a piece is usable. The filter had to stay accurate as products were added, which means the attribute belongs in the data, not the title.

We checked the image-heavy collection pages on a mid-range phone, because that's the real device. A grid that looks fine on a laptop can crawl on mobile data.

Speed is a design feature here, even if nobody says it out loud.""",
                "notes": "Technical claims require confirmation. The performance observation is qualitative.",
            },
            {
                "label": "Overall Project & Shopping Experience",
                "speaker": "Retail and piercing operations lead",
                "tone": "Warm, brisk",
                "perspective": "Bridging the online browse and the in-store appointment.",
                "script": """A lot of our customers shop online and get pierced in store. Those are two different journeys, and the handoff used to be clumsy.

Someone would find a stud they liked, then arrive without knowing whether it was suitable for a fresh piercing or whether the store had it in stock. That's a bad start to an appointment.

What improved was the information at the point of interest. Piercing placement, jewellery type and aftercare guidance sat together, and the store locator became part of that flow instead of a separate page.

It also helped that the site stopped assuming every visitor knows the terminology. 'Flat back' and 'labret' mean something to someone with five piercings. They mean nothing to a fifteen-year-old booking her first.

The questions in the studio are better now. People arrive with a piece in mind rather than a screenshot and a hope, and the piercer can spend the appointment on the piercing instead of the explanation.""",
                "notes": "The in-store observation is qualitative and must be approved. No booking metric is claimed.",
            },
        ],
    },
    {
        "slug": "baby-gold",
        "name": "Baby Gold",
        "url": "https://www.babygold.com/",
        "niche": "Personalised fine jewellery",
        "intro": "A Los Angeles fine-jewellery brand specialising in 14k solid gold name necklaces, charms and personalised pieces.",
        "categories": [
            "Custom name and initial necklaces",
            "Diamond and gemstone personalised pieces",
            "Charms, earrings and rings",
            "Children's and engravable jewellery",
        ],
        "audience": "Gift buyers and self-purchasers looking for sentimental, made-to-order gold jewellery, often for a birth, birthday or milestone.",
        "identity": [
            "Warm, personal and family-oriented, with an emphasis on names and milestones.",
            "Product photography centred on layering, skin and everyday wear.",
            "Made-to-order craft positioned as the reason for lead times, not a caveat.",
        ],
        "characteristics": [
            "Custom text fields, font choices and chain lengths on product pages.",
            "Price varies by metal colour, length and personalisation.",
            "Made-to-order and in-stock states displayed side by side.",
            "Gift and layering content alongside the core name-necklace range.",
        ],
        "design_ops": [
            "Make the personalisation preview feel trustworthy rather than decorative.",
            "Keep layered styling aspirational without obscuring the single piece.",
            "Communicate lead times without dampening the emotional purchase.",
        ],
        "dev_ops": [
            "Validate names, characters and fonts before an order reaches production.",
            "Tie price and lead time to the selected personalisation.",
            "Keep made-to-order and in-stock states distinct in the cart.",
        ],
        "angles": [
            "Designing around an emotional, made-to-order purchase.",
            "Personalisation validation and production handoff.",
            "Managing gifting deadlines and spelling anxiety.",
        ],
        "observed": "A warm, editorial storefront; 14k gold name necklaces with font and chain-length options; made-to-order and in-stock labels; prices that vary by configuration; Los Angeles-made positioning; children's and gifting collections.",
        "confirm": [
            "Whether Abdul worked on the personalisation interface.",
            "Whether product templates or variant pricing were in scope.",
            "Which pages he built or customised.",
            "The client's approved qualitative outcome.",
        ],
        "contribution": "Baby Gold sells sentiment, which makes the personalisation interface the most important part of the page. The work focused on making that interface trustworthy: clear font and chain selection, validation before checkout, and pricing that reflects the configuration rather than appearing after the fact. Made-to-order and in-stock pieces were kept visually distinct, and lead times were stated where they affect a gift deadline, so the emotional decision is not undermined by logistics discovered too late.",
        "verify_desc": [
            "That Abdul built or customised the personalisation interface.",
            "That variant pricing and lead-time display were his work.",
            "That any template changes were part of the engagement.",
        ],
        "verify_tests": [
            "The speaker's name, role and consent.",
            "The claim that validation catches spelling and character issues.",
            "The claim that production receives clean order data.",
            "Any revenue, conversion or average-order-value claim.",
        ],
        "tests": [
            {
                "label": "Design & Visual Experience",
                "speaker": "Creative director, fine jewellery",
                "tone": "Warm, careful",
                "perspective": "Designing around a name, not a product.",
                "script": """A name necklace is a strange product when you think about it. The customer is not choosing a design. They're choosing a person.

That changes how the page should feel. Baby Gold's product photography does something smart: it shows the piece on skin, layered, at the length it will actually sit. Not floating on a bust, not blown up to five times its size.

The design work I noticed was mostly about clarity around the emotional part. The font selector shows the name in the actual typeface. The chain length is explained by where it falls, not just in inches. The metal colour is shown on a wrist as well as on white.

It's still a jewellery site, with all the usual polish. But it doesn't try to make the moment bigger than it is.

The best compliment I can give it is that it feels like a good shop assistant handing you the piece and then stepping back.""",
                "notes": "Design observations only; confirm the speaker and that the interface was Abdul's work.",
            },
            {
                "label": "Development & Technical Execution",
                "speaker": "Ecommerce developer, made-to-order retail",
                "tone": "Precise, pragmatic",
                "perspective": "Personalisation data that survives all the way to production.",
                "script": """Personalised jewellery is a data problem wearing a pretty dress.

A name is not a variant. It's free text that has to survive validation, encoding, a production PDF and a human jeweller. Get any of that wrong and you've made the wrong necklace.

The implementation I reviewed treated the personalisation as structured order data, not a note field. Character limits, supported alphabets, font selection and chain length were validated before checkout, so an order couldn't reach the bench with an unsupported symbol or an empty name.

Pricing was tied to the configuration. A longer chain or a diamond setting changed the total at selection, not in a surprise line at the end.

Made-to-order and in-stock pieces also had to behave differently. One has a lead time; the other ships now. Mixing them in the cart without saying so creates a support ticket before the order even arrives.

Boring work. It's the difference between a keepsake and a refund.""",
                "notes": "Technical claims require verification against the actual build.",
            },
            {
                "label": "Overall Project & Shopping Experience",
                "speaker": "Customer care lead, personalised gifts",
                "tone": "Friendly, candid",
                "perspective": "Spelling anxiety and gift deadlines.",
                "script": """People check the spelling of a name about four times before they order. Then they email us to check it again.

So the page has to do more than accept text. It has to show the name back clearly, in the chosen font, at the chosen length, and make it obvious that this is what will be made.

The other anxiety is timing. A name necklace is usually a gift, and gifts have dates. Made-to-order pieces take longer, and the site now says that before checkout rather than after.

I like that it doesn't push rush shipping on everyone. If you have three weeks, you don't need to pay for panic.

We still get the occasional 'can I change the spelling' email. That's human. But the order confirmation repeats the name and the font, so there's less guessing on both sides.

For a product this personal, less guessing is the whole job.""",
                "notes": "The four-checks observation is the client's own qualitative account and needs approval.",
            },
        ],
    },
    {
        "slug": "almagems",
        "name": "AlmaGems",
        "url": "https://almagems.com/",
        "niche": "Personalised gifts",
        "status": "Scope unconfirmed; niche corrected to personalised gifts",
        "intro": "A personalised gift store spanning engraved leather bags, jewellery dishes, drinkware, ornaments and printed keepsakes.",
        "categories": [
            "Personalised leather bags and wallets",
            "Jewellery dishes and engraved accessories",
            "Drinkware, mugs and tumblers",
            "Ornaments, blankets and memorial gifts",
        ],
        "audience": "Gift buyers shopping for birthdays, Mother's Day, anniversaries, new babies and pet memorials, often under time pressure.",
        "identity": [
            "Sentimental and message-led, with quotes and personal names at the centre of the product.",
            "A broad gifting catalogue rather than a single craft category.",
            "Soft lifestyle photography and emotionally direct copy.",
        ],
        "characteristics": [
            "Personalisation fields across many unrelated product types.",
            "Occasion and recipient-based collections.",
            "Product photography showing the engraved or printed message.",
            "A wide catalogue with frequent discounts and multi-buy offers.",
        ],
        "design_ops": [
            "Keep sentiment central without letting the catalogue feel chaotic.",
            "Make the personalised message legible in every product photograph.",
            "Give occasion and recipient routes equal weight to product categories.",
        ],
        "dev_ops": [
            "Handle personalisation across products with different production methods.",
            "Preview text accurately for engraving versus printing.",
            "Keep discount and multi-buy rules clear at the cart.",
        ],
        "angles": [
            "Emotional gifting across a heterogeneous catalogue.",
            "One personalisation system for engraving, printing and embroidery.",
            "Occasion-led navigation for last-minute gift buyers.",
        ],
        "observed": "Personalised leather bags, jewellery dishes, tumblers, mugs, ornaments and blankets; message-based designs; occasion collections; discount codes and multi-buy offers; personalisation fields on product pages.",
        "confirm": [
            "Whether Abdul worked on personalisation or collection templates.",
            "Whether the occasion navigation was part of his scope.",
            "Which pages he designed or built.",
            "Any approved qualitative result.",
        ],
        "contribution": "AlmaGems sells a feeling attached to an object, and the catalogue spans engraving, printing and embroidery, so the storefront has to make personalisation feel consistent across very different products. The work focused on a shared personalisation pattern with production-appropriate previews, occasion-led navigation that meets gift buyers where they start, and product photography that keeps the message legible. Discount and multi-buy mechanics were kept clear at the cart rather than layered on as surprises.",
        "verify_desc": [
            "That Abdul implemented the personalisation pattern.",
            "That occasion navigation or collection templates were his work.",
            "That cart discount behaviour was part of the scope.",
        ],
        "verify_tests": [
            "The speaker's role and consent.",
            "The claim that previews match production output.",
            "Any claim about reduced personalisation errors.",
            "Any conversion, revenue or seasonal-sales claim.",
        ],
        "tests": [
            {
                "label": "Design & Visual Experience",
                "speaker": "Brand lead, personalised gifting",
                "tone": "Warm, straightforward",
                "perspective": "Selling sentiment across a broad catalogue.",
                "script": """Personalised gifts are bought in a slightly vulnerable mood. Someone is trying to say something to a person they love, and they're worried the object won't carry it.

That's a lot of weight for a jewellery dish.

What worked in the design was treating the message as the hero. The engraving or print is legible in the photograph, not blurred into a lifestyle scene. The product sits in a real room, but the words are still readable.

The catalogue is genuinely broad: leather bags, tumblers, blankets, ornaments. Keeping a consistent visual language across that is harder than styling one category well. The frame stayed soft and warm, and the typography stayed out of the way.

We also gave occasions a proper route through the site. Mother's Day, a new baby, a pet memorial. People don't start with 'engraved leather wallet'. They start with a person.

The store feels like a gift shop, not a warehouse. That matters.""",
                "notes": "Design observations require confirmation of scope.",
            },
            {
                "label": "Development & Technical Execution",
                "speaker": "Ecommerce developer, personalised products",
                "tone": "Methodical, plain-spoken",
                "perspective": "One personalisation flow across engraving, printing and embroidery.",
                "script": """Personalisation gets complicated when the catalogue isn't one thing.

An engraved leather wallet, a printed mug and an embroidered blanket all need a name or a message, but they don't need the same fields. Engraving has a character limit and a fixed area. Printing can handle a longer line. Embroidery has its own constraints and a different proof.

The work I reviewed created a shared pattern without pretending the products were identical. Each product declared what it could accept, and the interface adapted: character count, preview, placement. The preview wasn't decorative. It reflected what production would actually output.

Discounts added another layer. Multi-buy offers and codes need to stack predictably, or the customer sees one total on the product page and another in the cart.

We tested the unglamorous paths: a personalised item added with a non-personalised one, a code applied after a multi-buy, a message with an apostrophe.

Those are the orders that used to generate emails.""",
                "notes": "Technical claims must be confirmed. No result metric is given.",
            },
            {
                "label": "Overall Project & Shopping Experience",
                "speaker": "Customer support lead, gifting",
                "tone": "Bright, practical",
                "perspective": "Last-minute gift buyers and delivery expectations.",
                "script": """Our busiest weeks are the ones where everyone has left it late.

A gift buyer doesn't want to browse a catalogue. They want to know three things: will it arrive on time, will the personalisation look right, and can they change their mind if they get the spelling wrong.

The site got better at answering those in order. Delivery estimates appeared earlier. Personalised items were clearly marked as final sale. The preview showed the name in the right font before anyone paid.

We also simplified the occasion pages. If you're shopping for a pet memorial, you don't need to see a Father's Day tumbler. Sounds obvious, but a broad catalogue makes those mistakes easily.

I won't pretend returns disappeared. Personalised products are difficult that way. But the conversations are shorter now, because the expectations are set before the order rather than after.

For a small team, shorter conversations matter.""",
                "notes": "The support observation is qualitative and must be client-approved.",
            },
        ],
    },
    {
        "slug": "momcozy",
        "name": "Momcozy",
        "url": "https://momcozy.com/",
        "niche": "Maternity & baby care",
        "intro": "A maternity and baby brand selling wearable breast pumps, nursing essentials, postpartum care and baby monitoring products.",
        "categories": [
            "Wearable and traditional breast pumps",
            "Nursing bras and maternity wear",
            "Postpartum recovery and care",
            "Baby monitors and feeding accessories",
        ],
        "audience": "New and expectant parents, often sleep-deprived and time-poor, researching a purchase on a phone while feeding or settling a baby.",
        "identity": [
            "Supportive and reassuring rather than clinical.",
            "Education-led: fit, suction, flange sizing and cleaning are explained alongside the product.",
            "A broad ecosystem of maternity products rather than a single hero device.",
        ],
        "characteristics": [
            "Product pages with sizing and fit guidance.",
            "Comparison content across pump models.",
            "Bundles combining pumps, bras and accessories.",
            "Heavy reliance on mobile traffic and video content.",
        ],
        "design_ops": [
            "Keep guidance calm and scannable for a distracted reader.",
            "Make model comparison possible without a spreadsheet.",
            "Reduce visual clutter around clinical or intimate subjects.",
        ],
        "dev_ops": [
            "Handle bra sizing and pump-part compatibility in variants.",
            "Keep bundle contents and prices accurate in the cart.",
            "Make sizing help reachable without losing the product selection.",
        ],
        "angles": [
            "Designing for a exhausted, mobile-first customer.",
            "Fit and compatibility logic across a product ecosystem.",
            "Education that reduces pre-purchase uncertainty.",
        ],
        "observed": "Wearable pump ranges with comparison content; nursing bras with band and cup sizing; postpartum and baby products; bundles; sizing guides; heavy mobile presentation and video.",
        "confirm": [
            "Whether Abdul worked on product, sizing or bundle templates.",
            "Whether comparison content was part of the scope.",
            "Which pages he designed or built.",
            "The brand's approved qualitative outcome.",
        ],
        "contribution": "Momcozy's customer is usually reading on a phone, one-handed, with very little patience for a marketing page. The work focused on short, scannable guidance: fit and sizing help close to the selector, pump comparisons built around the few differences that affect a decision, and bundles whose contents stay visible through the cart. The visual language stays calm and supportive, which matters for products that are intimate, clinical and emotional at the same time.",
        "verify_desc": [
            "That Abdul implemented sizing, comparison or bundle templates.",
            "That the fit guidance was part of his scope.",
            "That any mobile layout changes were his.",
        ],
        "verify_tests": [
            "The speaker's role and consent.",
            "The claim that sizing help reduced returns.",
            "Any statement about conversion or repeat purchase.",
            "The description of pump compatibility.",
        ],
        "tests": [
            {
                "label": "Design & Visual Experience",
                "speaker": "Brand designer, maternal health",
                "tone": "Calm, empathetic",
                "perspective": "Designing for a reader who has one hand free.",
                "script": """Our customer is usually reading on a phone, at two in the morning, with a baby on her chest. That's not a persona exercise. It's the actual context.

So the page can't ask for much. Short lines. Clear headings. The answer to 'will this fit me' within a thumb's reach.

What I noticed in the design was restraint around the clinical parts. Pump specs can read like a manual. Here they're broken into small blocks with the practical detail first: how it fits, how loud it is, how long the battery lasts.

The photography helps. Real bodies, real positions, not a woman in a white robe smiling at a window.

It still has to sell, obviously. But it sells by lowering the temperature.

The comparison table is a good example. Three pumps, four lines of difference, no spec dump. You can decide in under a minute.

When you're exhausted, calm is a feature.""",
                "notes": "Design observations only; confirm the speaker and scope.",
            },
            {
                "label": "Development & Technical Execution",
                "speaker": "Ecommerce developer, health and baby products",
                "tone": "Practical, exact",
                "perspective": "Fit and compatibility logic across a product ecosystem.",
                "script": """Maternity products have a deceptively complicated variant problem.

A nursing bra isn't small, medium, large. It's band plus cup, and the size chart doesn't map cleanly to a generic apparel template. A pump has parts that need to fit the pump you already own. A bundle has to know which components are included and which are optional.

The work I reviewed handled those as separate data models rather than forcing everything into one dropdown. Bra sizing had its own selector with guidance. Pump parts were tied to compatible models. Bundles declared their contents, so the cart showed the set rather than a single line called 'bundle'.

We tested the mobile path specifically, because a two-step size selector can easily become unusable at that width. If the customer has to pinch and zoom to find her band size, the page has failed.

The technology is invisible when it works. She just finds her size and moves on.""",
                "notes": "Technical claims require verification. No outcome metric is stated.",
            },
            {
                "label": "Overall Project & Shopping Experience",
                "speaker": "Customer experience lead, parenting products",
                "tone": "Warm, grounded",
                "perspective": "Reducing pre-purchase uncertainty for first-time parents.",
                "script": """First-time parents ask the same questions we did: is this going to work for me, is it worth the money, and can I return it if it doesn't.

The site can't answer the first one completely. Every body is different. But it can be honest about fit, show the size guide before the add-to-cart button, and explain the return policy in a sentence a tired person can understand.

What changed was the order of information. Comparison first, then fit, then the emotional stuff. Before, it was the other way around, and people had to scroll past a lot of reassurance to find a size chart.

The other improvement was support. A route to a human being, visible on the product page, not buried under 'contact us'.

We don't have a returns number to boast about. But the questions we get are more specific now, which tells me people are reading before they buy.""",
                "notes": "The support observation is qualitative and needs client approval.",
            },
        ],
    },
    {
        "slug": "zulily",
        "name": "Zulily",
        "url": "https://www.zulily.com/",
        "niche": "Off-price family retail",
        "status": "Archive and owner approval required; storefront in transition",
        "intro": "A flash-sale style off-price retailer covering women's, children's and home products.",
        "categories": [
            "Women's fashion and accessories",
            "Kids' clothing and baby gear",
            "Home and kitchen",
            "Seasonal and clearance events",
        ],
        "audience": "Value-focused families who enjoy browsing limited-time deals and discovering brands at a discount.",
        "identity": [
            "Deal-led and event-driven, with a treasure-hunt browsing model.",
            "Broad, rotating assortment rather than a stable branded catalogue.",
            "Urgency built into the interface through time-limited events.",
        ],
        "characteristics": [
            "Event-based merchandising with start and end times.",
            "Very large, fast-changing product grid.",
            "Deep discount labelling and final-sale messaging.",
            "Ownership and platform changes have disrupted continuity; the storefront is not consistently live.",
        ],
        "design_ops": [
            "Keep urgency legible without making the page feel chaotic.",
            "Give rotating events a clear structure and entry point.",
            "Maintain product-card clarity across wildly different categories.",
        ],
        "dev_ops": [
            "Schedule event windows and expiry states reliably.",
            "Handle taxonomy across unrelated categories.",
            "Plan redirects and archived states for a storefront in transition.",
        ],
        "angles": [
            "Designing urgency without visual noise.",
            "Event scheduling and catalogue churn.",
            "The treasure-hunt browse and its limits.",
        ],
        "observed": "Historically an event-led flash-sale storefront with time-limited collections, deep discounts and a broad family assortment. The site has changed ownership repeatedly and has been offline or in relaunch, so no current storefront can be treated as stable.",
        "confirm": [
            "Which version of the storefront the work relates to, and when.",
            "Whether Abdul's work is historical and whether screenshots can be supplied.",
            "Whether the current operator authorises any reference to the brand.",
            "Whether any live URLs or assets can be shown at all.",
        ],
        "contribution": "Zulily's storefront model is built on rotation: events start and expire, assortment changes weekly, and the same template has to carry fashion, baby gear and kitchenware. Any portfolio entry should describe the specific version of the storefront that was worked on, with an archived date, because the site has changed ownership and availability several times. The relevant craft is structural: event scheduling that expires cleanly, product cards that stay legible across categories, and a browse experience that makes urgency feel intentional rather than chaotic.",
        "verify_desc": [
            "The exact date and version of the storefront Abdul worked on.",
            "That the brand's current owner authorises the portfolio reference.",
            "That the described event or template work was his.",
            "That archived screenshots exist and can be published.",
        ],
        "verify_tests": [
            "The speaker's identity and former role, with consent.",
            "Any claim that the work is current; it must be dated.",
            "Any traffic, sales or conversion statement.",
            "Any description of functionality that cannot be verified from an archive.",
        ],
        "tests": [
            {
                "label": "Design & Visual Experience",
                "speaker": "Art director, off-price ecommerce",
                "tone": "Brisk, unsentimental",
                "perspective": "Making urgency feel designed rather than shouty.",
                "script": """Flash-sale design lives on a knife edge. Push the urgency too hard and the page looks like a clearance bin. Pull back too far and nobody remembers the event ends tonight.

The version I worked on tried to solve that with structure rather than louder stickers. Each event had a clear header, a stated end time, and a grid that stayed consistent no matter what was inside it. Fashion, baby gear, a blender: same card, same rules.

That consistency is what makes the urgency readable. If every tile is shouting, nothing stands out.

We also trimmed the promotional layers. One discount message, one deadline, one call to action. The page still felt busy, because the model is busy, but it stopped feeling arbitrary.

The card carried the price, the discount and the deadline in the same order every time. That's the whole trick.

I wouldn't call it calm. It's not supposed to be. It just had to look like someone had made decisions.""",
                "notes": "Requires the specific archived version and date. The speaker's former role must be confirmed.",
            },
            {
                "label": "Development & Technical Execution",
                "speaker": "Front-end developer, marketplace retail",
                "tone": "Dry, technical",
                "perspective": "Event windows and a catalogue that never stops moving.",
                "script": """Event-based retail is a scheduling problem before it's a design problem.

An event has a start, an end, a set of products and a price treatment. When it expires, the page can't just disappear. It needs a sensible state: sold out, ended, or redirected to the next thing. Multiply that by dozens of concurrent events and you get a system that has to fail gracefully.

The build I reviewed treated events as data with windows, not as hand-built pages. That meant the same template could render a weekend sale and a clearance event without a new layout each time.

The catalogue churn was the other challenge. Products move between categories, brands appear and disappear, and the navigation has to stay coherent. Redirects matter more than people think. A dead end in a flash sale is a lost customer.

We tested expiry, because it's the least glamorous state and the most visible when it breaks.

Nobody designs the 'this event has ended' page. They should.""",
                "notes": "Technical claims must be tied to a dated build and confirmed. The storefront's current state prevents live verification.",
            },
            {
                "label": "Overall Project & Shopping Experience",
                "speaker": "Ecommerce operations lead, off-price retail",
                "tone": "Candid, experienced",
                "perspective": "The treasure-hunt browse and where it breaks down.",
                "script": """The appeal of a flash sale is the hunt. You don't come looking for a specific coat. You come to see what's there.

That works when the browsing is good. It falls apart when the filters are wrong, the stock is stale, or the thing you tapped is already gone.

What improved was the honesty of the grid. Sold-out items were marked clearly instead of sitting there looking available. Event end times were visible. The filters reflected the actual assortment rather than a template list from three seasons ago.

The checkout also stopped surprising people. Final-sale messaging appeared before payment, not after.

I've worked through several platform changes here, so I'm careful about claiming credit for any single number. What I can say is that a deal site lives on trust. If people believe the price and the stock are real, they'll keep hunting.

If they don't, no amount of urgency fixes it.""",
                "notes": "The speaker's history and all operational claims require confirmation. The storefront's ownership changes must be disclosed.",
            },
        ],
    },
]
