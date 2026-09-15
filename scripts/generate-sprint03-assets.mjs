import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const ROOT = path.resolve('QA-PORTFOLIO-ASSETS/Sprint-03');
const TMP = path.resolve('.capture-tmp');
const CAPTURE_DATE = '2026-09-16';
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const VIDEO_SIZE = { width: 1280, height: 720 };
const NAV_TIMEOUT = 45_000;

const projects = [
  {
    id: '21', slug: 'moore-beauty', folder: '21-moore-beauty', name: 'Moore Beauty', url: 'https://www.moore-beauty.co.uk',
    prefix: '21_moore_beauty', kind: 'Home-based beauty treatments and holistic therapies',
    signatureText: 'At Moore Beauty, I specialise in', listingUrl: '/treatment-menu.php', listingText: 'Facials',
    detailUrl: '/treatment-menu.php', detailText: 'Massage',
    highlightUrl: '/contact.php', highlightText: 'Contact us', highlightLabel: 'treatment enquiry information',
    interactionUrl: '/gallery.php', interactionText: 'Gallery',
    flowLabels: ['Personal oasis', 'Treatment menu', 'Treatment information'], videoSlug: 'treatment_discovery_journey',
    videoPurpose: 'Beauty treatment discovery from the personal studio story to treatment information'
  },
  {
    id: '22', slug: 'kuurth', folder: '22-kuurth', name: 'KUURTH', url: 'https://kuurth.com',
    prefix: '22_kuurth', kind: 'Wearable-art jewelry and accessories',
    signatureText: 'RINGS', listingUrl: '/collections/rings', listingText: 'Rings',
    detailUrl: '/products/the-creation-of-adam-ring-v3', detailText: 'Select the material',
    highlightUrl: '/collections/naruto-shippuden-x-kuurth', highlightText: 'NARUTO', highlightLabel: 'Naruto collaboration collection',
    interactionUrl: '/collections/exo-glasses', interactionText: 'EXO',
    flowLabels: ['Wearable art', 'Ring collection', 'Creation of Adam ring'], videoSlug: 'wearable_art_journey',
    videoPurpose: 'Wearable-art discovery from category campaign to ring details'
  },
  {
    id: '23', slug: 'biofield-resonator', folder: '23-biofield-resonator', name: 'Biofield Resonator', url: 'https://biofieldresonator.com',
    prefix: '23_biofield_resonator', kind: 'Energy-field wearable and educational content',
    signatureText: 'Science-Backed. Spirit-Aligned', listingUrl: '/collections/all', listingText: 'Biofield',
    detailUrl: '/products/biofield-resonator%E2%84%A2', detailText: 'Why Choose',
    highlightUrl: '/', highlightText: 'Benefits of the Biofield Resonator', highlightLabel: 'benefits and educational overview',
    interactionUrl: '/products/biofield-resonator%E2%84%A2', interactionText: 'Pocket Size',
    flowLabels: ['Energy-field overview', 'Product catalogue', 'Resonator detail'], videoSlug: 'resonator_information_journey',
    videoPurpose: 'Biofield Resonator overview, benefit information, and product-detail journey'
  },
  {
    id: '24', slug: 'xtinctio', folder: '24-xtinctio', name: 'Xtinctio', url: 'https://xtinctio.com',
    prefix: '24_xtinctio', kind: 'Conservation jewelry and wildlife art',
    signatureText: 'Our Handcrafted Animal Jewelry', listingUrl: '/collections/top-sellers', listingText: 'Best Sellers',
    detailUrl: '/collections/top-sellers/products/hope-linen-bracelet', detailText: 'Hope Bracelet',
    highlightUrl: '/pages/conservation-partners', highlightText: 'Conservation', highlightLabel: 'conservation partners and mission',
    interactionUrl: '/collections/hand-painted-collection', interactionText: 'Painting',
    flowLabels: ['Conservation mission', 'Best sellers', 'Hope bracelet detail'], videoSlug: 'conservation_jewelry_journey',
    videoPurpose: 'Conservation-focused jewelry discovery and Hope Bracelet detail journey'
  },
  {
    id: '25', slug: 'wendy-mccallum-art', folder: '25-wendy-mccallum-art', name: 'Wendy McCallum Art', url: 'https://wendymccallumart.co.uk',
    prefix: '25_wendy_mccallum_art', kind: 'Frequency art, resin artwork, and prints',
    signatureText: 'FREQUENCY ART', listingUrl: '/collections/original-artwork', listingText: 'Original',
    detailUrl: null, detailText: 'Artwork',
    highlightUrl: '/collections/mini-resin-crystal-art-original-pieces-under-200', highlightText: 'Mini', highlightLabel: 'mini resin and crystal artwork',
    interactionUrl: '/collections/naughty-but-nice', interactionText: 'Naughty',
    flowLabels: ['Frequency art', 'Original artwork', 'Artwork detail'], videoSlug: 'frequency_art_journey',
    videoPurpose: 'Frequency-art discovery from gallery collection to original artwork detail'
  },
  {
    id: '26', slug: 'e-and-e-essentials', folder: '26-e-and-e-essentials', name: 'E & E Essentials', url: 'https://eandeessentials.com',
    prefix: '26_e_and_e_essentials', kind: 'Handcrafted natural soap and skincare',
    signatureText: 'Clean Skincare You Can Trust', listingUrl: '/collections/all', listingText: 'Products',
    detailUrl: '/products/lemongrass-bar-soap', detailText: 'Lemongrass Bar Soap',
    highlightUrl: '/collections/unscented-products', highlightText: 'Unscented', highlightLabel: 'unscented skincare collection',
    interactionUrl: '/collections/scented-products', interactionText: 'Scented Products',
    flowLabels: ['Natural skincare', 'Product catalogue', 'Lemongrass soap detail'], videoSlug: 'natural_skincare_journey',
    videoPurpose: 'Natural soap and skincare discovery through product detail'
  },
  {
    id: '27', slug: 'anthom-design-house', folder: '27-anthom-design-house', name: 'Anthom Design House', url: 'https://anthomdesignhouse.com',
    prefix: '27_anthom_design_house', kind: 'Furniture collections and project inspiration',
    signatureText: 'BENCHMARK ILE', listingUrl: '/collections/all', listingText: 'All Products',
    detailUrl: '/products/benchmark-ile-bench', detailText: 'ILE Bench',
    highlightUrl: '/pages/projects/solo-house', highlightText: 'Solo House', highlightLabel: 'Solo House project spotlight',
    interactionUrl: '/collections/plan-collection', interactionText: 'PLAN',
    flowLabels: ['Modular furniture', 'Furniture catalogue', 'ILE bench detail'], videoSlug: 'furniture_design_journey',
    videoPurpose: 'Furniture-design discovery from modular collection to product specifications'
  },
  {
    id: '28', slug: 'gabrielle-jewelry', folder: '28-gabrielle-jewelry', name: 'Gabrielle Jewelry', url: 'https://gabriellejewelry.com',
    prefix: '28_gabrielle_jewelry', kind: 'Handmade fine, estate, and contemporary jewelry',
    signatureText: 'Best Sellers', listingUrl: '/collections/new-arrivals', listingText: 'New Arrivals',
    detailUrl: '/products/silver-branch-stud', detailText: 'Silver Branch Stud',
    highlightUrl: '/pages/bespoke', highlightText: 'Bespoke', highlightLabel: 'bespoke jewelry service',
    interactionUrl: '/collections/estate-jewelry', interactionText: 'Estate Jewelry',
    flowLabels: ['Modern heirlooms', 'New arrivals', 'Branch stud detail'], videoSlug: 'handmade_jewelry_journey',
    videoPurpose: 'Handmade jewelry discovery from brand story to product detail'
  },
  {
    id: '29', slug: 'black-arrow-gallery', folder: '29-black-arrow-gallery', name: 'Black Arrow Gallery', url: 'https://www.blackarrowgallery.com',
    prefix: '29_black_arrow_gallery', kind: 'Native American jewelry and art',
    signatureText: 'Authentic Native American Artisans', listingUrl: '/collections/jewelry', listingText: 'Native American Jewelry',
    detailUrl: null, detailText: 'Artist',
    highlightUrl: '/blogs/news/wear-something-real', highlightText: 'Wear Something Real', highlightLabel: 'authentic artisan story',
    interactionUrl: '/collections/artie-yellowhorse', interactionText: 'Artie Yellowhorse',
    flowLabels: ['Authentic artisans', 'Jewelry catalogue', 'Artist-made detail'], videoSlug: 'artisan_jewelry_journey',
    videoPurpose: 'Authentic Native American artisan story and jewelry-detail journey'
  },
  {
    id: '30', slug: 'cowbells', folder: '30-cowbells', name: 'Cowbells.com', url: 'https://cowbells.com',
    prefix: '30_cowbells', kind: 'Custom, event, and team cowbells',
    signatureText: 'Featured Cowbells', listingUrl: '/collections/good-to-go-cowbells', listingText: 'Good-To-Go',
    detailUrl: '/collections/frontpage/products/mae-bells-with-webbing-straps-loud-cowbells', detailText: 'Multi-Color Premium Cowbells',
    highlightUrl: '/collections/custom-bells', highlightText: 'Custom Bells', highlightLabel: 'custom bell options',
    interactionUrl: '/collections/officially-licensed-usa-teams-cheering-bells-for-the-olympics', interactionText: 'Team',
    flowLabels: ['Make some noise', 'Ready-to-ship bells', 'Mae bell detail'], videoSlug: 'cowbell_customization_journey',
    videoPurpose: 'Cowbell discovery from event categories to customizable bell details'
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
    /continue without accepting/i, /no thanks/i, /not now/i, /^save$/i, /close/i
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

async function screenshot(page, file) {
  await closeInterruptions(page);
  await page.screenshot({ path: file, type: 'jpeg', quality: 82, animations: 'disabled', caret: 'hide' });
  // Re-encode consistently and strip metadata for compact, portfolio-friendly files.
  const buffer = await sharp(file).rotate().jpeg({ quality: 80, mozjpeg: true, chromaSubsampling: '4:2:0' }).toBuffer();
  await fs.writeFile(file, buffer);
}

async function captureMooreBeautyHomepageSections(page, project, imagesDir, captures) {
  // This brochure site keeps its hero fixed over conventional viewport captures.
  // Preserve the authentic long page once, then extract semantic content regions
  // from that same live-site screenshot rather than inventing extra UI states.
  await page.evaluate(() => scrollTo(0, 0)).catch(() => {});
  await settle(page, 700);
  const source = path.join(TMP, project.folder, 'moore-beauty-home-full-page.png');
  await page.screenshot({ path: source, type: 'png', fullPage: true, animations: 'disabled', caret: 'hide' });
  const metadata = await sharp(source).metadata();
  const width = metadata.width || DESKTOP.width;
  const height = metadata.height || DESKTOP.height;
  console.log(`  Moore Beauty full-page source: ${width}×${height}`);

  if (height > DESKTOP.height + 100) {
    const overview = path.join(imagesDir, `${project.prefix}_desktop_homepage_full_page_reference_001.jpg`);
    await sharp(source).jpeg({ quality: 78, mozjpeg: true }).toFile(overview);
    captures.push({ file: path.basename(overview), label: 'Desktop full-page homepage reference' });
  }

  const sections = [
    ['personal_oasis_story', 'Your Personal Oasis of Well-being', 'Personal oasis and studio introduction'],
    ['treatment_specialties', 'At Moore Beauty, I specialise in', 'Beauty and holistic treatment specialties'],
    ['waxing_expertise', 'Waxing Expertise', 'Waxing expertise information'],
    ['social_gallery', 'Follow my socials', 'Studio social-gallery section'],
    ['client_testimonials', 'Testimonial 1', 'Client testimonial section'],
    ['contact_footer', 'Oak Tree Rd', 'Contact and location footer']
  ];
  for (const [slug, text, label] of sections) {
    const found = await scrollToText(page, text, 0.5);
    if (!found) continue;
    const output = path.join(imagesDir, `${project.prefix}_desktop_${slug}_001.jpg`);
    await screenshot(page, output);
    captures.push({ file: path.basename(output), label: `Desktop ${label}` });
    console.log(`  image: ${path.basename(output)}`);
  }
}

async function captureMooreBeautyGallerySources(context, project, imagesDir, captures, notes) {
  let saved = 0;
  for (let index = 1; index <= 8; index += 1) {
    let source = null;
    for (const suffix of [`${index}.jpg`, `${index}-thmb.jpg`]) {
      const assetUrl = urlFor(project, `/assets/img/gallery/${suffix}`);
      try {
        const response = await context.request.get(assetUrl, {
          timeout: NAV_TIMEOUT,
          headers: { Referer: urlFor(project, '/gallery.php'), Accept: 'image/avif,image/webp,image/apng,image/jpeg,image/*,*/*;q=0.8' }
        });
        const contentType = response.headers()['content-type'] || '';
        if (response.ok() && contentType.startsWith('image/')) {
          source = await response.body();
          break;
        }
        console.log(`  gallery source unavailable: ${assetUrl} (${response.status()} ${contentType})`);
      } catch (error) {
        console.log(`  gallery source request failed: ${assetUrl} (${String(error.message).slice(0, 100)})`);
      }
    }
    if (!source) continue;
    try {
      await sharp(source).metadata();
      const output = path.join(imagesDir, `${project.prefix}_project_studio_gallery_${String(index).padStart(2, '0')}_001.jpg`);
      await sharp(source).rotate().resize(1200, 900, { fit: 'contain', background: '#f7f4ef' }).jpeg({ quality: 84, mozjpeg: true }).toFile(output);
      captures.push({ file: path.basename(output), label: `Authentic live-site studio gallery image ${index}` });
      console.log(`  image: ${path.basename(output)}`);
      saved += 1;
    } catch {}
  }
  if (saved < 5) notes.push(`Only ${saved} direct studio gallery sources could be retrieved from the live site's public gallery.`);
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
    if (project.slug === 'moore-beauty') {
      await captureMooreBeautyHomepageSections(page, project, imagesDir, captures);
      await captureMooreBeautyGallerySources(context, project, imagesDir, captures, notes);
      await goto(page, project, '/', notes, 'Homepage reset after studio gallery capture');
    }

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

    if (project.slug === 'moore-beauty') {
      const mobileSections = [
        ['personal_oasis_story', 'Your Personal Oasis of Well-being', 'Mobile personal oasis and studio introduction'],
        ['treatment_specialties', 'At Moore Beauty, I specialise in', 'Mobile beauty and holistic treatment specialties'],
        ['social_and_testimonials', 'Follow my socials', 'Mobile social-gallery and testimonial section']
      ];
      for (const [slug, text, label] of mobileSections) {
        if (!(await scrollToText(mobile, text, 0.5))) continue;
        const output = path.join(imagesDir, `${project.prefix}_mobile_${slug}_001.jpg`);
        await screenshot(mobile, output);
        captures.push({ file: path.basename(output), label });
        console.log(`  image: ${path.basename(output)}`);
      }
    }

    if (project.slug === 'moore-beauty') await goto(mobile, project, '/', notes, 'Mobile navigation reset');
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

    // Reject byte-identical screenshots rather than inflating the project count.
    const hashes = new Map();
    const uniqueCaptures = [];
    for (const item of captures) {
      const data = await fs.readFile(path.join(imagesDir, item.file));
      const hash = crypto.createHash('sha256').update(data).digest('hex');
      if (hashes.has(hash)) {
        await fs.rm(path.join(imagesDir, item.file), { force: true });
        const duplicateNote = `Rejected duplicate ${item.file}; it matched ${hashes.get(hash)} byte-for-byte.`;
        notes.push(duplicateNote);
        console.log(`  ${duplicateNote}`);
      } else {
        hashes.set(hash, item.file);
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
      images: captures.map(c => ({ ...c, path: `QA-PORTFOLIO-ASSETS/Sprint-03/${project.folder}/images/${c.file}` })),
      videos: [{ ...video, path: `QA-PORTFOLIO-ASSETS/Sprint-03/${project.folder}/video/${video.file}`, thumbnailPath: `QA-PORTFOLIO-ASSETS/Sprint-03/${project.folder}/video/${video.thumbnail}` }],
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
  await fs.writeFile('asset-browser/manifest-sprint-03.json', JSON.stringify(manifest, null, 2));
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
  await fs.writeFile('capture-progress-sprint-03.json', JSON.stringify(progress, null, 2));
  const totalImages = results.reduce((sum, result) => sum + result.images.length, 0);
  const totalVideos = results.reduce((sum, result) => sum + result.videos.length, 0);
  await fs.mkdir('asset-browser', { recursive: true });
  await fs.writeFile('asset-browser/manifest-sprint-03.json', JSON.stringify({
    title: 'QA Portfolio Visual Assets — Sprint 3', generated: CAPTURE_DATE,
    totalImages, totalVideos, projects: results
  }, null, 2));
  await execFileAsync('python3', ['scripts/update_readme_sprint03.py']);
  await execFileAsync('python3', ['scripts/build_asset_browser_manifest.py']);
}

async function publishCheckpoint(project) {
  if (process.env.CHECKPOINT_COMMITS !== '1') return;
  const branch = process.env.CHECKPOINT_BRANCH || '';
  if (!/^arena\/[a-z0-9-]+$/.test(branch)) throw new Error(`Unsafe or missing checkpoint branch: ${branch}`);
  await execFileAsync('git', ['add', 'README.md', 'capture-progress-sprint-03.json', 'asset-browser/manifest-sprint-03.json', 'asset-browser/manifest.json', path.join(ROOT, project.folder)]);
  await execFileAsync('git', ['commit', '-m', `Add Sprint 3 ${project.id} ${project.name} asset checkpoint [skip ci]`]);
  await execFileAsync('git', ['fetch', 'origin', branch]);
  await execFileAsync('git', ['rebase', 'FETCH_HEAD']);
  await execFileAsync('git', ['push', 'origin', `HEAD:${branch}`], { maxBuffer: 10 * 1024 * 1024 });
  console.log(`  checkpoint published: ${project.id} ${project.name}`);
}

async function publishBlockedProgress(project) {
  if (process.env.CHECKPOINT_COMMITS !== '1') return;
  const branch = process.env.CHECKPOINT_BRANCH || '';
  if (!/^arena\/[a-z0-9-]+$/.test(branch)) return;
  await execFileAsync('git', ['add', 'README.md', 'capture-progress-sprint-03.json', 'asset-browser/manifest-sprint-03.json', 'asset-browser/manifest.json']);
  const commit = await execFileAsync('git', ['commit', '-m', `Document Sprint 3 ${project.id} capture interruption [skip ci]`]).catch(() => null);
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

  const totalImages = results.reduce((sum, p) => sum + p.images.length, 0);
  const totalVideos = results.reduce((sum, p) => sum + p.videos.length, 0);
  const readme = `# QA Portfolio Visual Asset Library — Sprint 3\n\n` +
    `**Asset-generation date:** ${CAPTURE_DATE}  \n**Projects:** ${results.length}  \n**Static images:** ${totalImages}  \n**Videos:** ${totalVideos}\n\n` +
    `This package is a visual asset archive for an existing QA portfolio. It is not a portfolio website. Every captured UI state originates from the live public website listed below. Neutral QA labels appear only in the responsive and user-flow comparison compositions.\n\n` +
    `## Project inventory\n\n| # | Project | Website | Images | Videos |\n|---:|---|---|---:|---:|\n` +
    results.map(p => `| ${p.id} | ${p.name} | ${p.url} | ${p.images.length} | ${p.videos.length} |`).join('\n') +
    `\n\n## Capture standards\n\n- Desktop coverage: 1440 × 900\n- Mobile coverage: 390 × 844\n- Video: 1280 × 720 MP4, short task-oriented walkthrough\n- No checkout completion, purchases, account creation, or personal data entry\n- No fabricated defects, pages, products, testimonials, features, or interactions\n- Publicly unavailable routes are documented in the relevant project README\n\nEach project folder contains an image inventory, video notes, availability notes, and descriptive filenames.\n`;
  await fs.writeFile(path.join(ROOT, 'README.md'), readme);

  const manifest = { title: 'QA Portfolio Visual Assets — Sprint 3', generated: CAPTURE_DATE, totalImages, totalVideos, projects: results };
  await createBrowser(manifest);
  await fs.writeFile('capture-report-sprint-03.json', JSON.stringify(manifest, null, 2));
  await fs.rm(TMP, { recursive: true, force: true });
  console.log(`\nSprint 3 capture complete: ${totalImages} images, ${totalVideos} videos.`);
  if (results.length !== 10 || totalImages < 100 || totalVideos < 10) throw new Error('Minimum delivery count was not met');
}

main().catch(error => { console.error(error); process.exit(1); });
