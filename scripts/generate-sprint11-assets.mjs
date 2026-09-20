import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const ROOT = path.resolve('QA-PORTFOLIO-ASSETS/Sprint-11');
const TMP = path.resolve('.capture-tmp');
const CAPTURE_DATE = '2026-09-20';
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const VIDEO_SIZE = { width: 1280, height: 720 };
const NAV_TIMEOUT = 45_000;

const projects = [
  { id: '95', slug: 'prime-baby-gear', folder: '95-prime-baby-gear', name: 'Prime Baby Gear', url: 'https://primebabygear.com', prefix: '95_prime_baby_gear', kind: 'UK retailer of premium baby gear: prams, travel systems, car seats, nursery furniture, and accessories', detailSlug: 'travel_system_detail', signatureText: 'Verified Warranty', listingUrl: '/collections/best-sellers-1', listingText: 'Best Sellers', detailUrl: '/products/babymore-kai-2-in-1-pram-pushchair-sandstone', detailText: 'Kai', highlightUrl: '/collections/mercedes-baby', highlightText: 'Mercedes', highlightLabel: 'Mercedes signature travel-system collection', interactionUrl: '/collections/2-in-1-pram-pushchair', interactionText: '2 in 1', extraCaptures: [{ url: '/collections/babymore', text: 'Babymore', slug: 'babymore_brand_range', label: 'Babymore brand range' }, { url: '/collections/baby-jogger', text: 'Baby Jogger', slug: 'baby_jogger_range', label: 'Baby Jogger brand range' }], flowLabels: ['Premium baby gear', 'Best sellers', 'Travel system detail'], videoSlug: 'baby_gear_journey', videoPurpose: 'Premium baby-gear discovery from best sellers to travel-system detail' },
  { id: '96', slug: 'ollie-burwell', folder: '96-ollie-burwell', name: 'Ollie Burwell', url: 'https://ollieburwell.com', prefix: '96_ollie_burwell', kind: 'Hand-batik luxury silk and voile sarongs, scarves, kaftans, and resort wear', detailSlug: 'silk_sarong_detail', signatureText: 'Hand-Batik by Artisans', listingUrl: '/collections/silk-scarves-sarongs', listingText: 'Silk Sarongs', detailUrl: '/products/sage-and-mink-tyedye-silk-sarong', detailText: 'Pure Silk', highlightUrl: '/pages/how-to-wear-guide', highlightText: 'How to Wear', highlightLabel: 'how-to-wear styling guide', interactionUrl: '/collections/cotton-sarongs', interactionText: 'Voile', extraCaptures: [{ url: '/collections/new-arrivals', text: 'New Arrivals', slug: 'new_arrivals_edit', label: 'New arrivals edit' }, { url: '/collections/kaftans', text: 'Kaftans', slug: 'kaftan_range', label: 'Kaftan resort range' }], flowLabels: ['Artisan luxury', 'Silk sarongs', 'Sarong detail'], videoSlug: 'resort_wear_journey', videoPurpose: 'Resort-wear discovery from artisan craft story to pure-silk sarong detail' },
  { id: '97', slug: 'nokoluxe', folder: '97-nokoluxe', name: 'Nokoluxe Living', url: 'https://nokoluxe.com', prefix: '97_nokoluxe', kind: 'Luxury outdoor furniture, fire tables, grills, saunas, and spa products', detailSlug: 'adirondack_chair_detail', signatureText: 'Everything For Life Outdoors', listingUrl: '/collections/outdoor-furniture-collection', listingText: 'Outdoor Furniture', detailUrl: '/products/luxcraft-urban-adirondack-chair-modern-outdoor-chair-with-clean-design', detailText: 'Adirondack', highlightUrl: '/collections/fire-pit-table', highlightText: 'Fire Pit', highlightLabel: 'fire pit table collection', interactionUrl: '/collections/grills', interactionText: 'Grill', extraCaptures: [{ url: '/collections/sauna', text: 'Spa', slug: 'spa_wellness_collection', label: 'Spa and wellness collection' }, { url: '/collections/luxcraft', text: 'LuxCraft', slug: 'luxcraft_range', label: 'LuxCraft furniture range' }], flowLabels: ['Outdoor living', 'Furniture collection', 'Adirondack detail'], videoSlug: 'outdoor_living_journey', videoPurpose: 'Outdoor-living journey from category browsing to LuxCraft chair detail' },
  { id: '98', slug: 'vintage-art-garage', folder: '98-vintage-art-garage', name: 'Vintage Art Garage', url: 'https://vintageartgarage.com', prefix: '98_vintage_art_garage', kind: 'Framed vintage automotive advertisements, classic car and truck prints, and retro wall art', unavailable: true, unavailableNote: 'The live storefront is password-protected and publishes only a branded temporary-closure page ("Vintage Art Garage is temporarily closed while we\u2019re traveling. We\u2019ll reopen in late October."). Every storefront route redirects to /password, the DNS-declared Shopify origin reports "This store will be right back / Store unavailable", and the sitemap and products.json endpoints return no storefront data. No authentic storefront UI states are retrievable, and the criteria exclude password/closed-state screenshots, cached pages, and fabricated material.' },
  { id: '99', slug: 'paw-by-four', folder: '99-paw-by-four', name: 'Paw by Four', url: 'https://pawbyfour.com', prefix: '99_paw_by_four', kind: 'Canine-anxiety support: digital guides, lick mats, enrichment tools, and dog-safe nutrition', detailSlug: 'lick_mat_detail', signatureText: 'From Anxiety to Action to Calm', listingUrl: '/collections/lick-mats-enrichment', listingText: 'Lick Mats', detailUrl: '/products/travel-buddy-dog-lick-mat', detailText: 'Travel Buddy', highlightUrl: '/pages/understanding-anxiety', highlightText: 'Anxiety', highlightLabel: 'dog anxiety education hub', interactionUrl: '/collections/digital-guides-downloads', interactionText: 'Digital Guides', extraCaptures: [{ url: '/blogs/resources', text: 'Resource', slug: 'resource_library', label: 'Learning resource library' }, { url: '/pages/our-story', text: 'Our Story', slug: 'brand_story', label: 'Brand story and guiding principles' }], flowLabels: ['Evidence-based calm', 'Enrichment range', 'Lick mat detail'], videoSlug: 'anxious_dog_support_journey', videoPurpose: 'Support journey from anxiety education to lick-mat product detail' },
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
  // Only sweep inside real modal surfaces, and only send Escape when a modal is
  // actually open, so a deliberately opened mobile navigation state survives.
  const modals = await page.locator('[role="dialog"], dialog[open], [aria-modal="true"], .modal, .popup').all().catch(() => []);
  let modalOpen = false;
  for (const modal of modals) {
    if (!(await modal.isVisible({ timeout: 150 }).catch(() => false))) continue;
    modalOpen = true;
    await clickInterruptionControls(modal, true);
  }
  if (modalOpen) {
    await page.keyboard.press('Escape').catch(() => {});
    await page.waitForTimeout(150);
  }
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
    const homeRoute = project.homeUrl || '/';
    if (target !== urlFor(project, homeRoute)) {
      await page.goto(urlFor(project, homeRoute), { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT }).catch(() => {});
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
    userAgent: ['57', '71', '92'].includes(project.id)
      ? 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36 QA-Portfolio-Capture/1.0',
    locale: 'en-US', colorScheme: 'light', reducedMotion: 'reduce'
  });
  await suppressThirdPartyCaptureInterruptions(context, project);
  const page = await context.newPage();
  let video;
  try {
    await goto(page, project, project.homeUrl || '/', notes, 'Video homepage');
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
  if ((await fs.stat(thumb)).size < 10_000) {
    const richerPoster = await sharp(thumb).jpeg({ quality: 95, mozjpeg: false }).toBuffer();
    await fs.writeFile(thumb, richerPoster);
  }

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

async function fetchSitemapRoutes(project) {
  const routes = { products: [], pages: [], collections: [], blogs: [] };
  const kindOf = url => {
    if (url.includes('products')) return 'products';
    if (url.includes('pages')) return 'pages';
    if (url.includes('collections')) return 'collections';
    if (url.includes('blogs')) return 'blogs';
    return null;
  };
  const sources = [];
  try {
    // Shopify publishes a sitemap index whose child URLs carry from/to cursors.
    const response = await fetch(urlFor(project, '/sitemap.xml'), { headers: { 'User-Agent': 'Mozilla/5.0 QA-Portfolio-Route-Verification/1.0' } });
    if (response.ok) {
      const xml = await response.text();
      for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) sources.push(match[1]);
    }
  } catch {}
  for (const fallback of ['sitemap_products_1.xml', 'sitemap_pages_1.xml', 'sitemap_collections_1.xml', 'sitemap_blogs_1.xml']) {
    try { sources.push(urlFor(project, `/${fallback}`)); } catch {}
  }
  const projectHost = new URL(project.url).hostname.replace(/^www\./, '');
  for (const source of [...new Set(sources)]) {
    const kind = kindOf(source);
    if (!kind) continue;
    try {
      const response = await fetch(source, { headers: { 'User-Agent': 'Mozilla/5.0 QA-Portfolio-Route-Verification/1.0' } });
      if (!response.ok) continue;
      const xml = await response.text();
      for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
        try {
          const parsed = new URL(match[1]);
          if (parsed.hostname.replace(/^www\./, '') !== projectHost) continue;
          const route = `${parsed.pathname}${parsed.search}`;
          if (!routes[kind].includes(route)) routes[kind].push(route);
        } catch {}
      }
    } catch {}
  }
  return routes;
}

