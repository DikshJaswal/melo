import { Track, Playlist, Artist } from '@/types/music';
import fullTracksData from '@/data/fullTracks.json';

// 100% Full-Length High-Fidelity Audio Tracks (No 30-sec previews)
export const CURATED_TRACKS: Track[] = fullTracksData as Track[];

export const FEATURED_ARTISTS: Artist[] = [
  {
    id: 'artist-arijit',
    name: 'Arijit Singh',
    image: '/artists/arijit.jpg',
    followers: '45.2M',
    monthlyListeners: '39,800,000',
    bio: 'The undisputed voice of Indian romance and the most listened-to artist in Bollywood history.',
    genre: 'Bollywood / Romance',
  },
  {
    id: 'artist-diljit',
    name: 'Diljit Dosanjh',
    image: '/artists/diljit.jpg',
    followers: '23.8M',
    monthlyListeners: '21,400,000',
    bio: 'Global superstar selling out stadium tours worldwide and redefining modern Punjabi pop.',
    genre: 'Punjabi / Pop',
  },
  {
    id: 'artist-karan',
    name: 'Karan Aujla',
    image: '/artists/karan.jpg',
    followers: '19.4M',
    monthlyListeners: '18,900,000',
    bio: 'Chart-topping Punjabi singer, lyricist and hitmaker behind "Tauba Tauba", "Winning Speech" & "Softly".',
    genre: 'Punjabi / Hip-Hop',
  },
  {
    id: 'artist-shreya',
    name: 'Shreya Ghoshal',
    image: '/artists/shreya.jpg',
    followers: '29.5M',
    monthlyListeners: '25,600,000',
    bio: 'Multiple National Film Award-winning melody queen with hundreds of timeless hit songs.',
    genre: 'Bollywood / Melodies',
  },
  {
    id: 'artist-weeknd',
    name: 'The Weeknd',
    image: '/artists/weeknd.jpg',
    followers: '118M',
    monthlyListeners: '112,000,000',
    bio: 'Grammy-winning record breaker behind global anthems "Blinding Lights" and "Starboy".',
    genre: 'R&B / Pop',
  },
  {
    id: 'artist-rahman',
    name: 'A.R. Rahman',
    image: '/artists/rahman.jpg',
    followers: '36.8M',
    monthlyListeners: '30,200,000',
    bio: 'Two-time Academy Award and Grammy winner revered worldwide as the Mozart of Madras.',
    genre: 'Soundtrack / World',
  },
];

