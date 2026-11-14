import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve('shopify-portfolio');
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const NAV_TIMEOUT = 60_000;
const CAPTURE_DATE = new Date().toISOString().slice(0, 10);
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const PROJECTS = [
  ['modani', 'Modani', 'https://modani.com/'],
  ['magnolia', 'Magnolia', 'https://magnolia.com/'],
  ['gardena', 'Gardena', 'https://www.gardena.com/int/'],
  ['rifle-paper-co', 'Rifle Paper Co.', 'https://riflepaperco.com/'],
  ['bartesian', 'Bartesian', 'https://bartesian.com/'],
  ['lightbox-jewelry', 'Lightbox Jewelry', 'https://lightboxjewelry.com/'],
  ['ridge', 'Ridge', 'https://ridge.com/'],
  ['body-candy', 'Body Candy', 'https://www.bodycandy.com/'],
  ['seiko-usa', 'Seiko USA', 'https://www.seikousa.com/'],
  ['demellier-london', 'DeMellier London', 'https://demellierlondon.com/'],
  ['lovisa', 'Lovisa', 'https://www.lovisa.com/'],
  ['baby-gold', 'Baby Gold', 'https://www.babygold.com/'],
  ['almagems', 'AlmaGems', 'https://almagems.com/'],
  ['momcozy', 'Momcozy', 'https://momcozy.com/'],
  ['zulily', 'Zulily', 'https://www.zulily.com/'],
  ['little-sleepies', 'Little Sleepies', 'https://littlesleepies.com/'],
  ['happiest-baby', 'Happiest Baby', 'https://www.happiestbaby.com/'],
  ['mamas-and-papas', 'Mamas & Papas', 'https://www.mamasandpapas.com/'],
  ['goodbuy-gear', 'GoodBuy Gear', 'https://goodbuygear.com/'],
  ['caden-lane', 'Caden Lane', 'https://cadenlane.com/'],
  ['nanit', 'Nanit', 'https://nanit.com/'],
  ['deryan', 'Deryan', 'https://www.deryan.com/en/'],
  ['kyte-baby', 'Kyte Baby', 'https://kytebaby.com/'],
  ['newton-baby', 'Newton Baby', 'https://www.newtonbaby.com/'],
  ['albee-baby', 'Albee Baby', 'https://www.albeebaby.com/'],
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function dismiss(page) {
  const labels = [
    /accept all/i, /accept cookies/i, /allow all/i, /agree/i, /got it/i,
    /continue without accepting/i, /no thanks/i, /not now/i, /^close$/i,
  ];
  for (const label of labels) {
    try {
      const btn = page.getByRole('button', { name: label }).first();
      if (await btn.isVisible({ timeout: 200 })) await btn.click({ timeout: 800 });
    } catch {}
  }
  const selectors = [
    '[aria-label="Close dialog"]', '[aria-label="Close"]',
    'button[aria-label*="close" i]', '[role="button"][aria-label*="close" i]',
    '.modal__close-button', '.popup-close', '.needsclick.klaviyo-close-form',
  ];
  for (const s of selectors) {
    try {
      const el = page.locator(s).first();
      if (await el.isVisible({ timeout: 150 })) await el.click({ timeout: 600 });
    } catch {}
  }
  await page.keyboard.press('Escape').catch(() => {});
  await sleep(300);
}

async function scrubOverlays(page) {
  await page.addStyleTag({ content: `
    [id*="cookie" i], [class*="cookie-banner" i], [class*="cookie-consent" i],
    [id*="consent" i], [class*="consent-banner" i],
    [id*="klaviyo" i], [class*="needsclick"], [class*="kl-private"],
    [aria-modal="true"], [role="dialog"],
    [class*="newsletter-popup" i], [id*="newsletter-popup" i],
    [class*="popup-modal" i], [id*="shopify-chat"], [id*="gorgias-chat"]
    { display: none !important; visibility: hidden !important; }
    html, body { overflow: auto !important; }
  ` }).catch(() => {});
  await sleep(300);
}

async function settle(page, wait = 4_000) {
  await sleep(wait);
  await dismiss(page);
  await scrubOverlays(page);
  await page.evaluate(async () => {
    try { await document.fonts.ready; } catch {}
    window.scrollTo(0, 0);
  }).catch(() => {});
  await sleep(500);
}

async function shot(page, file) {
  await page.screenshot({ path: file, type: 'jpeg', quality: 88, animations: 'disabled' });
}

async function firstLink(page, pattern) {
  return page.evaluate((pat) => {
    const re = new RegExp(pat);
    const links = Array.from(document.querySelectorAll('a[href]'));
    for (const a of links) {
      const href = a.getAttribute('href') || '';
      const text = (a.textContent || '').trim();
      if (!re.test(href)) continue;
      if (href.includes('?') && href.includes('filter')) continue;
      const r = a.getBoundingClientRect();
      if (r.width < 10 || r.height < 10) continue;
      if (!text && !a.querySelector('img')) continue;
      try { return new URL(href, location.href).href; } catch { continue; }
    }
    return null;
  }, pattern).catch(() => null);
}

async function sitemapLink(page, base, kind) {
  const origin = new URL(base).origin;
  try {
    const res = await page.request.get(`${origin}/sitemap.xml`, { timeout: 20_000 });
    let xml = await res.text();
    const children = [...xml.matchAll(/<loc>([^<]*(?:products|collections)[^<]*\.xml[^<]*)<\/loc>/gi)].map(m => m[1]);
    if (children.length) {
      const res2 = await page.request.get(children[0], { timeout: 20_000 });
      xml = await res2.text();
    }
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(m => m[1]);
    const match = locs.find(u => kind === 'product' ? u.includes('/products/') : u.includes('/collections/'));
    return match || null;
  } catch { return null; }
}

async function captureSite(browser, slug, name, base) {
  const dir = path.join(ROOT, slug, 'images');
  await fs.mkdir(dir, { recursive: true });
  const report = { slug, name, url: base, capturedAt: new Date().toISOString(), images: {}, errors: [] };
  const desktop = await browser.newContext({
    viewport: DESKTOP, userAgent: UA, locale: 'en-US',
    deviceScaleFactor: 1, javaScriptEnabled: true,
  });
  const mobile = await browser.newContext({
    viewport: MOBILE, userAgent: UA, locale: 'en-US',
    deviceScaleFactor: 1, isMobile: true, hasTouch: true,
  });
  desktop.setDefaultTimeout(NAV_TIMEOUT);
  mobile.setDefaultTimeout(NAV_TIMEOUT);

  let dPage, mPage;
  try {
    dPage = await desktop.newPage();
    await dPage.goto(base, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT });
    await settle(dPage, 5_000);
    await shot(dPage, path.join(dir, 'desktop-home.jpg'));
    report.images['desktop-home'] = 'ok';

    let collection = await firstLink(dPage, '/collections/');
    let product = await firstLink(dPage, '/products/');
    if (!collection) collection = await sitemapLink(dPage, base, 'collection');
    if (!product) product = await sitemapLink(dPage, base, 'product');

    if (collection) {
      try {
        await dPage.goto(collection, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT });
        await settle(dPage);
        await shot(dPage, path.join(dir, 'desktop-collection.jpg'));
        report.images['desktop-collection'] = collection;
      } catch (e) { report.errors.push(`collection: ${e.message}`); }
    } else report.errors.push('collection link not found');

    let productUrl = product;
    if (!productUrl && collection) {
      productUrl = await firstLink(dPage, '/products/');
    }
    if (productUrl) {
      try {
        await dPage.goto(productUrl, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT });
        await settle(dPage);
        await shot(dPage, path.join(dir, 'desktop-product.jpg'));
        report.images['desktop-product'] = productUrl;
      } catch (e) { report.errors.push(`product: ${e.message}`); }
    } else report.errors.push('product link not found');
  } catch (e) {
    report.errors.push(`desktop: ${e.message}`);
  }

  try {
    mPage = await mobile.newPage();
    await mPage.goto(base, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT });
    await settle(mPage, 5_000);
    await shot(mPage, path.join(dir, 'mobile-home.jpg'));
    report.images['mobile-home'] = 'ok';

    let mProduct = await firstLink(mPage, '/products/');
    if (!mProduct) mProduct = await sitemapLink(mPage, base, 'product');
    if (mProduct) {
      await mPage.goto(mProduct, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT });
      await settle(mPage);
      await shot(mPage, path.join(dir, 'mobile-product.jpg'));
      report.images['mobile-product'] = mProduct;
    } else report.errors.push('mobile product link not found');
  } catch (e) {
    report.errors.push(`mobile: ${e.message}`);
  }

  await desktop.close();
  await mobile.close();

  try {
    const dHome = path.join(dir, 'desktop-home.jpg');
    const mHome = path.join(dir, 'mobile-home.jpg');
    const dMeta = await sharp(dHome).metadata();
    const mMeta = await sharp(mHome).metadata();
    const scale = 900 / (dMeta.height || 900);
    const dw = Math.round((dMeta.width || 1440) * scale);
    const mScale = 844 / (mMeta.height || 844);
    const mw = Math.round((mMeta.width || 390) * mScale);
    const gap = 32, pad = 32, header = 56;
    const W = pad * 2 + dw + gap + mw;
    const H = header + 900 + pad;
    const dResized = await sharp(dHome).resize(dw, 900).jpeg({ quality: 88 }).toBuffer();
    const mResized = await sharp(mHome).resize(mw, 844).jpeg({ quality: 88 }).toBuffer();
    const label = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f2f0ec"/>
      <text x="${pad}" y="36" font-family="Helvetica,Arial,sans-serif" font-size="20" fill="#1f1f1f">${name.replace(/&/g, '&amp;')} — desktop 1440×900 / mobile 390×844</text>
    </svg>`);
    await sharp({ create: { width: W, height: H, channels: 3, background: '#f2f0ec' } })
      .composite([
        { input: label, top: 0, left: 0 },
        { input: dResized, top: header, left: pad },
        { input: mResized, top: header + 28, left: pad + dw + gap },
      ])
      .jpeg({ quality: 88 })
      .toFile(path.join(dir, 'responsive-comparison.jpg'));
    report.images['responsive-comparison'] = 'ok';
  } catch (e) {
    report.errors.push(`comparison: ${e.message}`);
  }

  await fs.writeFile(path.join(ROOT, slug, 'capture-report.json'), JSON.stringify(report, null, 2));
  return report;
}

const browser = await chromium.launch({
  headless: true,
  args: ['--disable-blink-features=AutomationControlled', '--no-sandbox'],
});
const reports = [];
for (const [slug, name, url] of PROJECTS) {
  process.stdout.write(`Capturing ${name}... `);
  try {
    const r = await captureSite(browser, slug, name, url);
    const count = Object.keys(r.images).length;
    console.log(`${count} images${r.errors.length ? `, ${r.errors.length} issues` : ''}`);
    reports.push(r);
  } catch (e) {
    console.log(`FAILED: ${e.message}`);
    reports.push({ slug, name, url, images: {}, errors: [e.message] });
  }
}
await browser.close();

const ok = reports.filter(r => Object.keys(r.images).length >= 4).length;
const rows = reports.map(r => {
  const imgs = Object.keys(r.images).map(k => `\`${k}.jpg\``).join(', ') || '—';
  const err = r.errors.length ? r.errors.join('; ').replace(/\|/g, '/') : 'None';
  return `| ${r.name} | ${imgs} | ${err} |`;
}).join('\n');

await fs.writeFile(path.join(ROOT, 'IMAGE-CAPTURE-REPORT.md'), `# Image Capture Report

Authentic screenshots captured from the live storefronts on ${CAPTURE_DATE}. No interface, product, price or result was generated or edited.

- Desktop viewport: 1440 × 900
- Mobile viewport: 390 × 844
- Projects with at least four images: **${ok} / ${reports.length}**

| Project | Images | Issues |
|---|---|---|
${rows}

## Notes

- Captures are viewport screenshots, not full-page composites. Cookie and newsletter overlays are dismissed where possible.
- Some storefronts change region, pricing or availability based on location. The capture reflects the runner's location at the time.
- Zulily has changed ownership several times. It rendered at capture time; the image is a dated reference, not evidence of current operational stability.
- These images are website references, not evidence that Abdul Rehman designed or developed the site.
`);
console.log(`Done. ${ok}/${reports.length} projects have at least four images.`);
