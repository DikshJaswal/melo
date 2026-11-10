import { Track, Playlist, Artist } from '@/types/music';

// Curated high-fidelity instant-play catalog (Guaranteed fast CDN, zero CORS issues, plays instantly)
export const CURATED_TRACKS: Track[] = [
  {
    id: 'curated-1',
    title: 'Midnight City Lights',
    artist: 'Neon Dreams',
    album: 'Synthetic Horizons',
    duration: 198,
    artwork: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    genre: 'Synthwave',
    playCount: 142850,
    source: 'curated',
    releaseYear: 2025,
  },
  {
    id: 'curated-2',
    title: 'Coffee Beans & Raindrops',
    artist: 'Aura Lofi',
    album: 'Sunday Morning Sessions',
    duration: 165,
    artwork: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=smoke-143172.mp3',
    genre: 'Lofi',
    playCount: 289300,
    source: 'curated',
    releaseYear: 2025,
  },
  {
    id: 'curated-3',
    title: 'Electric Euphoria',
    artist: 'HyperPulse',
    album: 'Neon Genesis Vol. 2',
    duration: 212,
    artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f77cb7.mp3?filename=tuesday-glitch-122413.mp3',
    genre: 'EDM',
    playCount: 521400,
    source: 'curated',
    releaseYear: 2026,
  },
  {
    id: 'curated-4',
    title: 'Sunset Boulevard Drift',
    artist: 'Kavinsky Vibes',
    album: 'Retrograde Express',
    duration: 184,
    artwork: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_731518b76c.mp3?filename=the-cradle-of-your-soul-157.mp3',
    genre: 'Synthwave',
    playCount: 98400,
    source: 'curated',
    releaseYear: 2025,
  },
  {
    id: 'curated-5',
    title: 'Tokyo Rain & Umbrellas',
    artist: 'Shinji beats',
    album: 'Shibuya Nightfall',
    duration: 172,
    artwork: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=lofi-chill-medium-version-159456.mp3',
    genre: 'Lofi',
    playCount: 312000,
    source: 'curated',
    releaseYear: 2026,
  },
  {
    id: 'curated-6',
    title: 'Cyber Heist 2077',
    artist: 'Neural Network',
    album: 'Dark Net Chronicles',
    duration: 230,
    artwork: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/01/26/audio_d0c6ff1e01.mp3?filename=electronic-future-beats-117997.mp3',
    genre: 'Cyberpunk',
    playCount: 445200,
    source: 'curated',
    releaseYear: 2026,
  },
  {
    id: 'curated-7',
    title: 'Deep Ocean Waves',
    artist: 'Solaris Echo',
    album: 'Ambient Depths',
    duration: 195,
    artwork: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2021/11/01/audio_0066f363c8.mp3?filename=wataboi-flavour-1164.mp3',
    genre: 'Ambient',
    playCount: 167300,
    source: 'curated',
    releaseYear: 2025,
  },
  {
    id: 'curated-8',
    title: 'Summer Solstice Groove',
    artist: 'Groove Collective',
    album: 'Ibiza Sunsets',
    duration: 205,
    artwork: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c3c3a72667.mp3?filename=good-night-160166.mp3',
    genre: 'House',
    playCount: 620400,
    source: 'curated',
    releaseYear: 2026,
  },
];

export const FEATURED_ARTISTS: Artist[] = [
  {
    id: 'artist-1',
    name: 'Aura Lofi',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    followers: '2.4M',
    monthlyListeners: '4,892,100',
    bio: 'Pioneering organic lofi beats blending vinyl warmth and gentle acoustic textures.',
    genre: 'Lofi / Chillhop',
  },
  {
    id: 'artist-2',
    name: 'HyperPulse',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    followers: '1.8M',
    monthlyListeners: '3,210,400',
    bio: 'Electronic dance producer crafting thunderous synth melodies and festival anthems.',
    genre: 'EDM / Electro House',
  },
  {
    id: 'artist-3',
    name: 'Neon Dreams',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
    followers: '3.1M',
    monthlyListeners: '6,450,800',
    bio: 'Synthwave icon bringing 80s analog nostalgia into modern club culture.',
    genre: 'Synthwave / Retro',
  },
  {
    id: 'artist-4',
    name: 'Shinji beats',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
    followers: '940K',
    monthlyListeners: '1,980,000',
    bio: 'Tokyo-based multi-instrumentalist fusing Japanese jazz scales with boom-bap rhythm.',
    genre: 'Chillhop / Jazzhop',
  },
];

