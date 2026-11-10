import https from 'https';
import CryptoJS from 'crypto-js';
import { Track } from '@/types/music';
import verifiedTracks from '@/data/fullTracks.json';

// Build a fast lookup map for verified original movie/artist album covers
const VERIFIED_ALBUM_MAP = new Map<string, { album: string; artwork: string }>();

(verifiedTracks as Track[]).forEach((t) => {
  const normTitle = t.title.toLowerCase().replace(/\s*\(.*\)/, '').trim();
  if (normTitle && !VERIFIED_ALBUM_MAP.has(normTitle)) {
    VERIFIED_ALBUM_MAP.set(normTitle, {
      album: t.album,
      artwork: t.artwork,
    });
  }
});

export function decryptSaavnMediaUrl(encrypted: string): string | null {
  try {
    const key = CryptoJS.enc.Utf8.parse('38346591');
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(encrypted),
    });
    const decrypted = CryptoJS.DES.decrypt(
      cipherParams,
      key,
      { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
    );
    const plainUrl = decrypted.toString(CryptoJS.enc.Utf8);
    if (!plainUrl) return null;
    return plainUrl.replace('_96.mp4', '_160.mp4');
  } catch {
    return null;
  }
}

export function fetchSaavnJson(url: string, timeoutMs = 7000): Promise<any> {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        family: 4, // Force IPv4 to prevent IPv6 hanging/timeout on Akamai/JioSaavn CDNs
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
        },
        timeout: timeoutMs,
      },
      (res) => {
        let rawData = '';
        res.on('data', (chunk) => {
          rawData += chunk;
        });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(rawData);
            resolve(parsed);
          } catch (e) {
            reject(new Error(`Failed to parse Saavn JSON response: ${(e as Error).message}`));
          }
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Saavn request timed out after ${timeoutMs}ms`));
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Score JioSaavn search items so authentic original soundtracks / album releases
 * are ranked above generic compilations ("Best Of", "Trending Love Songs", "Special", etc.)
 */
export function scoreSaavnItem(item: any, query: string): number {
  let score = 0;
  const song = (item.song || item.title || '').toLowerCase();
  const album = (item.album || '').toLowerCase();
  const q = query.toLowerCase().trim();

  // Exact or prefix song title match gets highest priority
  if (song === q || song.startsWith(q + ' ') || song.startsWith(q + ' (')) {
    score += 60;
  } else if (song.includes(q)) {
    score += 30;
  }

  // Heavy penalty for cheap compilation/remix/mashup releases
  const compilationKeywords = [
    'best of',
    'collection',
    'mashup',
    'remix',
    'trending',
    'hits 20',
    'non stop',
    'valentines',
    'love songs',
    'romantic hits',
    'top 10',
    'top 20',
    'top 50',
    'special',
    'world music',
    'dance dhamaka',
    'compilation',
    'dj mix',
    'heartbeats',
    'party hits',
  ];

  if (compilationKeywords.some((kw) => album.includes(kw))) {
    score -= 40;
  } else {
    score += 35; // Authentic original release bonus
  }

  // Bonus for matching our verified catalog
  const normTitle = song.replace(/\s*\(.*\)/, '').trim();
  if (VERIFIED_ALBUM_MAP.has(normTitle)) {
    score += 25;
  }

  return score;
}

export function formatSaavnTrack(item: any): Track | null {
  if (!item || !item.encrypted_media_url) return null;

  const streamUrl = decryptSaavnMediaUrl(item.encrypted_media_url);
  if (!streamUrl) return null;

  const cleanTitle = (item.song || item.title || 'Unknown Song')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  const cleanArtist = (
    item.primary_artists ||
    item.singers ||
    item.more_info?.artistMap?.primary_artists?.[0]?.name ||
    'Unknown Artist'
  )
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&');

  let cleanAlbum = (item.album || 'Single')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&');

  let artwork = (item.image || '')
    .replace('150x150', '500x500')
    .replace('50x50', '500x500')
    .replace('http:', 'https:');

  // If this song is in our verified catalog, attach the authentic original movie album art & title
  const normTitle = cleanTitle.toLowerCase().replace(/\s*\(.*\)/, '').trim();
  const verified = VERIFIED_ALBUM_MAP.get(normTitle);
  if (verified) {
    cleanAlbum = verified.album;
    artwork = verified.artwork;
  }

  return {
    id: `full-saavn-${item.id}`,
    title: cleanTitle,
    artist: cleanArtist,
    album: cleanAlbum,
    duration: parseInt(item.duration) || 210,
    artwork: artwork || '/icon-512.png',
    streamUrl,
    genre: item.language ? item.language.charAt(0).toUpperCase() + item.language.slice(1) : 'Music',
    playCount: parseInt(item.play_count) || Math.floor(Math.random() * 800000) + 150000,
    source: 'stream' as const,
    releaseYear: item.year ? parseInt(item.year) : 2024,
  };
}
