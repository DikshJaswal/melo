import { NextRequest, NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';
import { Track } from '@/types/music';

function decryptSaavnMediaUrl(encrypted: string): string | null {
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] });
  }

  try {
    const url = `https://www.jiosaavn.com/api.php?__call=search.getResults&_format=json&_marker=0&cc=in&p=1&n=30&q=${encodeURIComponent(query.trim())}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ results: [] });
    }

    const data = await res.json();
    const tracks: Track[] = (data.results || [])
      .map((item: any) => {
        const streamUrl = decryptSaavnMediaUrl(item.encrypted_media_url);
        if (!streamUrl) return null;

        const cleanTitle = (item.song || 'Unknown Song')
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&amp;/g, '&');
        const cleanArtist = (item.primary_artists || item.singers || 'Unknown Artist')
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&amp;/g, '&');
        const cleanAlbum = (item.album || 'Single')
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&amp;/g, '&');

        const artwork = (item.image || '')
          .replace('150x150', '500x500')
          .replace('50x50', '500x500')
          .replace('http:', 'https:');

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
      })
      .filter((t: Track | null): t is Track => t !== null);

    return NextResponse.json({ results: tracks });
  } catch (err) {
    console.error('Search API error:', err);
    return NextResponse.json({ results: [] });
  }
}