// Rich, full-length playlists with complete 3-to-5 minute audio
export const CURATED_PLAYLISTS: Playlist[] = [
  {
    id: 'playlist-hindi-top',
    name: '🔥 Top Global & India Hits 2026',
    description: 'The definitive 2026 chartbusters: Bollywood blockbusters, Punjabi anthems & international sensations in full length.',
    coverImage: CURATED_TRACKS[0]?.artwork || 'https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-500x500.jpg',
    tracks: [
      CURATED_TRACKS[0],  // Kesariya
      CURATED_TRACKS[1],  // Apna Bana Le
      CURATED_TRACKS[2],  // Chaleya
      CURATED_TRACKS[3],  // Tum Hi Ho
      CURATED_TRACKS[4],  // Raataan Lambiyan
      CURATED_TRACKS[5],  // Tauba Tauba
      CURATED_TRACKS[6],  // Winning Speech
      CURATED_TRACKS[7],  // 52 Bars
      CURATED_TRACKS[8],  // Cheques
      CURATED_TRACKS[9],  // Born to Shine
      CURATED_TRACKS[10], // Proper Patola
      CURATED_TRACKS[11], // Pehle Bhi Main
      CURATED_TRACKS[12], // Satranga
      CURATED_TRACKS[13], // Naina
      CURATED_TRACKS[14], // Lover
      CURATED_TRACKS[15], // Kinni Kinni
      CURATED_TRACKS[16], // Softly
      CURATED_TRACKS[17], // Shayad
      CURATED_TRACKS[18], // Hawayein
      CURATED_TRACKS[19], // Kalank
      CURATED_TRACKS[20], // Tere Hawaale
      CURATED_TRACKS[21], // Starboy
      CURATED_TRACKS[22], // Blinding Lights
      CURATED_TRACKS[23], // Die With A Smile
      CURATED_TRACKS[24], // Birds of a Feather
    ].filter(Boolean),
  },
  {
    id: 'playlist-hindi-romance',
    name: '❤️ Bollywood Romance & Melodies',
    description: 'Heartfelt soulful Hindi love songs by Arijit Singh, Shreya Ghoshal, Pritam & A.R. Rahman.',
    coverImage: CURATED_TRACKS[3]?.artwork || 'https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg',
    tracks: [
      CURATED_TRACKS[0],  // Kesariya
      CURATED_TRACKS[1],  // Apna Bana Le
      CURATED_TRACKS[2],  // Chaleya
      CURATED_TRACKS[3],  // Tum Hi Ho
      CURATED_TRACKS[4],  // Raataan Lambiyan
      CURATED_TRACKS[11], // Pehle Bhi Main
      CURATED_TRACKS[12], // Satranga
      CURATED_TRACKS[17], // Shayad
      CURATED_TRACKS[18], // Hawayein
      CURATED_TRACKS[19], // Kalank
      CURATED_TRACKS[20], // Tere Hawaale
    ].filter(Boolean),
  },
  {
    id: 'playlist-punjabi',
    name: '⚡ Punjabi & Urban Wave Bangers',
    description: 'High-energy beats & anthems from Diljit Dosanjh, Karan Aujla, Shubh and top Punjabi artists.',
    coverImage: CURATED_TRACKS[5]?.artwork || 'https://c.saavncdn.com/992/Bad-Newz-Hindi-2024-20250730113701-500x500.jpg',
    tracks: [
      CURATED_TRACKS[5],  // Tauba Tauba
      CURATED_TRACKS[6],  // Winning Speech
      CURATED_TRACKS[7],  // 52 Bars
      CURATED_TRACKS[8],  // Cheques
      CURATED_TRACKS[9],  // Born to Shine
      CURATED_TRACKS[10], // Proper Patola
      CURATED_TRACKS[13], // Naina
      CURATED_TRACKS[14], // Lover
      CURATED_TRACKS[15], // Kinni Kinni
      CURATED_TRACKS[16], // Softly
    ].filter(Boolean),
  },
  {
    id: 'playlist-global',
    name: '🌐 Global Billboard & Viral Hits',
    description: 'Worldwide chart-dominating tracks from Lady Gaga, Bruno Mars, The Weeknd, and Billie Eilish in full length.',
    coverImage: CURATED_TRACKS[20]?.artwork || 'https://c.saavncdn.com/835/Starboy-English-2016-500x500.jpg',
    tracks: [
      CURATED_TRACKS[20], // Starboy
      CURATED_TRACKS[21], // Blinding Lights
      CURATED_TRACKS[22], // Die With A Smile
      CURATED_TRACKS[23], // Birds of a Feather
    ].filter(Boolean),
  },
];

// Fetch full-length trending songs from our backend route
export async function fetchTrendingTracks(): Promise<Track[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch('/api/music/trending', { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json.results && Array.isArray(json.results) && json.results.length > 0) {
        // Merge with local curated tracks to ensure robust catalog
        const combined = [...json.results];
        for (const t of CURATED_TRACKS) {
          if (!combined.some((c) => c.id === t.id || c.title.toLowerCase() === t.title.toLowerCase())) {
            combined.push(t);
          }
        }
        return combined;
      }
    }
  } catch (err) {
    console.info('Using local full-length catalog:', err);
  }

  return CURATED_TRACKS;
}

let activeSearchController: AbortController | null = null;

// Live search across millions of full-length songs (Hindi, English, Punjabi, all genres)
export async function searchTracks(query: string): Promise<Track[]> {
  if (!query || query.trim().length === 0) return CURATED_TRACKS;

  // Abort any ongoing search request to prevent out-of-order race conditions
  if (activeSearchController) {
    activeSearchController.abort();
  }
  const controller = new AbortController();
  activeSearchController = controller;

  const normalized = query.toLowerCase().trim();
  const localMatches = CURATED_TRACKS.filter(
    (t) =>
      t.title.toLowerCase().includes(normalized) ||
      t.artist.toLowerCase().includes(normalized) ||
      t.album.toLowerCase().includes(normalized) ||
      t.genre.toLowerCase().includes(normalized)
  );

  try {
    const res = await fetch(`/api/music/search?q=${encodeURIComponent(query.trim())}`, {
      signal: controller.signal,
    });

    if (res.ok) {
      const json = await res.json();
      if (json.results && Array.isArray(json.results) && json.results.length > 0) {
        return json.results;
      }
    }
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      // Newer keystroke search has taken over; return null/local without crashing
      return [];
    }
    console.info('Search fallback to local tracks:', err);
  }

  return localMatches;
}
