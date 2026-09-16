import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const ROOT = path.resolve('QA-PORTFOLIO-ASSETS/Sprint-04');
const TMP = path.resolve('.capture-tmp');
const CAPTURE_DATE = '2026-09-16';
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const VIDEO_SIZE = { width: 1280, height: 720 };
const NAV_TIMEOUT = 45_000;

const projects = [
  {
    id: '31', slug: 'nine-am-roast', folder: '31-nine-am-roast', name: 'Nine AM Roast', url: 'https://nineamroast.com',
    prefix: '31_nine_am_roast', kind: 'Specialty coffee and tea',
    signatureText: 'Curated Coffees', listingUrl: '/collections', listingText: 'Collections',
    detailUrl: null, detailText: 'Coffee',
    highlightUrl: '/', highlightText: 'Freshly Roasted Beans', highlightLabel: 'fresh-roasted coffee experience',
    interactionUrl: '/collections/all', interactionText: 'Coffee',
    flowLabels: ['Morning coffee ritual', 'Coffee collections', 'Roast detail'], videoSlug: 'coffee_discovery_journey',
    videoPurpose: 'Specialty-coffee discovery from brand story to roast detail'
  },
  {
    id: '32', slug: 'lilly-jace-kids', folder: '32-lilly-jace-kids', name: 'Lilly & Jace Kids', url: 'https://lillyjacekids.com',
    prefix: '32_lilly_jace_kids', kind: 'Children’s clothing and accessories boutique',
    signatureText: 'New Arrivals', listingUrl: '/collections/new-arrivals', listingText: 'New Arrivals',
    detailUrl: null, detailText: 'Size',
    highlightUrl: '/collections/girls', highlightText: 'Girls', highlightLabel: 'girls clothing collection',
    interactionUrl: '/collections/boys', interactionText: 'Boys',
    flowLabels: ['Kids boutique', 'New arrivals', 'Garment detail'], videoSlug: 'kids_boutique_journey',
    videoPurpose: 'Children’s boutique discovery from new arrivals to garment detail'
  },
  {
    id: '33', slug: 'rad-childrens-furniture', folder: '33-rad-childrens-furniture', name: 'RAD Children’s Furniture', url: 'https://radchildrensfurniture.com',
    prefix: '33_rad_childrens_furniture', kind: 'Montessori children’s furniture',
    signatureText: 'Made for How Kids Grow', listingUrl: '/collections/tables-and-chairs', listingText: 'Tables and Chairs',
    detailUrl: '/products/montessori-cube-chair', detailText: 'Montessori Cube Chair',
    highlightUrl: '/collections/climbing-triangles', highlightText: 'Climbing Triangles', highlightLabel: 'Montessori climbing collection',
    interactionUrl: '/collections/shelves-and-storage', interactionText: 'Shelves and Storage',
    flowLabels: ['Child-led spaces', 'Tables and chairs', 'Cube chair detail'], videoSlug: 'montessori_furniture_journey',
    videoPurpose: 'Montessori furniture discovery from room inspiration to product detail'
  },
  {
    id: '34', slug: 'lalys-candles', folder: '34-lalys-candles', name: 'Laly’s Candles', url: 'https://lalyscandles.com',
    prefix: '34_lalys_candles', kind: 'Hand-poured scented candles',
    signatureText: 'Non-Toxic', listingUrl: '/collections/all', listingText: 'Products',
    detailUrl: null, detailText: 'Candle',
    highlightUrl: '/', highlightText: 'Hand Poured', highlightLabel: 'hand-poured candle story',
    interactionUrl: '/collections/all', interactionText: 'Candles',
    flowLabels: ['Candle atmosphere', 'Scent catalogue', 'Candle detail'], videoSlug: 'candle_discovery_journey',
    videoPurpose: 'Hand-poured candle discovery from scent collection to product detail'
  },
  {
    id: '35', slug: 'adonis-jewellery', folder: '35-adonis-jewellery', name: 'Adonis Jewellery', url: 'https://adonisjewellery.gr',
    prefix: '35_adonis_jewellery', kind: 'Fine jewellery and Swiss watches',
    signatureText: 'Our Collection', listingUrl: '/shop/', listingText: 'Products',
    detailUrl: null, detailText: 'Jewellery',
    highlightUrl: '/product-category/tudor/', highlightText: 'TUDOR', highlightLabel: 'Tudor watch collection',
    interactionUrl: '/product-category/gavello/', interactionText: 'Gavello',
    flowLabels: ['Athens jeweller', 'Fine collection', 'Jewellery detail'], videoSlug: 'fine_jewellery_journey',
    videoPurpose: 'Fine jewellery and watch discovery from collection overview to item detail'
  },
  {
    id: '36', slug: 'smovey-usa', folder: '36-smovey-usa', name: 'smoveyUSA', url: 'https://www.smoveyusa.com',
    prefix: '36_smovey_usa', kind: 'Vibroswing fitness and wellness equipment',
    signatureText: 'Built for Power and Recovery', listingUrl: '/collections/all', listingText: 'smovey',
    detailUrl: '/products/smovey%C2%AE-classic', detailText: 'smovey® CLASSIC',
    highlightUrl: '/', highlightText: 'FOR PEOPLE, BY PEOPLE', highlightLabel: 'Vibroswing movement applications',
    interactionUrl: '/products/smovey%C2%AE-aqua', interactionText: 'smovey® AQUA',
    flowLabels: ['Health in your hands', 'Vibroswing range', 'Classic detail'], videoSlug: 'vibroswing_fitness_journey',
    videoPurpose: 'Vibroswing fitness discovery from movement benefits to equipment detail'
  },
  {
    id: '37', slug: 'tinnie-tots', folder: '37-tinnie-tots', name: 'Tinnie Tots', url: 'https://www.tinnietots.com',
    prefix: '37_tinnie_tots', kind: 'Children’s clothing and footwear',
    signatureText: 'CATEGORIES', listingUrl: '/collections/fall-winter-26-new-arrivals', listingText: 'Fall/Winter-26',
    detailUrl: '/products/black-brown-reglan-sweatshirt', detailText: 'Black & Brown Reglan Sweatshirt',
    highlightUrl: '/collections/footwear-25', highlightText: 'Footwear', highlightLabel: 'children’s footwear collection',
    interactionUrl: '/collections/spring-summer-26-new-arrivals', interactionText: 'Spring/Summer-26',
    flowLabels: ['Kids fashion', 'Seasonal arrivals', 'Sweatshirt detail'], videoSlug: 'kids_fashion_journey',
    videoPurpose: 'Children’s fashion discovery from seasonal collection to garment detail'
  },
  {
    id: '38', slug: 'la-petite-wardrobe', folder: '38-la-petite-wardrobe', name: 'La Petite Wardrobe', url: 'https://lapetitewardrobe.co.uk',
    prefix: '38_la_petite_wardrobe', kind: 'Handmade children’s occasionwear',
    signatureText: 'NEW ARRIVALS', listingUrl: '/collections/new-arrival', listingText: 'NEW ARRIVALS',
    detailUrl: '/products/mistletoe-mischief', detailText: 'Mistletoe & Mischief',
    highlightUrl: '/collections/christmas', highlightText: 'Christmas', highlightLabel: 'Christmas occasionwear collection',
    interactionUrl: '/collections/boys', interactionText: 'Boys',
    flowLabels: ['Handmade occasionwear', 'New arrivals', 'Garment detail'], videoSlug: 'occasionwear_journey',
    videoPurpose: 'Handmade occasionwear discovery from seasonal collection to garment detail'
  },
  {
    id: '39', slug: 'koala-picks', folder: '39-koala-picks', name: 'Koala Picks', url: 'https://www.koalapicks.com',
    prefix: '39_koala_picks', kind: 'Healthy snacks for children and families',
    signatureText: 'What is Koala Picks', listingUrl: '/collections/all', listingText: 'Products',
    detailUrl: '/products/new-choco-chunk-cookies-9pcs', detailText: 'Choco Chunk Cookies',
    highlightUrl: '/pages/our-snacks', highlightText: 'Snacks', highlightLabel: 'healthy snack range',
    interactionUrl: '/products/starter-bundle', interactionText: 'Snack Trial Bundle',
    flowLabels: ['Healthy family snacks', 'Snack catalogue', 'Cookie detail'], videoSlug: 'healthy_snack_journey',
    videoPurpose: 'Healthy snack discovery from family promise to product detail'
  },
  {
    id: '40', slug: 'glisser-beauty', folder: '40-glisser-beauty', name: 'Glisser Beauty', url: 'https://www.glisserbeauty.com',
    prefix: '40_glisser_beauty', kind: 'Skincare and facial beauty products',
    signatureText: 'Natural Ingredients', listingUrl: '/collections/all', listingText: 'Products',
    detailUrl: '/products/glow-fusion-brightening-cream', detailText: 'Glow Fusion Brightening Cream',
    highlightUrl: '/', highlightText: 'Nourishment & Moisturizing', highlightLabel: 'natural skincare benefits',
    interactionUrl: '/products/copy-of-radiance-glow-intense-toning-exfoliating-soap', interactionText: 'Turmeric',
    flowLabels: ['Skin essence', 'Skincare catalogue', 'Brightening cream detail'], videoSlug: 'skincare_discovery_journey',
    videoPurpose: 'Skincare discovery from natural-ingredient positioning to product detail'
  }
];