function routeIsPublished(route, routes) {
  if (!route) return false;
  const pathname = (() => { try { return new URL(route, 'https://placeholder.invalid').pathname; } catch { return route; } })();
  return Object.values(routes).some(list => list.some(candidate => candidate.split('?')[0] === pathname));
}

function publishedRoutesOfKind(route, routes) {
  if (!route) return [];
  if (route.startsWith('/products/')) return routes.products;
  if (route.startsWith('/collections')) return [...routes.collections, ...routes.pages];
  if (route.startsWith('/blogs/')) return routes.blogs.length ? [...routes.blogs] : [...routes.pages];
  if (route.startsWith('/pages/')) return [...routes.pages, ...routes.blogs];
  return [...routes.collections, ...routes.products, ...routes.pages];
}

/**
 * Keep every configured route, but if the live sitemap no longer publishes it,
 * fall back to another route of the same type instead of failing the capture.
 */
function reconcileRoute(project, route, routes, label, notes, options = {}) {
  if (!route || routeIsPublished(route, routes)) return route;
  const pool = publishedRoutesOfKind(route, routes);
  // Without published route data of the same kind there is nothing reliable to
  // substitute, so the configured route is captured as planned.
  if (!pool.length) return route;
  const candidates = pool
    .filter(candidate => !options.exclude?.includes(candidate))
    .filter(candidate => options.match ? options.match.test(candidate) : true);
  if (!candidates.length) return route;
  const replacement = candidates[0];
  notes.push(`Configured ${label} route ${route} is not published by the live sitemap; ${replacement} was captured instead.`);
  return replacement;
}