export const CURATED_PLAYLISTS: Playlist[] = [
  {
    id: 'playlist-top-hits',
    name: '🔥 Top Global Hits 2026',
    description: 'The hottest trending tracks across the globe right now. Updated daily.',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    tracks: [CURATED_TRACKS[0], CURATED_TRACKS[2], CURATED_TRACKS[7], CURATED_TRACKS[5]],
  },
  {
    id: 'playlist-lofi-chill',
    name: '☕ Midnight Lofi Coffee',
    description: 'Relaxing ambient beats for late-night coding, studying, and deep relaxation.',
    coverImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80',
    tracks: [CURATED_TRACKS[1], CURATED_TRACKS[4], CURATED_TRACKS[6]],
  },
  {
    id: 'playlist-synth-retrowave',
    name: '⚡ Cyberpunk & Neon Nights',
    description: 'Analog synthesizers and heavy driving arpeggios for cruising at night.',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    tracks: [CURATED_TRACKS[0], CURATED_TRACKS[3], CURATED_TRACKS[5]],
  },
  {
    id: 'playlist-deep-focus',
    name: '🧠 Deep Flow State',
    description: 'Non-distracting electronic beats and ambient textures engineered for focus.',
    coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80',
    tracks: [CURATED_TRACKS[6], CURATED_TRACKS[1], CURATED_TRACKS[4]],
  },
];

// Audius Discovery Node Cache
let cachedHost: string | null = null;

async function getAudiusHost(): Promise<string> {
  if (cachedHost) return cachedHost;
  try {
    const res = await fetch('https://api.audius.co', { cache: 'no-store' });
    const data = await res.json();
    if (data.data && data.data.length > 0) {
      cachedHost = data.data[Math.floor(Math.random() * Math.min(3, data.data.length))];
      return cachedHost as string;
    }
  } catch (err) {
    console.warn('Failed to resolve dynamic Audius node, falling back to default node:', err);
  }
  return 'https://discoveryprovider.audius.co';
}

// Fetch trending tracks from Audius API
export async function fetchTrendingTracks(): Promise<Track[]> {
  try {
    const host = await getAudiusHost();
    const res = await fetch(`${host}/v1/tracks/trending?app_name=Melo&limit=16`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Audius API returned ${res.status}`);
    const json = await res.json();

    if (json.data && Array.isArray(json.data) && json.data.length > 0) {
      const audiusTracks: Track[] = json.data
        .filter((item: any) => item && item.id && item.title)
        .map((item: any) => ({
          id: `audius-${item.id}`,
          title: item.title,
          artist: item.user?.name || 'Independent Artist',
          album: item.genre || 'Single',
          duration: item.duration || 180,
          artwork: item.artwork?.['480x480'] || item.artwork?.['150x150'] || CURATED_TRACKS[0].artwork,
          streamUrl: `${host}/v1/tracks/${item.id}/stream?app_name=Melo`,
          genre: item.genre || 'Electronic',
          playCount: item.play_count || 12000,
          source: 'audius' as const,
          releaseYear: new Date(item.release_date || Date.now()).getFullYear(),
        }));

      // Combine audius tracks with our guaranteed fast curated tracks
      return [...CURATED_TRACKS, ...audiusTracks];
    }
  } catch (err) {
    console.warn('Audius trending fetch failed, using curated catalog:', err);
  }
  return CURATED_TRACKS;
}

// Live search across curated and Audius global catalog
export async function searchTracks(query: string): Promise<Track[]> {
  if (!query || query.trim().length === 0) return CURATED_TRACKS;

  const normalized = query.toLowerCase().trim();
  const localMatches = CURATED_TRACKS.filter(
    (t) =>
      t.title.toLowerCase().includes(normalized) ||
      t.artist.toLowerCase().includes(normalized) ||
      t.genre.toLowerCase().includes(normalized)
  );

  try {
    const host = await getAudiusHost();
    const res = await fetch(
      `${host}/v1/tracks/search?query=${encodeURIComponent(query)}&app_name=Melo&limit=12`,
      { cache: 'no-store' }
    );
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        const remoteMatches: Track[] = json.data
          .filter((item: any) => item && item.id && item.title)
          .map((item: any) => ({
            id: `audius-${item.id}`,
            title: item.title,
            artist: item.user?.name || 'Independent Artist',
            album: item.genre || 'Single',
            duration: item.duration || 180,
            artwork: item.artwork?.['480x480'] || item.artwork?.['150x150'] || CURATED_TRACKS[0].artwork,
            streamUrl: `${host}/v1/tracks/${item.id}/stream?app_name=Melo`,
            genre: item.genre || 'Global',
            playCount: item.play_count || 5000,
            source: 'audius' as const,
            releaseYear: new Date(item.release_date || Date.now()).getFullYear(),
          }));

        const combined = [...localMatches];
        for (const r of remoteMatches) {
          if (!combined.some((c) => c.id === r.id)) {
            combined.push(r);
          }
        }
        return combined;
      }
    }
  } catch (err) {
    console.warn('Audius search error, returning local matches:', err);
  }

  return localMatches;
}