function urlFor(project, route = '/') {
  return new URL(route || '/', project.url).href;
}

async function mkdirs(project) {
  const base = path.join(ROOT, project.folder);
  await fs.mkdir(path.join(base, 'images'), { recursive: true });
  await fs.mkdir(path.join(base, 'video'), { recursive: true });
  await fs.mkdir(path.join(TMP, project.folder), { recursive: true });
  return base;
}

async function clickInterruptionControls(scope, includeGenericClose = false) {
  const labels = [
    /accept all/i, /accept cookies/i, /allow all/i, /agree/i, /got it/i,
    /continue without accepting/i, /no thanks/i, /not now/i, /^save$/i, /close/i
  ];
  for (const label of labels) {
    const button = scope.getByRole('button', { name: label }).first();
    try {
      if (await button.isVisible({ timeout: 250 })) await button.click({ timeout: 1_000 });
    } catch {}
  }
  const closeSelectors = [
    '[aria-label="Close dialog"]', '[aria-label="Close"]', '.popup-close',
    '.modal__close-button', '.newsletter-popup__close', '#shopify-chat-dummy button',
    ...(includeGenericClose ? [
      'button[aria-label*="close" i]', '[role="button"][aria-label*="close" i]',
      'button[title*="close" i]', '[data-testid*="close" i]',
      'button[class*="close" i]', 'button[class*="minimize" i]'
    ] : [])
  ];
  for (const selector of closeSelectors) {
    try {
      const el = scope.locator(selector).first();
      if (await el.isVisible({ timeout: 180 })) await el.click({ timeout: 700 });
    } catch {}
  }
}

const projectOverlayDismissed = new WeakSet();

async function dismissKnownProjectOverlay(page) {
  if (projectOverlayDismissed.has(page)) return;
  const { width, height } = page.viewportSize() || DESKTOP;
  const host = new URL(page.url()).hostname.replace(/^www\./, '');
  let point = null;
  if (host === 'lalyscandles.com') {
    // Laly's responsive discount modal is 480×650 on desktop and 350×634 on
    // mobile. Click its visible top-right close control, never the offer CTA.
    point = width < 600
      ? { x: width - 49, y: Math.max(25, (height - 634) / 2 + 24) }
      : { x: width / 2 + 212, y: Math.max(25, (height - 650) / 2 + 24) };
  } else if (host === 'koalapicks.com') {
    // The loyalty welcome panel is full-screen on mobile and bottom-aligned on
    // desktop; both layouts expose a visible close control in the top-right.
    point = width < 600
      ? { x: width - 28, y: 31 }
      : { x: width - 44, y: Math.max(31, height - 584) };
  }
  if (!point) return;
  projectOverlayDismissed.add(page);
  await page.mouse.click(point.x, point.y).catch(() => {});
  await page.waitForTimeout(450);
}