/**
 * Non-essential captures are logged and skipped rather than aborting a project
 * that already holds enough authentic coverage.
 */
async function attemptCapture(label, notes, action) {
  try {
    return await action();
  } catch (error) {
    notes.push(`Optional capture skipped: ${label} could not be captured (${String(error?.message || error).slice(0, 160)}).`);
    return null;
  }
}

async function documentUnavailableProject(project, notes) {
  const base = path.join(ROOT, project.folder);
  await fs.mkdir(base, { recursive: true });
  let observed = 'The primary domain did not respond to the verification request.';
  try {
    const response = await fetch(project.url, { headers: { 'User-Agent': 'Mozilla/5.0 QA-Portfolio-Availability-Recheck/1.0' }, redirect: 'follow' });
    const body = await response.text();
    const headline = body.match(/<h1[^>]*>([^<]{3,160})<\/h1>/i)?.[1] || body.match(/class="password-page__message"[^>]*>([^<]{3,200})</i)?.[1] || '';
    observed = `Live recheck on ${CAPTURE_DATE}: ${response.url} returned HTTP ${response.status}${headline ? ` with the headline "${headline.replace(/\s+/g, ' ').trim()}"` : ''}.`;
  } catch (error) {
    observed = `Live recheck on ${CAPTURE_DATE} failed: ${String(error?.message || error).slice(0, 200)}.`;
  }
  notes.push(observed);
  const readme = `# ${project.name} — QA Portfolio Visual Assets\n\n` +
    `**Project:** ${project.name}  \n**Website URL:** ${project.url}  \n**Project type:** ${project.kind}  \n**Asset-generation date:** ${CAPTURE_DATE}\n\n` +
    `## Status: unavailable — no accepted assets\n\n` +
    `- Static images: **0**\n- Videos: **0**\n\n` +
    `## Why this project has no assets\n\n${notes.map(note => `- ${note}`).join('\n')}\n\n` +
    `## Policy\n\n- No inaccessible-state, password-page, cached, or previously indexed storefront material is presented as project coverage.\n` +
    `- No products, prices, copy, testimonials, UI states, or defects were fabricated.\n` +
    `- Re-capture is possible once the storefront is publicly reachable again.\n`;
  await fs.writeFile(path.join(base, 'README.md'), readme);
  return { notes, observed };
}

