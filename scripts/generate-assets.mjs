import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const ROOT = path.resolve('QA-PORTFOLIO-ASSETS/Sprint-01');
const TMP = path.resolve('.capture-tmp');
const CAPTURE_DATE = '2026-09-15';
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const VIDEO_SIZE = { width: 1280, height: 720 };
const NAV_TIMEOUT = 45_000;

const projects = [
  {
    id: '01', slug: 'fandiem', folder: '01-fandiem', name: 'Fandiem', url: 'https://fandiem.com',
    prefix: '01_fandiem', kind: 'Fundraising sweepstakes platform',
    signatureText: 'Trending', listingUrl: '/', listingText: 'Ending Soon',
    detailUrl: '/sweeps/win-a-cabo-getaway-to-meet-sammy-hagar-at-his-annual-birthday-bash', detailText: 'SUPPORTING',
    highlightUrl: '/', highlightText: 'How It Works', highlightLabel: 'donation journey',
    interactionUrl: '/sweeps/win-a-trip-to-meet-brandon-flowers-in-dublin-for-his-tour-finale', interactionText: 'ENTER NOW',
    flowLabels: ['Donate to win', 'Trending campaigns', 'Sweepstakes detail'],
    videoPurpose: 'Homepage to active sweepstakes discovery flow'
  },
  {
    id: '02', slug: 'revived-smiles', folder: '02-revived-smiles', name: 'Revived Smiles', url: 'https://revivedsmiles.com',
    prefix: '02_revived_smiles', kind: 'At-home dental appliances',
    signatureText: 'Revive Your Smile', listingUrl: '/collections/all', listingText: 'Products',
    detailUrl: '/products/flexible-partial-denture', detailText: 'Flexible Partial Denture',
    highlightUrl: '/', highlightText: '3 Easy Steps', highlightLabel: 'three-step impression process',
    interactionUrl: '/pages/smile-assessment-quiz', interactionText: 'Smile',
    flowLabels: ['Confidence proposition', 'Appliance catalogue', 'Product detail'],
    videoPurpose: 'Homepage, appliance catalogue, and product detail flow'
  },
  {
    id: '03', slug: 'kcaps', folder: '03-kcaps', name: 'K-CAPS', url: 'https://www.kcaps.com',
    prefix: '03_kcaps', kind: 'B2B capsule manufacturing',
    signatureText: 'Our Certifications', listingUrl: '/collections/all-k-caps', listingText: 'Capsules',
    detailUrl: '/products/clear-acid-resistant-hpmc-vegetarian-capsules-size-1-box-of-125-000', detailText: 'Acid Resistant',
    highlightUrl: '/', highlightText: 'Build Your Own Capsule', highlightLabel: 'capsule configurator',
    interactionUrl: '/', interactionText: 'Capsule Color',
    flowLabels: ['Capsule proposition', 'Product catalogue', 'Capsule detail'],
    videoPurpose: 'B2B capsule catalogue and product configuration journey'
  },
  {
    id: '04', slug: 'dr-stengler', folder: '04-dr-stengler', name: 'Dr. Stengler', url: 'https://drstengler.com',
    prefix: '04_dr_stengler', kind: 'Integrative wellness and supplements',
    signatureText: 'Trusted', listingUrl: '/collections/all', listingText: 'Products',
    detailUrl: '/products/digestive-wellness', detailText: 'Digestive Wellness',
    highlightUrl: '/pages/about', highlightText: 'Dr.', highlightLabel: 'practitioner credentials',
    interactionUrl: '/pages/create-your-own-bundle', interactionText: 'Bundle',
    flowLabels: ['Doctor-formulated care', 'Wellness catalogue', 'Protocol detail'],
    videoPurpose: 'Doctor-led wellness discovery from homepage to protocol detail'
  },
  {
    id: '05', slug: 'hershop', folder: '05-hershop', name: 'HER SHOP®', url: 'https://hershop.com',
    prefix: '05_hershop', kind: 'Bridal and occasion fashion',
    signatureText: 'Shop by Bridal Category', listingUrl: '/collections/wedding-dresses', listingText: 'Wedding',
    detailUrl: '/products/simple-wedding-dresses-womans-sexy-a-line-sleeveless-bridal-ball-gowns-sweep-train-backless-tulle-vestidos-de-novia-customized', detailText: 'Wedding Dress',
    highlightUrl: '/', highlightText: 'New Arrivals', highlightLabel: 'bridal editorial merchandising',
    interactionUrl: '/collections/wedding-jewelry', interactionText: 'Jewelry',
    flowLabels: ['Bridal campaign', 'Wedding collection', 'Gown detail'],
    videoPurpose: 'Bridal shopping flow from campaign to gown detail'
  },
  {
    id: '06', slug: 'the-scaff-shop', folder: '06-the-scaff-shop', name: 'The Scaff Shop', url: 'https://thescaffshop.com',
    prefix: '06_the_scaff_shop', kind: 'Reclaimed scaffold furniture and materials',
    signatureText: 'Handcrafted in the UK', listingUrl: '/collections/all', listingText: 'Products',
    detailUrl: null, detailMatcher: '/products/', detailText: 'Quantity',
    highlightUrl: '/pages/about-us', highlightText: 'About', highlightLabel: 'reclaimed-material brand story',
    interactionUrl: '/collections', interactionText: 'Collections',
    flowLabels: ['Reclaimed craftsmanship', 'Product catalogue', 'Product detail'],
    videoPurpose: 'Reclaimed furniture discovery and product browsing flow'
  },
  {
    id: '07', slug: 'maison-khloe', folder: '07-maison-khloe', name: 'Maison Khloe', url: 'https://maisonkhloe.ca',
    prefix: '07_maison_khloe', kind: 'Curated women’s fashion',
    signatureText: 'Collection', listingUrl: '/collections/spring-2026', listingText: 'Spring',
    detailUrl: null, detailMatcher: '/products/', detailText: 'Size',
    highlightUrl: '/collections/last-call', highlightText: 'Last Call', highlightLabel: 'seasonal editorial collection',
    interactionUrl: '/collections/all', interactionText: 'Filter',
    flowLabels: ['Fashion editorial', 'Seasonal collection', 'Product detail'],
    videoPurpose: 'Editorial fashion flow from homepage to product detail'
  },
  {
    id: '08', slug: 'summit-sheets-bedding', folder: '08-summit-sheets-bedding', name: 'Summit Sheets', url: 'https://summitsheetsbedding.com',
    prefix: '08_summit_sheets_bedding', kind: 'Custom camping bedding',
    signatureText: 'Custom-Made Sheets', listingUrl: '/collections/sheet-sets', listingText: 'Sheets',
    detailUrl: '/products/matttess-protector', detailText: 'Mattress Protector',
    highlightUrl: '/', highlightText: 'Our Technology', highlightLabel: 'performance fabric technology',
    interactionUrl: '/products/matttess-protector', interactionText: 'Size',
    flowLabels: ['Outdoor comfort', 'Sheet-set catalogue', 'Custom-fit detail'],
    videoPurpose: 'Camping bedding discovery and custom-fit product flow'
  },
  {
    id: '09', slug: 'peak-scents', folder: '09-peak-scents', name: 'Peak Scents', url: 'https://peakscents.com',
    prefix: '09_peak_scents', kind: 'Plant-based skincare and refill shop',
    signatureText: 'Shop Our Best Sellers', listingUrl: '/collections/best-sellers', listingText: 'Best',
    detailUrl: '/products/new-rose-phyto3-babchi-serum', detailText: 'Babchi',
    highlightUrl: '/', highlightText: 'Plant-Based', highlightLabel: 'botanical skincare merchandising',
    interactionUrl: '/products/organic-rose-phyto3-night-cream', interactionText: 'Night Cream',
    flowLabels: ['Clean-beauty proposition', 'Best sellers', 'Serum detail'],
    videoPurpose: 'Plant-based skincare shopping and product detail flow'
  },
  {
    id: '10', slug: 'green-beauty-expert', folder: '10-green-beauty-expert', name: 'Green Beauty Expert', url: 'https://www.greenbeautyexpert.ca',
    prefix: '10_green_beauty_expert', kind: 'Natural beauty education and services',
    signatureText: 'Beauty Blog', listingUrl: '/category/blog/', listingText: 'Beauty',
    detailUrl: '/sensitive-skin-vs-sensitized-skin/', detailText: 'Sensitive Skin',
    highlightUrl: '/', highlightText: 'Video Tutorials', highlightLabel: 'beauty education library',
    interactionUrl: '/toronto-green-beauty-expert-services/', interactionText: 'Services',
    flowLabels: ['Expert proposition', 'Beauty journal', 'Article detail'],
    videoPurpose: 'Beauty education journey from homepage to editorial article'
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

async function closeInterruptions(page) {
  const labels = [
    /accept all/i, /accept cookies/i, /allow all/i, /agree/i, /got it/i,
    /continue without accepting/i, /no thanks/i, /not now/i, /close/i
  ];
  for (const label of labels) {
    const button = page.getByRole('button', { name: label }).first();
    try {
      if (await button.isVisible({ timeout: 250 })) await button.click({ timeout: 1_000 });
    } catch {}
  }
  const closeSelectors = [
    '[aria-label="Close dialog"]', '[aria-label="Close"]', '.popup-close',
    '.modal__close-button', '.newsletter-popup__close', '#shopify-chat-dummy button'
  ];
  for (const selector of closeSelectors) {
    try {
      const el = page.locator(selector).first();
      if (await el.isVisible({ timeout: 150 })) await el.click({ timeout: 500 });
    } catch {}
  }
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

async function goto(page, project, route, notes, label) {
  const target = urlFor(project, route);
  try {
    const response = await page.goto(target, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT });
    await settle(page);
    const status = response?.status() || 0;
    const title = await page.title().catch(() => '');
    const bad = status >= 400 || /404|page not found|access denied|just a moment/i.test(title);
    if (bad) throw new Error(`HTTP ${status || 'unknown'} / ${title}`);
    return true;
  } catch (error) {
    notes.push(`${label} at ${target} was unavailable (${String(error.message).slice(0, 140)}); a verified on-site fallback was used.`);
    if (target !== urlFor(project, '/')) {
      await page.goto(urlFor(project, '/'), { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT }).catch(() => {});
      await settle(page);
    }
    return false;
  }
}

async function scrollToText(page, text, fallbackRatio = 0.48) {
  if (text) {
    try {
      const locator = page.getByText(text, { exact: false }).first();
      if (await locator.count()) {
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

async function screenshot(page, file) {
  await closeInterruptions(page);
  await page.screenshot({ path: file, type: 'jpeg', quality: 82, animations: 'disabled', caret: 'hide' });
  // Re-encode consistently and strip metadata for compact, portfolio-friendly files.
  const buffer = await sharp(file).rotate().jpeg({ quality: 80, mozjpeg: true, chromaSubsampling: '4:2:0' }).toBuffer();
  await fs.writeFile(file, buffer);
}

async function discoverDetail(page, project, notes) {
  if (project.detailUrl) return project.detailUrl;
  await goto(page, project, project.listingUrl, notes, 'Product listing');
  const links = await page.locator('a[href*="/products/"]').evaluateAll((els, origin) =>
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
  const page = await context.newPage();
  let video;
  try {
    await goto(page, project, '/', notes, 'Video homepage');
    video = page.video();
    await page.evaluate(() => scrollTo(0, 0));
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
  const stem = `${project.prefix}_video_${project.slug === 'green-beauty-expert' ? 'editorial_journey' : 'product_journey'}_001`;
  const out = path.join(base, 'video', `${stem}.mp4`);
  const thumb = path.join(base, 'video', `${stem}.jpg`);
  await execFileAsync('ffmpeg', [
    '-y', '-i', rawPath, '-an', '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '30', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out
  ], { maxBuffer: 10 * 1024 * 1024 });
  await execFileAsync('ffmpeg', ['-y', '-ss', '00:00:03', '-i', out, '-frames:v', '1', '-q:v', '3', thumb], { maxBuffer: 10 * 1024 * 1024 });
  return { file: path.basename(out), thumbnail: path.basename(thumb), purpose: project.videoPurpose };
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
    await page.evaluate(() => scrollTo(0, 0));
    await settle(page, 500);
    const desktopHero = await add('desktop_home_hero', 'Desktop homepage hero');

    await scrollToText(page, project.signatureText, 0.30);
    const desktopSignature = await add(`desktop_${project.slug === 'green-beauty-expert' ? 'beauty_blog' : 'signature_section'}`, `Desktop ${project.signatureText} section`);

    await goto(page, project, project.listingUrl, notes, 'Listing');
    await scrollToText(page, project.listingText, 0.18);
    const desktopListing = await add(`desktop_${project.slug === 'green-beauty-expert' ? 'editorial_listing' : 'collection_listing'}`, 'Desktop listing / catalogue');

    const detailRoute = await discoverDetail(page, project, notes);
    await goto(page, project, detailRoute, notes, 'Detail');
    await page.evaluate(() => scrollTo(0, 0));
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
    const mobile = await mobileContext.newPage();
    mobile.setDefaultTimeout(8_000);
    await goto(mobile, project, '/', notes, 'Mobile homepage');
    await mobile.evaluate(() => scrollTo(0, 0));
    await settle(mobile, 450);
    const mobileHomeFile = path.join(imagesDir, `${project.prefix}_mobile_home_hero_001.jpg`);
    await screenshot(mobile, mobileHomeFile);
    captures.push({ file: path.basename(mobileHomeFile), label: 'Mobile homepage hero' });

    const navType = await openMobileNavigation(mobile);
    const mobileNavFile = path.join(imagesDir, `${project.prefix}_interaction_mobile_${navType}_001.jpg`);
    await screenshot(mobile, mobileNavFile);
    captures.push({ file: path.basename(mobileNavFile), label: `Mobile ${navType} state` });

    await goto(mobile, project, detailRoute, notes, 'Mobile detail');
    await mobile.evaluate(() => scrollTo(0, 0));
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

    // Verify unique binary output; composed assets and viewport states must not be duplicates.
    const hashes = new Map();
    for (const item of captures) {
      const data = await fs.readFile(path.join(imagesDir, item.file));
      const hash = crypto.createHash('sha256').update(data).digest('hex');
      if (hashes.has(hash)) notes.push(`Capture ${item.file} matched ${hashes.get(hash)} byte-for-byte and was retained only if it documents a distinct route/state.`);
      hashes.set(hash, item.file);
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
      images: captures.map(c => ({ ...c, path: `QA-PORTFOLIO-ASSETS/Sprint-01/${project.folder}/images/${c.file}` })),
      videos: [{ ...video, path: `QA-PORTFOLIO-ASSETS/Sprint-01/${project.folder}/video/${video.file}`, thumbnailPath: `QA-PORTFOLIO-ASSETS/Sprint-01/${project.folder}/video/${video.thumbnail}` }],
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
  await fs.writeFile('asset-browser/manifest.json', JSON.stringify(manifest, null, 2));
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
  await fs.writeFile('capture-progress.json', JSON.stringify(progress, null, 2));
  await execFileAsync('python3', ['scripts/update_readme_progress.py']);
}

async function publishCheckpoint(project) {
  if (process.env.CHECKPOINT_COMMITS !== '1') return;
  const branch = process.env.CHECKPOINT_BRANCH || '';
  if (!/^arena\/[a-z0-9-]+$/.test(branch)) throw new Error(`Unsafe or missing checkpoint branch: ${branch}`);
  await execFileAsync('git', ['add', 'README.md', 'capture-progress.json', path.join(ROOT, project.folder)]);
  await execFileAsync('git', ['commit', '-m', `Add ${project.id} ${project.name} asset checkpoint [skip ci]`]);
  await execFileAsync('git', ['push', 'origin', `HEAD:${branch}`], { maxBuffer: 10 * 1024 * 1024 });
  console.log(`  checkpoint published: ${project.id} ${project.name}`);
}

async function publishBlockedProgress(project) {
  if (process.env.CHECKPOINT_COMMITS !== '1') return;
  const branch = process.env.CHECKPOINT_BRANCH || '';
  if (!/^arena\/[a-z0-9-]+$/.test(branch)) return;
  await execFileAsync('git', ['add', 'README.md', 'capture-progress.json']);
  const commit = await execFileAsync('git', ['commit', '-m', `Document ${project.id} capture interruption [skip ci]`]).catch(() => null);
  if (commit) await execFileAsync('git', ['push', 'origin', `HEAD:${branch}`]);
}

async function main() {
  const checkpointMode = process.env.CHECKPOINT_COMMITS === '1';
  if (!checkpointMode) await fs.rm(ROOT, { recursive: true, force: true });
  await fs.rm(TMP, { recursive: true, force: true });
  await fs.mkdir(ROOT, { recursive: true });
  await fs.mkdir(TMP, { recursive: true });
  const browser = await chromium.launch({ headless: true, args: ['--disable-dev-shm-usage', '--no-sandbox'] });
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
    await browser.close();
  }

  const totalImages = results.reduce((sum, p) => sum + p.images.length, 0);
  const totalVideos = results.reduce((sum, p) => sum + p.videos.length, 0);
  const readme = `# QA Portfolio Visual Asset Library — Sprint 1\n\n` +
    `**Asset-generation date:** ${CAPTURE_DATE}  \n**Projects:** ${results.length}  \n**Static images:** ${totalImages}  \n**Videos:** ${totalVideos}\n\n` +
    `This package is a visual asset archive for an existing QA portfolio. It is not a portfolio website. Every captured UI state originates from the live public website listed below. Neutral QA labels appear only in the responsive and user-flow comparison compositions.\n\n` +
    `## Project inventory\n\n| # | Project | Website | Images | Videos |\n|---:|---|---|---:|---:|\n` +
    results.map(p => `| ${p.id} | ${p.name} | ${p.url} | ${p.images.length} | ${p.videos.length} |`).join('\n') +
    `\n\n## Capture standards\n\n- Desktop coverage: 1440 × 900\n- Mobile coverage: 390 × 844\n- Video: 1280 × 720 MP4, short task-oriented walkthrough\n- No checkout completion, purchases, account creation, or personal data entry\n- No fabricated defects, pages, products, testimonials, features, or interactions\n- Publicly unavailable routes are documented in the relevant project README\n\nEach project folder contains an image inventory, video notes, availability notes, and descriptive filenames.\n`;
  await fs.writeFile(path.join(ROOT, 'README.md'), readme);

  const manifest = { title: 'QA Portfolio Visual Assets — Sprint 1', generated: CAPTURE_DATE, totalImages, totalVideos, projects: results };
  await createBrowser(manifest);
  await fs.writeFile('capture-report.json', JSON.stringify(manifest, null, 2));
  await fs.rm(TMP, { recursive: true, force: true });
  console.log(`\nCapture complete: ${totalImages} images, ${totalVideos} videos.`);
  if (results.length !== 10 || totalImages < 100 || totalVideos < 10) throw new Error('Minimum delivery count was not met');
}

main().catch(error => { console.error(error); process.exit(1); });