async function closeInterruptions(page) {
  await clickInterruptionControls(page);
  // Email offers and live-chat panels commonly render in child frames. Dismiss
  // their own controls without using generic root-page selectors that could
  // accidentally close a deliberately opened mobile navigation state.
  for (const frame of page.frames().filter(item => item !== page.mainFrame())) {
    await clickInterruptionControls(frame, true);
  }
  await dismissKnownProjectOverlay(page);
  await page.waitForTimeout(250);
}

async function settle(page, wait = 1_500) {
  await page.waitForTimeout(wait);
  await closeInterruptions(page);
  await page.evaluate(async () => {
    try { await document.fonts.ready; } catch {}
    const imgs = Array.from(document.images).filter(i => {
      const r = i.getBoundingClientRect();
      return r.bottom > -300 && r.top < innerHeight + 600;
    });
    await Promise.race([
      Promise.all(imgs.map(img => img.complete ? true : new Promise(resolve => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      }))),
      new Promise(resolve => setTimeout(resolve, 5_000))
    ]);
  }).catch(() => {});
  await page.waitForTimeout(350);
}

function isProjectUrl(currentUrl, project) {
  try {
    const currentHost = new URL(currentUrl).hostname.replace(/^www\./, '');
    const projectHost = new URL(project.url).hostname.replace(/^www\./, '');
    return currentHost === projectHost || currentHost.endsWith(`.${projectHost}`);
  } catch {
    return false;
  }
}

async function goto(page, project, route, notes, label) {
  const target = urlFor(project, route);
  try {
    const response = await page.goto(target, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT });
    await settle(page);
    const status = response?.status() || 0;
    const title = await page.title().catch(() => '');
    const offDomain = !isProjectUrl(page.url(), project);
    const bad = status >= 400 || offDomain || /404|page not found|access denied|just a moment/i.test(title);
    if (bad) throw new Error(offDomain ? `redirected off-domain to ${page.url()}` : `HTTP ${status || 'unknown'} / ${title}`);
    return true;
  } catch (error) {
    notes.push(`${label} at ${target} was unavailable (${String(error.message).slice(0, 140)}); a verified on-site fallback was requested.`);
    if (target !== urlFor(project, '/')) {
      await page.goto(urlFor(project, '/'), { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT }).catch(() => {});
      await settle(page);
    }
    if (!isProjectUrl(page.url(), project)) {
      throw new Error(`${project.name} capture refused an off-domain fallback at ${page.url()}`);
    }
    return false;
  }
}

async function scrollToText(page, text, fallbackRatio = 0.48) {
  if (text) {
    try {
      const matches = page.getByText(text, { exact: false });
      const count = Math.min(await matches.count(), 30);
      for (let index = 0; index < count; index += 1) {
        const locator = matches.nth(index);
        if (!(await locator.isVisible({ timeout: 250 }).catch(() => false))) continue;
        await locator.scrollIntoViewIfNeeded({ timeout: 4_000 });
        await page.evaluate(() => scrollBy({ top: -130, behavior: 'instant' }));
        await page.waitForTimeout(900);
        return true;
      }
    } catch {}
  }
  await page.evaluate(ratio => {
    const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    scrollTo({ top: max * ratio, behavior: 'instant' });
  }, fallbackRatio).catch(() => {});
  await page.waitForTimeout(900);
  return false;
}

async function suppressThirdPartyCaptureInterruptions(context, project) {
  if (project.id === '40') {
    // The OptiMonk offer has no reliable accessible dismissal target and can
    // arrive after the page is otherwise settled. Prevent only that third-party
    // overlay script from loading; all captured brand/page content remains live.
    await context.route(/optimonk/i, route => route.abort());
  }
}

async function screenshot(page, file) {
  await closeInterruptions(page);
  await page.screenshot({ path: file, type: 'jpeg', quality: 82, animations: 'disabled', caret: 'hide' });
  // Re-encode consistently and strip metadata for compact, portfolio-friendly files.
  const buffer = await sharp(file).rotate().jpeg({ quality: 80, mozjpeg: true, chromaSubsampling: '4:2:0' }).toBuffer();
  await fs.writeFile(file, buffer);
}

const PERCEPTUAL_DUPLICATE_RMSE = 4;

async function visualFingerprint(file) {
  return sharp(file).rotate().resize(32, 32, { fit: 'fill' }).grayscale().raw().toBuffer();
}

function visualDistance(left, right) {
  let squaredDifference = 0;
  for (let index = 0; index < left.length; index += 1) {
    const difference = left[index] - right[index];
    squaredDifference += difference * difference;
  }
  return Math.sqrt(squaredDifference / left.length);
}

async function discoverDetail(page, project, notes) {
  if (project.detailUrl) return project.detailUrl;
  await goto(page, project, project.listingUrl, notes, 'Product listing');
  const links = await page.locator('a[href*="/products/"], a[href*="/product/"]').evaluateAll((els, origin) =>
    els.map(a => a.href).filter(href => href.startsWith(origin)), new URL(project.url).origin
  ).catch(() => []);
  const unique = [...new Set(links)];
  if (unique[0]) {
    const u = new URL(unique[0]);
    return `${u.pathname}${u.search}`;
  }
  notes.push('No accessible product-detail link was discoverable; the strongest available collection view was used instead.');
  return project.listingUrl;
}

async function activateInteraction(page) {
  const selectors = [
    'select:not([disabled])',
    'details:not([open]) summary',
    'button[aria-expanded="false"]',
    '[role="button"][aria-expanded="false"]'
  ];
  for (const selector of selectors) {
    try {
      const item = page.locator(selector).first();
      if (!(await item.count()) || !(await item.isVisible({ timeout: 300 }))) continue;
      if (selector.startsWith('select')) {
        const options = await item.locator('option:not([disabled])').all();
        if (options.length > 1) {
          const value = await options[1].getAttribute('value');
          if (value) await item.selectOption(value);
        }
      } else {
        await item.click({ timeout: 2_000 });
      }
      await page.waitForTimeout(900);
      return true;
    } catch {}
  }
  return false;
}

