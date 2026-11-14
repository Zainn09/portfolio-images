PROJECTS = [
    {
        "slug": "modani",
        "name": "Modani",
        "url": "https://modani.com/",
        "niche": "Modern furniture & home",
        "intro": "A modern furniture retailer selling sofas, beds, dining and case goods online and through showrooms.",
        "categories": [
            "Sofas, sectionals and accent seating",
            "Beds, bedroom furniture and storage",
            "Dining tables, chairs and bar furniture",
            "Lighting, rugs and decor",
        ],
        "audience": "Homeowners and apartment dwellers buying statement furniture, often comparing online before visiting a showroom or booking a design consultation.",
        "identity": [
            "Contemporary, showroom-led aesthetic with lifestyle room photography.",
            "Promotion-heavy merchandising: markdowns, countdowns and MSRP comparisons sit alongside premium imagery.",
            "Practical service messaging around delivery, financing and a five-year protection plan.",
        ],
        "characteristics": [
            "Homepage built as a stack of campaign, category and product modules.",
            "Room-scene photography mixed with cut-out product shots.",
            "Deep sale collection structure by product type.",
            "Showroom locator and design consultation treated as first-class actions.",
        ],
        "design_ops": [
            "Keep promotional urgency from overpowering the product photography.",
            "Standardise crop ratios so the same sofa reads consistently across carousels and collection pages.",
            "Improve price hierarchy where sale price, compare-at price and financing compete.",
        ],
        "dev_ops": [
            "Make homepage modules independent so campaign changes do not break adjacent layouts.",
            "Handle variant pricing consistently across product and collection templates.",
            "Check dense product grids at tablet widths and on real devices.",
        ],
        "angles": [
            "Premium presentation inside a discount-driven calendar.",
            "A modular homepage that merchandising can change safely.",
            "The mobile-to-showroom path for a high-consideration purchase.",
        ],
        "observed": "A campaign-led homepage with a countdown, category tiles and product carousels; sale pricing with crossed-out MSRP; showroom and consultation links in the header; white-glove delivery, financing and protection-plan messaging.",
        "confirm": [
            "Which parts of the storefront Abdul designed or developed.",
            "Whether the work was a new build, a theme customisation or a targeted fix.",
            "Whether the homepage module system was part of the engagement.",
            "Any approved qualitative outcome the client is willing to stand behind.",
        ],
        "contribution": "The storefront work centred on the tension between a promotional calendar and a premium furniture catalogue. Page structure was organised so campaign messaging, room imagery and product detail each had a clear role, with consistent treatment of sale pricing and product crops across collection and product templates. Responsive behaviour received particular attention at the tablet widths where multi-column furniture grids tend to collapse, and the homepage was treated as a set of independently editable modules rather than one fixed composition.",
        "verify_desc": [
            "That Abdul delivered the page structure and module approach described.",
            "That pricing and crop consistency were part of his scope.",
            "That tablet and device testing was performed by him rather than another team member.",
        ],
        "verify_tests": [
            "The speaker's role and relationship to the project.",
            "The claim that homepage sections can be edited independently.",
            "The claim that showroom calls decreased; no data was supplied.",
            "Any reference to conversion, revenue or average order value.",
        ],
        "tests": [
            {
                "label": "Design & Visual Experience",
                "speaker": "Brand director, furniture retail",
                "tone": "Composed, precise, slightly dry",
                "perspective": "Protecting a premium feel inside a sale-heavy calendar.",
                "script": """Modani is a furniture brand, but the homepage has a job to do every week: move sofas, clear beds, hit a number. That tension is real. Before we started, a sale banner could take over the page, and the product photography ended up feeling secondary.

What I noticed in the work was restraint. The typography came down a size. The countdown stayed, but it stopped competing with the sofa. On collection pages, the crops were cleaned up so a chair looked like the same chair whether it appeared in a room scene or on its own.

That sounds small. On a furniture site, it isn't. People are spending two thousand dollars on something they'll sit on for ten years, and they need the page to feel as considered as the product.

I stopped wincing when I opened the homepage. That's the honest version. We still run promotions. We just don't let them run the page.""",
                "notes": "Confirms the visual outcome only in qualitative terms. No metric is claimed. The speaker's title and involvement must be supplied by the client.",
            },
            {
                "label": "Development & Technical Execution",
                "speaker": "Front-end lead, ecommerce agency",
                "tone": "Matter-of-fact, technical without jargon",
                "perspective": "How the homepage survives constant merchandising changes.",
                "script": """Most furniture sites don't break on launch day. They break in month three, when someone in merchandising pastes a longer headline into a hero and the whole grid shifts.

The work I saw was built around that reality. The homepage sections were treated as separate blocks, so a sale banner, a room edit and a product carousel could each change without dragging the others out of alignment. Variant pricing, where the compare-at price sits next to the sale price, was handled consistently instead of per template.

The part I appreciated was the tablet check. A three-column sofa grid at seven hundred and sixty-eight pixels is where a lot of builds quietly fall apart. We walked through it at that width, then on an actual phone, not just a browser window dragged narrow.

Merchandising can now change the page on a Friday without calling a developer. That's the test I care about.""",
                "notes": "The modular-section and pricing claims require confirmation of scope. No performance figures are stated.",
            },
            {
                "label": "Overall Project & Shopping Experience",
                "speaker": "Ecommerce and showroom operations lead",
                "tone": "Practical, grounded, conversational",
                "perspective": "The path from a phone screen to a showroom visit.",
                "script": """Our customers usually find us on their phone, screenshot a sofa, then walk into a showroom two weeks later. The gap between those two moments is where the sale either happens or dies.

What changed for us was the path. From a collection page you could get to dimensions, delivery options and the design consultation without bouncing back to the menu. On mobile, the swatch and the financing line stayed near the price instead of being buried under three screens of copy.

I remember testing it on a slow connection in the showroom, which is realistic for us. The images still arrived in a sensible order, and the page didn't jump around while they loaded.

We're not claiming some dramatic jump in conversions. I don't have that number in front of me. But fewer people call the showroom asking what's already on the product page, and that's a real change in the day.""",
                "notes": "The reduced-call observation is the client's own qualitative claim and still requires approval. Any figure must be omitted unless a dated record exists.",
            },
        ],
    },
    {
        "slug": "magnolia",
        "name": "Magnolia",
        "url": "https://magnolia.com/",
        "niche": "Home & lifestyle",
        "intro": "A home and lifestyle brand spanning furniture, decor, paint, wallpaper, kitchen and garden.",
        "categories": [
            "Furniture and lighting",
            "Magnolia Home Paint and wallpaper",
            "Decor, florals, candles and rugs",
            "Kitchen, dining and garden",
        ],
        "audience": "Homeowners drawn to the brand's relaxed, family-led aesthetic, shopping for a whole room or a single finishing piece.",
        "identity": [
            "Warm, editorial and personal, with storytelling tied to Joanna and Chip Gaines.",
            "Seasonal collections and room-based inspiration rather than discount-led merchandising.",
            "A very broad catalogue that mixes large furniture with paint, wallpaper and small decor.",
        ],
        "characteristics": [
            "Long, image-led homepage with editorial features and seasonal edits.",
            "Deep mega navigation spanning dozens of subcategories.",
            "Paint and wallpaper presented through colour and pattern families.",
            "Content and commerce interleaved, including journal-style pages.",
        ],
        "design_ops": [
            "Keep editorial pacing while making category entry points obvious.",
            "Treat paint chips and wallpaper samples as colour decisions, not ordinary product thumbnails.",
            "Hold typography and spacing steady across a very uneven catalogue.",
        ],
        "dev_ops": [
            "Standardise collection templates so furniture, paint and decor do not need separate logic.",
            "Group filters around real customer decisions: colour family, room, format, price.",
            "Test sample-versus-full-size variants through the cart.",
        ],
        "angles": [
            "Preserving brand atmosphere as the catalogue scales.",
            "Navigation and filter architecture for hundreds of SKUs.",
            "Shopping a room rather than a single product.",
        ],
        "observed": "A seasonal, editorial homepage; deep category navigation covering furniture, paint, wallpaper, decor and kitchen; paint collections with size and sheen variants; wallpaper organised by application type; journal-style content alongside shopping links.",
        "confirm": [
            "Whether the storefront work covered the full theme or selected templates.",
            "Whether paint and wallpaper variant logic was part of the scope.",
            "Which navigation or filtering changes Abdul actually implemented.",
            "The client's approved description of the outcome.",
        ],
        "contribution": "The work was framed around a catalogue that refuses to sit in one shape: furniture beside paint, wallpaper beside candles, editorial content beside product grids. Collection templates were approached as a shared system, with filters organised around decisions a customer actually makes, such as colour family, room and format. Paint and wallpaper received treatment appropriate to colour selection rather than generic product thumbnails, and the homepage kept its seasonal, magazine-like pacing without hiding the route into the catalogue.",
        "verify_desc": [
            "That Abdul worked on collection templating and filter structure.",
            "That paint and wallpaper presentation was within his scope.",
            "That any homepage pacing changes were his rather than the brand team's.",
        ],
        "verify_tests": [
            "The speaker's name, role and consent.",
            "The claim that pattern and room routes were added.",
            "Any assertion about sample-order behaviour changing.",
            "Any conversion or basket-size implication.",
        ],
        "tests": [
            {
                "label": "Design & Visual Experience",
                "speaker": "Ecommerce merchandising manager, home retail",
                "tone": "Warm, unhurried",
                "perspective": "Keeping a magazine-like brand feeling calm at catalogue scale.",
                "script": """Magnolia is a home brand before it's a store. People arrive because they liked a room, a paint colour, a way of living, and then they shop. The risk with a catalogue this size is that the feeling gets flattened into a grid of products.

The work I keep coming back to is the pacing. Seasonal stories stayed large and editorial at the top of the page, but the transition into categories got cleaner. Paint chips were treated as colours, not as tiny product thumbnails. Typography held its shape whether the headline was three words or a full sentence.

There's a lot behind that: hundreds of paint SKUs, wallpaper in different formats, furniture mixed with small decor. Making it feel calm is not a small design decision.

I noticed it most when I stopped noticing the interface. I was just looking at rooms and adding things to a cart. For a brand like ours, that's the point.""",
                "notes": "Visual observations only. The paint-chip treatment and typography claims need scope confirmation.",
            },
            {
                "label": "Development & Technical Execution",
                "speaker": "Digital product owner, home and lifestyle retail",
                "tone": "Analytical, even",
                "perspective": "One collection template instead of five parallel builds.",
                "script": """The interesting problem at Magnolia isn't the homepage. It's the depth underneath it.

Paint has sheens and sizes. Wallpaper has application types and samples. Furniture sits beside candles in the same navigation. If each of those gets its own filter logic, the site becomes a different website three clicks in.

The approach I saw was to standardise the collection template and let the product data do the work. Filters were grouped by what a customer actually decides on: colour family, room, format, price. The mega menu stopped repeating every subcategory in favour of a shorter path to the big ones.

We tested the paint flow specifically, because a sample order and a gallon order behave differently in the cart. That's the kind of edge case that gets missed when a build is judged on a screenshot rather than a journey.

The result is less bespoke code, and far fewer places for the catalogue to drift out of shape as it grows.""",
                "notes": "The standardised-template claim is a scope assumption. Confirm before recording.",
            },
            {
                "label": "Overall Project & Shopping Experience",
                "speaker": "Customer experience lead, home decor",
                "tone": "Bright, conversational",
                "perspective": "How a customer wanders from inspiration to a coordinated room.",
                "script": """I shop our own site the way a customer does: on a phone, at night, with a half-formed idea.

The change I felt was in the browse. Before, if I liked a wallpaper, I had to go hunting for the bedding or the mugs that shared the pattern. Now the collection page gives me a way through by pattern and by room, so the site suggests the connection instead of making me guess.

The paint samples are a good example. You order a small sample, you wait, you hold it against the wall. That journey needs different information from buying a gallon. The page finally treats it that way.

I don't have a conversion number to quote, and I wouldn't trust one from a testimonial anyway. What I can say is that the store feels easier to wander through, and wandering is how people buy home decor.""",
                "notes": "Pattern routes and sample-flow improvements require confirmation. Explicitly avoids metrics.",
            },
        ],
    },
    {
        "slug": "gardena",
        "name": "Gardena",
        "url": "https://www.gardena.com/int/",
        "niche": "Garden equipment",
        "intro": "A garden equipment brand covering watering, lawn care, robotic mowers and hand tools.",
        "categories": [
            "Watering, hoses, sprinklers and connectors",
            "Robotic and conventional lawn mowers",
            "Pruning, cutting and lawn tools",
            "Smart garden controls and accessories",
        ],
        "audience": "Garden owners from first-time buyers to experienced gardeners, often researching compatibility and lawn suitability before buying.",
        "identity": [
            "German engineering heritage expressed through practical, specification-led communication.",
            "A connected product system: hoses, connectors, timers and mowers that are designed to work together.",
            "Clear iconography and support content aimed at confident self-installation.",
        ],
        "characteristics": [
            "International storefront with region and language variation.",
            "Product families organised by system rather than only by product type.",
            "Specification-heavy product pages and comparison views.",
            "Support, registration and installation content linked from product pages.",
        ],
        "design_ops": [
            "Make technical ranges approachable without hiding the specifications.",
            "Use consistent product angles so families can be compared visually.",
            "Keep iconography meaningful rather than decorative.",
        ],
        "dev_ops": [
            "Treat locale, currency, units and availability as one data problem.",
            "Rebuild wide specification tables for narrow screens.",
            "Align differing attribute sets in comparison views.",
        ],
        "angles": [
            "Technical clarity across a very broad range.",
            "International storefront consistency.",
            "Pre-sale support content that answers fit and compatibility questions.",
        ],
        "observed": "Watering, robotic mower, lawn and tool categories; a smart-system section covering app control and scheduling; region selection; product pages with specification tables and support links for registration, PIN codes and installation videos.",
        "confirm": [
            "Which storefront surfaces Abdul worked on, and in which markets.",
            "Whether locale and currency handling was part of the engagement.",
            "Whether comparison or specification templates were his work.",
            "Which support-content changes are attributable to him.",
        ],
        "contribution": "This storefront carries an unusually wide technical range, from hand tools to app-connected robotic mowers, and the work focused on making that range legible. Product pages put family and purpose ahead of specification, then present the technical detail in a form that survives a narrow screen. Locale, units and availability were treated as one data problem rather than a currency switch, and comparison views were built to line up products whose attribute sets do not match.",
        "verify_desc": [
            "That Abdul implemented locale-aware pricing or specification templates.",
            "That comparison views were part of his scope.",
            "That the support-content placement was his decision.",
        ],
        "verify_tests": [
            "The speaker's role and market.",
            "The claim that specification tables were rebuilt for mobile.",
            "The claim that support calls fell; no ticket data was supplied.",
            "Any statement about search performance or conversion.",
        ],
        "tests": [
            {
                "label": "Design & Visual Experience",
                "speaker": "Category marketing manager, outdoor equipment",
                "tone": "Brisk, precise",
                "perspective": "Making a technical product family readable at a glance.",
                "script": """Gardena sells secateurs and robotic mowers on the same website. That range is the challenge. One product needs a paragraph and a picture. The other needs lawn size, slope, boundary wire and app compatibility.

What improved was the hierarchy. The product family came first, the technical detail second, and the support content sat where a nervous buyer would look for it. Icons stopped being decoration and started doing work: battery runtime, cutting width, water pressure, whatever the category actually depends on.

The photography consistency mattered more than I expected. When every mower is shot from the same three-quarter angle on the same neutral background, comparing them becomes possible.

We also stopped treating accessories as an afterthought. A connector is not a hero product, but it is the reason someone trusts the system.

We still have a very large catalogue. Nothing about that changed. But a first-time buyer can now land on a category page and understand what the products are for before being asked to compare specifications.""",
                "notes": "Design observations require confirmation that the relevant templates were Abdul's work.",
            },
            {
                "label": "Development & Technical Execution",
                "speaker": "Front-end and platform lead, international retail",
                "tone": "Dry, exact",
                "perspective": "Internationalisation and spec-heavy templates.",
                "script": """International storefronts are usually one site pretending to be several.

Gardena runs different ranges in different markets, with local pricing, local availability and local compliance language. If region switching is bolted on at the end, you get a currency symbol that updates while the product grid doesn't.

The work here treated locale as part of the page, not a skin. Prices, units and availability were sourced together. Specification tables, which are wide by nature, were rebuilt to stay readable on a phone instead of forcing a horizontal scroll through nine columns.

The other detail was units. Centimetres and inches need to switch with the market, not with the browser window.

The comparison view was the fiddly part. Products with different attribute sets still need to line up so the empty cells mean something.

I've seen prettier builds with worse bones. This one holds up when the data gets awkward, and with a catalogue like this, the data always gets awkward.""",
                "notes": "Strong technical claims. Must be verified against the actual engagement or removed.",
            },
            {
                "label": "Overall Project & Shopping Experience",
                "speaker": "Customer support operations lead",
                "tone": "Patient, matter-of-fact",
                "perspective": "Fewer avoidable pre-sale questions.",
                "script": """A lot of our support tickets are really one question: will this fit my garden?

Which mower for this lawn. Which connector for this hose. Whether the old sprinkler works with the new system. The answer exists on the site, but people call because they can't find it quickly enough.

What changed for us was having those answers closer to the decision. Lawn-size guidance on the mower pages. Compatibility notes near the connectors. A route to registration and installation videos that didn't require hunting through the footer.

The other thing was search. Gardeners don't always use our product names. They type 'hose connector' or the name of an older model. The results page now gets them to a family of products rather than a single near-match.

I can't tell you it cut our ticket volume by a specific percentage. I can tell you I answer fewer questions that the page already answers, and that gives me time for the ones that actually need a person.""",
                "notes": "The ticket-volume observation is qualitative and must be client-approved. No percentage is stated.",
            },
        ],
    },
    {
        "slug": "rifle-paper-co",
        "name": "Rifle Paper Co.",
        "url": "https://riflepaperco.com/",
        "niche": "Stationery, home & lifestyle",
        "intro": "A lifestyle brand applying hand-painted artwork to stationery, wallpaper, textiles, accessories and gifts.",
        "categories": [
            "Greeting cards, stationery and gift wrap",
            "Wallpaper, rugs and home decor",
            "Bedding, apparel and accessories",
            "Kitchen, desk and personalised gifts",
        ],
        "audience": "Gift buyers and design-minded shoppers who respond to pattern and illustration, often browsing across categories rather than shopping a single product type.",
        "identity": [
            "Hand-painted botanical and floral patterns treated as the core asset.",
            "Warm, optimistic colour and an illustrated rather than photographic visual language.",
            "Gifting and seasonal occasions drive much of the assortment.",
        ],
        "characteristics": [
            "Shop-by-pattern navigation cutting across product categories.",
            "Very wide catalogue spanning paper goods, home textiles and apparel.",
            "Wallpaper samples and personalised stationery as distinct purchase flows.",
            "Gift and occasion edits alongside standard category navigation.",
        ],
        "design_ops": [
            "Give dense artwork enough space and keep interface typography quiet.",
            "Hold colour and crop consistency between thumbnails and product pages.",
            "Make pattern the organising idea without losing category clarity.",
        ],
        "dev_ops": [
            "Use pattern as shared taxonomy across otherwise separate templates.",
            "Separate sample products from full-size variants in selectors and cart logic.",
            "Validate personalisation fields without disrupting checkout.",
        ],
        "angles": [
            "Artwork fidelity as a design constraint.",
            "Pattern-led cross-category merchandising.",
            "Gift and occasion navigation for uncertain shoppers.",
        ],
        "observed": "A pattern-led homepage with seasonal collections; shop-by-pattern navigation; wallpaper samples; personalised stationery; gift guidance; a catalogue that runs from greeting cards to furniture and pajamas.",
        "confirm": [
            "Whether Abdul worked on pattern taxonomy or collection linking.",
            "Whether wallpaper sample and personalisation flows were in scope.",
            "Which templates he built or customised.",
            "The client's approved account of the result.",
        ],
        "contribution": "Rifle Paper Co. is organised around artwork, so the storefront had to protect the illustrations rather than compete with them. The work centred on giving pattern a consistent role across categories: a shared taxonomy that lets a print move from wallpaper to stationery to apparel without losing its identity. Supporting details received equal attention, including stable crops and colour between thumbnails and product pages, clear separation of samples from full-size items, and personalisation fields that do not disturb the checkout.",
        "verify_desc": [
            "That the pattern taxonomy was designed or implemented by Abdul.",
            "That sample and personalisation flows were part of his scope.",
            "That crop and colour consistency work was his.",
        ],
        "verify_tests": [
            "The speaker's identity and relationship to the project.",
            "Any claim that cross-category linking increased basket size.",
            "Any claim about gift-guide performance.",
            "The description of the personalisation flow.",
        ],
        "tests": [
            {
                "label": "Design & Visual Experience",
                "speaker": "Brand designer, stationery and lifestyle",
                "tone": "Thoughtful, visual",
                "perspective": "Protecting hand-painted artwork inside a commerce layout.",
                "script": """Rifle Paper is built on hand-painted artwork. Anna's patterns are the product, in a way. So the website has a responsibility that most stores don't: it can't crop the personality out of the work.

What I noticed was how the layouts handled that. Pattern was given room. Product photography used the same light and the same background family across categories, so a notebook and a pair of pajamas could sit near each other without looking like they came from different companies.

The typography stayed quiet. When the artwork is this dense, the interface has to step back, and that's a discipline. A bolder headline would have been easier and worse.

There were unglamorous fixes too: consistent spacing on collection pages, pattern names in the same place on every card, colour that didn't shift between the thumbnail and the product page.

It feels like the same brand from the homepage to the checkout, which is harder than it sounds when the catalogue is this wide.""",
                "notes": "Qualitative design observations. Confirm the speaker and the specific fixes before use.",
            },
            {
                "label": "Development & Technical Execution",
                "speaker": "Ecommerce developer, creative retail",
                "tone": "Practical, understated",
                "perspective": "Turning a print into usable catalogue structure.",
                "script": """The phrase 'shop by pattern' sounds simple until you look at the catalogue. One print exists as wallpaper, a mug, a notebook, a phone case and a pair of pajamas. Those are separate products with separate templates, and they need to find each other.

The implementation I reviewed used the pattern as shared taxonomy rather than a marketing label. Collection pages could pull related products across categories, and the pattern page became a real destination instead of a banner.

The wallpaper samples were the other tricky piece. A sample is a low-price product with its own shipping logic, and it shouldn't sit in the same swatch selector as a full roll. That distinction had to be clear at the variant level, not just in the copy.

We tested personalisation flows separately, because monogramming adds fields and validation that can break a quiet checkout.

None of it is flashy. It's the plumbing that makes a pattern-led catalogue feel obvious to a customer.""",
                "notes": "Technical scope must be confirmed. The monogramming claim needs validation.",
            },
            {
                "label": "Overall Project & Shopping Experience",
                "speaker": "Retail and gifting lead",
                "tone": "Upbeat but grounded",
                "perspective": "Helping gift shoppers who do not know the catalogue.",
                "script": """Most of our customers don't know what they want. They know who they're buying for.

That's a different navigation problem. 'Shop all stationery' is useless to someone looking for a gift for a teacher, a new baby, or a friend who just moved house. The occasion has to come before the category.

What I liked about the work was that gift routes became proper pages rather than a dropdown of links: a small edit of cards, wrap, a notebook, something at a sensible price. And the product pages made it easy to add the matching paper or tag without a second search.

The site also stopped assuming everyone is shopping on a desktop. Gift shopping happens on a sofa, in a queue, on a phone.

We don't have a claim about basket size to make. But the gift conversation in store is easier now, because I can send someone to a page that looks like the answer instead of the whole catalogue.""",
                "notes": "No quantitative claim. Gift-route pages and mobile improvements require confirmation.",
            },
        ],
    },
    {
        "slug": "bartesian",
        "name": "Bartesian",
        "url": "https://bartesian.com/",
        "niche": "Home cocktail appliances",
        "intro": "A home cocktail machine brand built around reusable spirit reservoirs and single-serve flavour capsules.",
        "categories": [
            "Cocktail machines and bundles",
            "Cocktail capsules and flavour packs",
            "Accessories and glassware",
            "Spirits guidance and recipes",
        ],
        "audience": "Home entertainers and gift buyers who want bar-style drinks without stocking a full bar or learning cocktail recipes.",
        "identity": [
            "Convenience-led product storytelling: capsule in, drink out, strength controlled by the user.",
            "A machine-and-consumable model, so the first purchase has to explain an ongoing system.",
            "Warm, social imagery centred on hosting rather than technical specification.",
        ],
        "characteristics": [
            "Step-by-step 'how it works' content ahead of product selection.",
            "Bundles that combine a machine with capsules.",
            "A large capsule catalogue organised by flavour and spirit.",
            "Subscription and reorder messaging alongside one-time purchase.",
        ],
        "design_ops": [
            "Explain the machine-capsule-spirit relationship before asking for a sale.",
            "Make bundle contents visible rather than implied.",
            "Keep the capsule range from overwhelming a first-time buyer.",
        ],
        "dev_ops": [
            "Model bundle contents as data so the cart reflects what is included.",
            "Capture subscription cadence before add-to-cart.",
            "Handle quantity, component removal and one-time-to-subscription switching.",
        ],
        "angles": [
            "Education-led storytelling for a new product category.",
            "Bundle and subscription logic that survives edge cases.",
            "Post-purchase clarity and capsule discovery.",
        ],
        "observed": "A homepage leading with the machine and how it works; strength selection from mocktail to strong; more than fifty capsule varieties; bundles; subscription options; FAQ content covering spirits, capsule contents and returns.",
        "confirm": [
            "Whether Abdul worked on the bundle or subscription implementation.",
            "Whether the how-it-works sequence was his design.",
            "Which templates he built or customised.",
            "Any approved outcome, stated qualitatively.",
        ],
        "contribution": "Bartesian sells a system, not a single product, so the storefront has to explain the relationship between machine, capsule and spirit before it can sell any of them. The work focused on sequencing that explanation and on making the commercial options honest: bundle contents visible in the cart, subscription cadence chosen before checkout, and capsule information that separates flavour from strength. The result is a purchase path that answers the category's obvious questions in order rather than burying them in an FAQ.",
        "verify_desc": [
            "That Abdul implemented bundle or subscription logic.",
            "That the how-it-works sequence was his design.",
            "That capsule organisation was part of the scope.",
        ],
        "verify_tests": [
            "The speaker's role and consent.",
            "The claim that bundle contents appear in the cart.",
            "Any claim about subscriber retention or repeat purchase.",
            "Any revenue, conversion or average-order-value implication.",
        ],
        "tests": [
            {
                "label": "Design & Visual Experience",
                "speaker": "Product marketing manager, consumer appliances",
                "tone": "Clear, conversational",
                "perspective": "Explaining a new product category without a wall of copy.",
                "script": """Bartesian is a new category for most people. They see a machine and think, do I need special bottles? Is this a subscription? What actually goes in the capsule?

The page has to answer that before it sells anything. The work we did was mostly about sequencing. How it works came early, in three steps, with the machine, the capsule and the spirit clearly separated. The strength control, from mocktail to strong, got its own explanation because it's genuinely different from other machines.

The capsule range was the other confusion point. More than fifty varieties sounds impressive until a buyer can't tell whether they need to buy them separately. The page now makes the system obvious: you own the machine, you choose the capsules, you supply the spirit.

I've watched people read it in a showroom. The ones who understood it in under a minute were the ones who stopped reading and started asking which cocktails they should try first.""",
                "notes": "The fifty-variety figure is a public brand claim; confirm it is current before recording. No outcome metric.",
            },
            {
                "label": "Development & Technical Execution",
                "speaker": "Ecommerce engineer, subscription retail",
                "tone": "Precise, unsentimental",
                "perspective": "Bundle and subscription logic under real cart conditions.",
                "script": """Bundle pages are where ecommerce logic gets honest. A machine on its own, a starter set, a subscription: three offers that look similar on a card and behave very differently in a cart.

The work I looked at handled that at the data level. Each bundle had a defined contents list, so the cart showed what was included rather than a single vague line item. Subscription cadence was chosen before add-to-cart, not after, which prevents the classic support ticket.

The capsule catalogue needed its own treatment. Perishable goods, no returns once shipped, flavour families, strength guidance. Those constraints belong in the product template, not in a FAQ nobody opens.

We tested the ugly cases: change quantity on a bundle, remove one component, switch from one-time to subscription. That's where most builds leak.

The site is more complex than it looks, and that's usually a sign the complexity was dealt with before the customer arrived.""",
                "notes": "Technical claims require confirmation. No performance or revenue figure is stated.",
            },
            {
                "label": "Overall Project & Shopping Experience",
                "speaker": "Retention and operations lead",
                "tone": "Friendly, realistic",
                "perspective": "What happens after the first order.",
                "script": """The first order is the easy part. The interesting question is what happens in month two.

With a capsule system, people either settle into two or three favourites or they drift, because choosing from fifty flavours is more effort than making a gin and tonic. So the post-purchase experience has to carry some of that.

What changed was the clarity after checkout. The confirmation told you what was coming and when. The capsule pages grouped drinks by mood and spirit, not just by name. Reordering stopped feeling like rebuilding the original order from memory.

I also liked that the site didn't over-promise. No claims about being a bartender in your kitchen, no fake reviews. It explained the machine and let the product do the rest.

We still see people who buy once and stop. That's normal. But the ones who come back tend to come back through a page that feels familiar, and that's worth a lot.""",
                "notes": "Retention observations are qualitative and must be approved. No churn or repeat-rate figure is given.",
            },
        ],
    },
]
