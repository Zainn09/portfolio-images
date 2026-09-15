import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import sharp from 'sharp';

const execFileAsync = promisify(execFile);
const BASE = path.resolve('QA-PORTFOLIO-ASSETS/Sprint-01/09-peak-scents');
const IMAGES = path.join(BASE, 'images');
const VIDEO = path.join(BASE, 'video');
const PREFIX = '09_peak_scents';
const SITE = 'https://peakscents.com';
const CAPTURE_DATE = '2026-09-15';

const captures = [
  { name: 'desktop_home_hero', label: 'Desktop clean-beauty homepage hero', route: '/', width: 1440, height: 900 },
  { name: 'desktop_best_sellers_collection', label: 'Desktop best-sellers collection', route: '/collections/best-sellers', width: 1440, height: 900 },
  { name: 'desktop_babchi_serum_detail', label: 'Desktop Organic Rose Phyto3 Babchi Serum detail', route: '/products/new-rose-phyto3-babchi-serum', width: 1440, height: 900 },
  { name: 'desktop_night_cream_detail', label: 'Desktop Organic Rose Phyto3 Night Cream detail', route: '/products/organic-rose-phyto3-night-cream', width: 1440, height: 900 },
  { name: 'desktop_facial_cleanser_detail', label: 'Desktop Organic Rose Phyto3 Facial Cleanser detail', route: '/products/organic-rose-phyto3-gentle-facial-cleanser', width: 1440, height: 900 },
  { name: 'desktop_all_products_collection', label: 'Desktop complete product collection', route: '/collections/all', width: 1440, height: 900 },
  { name: 'desktop_babchi_bundle_detail', label: 'Desktop Babchi Beauty Bundle detail', route: '/products/babchi-beauty-bundle', width: 1440, height: 900 },
  { name: 'mobile_home_hero', label: 'Mobile clean-beauty homepage hero', route: '/', width: 390, height: 844, mobile: true },
  { name: 'mobile_best_sellers_collection', label: 'Mobile best-sellers collection', route: '/collections/best-sellers', width: 390, height: 844, mobile: true },
  { name: 'mobile_babchi_serum_detail', label: 'Mobile Babchi Serum product detail', route: '/products/new-rose-phyto3-babchi-serum', width: 390, height: 844, mobile: true }
];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function isPeakScents(value) {
  try {
    const host = new URL(value).hostname.replace(/^www\./, '');
    return host === 'peakscents.com';
  } catch {
    return false;
  }
}

async function fetchWithRetry(url, options = {}, attempts = 4) {
  let last;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response;
    } catch (error) {
      last = error;
      if (attempt < attempts) await sleep(attempt * 1_500);
    }
  }
  throw last;
}

