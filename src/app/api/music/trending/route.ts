import { NextResponse } from 'next/server';
import { fetchSaavnJson, formatSaavnTrack } from '@/lib/saavnClient';
import { Track } from '@/types/music';

export async function GET() {
  const trendingQueries = ['Top Hindi Hits 2026', 'Top Punjabi Hits', 'Top English Hits'];
  const allTracks: Track[] = [];

  try {
    for (const q of trendingQueries) {
      const url = `https://www.jiosaavn.com/api.php?__call=search.getResults&_format=json&_marker=0&cc=in&p=1&n=12&q=${encodeURIComponent(q)}`;
      try {
        const data = await fetchSaavnJson(url, 6000);
        const songs: Track[] = (data.results || [])
          .map(formatSaavnTrack)
          .filter((t: Track | null): t is Track => t !== null);

        for (const s of songs) {
          if (!allTracks.some((t) => t.id === s.id || t.title.toLowerCase() === s.title.toLowerCase())) {
            allTracks.push(s);
          }
        }
      } catch (err) {
        console.warn(`Trending query "${q}" failed:`, err);
      }
    }

    return NextResponse.json({ results: allTracks });
  } catch (err) {
    console.error('Trending API fatal error:', err);
    return NextResponse.json({ results: [] });
  }
}
