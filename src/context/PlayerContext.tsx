'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Track, Playlist, User } from '@/types/music';
import { CURATED_TRACKS, CURATED_PLAYLISTS } from '@/services/musicService';

type RepeatMode = 'off' | 'all' | 'one';

interface PlayerContextType {
  user: User | null;
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffle: boolean;
  repeatMode: RepeatMode;
  queue: Track[];
  queueIndex: number;
  likedTrackIds: string[];
  playlists: Playlist[];
  isQueueOpen: boolean;
  isVisualizerOpen: boolean;
  isFullscreenOpen: boolean;
  audioBufferPercent: number;

  // Actions
  login: (name: string, email: string) => void;
  updateProfile: (name: string, email?: string) => void;
  logout: () => void;
  playTrack: (track: Track, newQueue?: Track[]) => void;
  togglePlay: () => void;
  seek: (seconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  skipNext: () => void;
  skipPrevious: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleLike: (trackId: string) => void;
  isLiked: (trackId: string) => boolean;
  createPlaylist: (name: string, description?: string) => void;
  addTrackToPlaylist: (playlistId: string, track: Track) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  deletePlaylist: (playlistId: string) => void;
  updateTrendingPlaylists: (liveTracks: Track[]) => void;
  setIsQueueOpen: (open: boolean) => void;
  setIsVisualizerOpen: (open: boolean) => void;
  setIsFullscreenOpen: (open: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(CURATED_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(CURATED_TRACKS[0].duration);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('all');
  const [queue, setQueue] = useState<Track[]>(CURATED_TRACKS);
  const [queueIndex, setQueueIndex] = useState<number>(0);
  const [likedTrackIds, setLikedTrackIds] = useState<string[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>(CURATED_PLAYLISTS);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState<boolean>(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState<boolean>(false);
  const [isQueueOpen, setIsQueueOpen] = useState<boolean>(false);
  const [audioBufferPercent, setAudioBufferPercent] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize from LocalStorage on mount
  useEffect(() => {
    try {
      const savedLikes = localStorage.getItem('melo_likes');
      if (savedLikes) {
        const parsed = JSON.parse(savedLikes);
        if (Array.isArray(parsed)) {
          // Clear any legacy demo mock IDs like 'curated-1' or 'curated-2'
          const realLikes = parsed.filter(
            (id: string) => id !== 'curated-1' && id !== 'curated-2'
          );
          setLikedTrackIds(realLikes);
        }
      } else {
        setLikedTrackIds([]);
      }

      const savedPlaylists = localStorage.getItem('melo_playlists');
      if (savedPlaylists) {
        const parsed = JSON.parse(savedPlaylists);
        if (Array.isArray(parsed)) {
          // Only preserve custom user-created playlists; curated playlists always use latest 25-song catalog
          const userCustomPlaylists = parsed.filter(
            (p: any) => p && p.isCustom
          );
          setPlaylists([...CURATED_PLAYLISTS, ...userCustomPlaylists]);
        }
      } else {
        setPlaylists(CURATED_PLAYLISTS);
      }

      const savedVol = localStorage.getItem('melo_volume');
      if (savedVol) setVolumeState(parseFloat(savedVol));

      const savedUser = localStorage.getItem('melo_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && (parsed.name === 'Google User' || !parsed.name)) {
          parsed.name = 'Dikshit Jaswal';
          try {
            localStorage.setItem('melo_user', JSON.stringify(parsed));
          } catch {}
        }
        setUser(parsed);
      }
    } catch (e) {
      console.warn('LocalStorage hydration error:', e);
    }
  }, []);

  const login = (name: string, email: string) => {
    const cleanName = name.trim() && name.trim() !== 'Google User' ? name.trim() : 'Dikshit Jaswal';
    const newUser: User = {
      name: cleanName,
      email: email.trim() || 'dikshitjaswal1922@gmail.com',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanName)}`,
    };
    setUser(newUser);
    try {
      localStorage.setItem('melo_user', JSON.stringify(newUser));
    } catch {}
  };

  const updateProfile = (name: string, email?: string) => {
    setUser((prev) => {
      const cleanName = name.trim() || 'Dikshit Jaswal';
      const updated: User = {
        name: cleanName,
        email: email !== undefined ? email.trim() : (prev?.email || 'dikshitjaswal1922@gmail.com'),
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanName)}`,
      };
      try {
        localStorage.setItem('melo_user', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('melo_user');
    } catch {}
  };

  // Save changes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('melo_likes', JSON.stringify(likedTrackIds));
    } catch {}
  }, [likedTrackIds]);