async function openMobileNavigation(page) {
  await page.evaluate(() => scrollTo(0, 0)).catch(() => {});
  const selectors = [
    'button[aria-label*="menu" i]', 'button[title*="menu" i]',
    'summary.header__icon--menu', '.menu-drawer-container > summary',
    'button.navbar-toggler', '.mobile-nav-toggle', '.x-btn-navbar',
    '[data-mobile-menu-trigger]', '[aria-controls*="menu" i]'
  ];
  for (const selector of selectors) {
    try {
      const control = page.locator(selector).first();
      if (await control.isVisible({ timeout: 350 })) {
        await control.click({ timeout: 2_000 });
        await page.waitForTimeout(900);
        return 'navigation';
      }
    } catch {}
  }
  const searchSelectors = ['button[aria-label*="search" i]', 'a[aria-label*="search" i]', 'summary[aria-label*="search" i]'];
  for (const selector of searchSelectors) {
    try {
      const control = page.locator(selector).first();
      if (await control.isVisible({ timeout: 300 })) {
        await control.click({ timeout: 2_000 });
        await page.waitForTimeout(900);
        return 'search';
      }
    } catch {}
  }
  return 'header';
}

function escapeXml(value) {
  return String(value).replace(/[<>&'\"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
}

async function createResponsiveComparison(project, desktopFile, mobileFile, output) {
  const desktop = await sharp(desktopFile).resize(940, 588, { fit: 'cover', position: 'top' }).jpeg({ quality: 80 }).toBuffer();
  const mobile = await sharp(mobileFile).resize(310, 671, { fit: 'cover', position: 'top' }).jpeg({ quality: 80 }).toBuffer();
  const svg = Buffer.from(`<svg width="1600" height="1000" xmlns="http://www.w3.org/2000/svg">
    <rect width="1600" height="1000" fill="#111827"/>
    <circle cx="72" cy="55" r="7" fill="#34d399"/><text x="94" y="63" fill="#9ca3af" font-family="Arial,sans-serif" font-size="20" letter-spacing="2">RESPONSIVE QA REFERENCE · AUTHENTIC UI CAPTURE</text>
    <text x="70" y="128" fill="#ffffff" font-family="Arial,sans-serif" font-size="44" font-weight="700">${escapeXml(project.name)}</text>
    <text x="70" y="166" fill="#9ca3af" font-family="Arial,sans-serif" font-size="20">${escapeXml(project.url)} · captured ${CAPTURE_DATE}</text>
    <rect x="60" y="215" width="1000" height="680" rx="18" fill="#1f2937" stroke="#374151"/>
    <rect x="1110" y="215" width="370" height="762" rx="32" fill="#1f2937" stroke="#374151"/>
    <circle cx="92" cy="247" r="6" fill="#fb7185"/><circle cx="113" cy="247" r="6" fill="#fbbf24"/><circle cx="134" cy="247" r="6" fill="#34d399"/>
    <text x="60" y="937" fill="#d1d5db" font-family="Arial,sans-serif" font-size="18" font-weight="700">DESKTOP · 1440 × 900</text>
    <text x="1110" y="202" fill="#d1d5db" font-family="Arial,sans-serif" font-size="18" font-weight="700">MOBILE · 390 × 844</text>
    <text x="60" y="975" fill="#6b7280" font-family="Arial,sans-serif" font-size="16">Viewport comparison documents responsive hierarchy without asserting a defect.</text>
  </svg>`);
  await sharp(svg)
    .composite([
      { input: desktop, left: 90, top: 276 },
      { input: mobile, left: 1140, top: 258 }
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(output);
}

async function createFlowSequence(project, files, output) {
  const panels = await Promise.all(files.map(file => sharp(file).resize(520, 650, { fit: 'cover', position: 'top' }).jpeg({ quality: 78 }).toBuffer()));
  const labels = project.flowLabels;
  const svg = Buffer.from(`<svg width="1800" height="1000" xmlns="http://www.w3.org/2000/svg">
    <rect width="1800" height="1000" fill="#f8fafc"/>
    <text x="70" y="74" fill="#0f172a" font-family="Arial,sans-serif" font-size="18" font-weight="700" letter-spacing="2">QA USER-FLOW REFERENCE · 01 → 02 → 03</text>
    <text x="70" y="132" fill="#0f172a" font-family="Arial,sans-serif" font-size="44" font-weight="700">${escapeXml(project.name)} · discovery flow</text>
    <text x="70" y="171" fill="#64748b" font-family="Arial,sans-serif" font-size="20">Three authentic states captured from the live product on ${CAPTURE_DATE}</text>
    ${[0,1,2].map(i => {
      const x = 70 + i * 575;
      return `<rect x="${x}" y="225" width="520" height="650" rx="12" fill="#ffffff" stroke="#cbd5e1"/>
      <circle cx="${x + 28}" cy="911" r="20" fill="#0f172a"/><text x="${x + 21}" y="919" fill="#fff" font-family="Arial,sans-serif" font-size="18" font-weight="700">${i + 1}</text>
      <text x="${x + 60}" y="919" fill="#0f172a" font-family="Arial,sans-serif" font-size="19" font-weight="700">${escapeXml(labels[i])}</text>`;
    }).join('')}
    <path d="M 599 550 L 629 550" stroke="#10b981" stroke-width="5"/><path d="M 622 540 L 634 550 L 622 560" fill="none" stroke="#10b981" stroke-width="5"/>
    <path d="M 1174 550 L 1204 550" stroke="#10b981" stroke-width="5"/><path d="M 1197 540 L 1209 550 L 1197 560" fill="none" stroke="#10b981" stroke-width="5"/>
    <text x="70" y="974" fill="#64748b" font-family="Arial,sans-serif" font-size="16">Coverage focus: information scent, visual continuity, responsive content hierarchy, and task progression.</text>
  </svg>`);
  await sharp(svg).composite(panels.map((input, i) => ({ input, left: 70 + i * 575, top: 225 }))).jpeg({ quality: 84, mozjpeg: true }).toFile(output);
}

async function smoothScroll(page, ratio = 0.58, duration = 1_500) {
  await page.evaluate(({ ratio, duration }) => new Promise(resolve => {
    const start = scrollY;
    const target = Math.max(0, (document.documentElement.scrollHeight - innerHeight) * ratio);
    const began = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - began) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      scrollTo(0, start + (target - start) * eased);
      if (p < 1) requestAnimationFrame(tick); else resolve();
    };
    requestAnimationFrame(tick);
  }), { ratio, duration }).catch(() => {});
}

async function recordVideo(browser, project, detailRoute, base, notes) {
  const videoDir = path.join(TMP, project.folder, 'video-raw');
  await fs.mkdir(videoDir, { recursive: true });
  const context = await browser.newContext({
    viewport: VIDEO_SIZE,
    recordVideo: { dir: videoDir, size: VIDEO_SIZE },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36 QA-Portfolio-Capture/1.0',
    locale: 'en-US', colorScheme: 'light', reducedMotion: 'reduce'
  });
  await suppressThirdPartyCaptureInterruptions(context, project);
  const page = await context.newPage();
  let video;
  try {
    await goto(page, project, '/', notes, 'Video homepage');
    video = page.video();
    await page.evaluate(() => scrollTo(0, 0)).catch(() => {});
    await page.waitForTimeout(1_300);
    await smoothScroll(page, 0.42, 1_650);
    await page.waitForTimeout(900);
    await goto(page, project, project.listingUrl, notes, 'Video listing');
    await page.waitForTimeout(1_000);
    await smoothScroll(page, 0.28, 1_250);
    await page.waitForTimeout(700);
    await goto(page, project, detailRoute, notes, 'Video detail');
    await page.waitForTimeout(1_200);
    await smoothScroll(page, 0.24, 1_350);
    await page.waitForTimeout(1_200);
  } finally {
    await context.close();
  }
  if (!video) throw new Error('Playwright video stream did not initialize');
  const rawPath = await video.path();
  const stem = `${project.prefix}_video_${project.videoSlug || 'project_journey'}_001`;
  const out = path.join(base, 'video', `${stem}.mp4`);
  const thumb = path.join(base, 'video', `${stem}.jpg`);
  await execFileAsync('ffmpeg', [
    '-y', '-i', rawPath, '-an', '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '30', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out
  ], { maxBuffer: 10 * 1024 * 1024 });
  await execFileAsync('ffmpeg', ['-y', '-ss', '00:00:03', '-i', out, '-frames:v', '1', '-q:v', '3', thumb], { maxBuffer: 10 * 1024 * 1024 });

  // A website checkpoint is not published until its MP4 can be probed and fully decoded.
  const probe = await execFileAsync('ffprobe', [
    '-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=codec_name,width,height,pix_fmt:format=duration',
    '-of', 'json', out
  ]);
  const metadata = JSON.parse(probe.stdout);
  const stream = metadata.streams?.[0];
  const duration = Number(metadata.format?.duration || 0);
  if (!stream || stream.codec_name !== 'h264' || stream.width !== 1280 || stream.height !== 720 || !stream.pix_fmt?.startsWith('yuv420') || duration < 8 || duration > 50) {
    throw new Error(`Playable-video QA failed for ${out}: ${probe.stdout}`);
  }
  await execFileAsync('ffmpeg', ['-v', 'error', '-i', out, '-f', 'null', '-'], { maxBuffer: 10 * 1024 * 1024 });
  notes.push(`Playable MP4 verified: H.264, ${stream.width}×${stream.height}, ${duration.toFixed(2)} seconds, complete decode passed.`);
  return { file: path.basename(out), thumbnail: path.basename(thumb), purpose: project.videoPurpose, duration: Number(duration.toFixed(2)), codec: stream.codec_name };
}

async function createSlideshowVideo(project, base, sourceFiles, notes) {
  const stem = `${project.prefix}_video_${project.videoSlug}_001`;
  const output = path.join(base, 'video', `${stem}.mp4`);
  const thumbnail = path.join(base, 'video', `${stem}.jpg`);
  const filter = [
    '[0:v]scale=1280:800:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,format=yuv420p[v0]',
    '[1:v]scale=1280:800:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,format=yuv420p[v1]',
    '[2:v]scale=1280:800:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,format=yuv420p[v2]',
    '[v0][v1]xfade=transition=fade:duration=0.7:offset=3.3[x1]',
    '[x1][v2]xfade=transition=fade:duration=0.7:offset=6.6[out]'
  ].join(';');
  await execFileAsync('ffmpeg', [
    '-y', '-loop', '1', '-t', '4', '-i', sourceFiles[0], '-loop', '1', '-t', '4', '-i', sourceFiles[1],
    '-loop', '1', '-t', '4', '-i', sourceFiles[2], '-filter_complex', filter, '-map', '[out]',
    '-t', '10.6', '-r', '30', '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '27',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', output
  ], { maxBuffer: 10 * 1024 * 1024 });
  await sharp(sourceFiles[2]).resize(1280, 720, { fit: 'cover', position: 'top' }).jpeg({ quality: 84, mozjpeg: true }).toFile(thumbnail);
  const probe = await execFileAsync('ffprobe', [
    '-v', 'error', '-select_streams', 'v:0', '-show_entries',
    'stream=codec_name,width,height,pix_fmt:format=duration', '-of', 'json', output
  ]);
  const metadata = JSON.parse(probe.stdout);
  const stream = metadata.streams?.[0];
  const duration = Number(metadata.format?.duration || 0);
  if (!stream || stream.codec_name !== 'h264' || stream.width !== 1280 || stream.height !== 720 || !stream.pix_fmt?.startsWith('yuv420') || duration < 8 || duration > 50) {
    throw new Error(`Playable-video QA failed for ${output}: ${probe.stdout}`);
  }
  await execFileAsync('ffmpeg', ['-v', 'error', '-i', output, '-f', 'null', '-'], { maxBuffer: 10 * 1024 * 1024 });
  notes.push(`Playable MP4 verified: H.264, ${stream.width}×${stream.height}, ${duration.toFixed(2)} seconds, complete decode passed.`);
  return { file: path.basename(output), thumbnail: path.basename(thumbnail), purpose: project.videoPurpose, duration: Number(duration.toFixed(2)), codec: stream.codec_name };
}

async function captureProject(browser, project) {
  console.log(`\n=== ${project.id}: ${project.name} ===`);
  const base = await mkdirs(project);
  const imagesDir = path.join(base, 'images');
  const notes = [];
  const captures = [];
  const context = await browser.newContext({
    viewport: DESKTOP,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36 QA-Portfolio-Capture/1.0',
    locale: 'en-US', colorScheme: 'light', reducedMotion: 'reduce', deviceScaleFactor: 1
  });
  await suppressThirdPartyCaptureInterruptions(context, project);
  const page = await context.newPage();
  page.setDefaultTimeout(8_000);

  const add = async (name, label) => {
    const file = path.join(imagesDir, `${project.prefix}_${name}_001.jpg`);
    await screenshot(page, file);
    captures.push({ file: path.basename(file), label });
    console.log(`  image: ${path.basename(file)}`);
    return file;
  };

  try {
    await goto(page, project, '/', notes, 'Homepage');
    await page.evaluate(() => scrollTo(0, 0)).catch(() => {});
    await settle(page, 500);
    const desktopHero = await add('desktop_home_hero', 'Desktop homepage hero');

    await scrollToText(page, project.signatureText, 0.30);
    const desktopSignature = await add(`desktop_${project.slug === 'green-beauty-expert' ? 'beauty_blog' : 'signature_section'}`, `Desktop ${project.signatureText} section`);

    await goto(page, project, project.listingUrl, notes, 'Listing');
    await scrollToText(page, project.listingText, 0.18);
    const desktopListing = await add(`desktop_${project.slug === 'green-beauty-expert' ? 'editorial_listing' : 'collection_listing'}`, 'Desktop listing / catalogue');

    const detailRoute = await discoverDetail(page, project, notes);
    await goto(page, project, detailRoute, notes, 'Detail');
    await page.evaluate(() => scrollTo(0, 0)).catch(() => {});
    await settle(page, 450);
    const desktopDetail = await add(`desktop_${project.slug === 'green-beauty-expert' ? 'article_detail' : 'product_detail'}`, 'Desktop detail page');

    await scrollToText(page, project.detailText, 0.43);
    await activateInteraction(page);
    await add(`interaction_${project.slug === 'kcaps' ? 'capsule_options' : project.slug === 'green-beauty-expert' ? 'article_content' : 'detail_state'}`, 'Meaningful detail interaction / content state');

    await goto(page, project, project.highlightUrl, notes, 'Project highlight');
    await scrollToText(page, project.highlightText, 0.60);
    await add(`project_highlight_${project.highlightLabel.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '').toLowerCase()}`, `Project highlight: ${project.highlightLabel}`);

    await goto(page, project, project.interactionUrl, notes, 'Secondary interaction');
    await scrollToText(page, project.interactionText, 0.28);
    await activateInteraction(page);
    await add(`desktop_${project.slug === 'revived-smiles' ? 'smile_assessment' : project.slug === 'dr-stengler' ? 'bundle_builder' : project.slug === 'green-beauty-expert' ? 'services' : 'secondary_experience'}`, 'Secondary project-specific experience');

    const mobileContext = await browser.newContext({
      viewport: MOBILE,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1 QA-Portfolio-Capture/1.0',
      locale: 'en-US', colorScheme: 'light', reducedMotion: 'reduce', deviceScaleFactor: 1,
      isMobile: true, hasTouch: true
    });
    await suppressThirdPartyCaptureInterruptions(mobileContext, project);
    const mobile = await mobileContext.newPage();
    mobile.setDefaultTimeout(8_000);
    await goto(mobile, project, '/', notes, 'Mobile homepage');
    await mobile.evaluate(() => scrollTo(0, 0)).catch(() => {});
    await settle(mobile, 450);
    const mobileHomeFile = path.join(imagesDir, `${project.prefix}_mobile_home_hero_001.jpg`);
    await screenshot(mobile, mobileHomeFile);
    captures.push({ file: path.basename(mobileHomeFile), label: 'Mobile homepage hero' });


    const navType = await openMobileNavigation(mobile);
    const mobileNavFile = path.join(imagesDir, `${project.prefix}_interaction_mobile_${navType}_001.jpg`);
    await screenshot(mobile, mobileNavFile);
    captures.push({ file: path.basename(mobileNavFile), label: `Mobile ${navType} state` });

    await goto(mobile, project, detailRoute, notes, 'Mobile detail');
    await mobile.evaluate(() => scrollTo(0, 0)).catch(() => {});
    await settle(mobile, 450);
    const mobileDetailFile = path.join(imagesDir, `${project.prefix}_mobile_${project.slug === 'green-beauty-expert' ? 'article_detail' : 'product_detail'}_001.jpg`);
    await screenshot(mobile, mobileDetailFile);
    captures.push({ file: path.basename(mobileDetailFile), label: 'Mobile detail page' });

    await goto(mobile, project, project.highlightUrl, notes, 'Mobile project highlight');
    await scrollToText(mobile, project.highlightText, 0.52);
    const mobileSectionFile = path.join(imagesDir, `${project.prefix}_mobile_project_specific_section_001.jpg`);
    await screenshot(mobile, mobileSectionFile);
    captures.push({ file: path.basename(mobileSectionFile), label: 'Mobile project-specific section' });
    await mobileContext.close();

    const responsive = path.join(imagesDir, `${project.prefix}_responsive_comparison_001.jpg`);
    await createResponsiveComparison(project, desktopHero, mobileHomeFile, responsive);
    captures.push({ file: path.basename(responsive), label: 'Desktop / mobile responsive QA comparison' });

    const flow = path.join(imagesDir, `${project.prefix}_qa_user_flow_sequence_001.jpg`);
    await createFlowSequence(project, [desktopHero, desktopListing, desktopDetail], flow);
    captures.push({ file: path.basename(flow), label: 'Three-state QA user-flow reference' });

    await context.close();
    const video = await recordVideo(browser, project, detailRoute, base, notes);

    // Reject byte-identical and visually near-identical screenshots rather than
    // inflating the project count with states that add no meaningful coverage.
    const hashes = new Map();
    const acceptedFingerprints = [];
    const uniqueCaptures = [];
    for (const item of captures) {
      const file = path.join(imagesDir, item.file);
      const data = await fs.readFile(file);
      const hash = crypto.createHash('sha256').update(data).digest('hex');
      const exactMatch = hashes.get(hash);
      const fingerprint = await visualFingerprint(file);
      const perceptualMatch = acceptedFingerprints.find(candidate =>
        visualDistance(fingerprint, candidate.fingerprint) < PERCEPTUAL_DUPLICATE_RMSE
      );
      if (exactMatch || perceptualMatch) {
        await fs.rm(file, { force: true });
        const matchedFile = exactMatch || perceptualMatch.file;
        const reason = exactMatch ? 'byte-for-byte' : 'in perceptual image QA';
        const duplicateNote = `Rejected duplicate ${item.file}; it matched ${matchedFile} ${reason}.`;
        notes.push(duplicateNote);
        console.log(`  ${duplicateNote}`);
      } else {
        hashes.set(hash, item.file);
        acceptedFingerprints.push({ file: item.file, fingerprint });
        uniqueCaptures.push(item);
      }
    }
    captures.splice(0, captures.length, ...uniqueCaptures);
    if (captures.length < 10) {
      throw new Error(`${project.name} produced only ${captures.length} unique authentic images; at least 10 are required.`);
    }

    const readme = `# ${project.name} — QA Portfolio Visual Assets\n\n` +
      `**Project:** ${project.name}  \n**Website URL:** ${project.url}  \n**Project type:** ${project.kind}  \n**Asset-generation date:** ${CAPTURE_DATE}\n\n` +
      `## Inventory\n\n- Static images: **${captures.length}**\n- Videos: **1**\n- Video thumbnails: **1** (stored with the video)\n\n` +
      `## Coverage\n\n${captures.map(c => `- \`${c.file}\` — ${c.label}`).join('\n')}\n\n` +
      `## Video\n\n- \`${video.file}\` — ${video.purpose}\n- \`${video.thumbnail}\` — Video poster / thumbnail\n\n` +
      `## Capture notes\n\n- Captures use the live website as the source of truth; no products, copy, testimonials, UI states, or defects were fabricated.\n- Desktop viewport: ${DESKTOP.width} × ${DESKTOP.height}; mobile viewport: ${MOBILE.width} × ${MOBILE.height}; video: ${VIDEO_SIZE.width} × ${VIDEO_SIZE.height}.\n- Responsive and user-flow compositions contain only authentic live-site captures plus neutral QA reference labels.\n- No checkout submission, purchase, account creation, or personal data entry was performed.\n` +
      (notes.length ? notes.map(n => `- ${n}`).join('\n') + '\n' : '- All planned public routes were accessible during capture.\n');
    await fs.writeFile(path.join(base, 'README.md'), readme);

    const result = {
      id: project.id, slug: project.slug, folder: project.folder, name: project.name,
      url: project.url, kind: project.kind, generated: CAPTURE_DATE,
      images: captures.map(c => ({ ...c, path: `QA-PORTFOLIO-ASSETS/Sprint-04/${project.folder}/images/${c.file}` })),
      videos: [{ ...video, path: `QA-PORTFOLIO-ASSETS/Sprint-04/${project.folder}/video/${video.file}`, thumbnailPath: `QA-PORTFOLIO-ASSETS/Sprint-04/${project.folder}/video/${video.thumbnail}` }],
      notes
    };
    await fs.writeFile(path.join(base, 'asset-manifest.json'), JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    await context.close().catch(() => {});
    throw error;
  }
}

async function createBrowser(manifest) {
  await fs.mkdir('asset-browser', { recursive: true });
  await fs.writeFile('asset-browser/manifest-sprint-04.json', JSON.stringify(manifest, null, 2));
}

async function loadProjectCheckpoint(project) {
  const manifestFile = path.join(ROOT, project.folder, 'asset-manifest.json');
  if (!fsSync.existsSync(manifestFile)) return null;
  try {
    const result = JSON.parse(await fs.readFile(manifestFile, 'utf8'));
    const files = [
      ...result.images.map(item => path.resolve(item.path)),
      ...result.videos.flatMap(item => [path.resolve(item.path), path.resolve(item.thumbnailPath)])
    ];
    if (result.images.length < 10 || result.videos.length < 1 || !files.every(file => fsSync.existsSync(file))) return null;
    return result;
  } catch {
    return null;
  }
}

async function updateRootProgress(results, stage, activeProject = null, blocked = false) {
  const completed = results.map(result => ({
    id: result.id,
    status: 'captured',
    images: result.images.length,
    videos: result.videos.length,
    note: 'Project assets published; awaiting Sprint-level QA'
  }));
  if (activeProject && !completed.some(item => item.id === activeProject.id)) {
    completed.push({
      id: activeProject.id,
      status: blocked ? 'blocked' : 'capturing',
      images: 0,
      videos: 0,
      note: blocked ? 'Capture stopped; review workflow diagnostics' : 'Live-site capture in progress'
    });
  }
  const progress = { generated: CAPTURE_DATE, stage, projects: completed };
  await fs.writeFile('capture-progress-sprint-04.json', JSON.stringify(progress, null, 2));
  const totalImages = results.reduce((sum, result) => sum + result.images.length, 0);
  const totalVideos = results.reduce((sum, result) => sum + result.videos.length, 0);
  await fs.mkdir('asset-browser', { recursive: true });
  await fs.writeFile('asset-browser/manifest-sprint-04.json', JSON.stringify({
    title: 'QA Portfolio Visual Assets — Sprint 4', generated: CAPTURE_DATE,
    totalImages, totalVideos, projects: results
  }, null, 2));
  await execFileAsync('python3', ['scripts/update_readme_sprint04.py']);
  await execFileAsync('python3', ['scripts/build_asset_browser_manifest.py']);
}

async function publishCheckpoint(project) {
  if (process.env.CHECKPOINT_COMMITS !== '1') return;
  const branch = process.env.CHECKPOINT_BRANCH || '';
  if (!/^arena\/[a-z0-9-]+$/.test(branch)) throw new Error(`Unsafe or missing checkpoint branch: ${branch}`);
  await execFileAsync('git', ['add', 'README.md', 'capture-progress-sprint-04.json', 'asset-browser/manifest-sprint-04.json', 'asset-browser/manifest.json', path.join(ROOT, project.folder)]);
  await execFileAsync('git', ['commit', '-m', `Add Sprint 4 ${project.id} ${project.name} asset checkpoint [skip ci]`]);
  await execFileAsync('git', ['fetch', 'origin', branch]);
  await execFileAsync('git', ['rebase', 'FETCH_HEAD']);
  await execFileAsync('git', ['push', 'origin', `HEAD:${branch}`], { maxBuffer: 10 * 1024 * 1024 });
  console.log(`  checkpoint published: ${project.id} ${project.name}`);
}

async function publishBlockedProgress(project) {
  if (process.env.CHECKPOINT_COMMITS !== '1') return;
  const branch = process.env.CHECKPOINT_BRANCH || '';
  if (!/^arena\/[a-z0-9-]+$/.test(branch)) return;
  await execFileAsync('git', ['add', 'README.md', 'capture-progress-sprint-04.json', 'asset-browser/manifest-sprint-04.json', 'asset-browser/manifest.json']);
  const commit = await execFileAsync('git', ['commit', '-m', `Document Sprint 4 ${project.id} capture interruption [skip ci]`]).catch(() => null);
  if (commit) {
    await execFileAsync('git', ['fetch', 'origin', branch]);
    await execFileAsync('git', ['rebase', 'FETCH_HEAD']);
    await execFileAsync('git', ['push', 'origin', `HEAD:${branch}`]);
  }
}

async function main() {
  const checkpointMode = process.env.CHECKPOINT_COMMITS === '1';
  if (!checkpointMode) await fs.rm(ROOT, { recursive: true, force: true });
  await fs.rm(TMP, { recursive: true, force: true });
  await fs.mkdir(ROOT, { recursive: true });
  await fs.mkdir(TMP, { recursive: true });
  let browser = null;
  const results = [];
  try {
    for (const project of projects) {
      const existing = checkpointMode ? await loadProjectCheckpoint(project) : null;
      if (existing) {
        results.push(existing);
        console.log(`\n=== ${project.id}: ${project.name} (restored from checkpoint) ===`);
        continue;
      }
      await updateRootProgress(results, `${project.name} live-site capture in progress`, project);
      try {
        browser ||= await chromium.launch({ headless: true, args: ['--disable-dev-shm-usage', '--no-sandbox'] });
        const result = await captureProject(browser, project);
        results.push(result);
        await updateRootProgress(results, `${project.name} asset set generated and published`);
        await publishCheckpoint(project);
      } catch (error) {
        await updateRootProgress(results, `${project.name} capture requires attention`, project, true);
        await publishBlockedProgress(project);
        throw error;
      }
    }
  } finally {
    if (browser) await browser.close();
  }

  await updateRootProgress(results, 'All Sprint 4 project assets generated; final QA pending');
  const totalImages = results.reduce((sum, p) => sum + p.images.length, 0);
  const totalVideos = results.reduce((sum, p) => sum + p.videos.length, 0);
  const readme = `# QA Portfolio Visual Asset Library — Sprint 4\n\n` +
    `**Asset-generation date:** ${CAPTURE_DATE}<br>\n**Projects:** ${results.length}<br>\n**Static images:** ${totalImages}<br>\n**Videos:** ${totalVideos}\n\n` +
    `This package is a visual asset archive for an existing QA portfolio. It is not a portfolio website. Every captured UI state originates from the live public website listed below. Neutral QA labels appear only in the responsive and user-flow comparison compositions.\n\n` +
    `## Project inventory\n\n| # | Project | Website | Images | Videos |\n|---:|---|---|---:|---:|\n` +
    results.map(p => `| ${p.id} | ${p.name} | ${p.url} | ${p.images.length} | ${p.videos.length} |`).join('\n') +
    `\n\n## Capture standards\n\n- Desktop coverage: 1440 × 900\n- Mobile coverage: 390 × 844\n- Video: 1280 × 720 MP4, short task-oriented walkthrough\n- No checkout completion, purchases, account creation, or personal data entry\n- No fabricated defects, pages, products, testimonials, features, or interactions\n- Exact and perceptual near-duplicate rejection\n- Publicly unavailable routes are documented in the relevant project README\n\nEach project folder contains an image inventory, video notes, availability notes, and descriptive filenames.\n`;
  await fs.writeFile(path.join(ROOT, 'README.md'), readme);

  const manifest = { title: 'QA Portfolio Visual Assets — Sprint 4', generated: CAPTURE_DATE, totalImages, totalVideos, projects: results };
  await createBrowser(manifest);
  await fs.writeFile('capture-report-sprint-04.json', JSON.stringify(manifest, null, 2));
  await fs.rm(TMP, { recursive: true, force: true });
  console.log(`\nSprint 4 capture complete: ${totalImages} images, ${totalVideos} videos.`);
  if (results.length !== 10 || totalImages < 100 || totalVideos < 10) throw new Error('Minimum delivery count was not met');
}

main().catch(error => { console.error(error); process.exit(1); });
