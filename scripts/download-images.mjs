#!/usr/bin/env node
/**
 * Download Unsplash images for Go2France
 * All photos are free under the Unsplash License (commercial use OK)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, '..', 'public', 'images');

const IMAGES = {
  cities: {
    'paris': 'photo-1642947392578-b37fbd9a4d45',
    'lyon': 'photo-1608123105740-45f57771b2e1',
    'marseille': 'photo-1711199872709-4afcfc5706c6',
    'nice': 'photo-1649623130078-051d302e1b96',
    'bordeaux': 'photo-1632485904512-39fa2b0571e3',
    'strasbourg': 'photo-1596036986070-e84592a19917',
    'toulouse': 'photo-1650707199496-b02442055332',
    'lille': 'photo-1676575927963-07be269f674e',
    'montpellier': 'photo-1505798662-a462421efe72',
    'avignon': 'photo-1703212147470-a5d38f79cde4',
  },
  food: {
    'croissant': 'photo-1590148209661-6709b7eac267',
    'baguette': 'photo-1677340913366-c41445815735',
    'coq-au-vin': 'photo-1667396702543-a239efa7a7f2',
    'ratatouille': 'photo-1707508466860-0dffe9e5e333',
    'crepes': 'photo-1582995570162-9dee25247fda',
    'cheese-board': 'photo-1766589221384-020850a0a772',
    'bouillabaisse': 'photo-1750943083282-2542e334fbad',
    'quiche-lorraine': 'photo-1647275555893-0536f9990b45',
    'french-wine': 'photo-1694346163587-0d7a8fe93ec9',
    'creme-brulee': 'photo-1768725846101-a1444d4ee275',
  },
  hero: {
    'france-hero-1': 'photo-1733011466961-ebd352b4170a',
    'france-hero-2': 'photo-1643042218705-7bf6e85e5855',
    'france-hero-3': 'photo-1554149082-75d460afced3',
  },
};

async function download(photoId, outPath) {
  const url = `https://images.unsplash.com/${photoId}?w=1200&q=80&auto=format`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Go2France/1.0' } });
  if (!res.ok) return false;
  const buffer = Buffer.from(await res.arrayBuffer());
  try {
    const sharp = (await import('sharp')).default;
    await sharp(buffer).resize(1200, 800, { fit: 'cover' }).webp({ quality: 80 }).toFile(outPath);
  } catch {
    fs.writeFileSync(outPath.replace('.webp', '.jpg'), buffer);
  }
  return true;
}

async function main() {
  console.log('🇫🇷 Downloading images for Go2France...\n');
  for (const [cat, items] of Object.entries(IMAGES)) {
    fs.mkdirSync(path.join(PUBLIC, cat), { recursive: true });
    console.log(`📁 ${cat}:`);
    for (const [slug, id] of Object.entries(items)) {
      const out = path.join(PUBLIC, cat, `${slug}.webp`);
      if (fs.existsSync(out) && fs.statSync(out).size > 1000) { console.log(`  ✓ ${slug} (exists)`); continue; }
      const ok = await download(id, out);
      console.log(ok ? `  ✓ ${slug}` : `  ✗ ${slug}`);
      await new Promise(r => setTimeout(r, 300));
    }
  }
  console.log('\n✅ Done!');
}

main().catch(console.error);