  useEffect(() => {
    try {
      localStorage.setItem('melo_playlists', JSON.stringify(playlists));
    } catch {}
  }, [playlists]);

  // Audio element listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.buffered.length > 0 && audio.duration) {
        const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
        setAudioBufferPercent((bufferedEnd / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || currentTrack?.duration || 0);
    };

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        skipNext();
      }
    };

    const handleError = () => {
      console.warn('Audio stream error on:', currentTrack?.title);
      if (currentTrack && currentTrack.source === 'audius') {
        const fallback = CURATED_TRACKS[0];
        if (audio) {
          audio.src = fallback.streamUrl;
          audio
            .play()
            .then(() => {
              setCurrentTrack(fallback);
              setIsPlaying(true);
            })
            .catch(console.warn);
        }
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentTrack, repeatMode, queue, queueIndex, isShuffle]);

  // Update volume and mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Mobile Lock Screen & Headphone Controls (Media Session API)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'mediaSession' in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: currentTrack.album,
        artwork: [
          { src: currentTrack.artwork, sizes: '128x128', type: 'image/jpeg' },
          { src: currentTrack.artwork, sizes: '256x256', type: 'image/jpeg' },
          { src: currentTrack.artwork, sizes: '512x512', type: 'image/jpeg' },
        ],
      });

      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';

      navigator.mediaSession.setActionHandler('play', () => {
        if (audioRef.current) audioRef.current.play().then(() => setIsPlaying(true));
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => skipPrevious());
      navigator.mediaSession.setActionHandler('nexttrack', () => skipNext());
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined) seek(details.seekTime);
      });
    }
  }, [currentTrack, isPlaying]);

  const playTrack = (track: Track, newQueue?: Track[]) => {
    setCurrentTrack(track);
    setIsQueueOpen(true);
    if (newQueue) {
      setQueue(newQueue);
      const idx = newQueue.findIndex((t) => t.id === track.id);
      setQueueIndex(idx !== -1 ? idx : 0);
    } else {
      const idx = queue.findIndex((t) => t.id === track.id);
      if (idx !== -1) {
        setQueueIndex(idx);
      } else {
        const updated = [track, ...queue];
        setQueue(updated);
        setQueueIndex(0);
      }
    }

    const audio = audioRef.current;
    if (audio) {
      try {
        audio.pause();
        audio.src = track.streamUrl;
        audio.currentTime = 0;
        audio.load();
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((err) => {
              console.warn('Autoplay error / user interaction required:', err);
              setIsPlaying(false);
            });
        }
      } catch (e) {
        console.warn('Audio play exception:', e);
        setIsPlaying(false);
      }
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!audio.src || !audio.src.includes(currentTrack.streamUrl)) {
        audio.src = currentTrack.streamUrl;
        audio.load();
      }
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Playback error / user interaction required:', err);
            setIsPlaying(false);
          });
      }
    }
  };

  const seek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  const setVolume = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    setIsMuted(clamped === 0);
    try {
      localStorage.setItem('melo_volume', clamped.toString());
    } catch {}
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const skipNext = () => {
    if (queue.length === 0) return;

    let nextIndex: number;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
      if (nextIndex === queueIndex && queue.length > 1) {
        nextIndex = (nextIndex + 1) % queue.length;
      }
    } else {
      nextIndex = queueIndex + 1;
      if (nextIndex >= queue.length) {
        if (repeatMode === 'all') {
          nextIndex = 0;
        } else {
          setIsPlaying(false);
          return;
        }
      }
    }

    setQueueIndex(nextIndex);
    const nextTrack = queue[nextIndex];
    if (nextTrack) {
      playTrack(nextTrack);
    }
  };

  const skipPrevious = () => {
    if (!audioRef.current || queue.length === 0) return;
    if (audioRef.current.currentTime > 3) {
      seek(0);
      return;
    }

    let prevIndex = queueIndex - 1;
    if (prevIndex < 0) {
      prevIndex = queue.length - 1;
    }
    setQueueIndex(prevIndex);
    const prevTrack = queue[prevIndex];
    if (prevTrack) {
      playTrack(prevTrack);
    }
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const toggleRepeat = () => {
    if (repeatMode === 'off') setRepeatMode('all');
    else if (repeatMode === 'all') setRepeatMode('one');
    else setRepeatMode('off');
  };

  const toggleLike = (trackId: string) => {
    setLikedTrackIds((prev) =>
      prev.includes(trackId) ? prev.filter((id) => id !== trackId) : [...prev, trackId]
    );
  };

  const isLiked = (trackId: string) => likedTrackIds.includes(trackId);

  const createPlaylist = (name: string, description: string = '') => {
    const newPlaylist: Playlist = {
      id: `custom-playlist-${Date.now()}`,
      name: name.trim() || 'My Playlist',
      description,
      coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      tracks: [],
      isCustom: true,
    };
    setPlaylists((prev) => [...prev, newPlaylist]);
  };

  const addTrackToPlaylist = (playlistId: string, track: Track) => {
    setPlaylists((prev) =>
      prev.map((p) => {
        if (p.id === playlistId && !p.tracks.some((t) => t.id === track.id)) {
          return { ...p, tracks: [...p.tracks, track] };
        }
        return p;
      })
    );
  };

  const removeTrackFromPlaylist = (playlistId: string, trackId: string) => {
    setPlaylists((prev) =>
      prev.map((p) => {
        if (p.id === playlistId) {
          return { ...p, tracks: p.tracks.filter((t) => t.id !== trackId) };
        }
        return p;
      })
    );
  };

  const deletePlaylist = (playlistId: string) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
  };

  const updateTrendingPlaylists = (liveTracks: Track[]) => {
    if (!liveTracks || liveTracks.length === 0) return;
    setPlaylists((prev) => {
      const userCustom = prev.filter((p) => p.isCustom);
      const updatedCurated = CURATED_PLAYLISTS.map((cp) => {
        let matching: Track[] = [];
        if (cp.id === 'playlist-hindi-top') {
          matching = liveTracks.slice(0, 25);
        } else if (cp.id === 'playlist-hindi-romance') {
          matching = liveTracks.filter(
            (t) =>
              t.genre.toLowerCase() === 'romance' ||
              (t.genre.toLowerCase() === 'bollywood' && !t.title.toLowerCase().includes('tauba') && !t.title.toLowerCase().includes('arjan'))
          );
        } else if (cp.id === 'playlist-punjabi') {
          matching = liveTracks.filter(
            (t) =>
              t.genre.toLowerCase() === 'punjabi' ||
              t.artist.toLowerCase().includes('diljit') ||
              t.artist.toLowerCase().includes('dhillon') ||
              t.artist.toLowerCase().includes('karan aujla') ||
              t.artist.toLowerCase().includes('ikky') ||
              t.artist.toLowerCase().includes('babbal')
          );
        } else if (cp.id === 'playlist-lofi-chill') {
          matching = liveTracks.filter(
            (t) =>
              t.genre.toLowerCase() === 'lofi' ||
              t.genre.toLowerCase() === 'ambient'
          );
        } else if (cp.id === 'playlist-global-pop') {
          matching = liveTracks.filter(
            (t) =>
              t.genre.toLowerCase() === 'pop' ||
              t.genre.toLowerCase().includes('r&b') ||
              t.artist.toLowerCase().includes('weeknd') ||
              t.artist.toLowerCase().includes('eilish') ||
              t.artist.toLowerCase().includes('carpenter')
          );
        }

        const merged = [...cp.tracks];
        for (const m of matching) {
          if (!merged.some((t) => t.id === m.id || t.title.toLowerCase() === m.title.toLowerCase())) {
            merged.push(m);
          }
        }
        return {
          ...cp,
          tracks: merged.slice(0, 25),
        };
      });
      return [...updatedCurated, ...userCustom];
    });
  };

  return (
    <PlayerContext.Provider
      value={{
        user,
        login,
        updateProfile,
        logout,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffle,
        repeatMode,
        queue,
        queueIndex,
        likedTrackIds,
        playlists,
        isQueueOpen,
        isVisualizerOpen,
        isFullscreenOpen,
        audioBufferPercent,
        playTrack,
        togglePlay,
        seek,
        setVolume,
        toggleMute,
        skipNext,
        skipPrevious,
        toggleShuffle,
        toggleRepeat,
        toggleLike,
        isLiked,
        createPlaylist,
        addTrackToPlaylist,
        removeTrackFromPlaylist,
        deletePlaylist,
        updateTrendingPlaylists,
        setIsQueueOpen,
        setIsVisualizerOpen,
        setIsFullscreenOpen,
        audioRef,
      }}
    >
      <audio
        ref={audioRef}
        preload="auto"
      />
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
