import { NextRequest, NextResponse } from 'next/server';
import { fetchSaavnJson, formatSaavnTrack } from '@/lib/saavnClient';
import { Track } from '@/types/music';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] });
  }

  try {
    const url = `https://www.jiosaavn.com/api.php?__call=search.getResults&_format=json&_marker=0&cc=in&p=1&n=30&q=${encodeURIComponent(query.trim())}`;
    const data = await fetchSaavnJson(url, 7000);

    const tracks: Track[] = (data.results || [])
      .map(formatSaavnTrack)
      .filter((t: Track | null): t is Track => t !== null);

    return NextResponse.json({ results: tracks });
  } catch (err) {
    console.error('Search API error:', err);
    return NextResponse.json({ results: [] });
  }
}
