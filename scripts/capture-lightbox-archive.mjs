import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve('shopify-portfolio/lightbox-jewelry');
const IMG = path.join(ROOT, 'images');
const ARCHIVE = 'https://web.archive.org/web/20250210124819/https://www.lightboxjewelry.com/';
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function clean(page) {
  await page.addStyleTag({ content: `
    #wm-ipp-base, #wm-ipp, #donato, #wm-ipp-print { display:none !important; }
    [id*="cookie" i], [class*="cookie" i], [aria-modal="true"], [role="dialog"],
    [class*="newsletter" i], [class*="popup" i] { display:none !important; }
    html, body { overflow:auto !important; }
  ` }).catch(() => {});
  await page.keyboard.press('Escape').catch(() => {});
  await page.evaluate(() => {
    const vw = innerWidth, vh = innerHeight;
    for (const el of Array.from(document.querySelectorAll('div, section, aside'))) {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      const covers = r.width >= vw * 0.7 && r.height >= vh * 0.7;
      const fixed = cs.position === 'fixed' || cs.position === 'absolute';
      const dim = /rgba?\([^)]*,\s*0?\.[0-9]+\)/.test(cs.backgroundColor) || cs.backdropFilter !== 'none';
      if (covers && fixed && dim && Number(cs.zIndex || 0) >= 10) {
        el.style.setProperty('display', 'none', 'important');
      }
    }
  }).catch(() => {});
  await sleep(500);
}

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const report = { source: ARCHIVE, snapshot: '2025-02-10', capturedAt: new Date().toISOString(), status: 'Live storefront unavailable; archival capture used', images: {}, errors: [] };
await fs.mkdir(IMG, { recursive: true });

const ctx = await browser.newContext({ viewport: DESKTOP, userAgent: UA, locale: 'en-US' });
const page = await ctx.newPage();
page.setDefaultTimeout(90_000);
try {
  await page.goto(ARCHIVE, { waitUntil: 'domcontentloaded', timeout: 90_000 });
  await sleep(12_000);
  await clean(page);
  await page.screenshot({ path: path.join(IMG, 'archive-desktop-home.jpg'), type: 'jpeg', quality: 88 });
  report.images['archive-desktop-home'] = 'ok';

  await page.goto('https://web.archive.org/web/20250210124819/https://www.lightboxjewelry.com/collections/all', { waitUntil: 'domcontentloaded', timeout: 90_000 });
  await sleep(10_000);
  await clean(page);
  await page.screenshot({ path: path.join(IMG, 'archive-desktop-collection.jpg'), type: 'jpeg', quality: 88 });
  report.images['archive-desktop-collection'] = 'archived collections/all';
} catch (e) {
  report.errors.push(`desktop: ${e.message}`);
}
await ctx.close();

const mctx = await browser.newContext({ viewport: MOBILE, userAgent: UA, locale: 'en-US', isMobile: true, hasTouch: true });
const mpage = await mctx.newPage();
mpage.setDefaultTimeout(90_000);
try {
  await mpage.goto(ARCHIVE, { waitUntil: 'domcontentloaded', timeout: 90_000 });
  await sleep(12_000);
  await clean(mpage);
  await mpage.screenshot({ path: path.join(IMG, 'archive-mobile-home.jpg'), type: 'jpeg', quality: 88 });
  report.images['archive-mobile-home'] = 'ok';
} catch (e) {
  report.errors.push(`mobile: ${e.message}`);
}
await mctx.close();

try {
  const d = await sharp(path.join(IMG, 'archive-desktop-home.jpg')).metadata();
  const m = await sharp(path.join(IMG, 'archive-mobile-home.jpg')).metadata();
  const dh = 900, dw = Math.round((d.width || 1440) * (dh / (d.height || 900)));
  const mh = 844, mw = Math.round((m.width || 390) * (mh / (m.height || 844)));
  const pad = 32, gap = 32, header = 56;
  const W = pad * 2 + dw + gap + mw, H = header + dh + pad;
  const label = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f2f0ec"/>
    <text x="${pad}" y="36" font-family="Helvetica,Arial,sans-serif" font-size="18" fill="#1f1f1f">Lightbox Jewelry — archived snapshot 2025-02-10 (live store unavailable)</text>
  </svg>`);
  await sharp({ create: { width: W, height: H, channels: 3, background: '#f2f0ec' } })
    .composite([
      { input: label, top: 0, left: 0 },
      { input: await sharp(path.join(IMG, 'archive-desktop-home.jpg')).resize(dw, dh).toBuffer(), top: header, left: pad },
      { input: await sharp(path.join(IMG, 'archive-mobile-home.jpg')).resize(mw, mh).toBuffer(), top: header + 28, left: pad + dw + gap },
    ]).jpeg({ quality: 88 }).toFile(path.join(IMG, 'archive-responsive-comparison.jpg'));
  report.images['archive-responsive-comparison'] = 'ok';
} catch (e) {
  report.errors.push(`comparison: ${e.message}`);
}

await browser.close();
await fs.writeFile(path.join(ROOT, 'archive-capture-report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