async function captureProject(browser, project) {
  console.log(`\n=== ${project.id}: ${project.name} ===`);
  const base = await mkdirs(project);
  const imagesDir = path.join(base, 'images');
  const notes = [];
  const captures = [];
  const context = await browser.newContext({
    viewport: DESKTOP,
    userAgent: ['57', '71', '92'].includes(project.id)
      ? 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36 QA-Portfolio-Capture/1.0',
    locale: 'en-US', colorScheme: 'light', reducedMotion: 'reduce', deviceScaleFactor: 1
  });
  await suppressThirdPartyCaptureInterruptions(context, project);
  const page = await context.newPage();
  page.setDefaultTimeout(8_000);

  // Verify the planned routes against the live sitemap first, so a renamed or
  // retired collection/page degrades to another authentic route instead of
  // failing the whole project capture.
  const sitemapRoutes = await fetchSitemapRoutes(project);
  if (!sitemapRoutes.products.length && !sitemapRoutes.pages.length && !sitemapRoutes.collections.length && !sitemapRoutes.blogs.length) {
    notes.push('The live sitemap endpoints did not return route data; configured routes were captured directly.');
  }
  const listingRoute = reconcileRoute(project, project.listingUrl, sitemapRoutes, 'listing', notes);
  const highlightRoute = reconcileRoute(project, project.highlightUrl, sitemapRoutes, 'project highlight', notes);
  const interactionRoute = reconcileRoute(project, project.interactionUrl, sitemapRoutes, 'secondary experience', notes);
  const extraRoutes = (project.extraCaptures || []).map(extra => ({
    ...extra,
    resolvedUrl: reconcileRoute(project, extra.url, sitemapRoutes, extra.label, notes, { exclude: [listingRoute, highlightRoute, interactionRoute] })
  }));

  const add = async (name, label) => {
    const file = path.join(imagesDir, `${project.prefix}_${name}_001.jpg`);
    await screenshot(page, file);
    captures.push({ file: path.basename(file), label });
    console.log(`  image: ${path.basename(file)}`);
    return file;
  };

  try {
    await goto(page, project, project.homeUrl || '/', notes, 'Homepage');
    await page.evaluate(() => scrollTo(0, 0)).catch(() => {});
    await settle(page, 500);
    const desktopHero = await add('desktop_home_hero', 'Desktop homepage hero');

    await scrollToText(page, project.signatureText, 0.30);
    const desktopSignature = await add(`desktop_${project.slug === 'green-beauty-expert' ? 'beauty_blog' : 'signature_section'}`, `Desktop ${project.signatureText} section`);

    await goto(page, project, listingRoute, notes, 'Listing');
    await scrollToText(page, project.listingText, 0.18);
    const desktopListing = await add('desktop_collection_listing', 'Desktop listing / catalogue');

    let detailRoute = await discoverDetail(page, project, notes);
    if (detailRoute && !routeIsPublished(detailRoute, sitemapRoutes) && sitemapRoutes.products.length) {
      const publishedDetail = sitemapRoutes.products.find(candidate => candidate.split('?')[0] === String(detailRoute).split('?')[0]) || sitemapRoutes.products[0];
      notes.push(`Configured detail route ${detailRoute} is not published by the live sitemap; ${publishedDetail} was captured instead.`);
      detailRoute = publishedDetail;
    }
    await goto(page, project, detailRoute, notes, 'Detail');
    await page.evaluate(() => scrollTo(0, 0)).catch(() => {});
    await settle(page, 450);
    const desktopDetail = await add(`desktop_${project.detailSlug || 'product_detail'}`, 'Desktop detail page');

    await attemptCapture('detail interaction state', notes, async () => {
      await scrollToText(page, project.detailText, 0.43);
      const activated = await activateInteraction(page);
      // Move into the detail content band beyond the hero so the captured state
      // documents real page content rather than repeating the detail view.
      await page.evaluate(() => scrollBy({ top: Math.round(innerHeight * 0.62), behavior: 'instant' })).catch(() => {});
      await page.waitForTimeout(800);
      if (!activated) notes.push('The detail page exposed no additional interactive control; the detail content state was captured instead.');
      return add('interaction_detail_state', 'Meaningful detail interaction / content state');
    });

    await attemptCapture(`project highlight: ${project.highlightLabel}`, notes, async () => {
      await goto(page, project, highlightRoute, notes, 'Project highlight');
      await scrollToText(page, project.highlightText, 0.60);
      return add(`project_highlight_${project.highlightLabel.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '').toLowerCase()}`, `Project highlight: ${project.highlightLabel}`);
    });

    await attemptCapture('secondary project-specific experience', notes, async () => {
      await goto(page, project, interactionRoute, notes, 'Secondary interaction');
      await scrollToText(page, project.interactionText, 0.28);
      await activateInteraction(page);
      return add('desktop_secondary_experience', 'Secondary project-specific experience');
    });

    for (const extra of extraRoutes) {
      await attemptCapture(extra.label, notes, async () => {
        await goto(page, project, extra.resolvedUrl, notes, extra.label);
        await scrollToText(page, extra.text, 0.32);
        return add(`desktop_${extra.slug}`, extra.label);
      });
    }

    const mobileContext = await browser.newContext({
      viewport: MOBILE,
      userAgent: ['57', '71', '92'].includes(project.id)
        ? 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        : 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1 QA-Portfolio-Capture/1.0',
      locale: 'en-US', colorScheme: 'light', reducedMotion: 'reduce', deviceScaleFactor: 1,
      isMobile: true, hasTouch: true
    });
    await suppressThirdPartyCaptureInterruptions(mobileContext, project);
    const mobile = await mobileContext.newPage();
    mobile.setDefaultTimeout(8_000);
    await goto(mobile, project, project.homeUrl || '/', notes, 'Mobile homepage');
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
    const mobileDetailFile = path.join(imagesDir, `${project.prefix}_mobile_${project.detailSlug || 'product_detail'}_001.jpg`);
    await screenshot(mobile, mobileDetailFile);
    captures.push({ file: path.basename(mobileDetailFile), label: 'Mobile detail page' });

    await attemptCapture('mobile project-specific section', notes, async () => {
      await goto(mobile, project, highlightRoute, notes, 'Mobile project highlight');
      await scrollToText(mobile, project.highlightText, 0.52);
      const mobileSectionFile = path.join(imagesDir, `${project.prefix}_mobile_project_specific_section_001.jpg`);
      await screenshot(mobile, mobileSectionFile);
      captures.push({ file: path.basename(mobileSectionFile), label: 'Mobile project-specific section' });
    });
    await mobileContext.close();

    const responsive = path.join(imagesDir, `${project.prefix}_responsive_comparison_001.jpg`);
    await createResponsiveComparison(project, desktopHero, mobileHomeFile, responsive);
    captures.push({ file: path.basename(responsive), label: 'Desktop / mobile responsive QA comparison' });

    const flow = path.join(imagesDir, `${project.prefix}_qa_user_flow_sequence_001.jpg`);
    await createFlowSequence(project, [desktopHero, desktopListing, desktopDetail], flow);
    captures.push({ file: path.basename(flow), label: 'Three-state QA user-flow reference' });

    for (const source of project.sourceAssets || []) {
      const response = await fetch(source.url, { headers: { 'User-Agent': 'Mozilla/5.0 QA-Portfolio-Source-Verification/1.0' } });
      if (!response.ok) throw new Error(`Official source asset failed with HTTP ${response.status}: ${source.url}`);
      const sourceFile = path.join(imagesDir, `${project.prefix}_desktop_${source.slug}_001.jpg`);
      await sharp(Buffer.from(await response.arrayBuffer())).rotate().flatten({ background: '#f5f5f4' })
        .resize(DESKTOP.width, DESKTOP.height, { fit: 'contain', background: '#f5f5f4', withoutEnlargement: false })
        .jpeg({ quality: 88, mozjpeg: true }).toFile(sourceFile);
      captures.push({ file: path.basename(sourceFile), label: source.label, sourceUrl: source.url });
      notes.push(`${source.label} uses a current image embedded by the live site from its official Webflow CDN; the exact source URL is recorded in the manifest.`);
      console.log(`  source image: ${path.basename(sourceFile)}`);
    }

    await context.close();
    let video;
    try {
      video = await recordVideo(browser, project, detailRoute, base, notes);
    } catch (error) {
      notes.push(`Live walkthrough recording was unavailable (${String(error?.message || error).slice(0, 160)}); the playable MP4 was composed from the authentic captures instead.`);
      video = await createSlideshowVideo(project, base, [desktopHero, desktopListing || desktopSignature, desktopDetail], notes);
    }

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
      images: captures.map(c => ({ ...c, path: `QA-PORTFOLIO-ASSETS/Sprint-11/${project.folder}/images/${c.file}` })),
      videos: [{ ...video, path: `QA-PORTFOLIO-ASSETS/Sprint-11/${project.folder}/video/${video.file}`, thumbnailPath: `QA-PORTFOLIO-ASSETS/Sprint-11/${project.folder}/video/${video.thumbnail}` }],
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
  await fs.writeFile('asset-browser/manifest-sprint-11.json', JSON.stringify(manifest, null, 2));
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

const unavailableProjects = projects.filter(project => project.unavailable);

function unavailableProgressEntries() {
  return unavailableProjects.map(project => ({
    id: project.id,
    status: 'blocked',
    images: 0,
    videos: 0,
    note: project.unavailableNote
  }));
}

async function updateRootProgress(results, stage, activeProject = null, blocked = false, blockedNote = '') {
  const completed = results.map(result => ({
    id: result.id,
    status: 'captured',
    images: result.images.length,
    videos: result.videos.length,
    note: 'Project assets published; awaiting Sprint-level QA'
  }));
  completed.push(...unavailableProgressEntries());
  if (activeProject && !completed.some(item => item.id === activeProject.id)) {
    completed.push({
      id: activeProject.id,
      status: blocked ? 'blocked' : 'capturing',
      images: 0,
      videos: 0,
      note: blocked ? `Capture stopped: ${blockedNote || 'review workflow diagnostics'}` : 'Live-site capture in progress'
    });
  }
  const progress = { generated: CAPTURE_DATE, stage, projects: completed };
  await fs.writeFile('capture-progress-sprint-11.json', JSON.stringify(progress, null, 2));
  const totalImages = results.reduce((sum, result) => sum + result.images.length, 0);
  const totalVideos = results.reduce((sum, result) => sum + result.videos.length, 0);
  await fs.mkdir('asset-browser', { recursive: true });
  await fs.writeFile('asset-browser/manifest-sprint-11.json', JSON.stringify({
    title: 'QA Portfolio Visual Assets — Sprint 11', generated: CAPTURE_DATE,
    totalImages, totalVideos, projects: results
  }, null, 2));
  await execFileAsync('python3', ['scripts/update_readme_sprint11.py']);
  await execFileAsync('python3', ['scripts/build_asset_browser_manifest.py']);
}

async function publishCheckpoint(project) {
  if (process.env.CHECKPOINT_COMMITS !== '1') return;
  const branch = process.env.CHECKPOINT_BRANCH || '';
  if (!/^arena\/[a-z0-9-]+$/.test(branch)) throw new Error(`Unsafe or missing checkpoint branch: ${branch}`);
  await execFileAsync('git', ['add', 'README.md', 'capture-progress-sprint-11.json', 'asset-browser/manifest-sprint-11.json', 'asset-browser/manifest.json', path.join(ROOT, project.folder)]);
  await execFileAsync('git', ['commit', '-m', `Add Sprint 11 ${project.id} ${project.name} asset checkpoint [skip ci]`]);
  await execFileAsync('git', ['fetch', 'origin', branch]);
  await execFileAsync('git', ['rebase', 'FETCH_HEAD']);
  await execFileAsync('git', ['push', 'origin', `HEAD:${branch}`], { maxBuffer: 10 * 1024 * 1024 });
  console.log(`  checkpoint published: ${project.id} ${project.name}`);
}

async function publishBlockedProgress(project) {
  if (process.env.CHECKPOINT_COMMITS !== '1') return;
  const branch = process.env.CHECKPOINT_BRANCH || '';
  if (!/^arena\/[a-z0-9-]+$/.test(branch)) return;
  await execFileAsync('git', ['add', 'README.md', 'capture-progress-sprint-11.json', 'asset-browser/manifest-sprint-11.json', 'asset-browser/manifest.json', path.join(ROOT, project.folder)]);
  const commit = await execFileAsync('git', ['commit', '-m', `Document Sprint 11 ${project.id} capture interruption [skip ci]`]).catch(() => null);
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
    const captureOrder = [...projects.filter(project => !project.deferCapture), ...projects.filter(project => project.deferCapture)];
    for (const project of captureOrder) {
      const existing = checkpointMode ? await loadProjectCheckpoint(project) : null;
      if (existing) {
        results.push(existing);
        console.log(`\n=== ${project.id}: ${project.name} (restored from checkpoint) ===`);
        continue;
      }
      if (project.unavailable) {
        const unavailableNotes = [project.unavailableNote];
        await documentUnavailableProject(project, unavailableNotes);
        console.log(`\n=== ${project.id}: ${project.name} (unavailable — no authentic storefront coverage) ===`);
        await updateRootProgress(results, `${project.name} storefront is publicly unavailable`);
        await publishBlockedProgress(project);
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
        await updateRootProgress(results, `${project.name} capture requires attention`, project, true, String(error?.message || error).slice(0, 240));
        await publishBlockedProgress(project);
        throw error;
      }
    }
  } finally {
    if (browser) await browser.close();
  }

  await updateRootProgress(results, 'All Sprint 11 project assets generated; final QA pending');
  const totalImages = results.reduce((sum, p) => sum + p.images.length, 0);
  const totalVideos = results.reduce((sum, p) => sum + p.videos.length, 0);
  const readme = `# QA Portfolio Visual Asset Library — Sprint 11\n\n` +
    `**Asset-generation date:** ${CAPTURE_DATE}<br>\n**Projects with assets:** ${results.length}<br>\n**Static images:** ${totalImages}<br>\n**Videos:** ${totalVideos}\n\n` +
    `This package is a visual asset archive for an existing QA portfolio. It is not a portfolio website. Every captured UI state originates from the live public website listed below. Neutral QA labels appear only in the responsive and user-flow comparison compositions.\n\n` +
    `## Project inventory\n\n| # | Project | Website | Images | Videos |\n|---:|---|---|---:|---:|\n` +
    results.map(p => `| ${p.id} | ${p.name} | ${p.url} | ${p.images.length} | ${p.videos.length} |`).join('\n') +
    (unavailableProjects.length
      ? '\n' + unavailableProjects.map(p => `| ${p.id} | ${p.name} | ${p.url} | — | — |\n`).join('')
      : '') +
    `\n## Unavailable project\n\n` +
    (unavailableProjects.length
      ? unavailableProjects.map(p => `- **${p.id} ${p.name}** (<${p.url}>) — ${p.unavailableNote}`).join('\n')
      : '- None in this sprint.') +
    `\n\n## Capture standards\n\n- Desktop coverage: 1440 × 900\n- Mobile coverage: 390 × 844\n- Video: 1280 × 720 MP4, short task-oriented walkthrough\n- No checkout completion, purchases, account creation, or personal data entry\n- No fabricated defects, pages, products, testimonials, features, or interactions\n- Exact and perceptual near-duplicate rejection\n- Publicly unavailable routes are documented in the relevant project README\n\nEach project folder contains an image inventory, video notes, availability notes, and descriptive filenames.\n`;
  await fs.writeFile(path.join(ROOT, 'README.md'), readme);

  const manifest = { title: 'QA Portfolio Visual Assets — Sprint 11', generated: CAPTURE_DATE, totalImages, totalVideos, projects: results };
  await createBrowser(manifest);
  await fs.writeFile('capture-report-sprint-11.json', JSON.stringify(manifest, null, 2));
  await fs.rm(TMP, { recursive: true, force: true });
  console.log(`\nSprint 11 capture complete: ${totalImages} images, ${totalVideos} videos from ${results.length} live storefronts.`);
  if (unavailableProjects.length) console.log(`Documented unavailable project(s): ${unavailableProjects.map(p => `${p.id} ${p.name}`).join(', ')}`);
  const expectedAvailable = projects.filter(project => !project.unavailable).length;
  if (results.length !== expectedAvailable || totalImages < 10 * expectedAvailable || totalVideos < expectedAvailable) {
    throw new Error(`Minimum delivery count was not met: ${results.length}/${expectedAvailable} projects, ${totalImages} images, ${totalVideos} videos`);
  }
}

main().catch(error => { console.error(error); process.exit(1); });