async function remoteScreenshot(item) {
  const target = new URL(item.route, SITE).href;
  const endpoint = new URL('https://api.microlink.io/');
  endpoint.searchParams.set('url', target);
  endpoint.searchParams.set('screenshot', 'true');
  endpoint.searchParams.set('meta', 'true');
  endpoint.searchParams.set('prerender', 'true');
  endpoint.searchParams.set('waitUntil', 'networkidle2');
  endpoint.searchParams.set('viewport.width', String(item.width));
  endpoint.searchParams.set('viewport.height', String(item.height));
  endpoint.searchParams.set('viewport.deviceScaleFactor', '1');
  if (item.mobile) endpoint.searchParams.set('viewport.isMobile', 'true');

  const apiResponse = await fetchWithRetry(endpoint);
  const payload = await apiResponse.json();
  if (payload.status !== 'success' || !payload.data?.screenshot?.url) {
    throw new Error(`Remote renderer failed for ${target}: ${JSON.stringify(payload).slice(0, 300)}`);
  }
  if (!isPeakScents(payload.data.url) || payload.data.statusCode >= 400) {
    throw new Error(`Remote renderer refused off-domain or failed output for ${target}: ${payload.data.url}`);
  }
  if (!/peak scents/i.test(`${payload.data.title || ''} ${payload.data.publisher || ''}`)) {
    throw new Error(`Peak Scents identity validation failed for ${target}`);
  }
  if (item.mobile && payload.data.screenshot.width > 500) {
    throw new Error(`Mobile renderer returned a ${payload.data.screenshot.width}px desktop viewport for ${target}`);
  }

  const sourceResponse = await fetchWithRetry(payload.data.screenshot.url);
  const source = Buffer.from(await sourceResponse.arrayBuffer());
  const output = path.join(IMAGES, `${PREFIX}_${item.name}_001.jpg`);
  await sharp(source)
    .resize(item.width, item.height, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:2:0' })
    .toFile(output);
  console.log(`remote image: ${path.basename(output)} · ${payload.data.title}`);
  await sleep(900);
  return { ...item, file: path.basename(output), path: `QA-PORTFOLIO-ASSETS/Sprint-01/09-peak-scents/images/${path.basename(output)}` };
}

function xml(value) {
  return String(value).replace(/[<>&'\"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
}

async function responsiveComparison(desktopFile, mobileFile) {
  const desktop = await sharp(desktopFile).resize(940, 588, { fit: 'cover', position: 'top' }).jpeg({ quality: 80 }).toBuffer();
  const mobile = await sharp(mobileFile).resize(310, 671, { fit: 'cover', position: 'top' }).jpeg({ quality: 80 }).toBuffer();
  const svg = Buffer.from(`<svg width="1600" height="1000" xmlns="http://www.w3.org/2000/svg">
    <rect width="1600" height="1000" fill="#14211a"/><circle cx="72" cy="55" r="7" fill="#84cc16"/>
    <text x="94" y="63" fill="#a7b0aa" font-family="Arial,sans-serif" font-size="20" letter-spacing="2">RESPONSIVE QA REFERENCE · AUTHENTIC UI CAPTURE</text>
    <text x="70" y="128" fill="#fff" font-family="Arial,sans-serif" font-size="44" font-weight="700">Peak Scents</text>
    <text x="70" y="166" fill="#a7b0aa" font-family="Arial,sans-serif" font-size="20">${xml(SITE)} · captured ${CAPTURE_DATE}</text>
    <rect x="60" y="215" width="1000" height="680" rx="18" fill="#213129" stroke="#3b5144"/><rect x="1110" y="215" width="370" height="762" rx="32" fill="#213129" stroke="#3b5144"/>
    <circle cx="92" cy="247" r="6" fill="#fb7185"/><circle cx="113" cy="247" r="6" fill="#fbbf24"/><circle cx="134" cy="247" r="6" fill="#84cc16"/>
    <text x="60" y="937" fill="#d5ddd8" font-family="Arial,sans-serif" font-size="18" font-weight="700">DESKTOP · 1440 × 900</text>
    <text x="1110" y="202" fill="#d5ddd8" font-family="Arial,sans-serif" font-size="18" font-weight="700">MOBILE · 390 × 844</text>
    <text x="60" y="975" fill="#829087" font-family="Arial,sans-serif" font-size="16">Viewport comparison documents responsive hierarchy without asserting a defect.</text>
  </svg>`);
  const file = path.join(IMAGES, `${PREFIX}_responsive_comparison_001.jpg`);
  await sharp(svg).composite([{ input: desktop, left: 90, top: 276 }, { input: mobile, left: 1140, top: 258 }]).jpeg({ quality: 84, mozjpeg: true }).toFile(file);
  return { file: path.basename(file), label: 'Desktop / mobile responsive QA comparison', path: `QA-PORTFOLIO-ASSETS/Sprint-01/09-peak-scents/images/${path.basename(file)}` };
}

async function flowSequence(files) {
  const panels = await Promise.all(files.map(file => sharp(file).resize(520, 650, { fit: 'cover', position: 'top' }).jpeg({ quality: 78 }).toBuffer()));
  const labels = ['Clean-beauty proposition', 'Best sellers', 'Babchi Serum detail'];
  const svg = Buffer.from(`<svg width="1800" height="1000" xmlns="http://www.w3.org/2000/svg"><rect width="1800" height="1000" fill="#f7faf7"/>
    <text x="70" y="74" fill="#183022" font-family="Arial,sans-serif" font-size="18" font-weight="700" letter-spacing="2">QA USER-FLOW REFERENCE · 01 → 02 → 03</text>
    <text x="70" y="132" fill="#183022" font-family="Arial,sans-serif" font-size="44" font-weight="700">Peak Scents · skincare discovery flow</text>
    <text x="70" y="171" fill="#607168" font-family="Arial,sans-serif" font-size="20">Three authentic states captured from the live product on ${CAPTURE_DATE}</text>
    ${labels.map((label, i) => { const x = 70 + i * 575; return `<rect x="${x}" y="225" width="520" height="650" rx="12" fill="#fff" stroke="#cbd8cf"/><circle cx="${x + 28}" cy="911" r="20" fill="#183022"/><text x="${x + 21}" y="919" fill="#fff" font-family="Arial,sans-serif" font-size="18" font-weight="700">${i + 1}</text><text x="${x + 60}" y="919" fill="#183022" font-family="Arial,sans-serif" font-size="19" font-weight="700">${xml(label)}</text>`; }).join('')}
    <path d="M599 550h30" stroke="#65a30d" stroke-width="5"/><path d="M622 540l12 10-12 10" fill="none" stroke="#65a30d" stroke-width="5"/><path d="M1174 550h30" stroke="#65a30d" stroke-width="5"/><path d="M1197 540l12 10-12 10" fill="none" stroke="#65a30d" stroke-width="5"/>
    <text x="70" y="974" fill="#607168" font-family="Arial,sans-serif" font-size="16">Coverage focus: information scent, product discovery, responsive hierarchy, and task progression.</text></svg>`);
  const file = path.join(IMAGES, `${PREFIX}_qa_user_flow_sequence_001.jpg`);
  await sharp(svg).composite(panels.map((input, i) => ({ input, left: 70 + i * 575, top: 225 }))).jpeg({ quality: 84, mozjpeg: true }).toFile(file);
  return { file: path.basename(file), label: 'Three-state QA skincare user-flow reference', path: `QA-PORTFOLIO-ASSETS/Sprint-01/09-peak-scents/images/${path.basename(file)}` };
}

async function makeVideo(home, collection, detail) {
  const output = path.join(VIDEO, `${PREFIX}_video_product_journey_001.mp4`);
  const filter = [
    '[0:v]scale=1280:800:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,format=yuv420p[v0]',
    '[1:v]scale=1280:800:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,format=yuv420p[v1]',
    '[2:v]scale=1280:800:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,format=yuv420p[v2]',
    '[v0][v1]xfade=transition=fade:duration=0.7:offset=3.3[x1]',
    '[x1][v2]xfade=transition=fade:duration=0.7:offset=6.6[out]'
  ].join(';');
  await execFileAsync('ffmpeg', [
    '-y', '-loop', '1', '-t', '4', '-i', home, '-loop', '1', '-t', '4', '-i', collection, '-loop', '1', '-t', '4', '-i', detail,
    '-filter_complex', filter, '-map', '[out]', '-t', '10.6', '-r', '30', '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '27', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', output
  ], { maxBuffer: 10 * 1024 * 1024 });
  const thumbnail = path.join(VIDEO, `${PREFIX}_video_product_journey_001.jpg`);
  await sharp(detail).resize(1280, 720, { fit: 'cover', position: 'top' }).jpeg({ quality: 84, mozjpeg: true }).toFile(thumbnail);
  return {
    file: path.basename(output), thumbnail: path.basename(thumbnail),
    purpose: 'Authentic homepage → best sellers → Babchi Serum visual journey',
    path: `QA-PORTFOLIO-ASSETS/Sprint-01/09-peak-scents/video/${path.basename(output)}`,
    thumbnailPath: `QA-PORTFOLIO-ASSETS/Sprint-01/09-peak-scents/video/${path.basename(thumbnail)}`
  };
}

async function main() {
  await fs.rm(IMAGES, { recursive: true, force: true });
  await fs.rm(VIDEO, { recursive: true, force: true });
  await fs.mkdir(IMAGES, { recursive: true });
  await fs.mkdir(VIDEO, { recursive: true });

  const raw = [];
  for (const item of captures) raw.push(await remoteScreenshot(item));
  const byName = Object.fromEntries(raw.map(item => [item.name, item]));
  const responsive = await responsiveComparison(
    path.join(IMAGES, byName.desktop_home_hero.file),
    path.join(IMAGES, byName.mobile_home_hero.file)
  );
  const flow = await flowSequence([
    path.join(IMAGES, byName.desktop_home_hero.file),
    path.join(IMAGES, byName.desktop_best_sellers_collection.file),
    path.join(IMAGES, byName.desktop_babchi_serum_detail.file)
  ]);
  const images = [...raw.map(({ file, label, path }) => ({ file, label, path })), responsive, flow];

  const hashes = new Set();
  for (const image of images) {
    const hash = crypto.createHash('sha256').update(await fs.readFile(path.join(IMAGES, image.file))).digest('hex');
    if (hashes.has(hash)) throw new Error(`Remote capture is not unique: ${image.file}`);
    hashes.add(hash);
  }

  const video = await makeVideo(
    path.join(IMAGES, byName.desktop_home_hero.file),
    path.join(IMAGES, byName.desktop_best_sellers_collection.file),
    path.join(IMAGES, byName.desktop_babchi_serum_detail.file)
  );
  const result = {
    id: '09', slug: 'peak-scents', folder: '09-peak-scents', name: 'Peak Scents', url: SITE,
    kind: 'Plant-based skincare and refill shop', generated: CAPTURE_DATE, images, videos: [video],
    notes: ['Direct browser sessions redirected off-domain, so the rejected files were replaced with validated Peak Scents renderings from the live public URLs.']
  };
  await fs.writeFile(path.join(BASE, 'asset-manifest.json'), JSON.stringify(result, null, 2));
  const readme = `# Peak Scents — QA Portfolio Visual Assets\n\n**Project:** Peak Scents  \n**Website URL:** ${SITE}  \n**Project type:** Plant-based skincare and refill shop  \n**Asset-generation date:** ${CAPTURE_DATE}\n\n## Inventory\n\n- Static images: **${images.length}**\n- Videos: **1**\n- Video thumbnails: **1**\n\n## Coverage\n\n${images.map(item => `- \`${item.file}\` — ${item.label}`).join('\n')}\n\n## Video\n\n- \`${video.file}\` — ${video.purpose}\n- \`${video.thumbnail}\` — Video poster / thumbnail\n\n## Capture notes\n\n- Every image was rendered from the live public Peak Scents URL named by its capture type and validated against the Peak Scents page identity.\n- The initial off-domain browser redirect was rejected; no Google or other off-domain screen remains in this project.\n- Responsive and flow compositions contain only authentic live-site renderings plus neutral QA reference labels.\n- The short video is a smooth sequence of the authentic homepage, best-sellers collection, and Babchi Serum detail captures.\n- No checkout submission, purchase, account creation, or personal data entry was performed.\n`;
  await fs.writeFile(path.join(BASE, 'README.md'), readme);

  const progressPath = path.resolve('capture-progress.json');
  const progress = JSON.parse(await fs.readFile(progressPath, 'utf8'));
  progress.stage = 'Peak Scents authentic remote capture generated and published';
  const item = progress.projects.find(project => project.id === '09');
  Object.assign(item, { status: 'captured', images: images.length, videos: 1, note: 'Validated live-site renderings published; awaiting Sprint-level QA' });
  await fs.writeFile(progressPath, JSON.stringify(progress, null, 2));
  await execFileAsync('python3', ['scripts/update_readme_progress.py']);
  console.log(`Peak Scents recapture complete: ${images.length} unique images, 1 video.`);
}

main().catch(error => { console.error(error); process.exit(1); });
