import { NextRequest, NextResponse } from 'next/server';
import { fetchSaavnJson, formatSaavnTrack, scoreSaavnItem } from '@/lib/saavnClient';
import { Track } from '@/types/music';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] });
  }

  try {
    const trimmedQuery = query.trim();
    const url = `https://www.jiosaavn.com/api.php?__call=search.getResults&_format=json&_marker=0&cc=in&p=1&n=35&q=${encodeURIComponent(trimmedQuery)}`;
    const data = await fetchSaavnJson(url, 7000);

    const rawList = data.results || [];

    // Sort to ensure original movie/album releases appear before compilation albums
    rawList.sort((a: any, b: any) => scoreSaavnItem(b, trimmedQuery) - scoreSaavnItem(a, trimmedQuery));

    const tracks: Track[] = rawList
      .map(formatSaavnTrack)
      .filter((t: Track | null): t is Track => t !== null);

    return NextResponse.json({ results: tracks });
  } catch (err) {
    console.error('Search API error:', err);
    return NextResponse.json({ results: [] });
  }
}
