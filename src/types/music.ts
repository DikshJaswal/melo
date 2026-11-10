export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  artwork: string;
  streamUrl: string;
  genre: string;
  playCount?: number;
  source: 'audius' | 'curated' | 'stream' | 'itunes';
  releaseYear?: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  tracks: Track[];
  isCustom?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  followers: string;
  monthlyListeners: string;
  bio: string;
  genre: string;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}
