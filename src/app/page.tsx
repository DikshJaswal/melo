'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  Heart,
  Clock,
  Sparkles,
  Plus,
  Flame,
  Users,
  Compass,
} from 'lucide-react';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import PlayerBar from '@/components/PlayerBar';
import TrackCard from '@/components/TrackCard';
import TrackRow from '@/components/TrackRow';
import QueueDrawer from '@/components/QueueDrawer';
import VisualizerModal from '@/components/VisualizerModal';
import FullscreenPlayer from '@/components/FullscreenPlayer';
import PlaylistModal from '@/components/PlaylistModal';
import MobileNav from '@/components/MobileNav';
import AuthModal from '@/components/AuthModal';

import { usePlayer } from '@/context/PlayerContext';
import {
  CURATED_TRACKS,
  CURATED_PLAYLISTS,
  FEATURED_ARTISTS,
  fetchTrendingTracks,
  searchTracks,
} from '@/services/musicService';
import { Track } from '@/types/music';

export default function MeloApp() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isQueueOpen, setIsQueueOpen] = useState<boolean>(false);
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState<boolean>(false);
  const [tracks, setTracks] = useState<Track[]>(CURATED_TRACKS);
  const [searchResults, setSearchResults] = useState<Track[]>(CURATED_TRACKS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // PWA install prompt handler
  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setIsInstallable(false);
      });
    }
  };

  const {
    user,
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
    likedTrackIds,
    playlists,
    updateTrendingPlaylists,
  } = usePlayer();

  // Load trending live tracks on mount
  useEffect(() => {
    async function loadTracks() {
      setIsLoading(true);
      try {
        const liveTracks = await fetchTrendingTracks();
        setTracks(liveTracks);
        setSearchResults(liveTracks);
        updateTrendingPlaylists(liveTracks);
      } catch (err) {
        console.warn('Failed to fetch remote tracks, using curated catalog:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadTracks();
  }, [updateTrendingPlaylists]);

  // Handle live search
  useEffect(() => {
    let active = true;
    async function doSearch() {
      if (!searchQuery.trim()) {
        setSearchResults(tracks);
        return;
      }
      const results = await searchTracks(searchQuery);
      if (active) {
        setSearchResults(results);
      }
    }
    const debounce = setTimeout(doSearch, 250);
    return () => {
      active = false;
      clearTimeout(debounce);
    };
  }, [searchQuery, tracks]);

  // Dynamic greeting based on user's local time
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const filteredCategoryTracks = tracks.filter((t) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Trending Hindi') return true;
    const cat = selectedCategory.toLowerCase();
    return (
      t.genre.toLowerCase().includes(cat) ||
      t.title.toLowerCase().includes(cat) ||
      t.artist.toLowerCase().includes(cat) ||
      t.album.toLowerCase().includes(cat)
    );
  });

  const likedTracks = tracks.filter((t) => likedTrackIds.includes(t.id));
  const selectedPlaylist = playlists.find((p) => `playlist-${p.id}` === currentTab);

  return (
    <div className="flex h-screen bg-[#09090b] text-[#fafafa] overflow-hidden">
      {/* LEFT SIDEBAR */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'search') setSearchQuery('');
        }}
        onOpenCreatePlaylist={() => setIsCreatePlaylistOpen(true)}
      />

      {/* MAIN VIEW AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-b from-[#18181b]/40 via-[#09090b] to-[#09090b]">
        {/* TOP NAVBAR */}
        <Navbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          onOpenAuth={(mode) => {
            setAuthMode(mode);
            setIsAuthModalOpen(true);
          }}
          allTracks={tracks}
        />

        {/* SCROLLABLE MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto px-4 md:px-10 py-5 pb-44 md:pb-32">
          {/* ==================== HOME TAB ==================== */}
          {currentTab === 'home' && (
            <div className="space-y-10 max-w-7xl mx-auto">
              <div>
                {/* Mobile Install App Banner */}
                {isInstallable && (
                  <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-sky-500/20 via-zinc-900 to-zinc-900 border border-sky-500/30 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-sky-400/30 bg-[#121620] p-1 shadow-md shadow-sky-500/20 flex items-center justify-center">
                        <Image
                          src="/icon.svg"
                          alt="Melo App Icon"
                          width={36}
                          height={36}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Install Melo App</p>
                        <p className="text-[11px] text-zinc-400">Add to home screen for native standalone playback</p>
                      </div>
                    </div>
                    <button
                      onClick={handleInstallClick}
                      className="px-3.5 py-1.5 rounded-full bg-sky-400 hover:bg-sky-300 text-black font-bold text-xs shadow-md shadow-sky-500/20 transition-all active:scale-95 whitespace-nowrap"
                    >
                      Install
                    </button>
                  </div>
                )}

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-5">
                  {getGreeting()}{user ? `, ${user.name}` : ''}
                </h1>

                {/* 6 Quick Play Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {tracks.slice(0, 6).map((track) => {
                    const isCurrent = currentTrack?.id === track.id;
                    return (
                      <div
                        key={track.id}
                        onClick={() => playTrack(track, tracks)}
                        className="group flex items-center gap-3.5 bg-[#18181b]/70 hover:bg-[#27272a] rounded-lg overflow-hidden cursor-pointer transition-all duration-200 border border-transparent hover:border-zinc-700/50 shadow-sm"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0 bg-zinc-900">
                          <Image src={track.artwork} alt={track.title} fill className="object-cover" />
                        </div>
                        <span className="font-semibold text-sm text-white truncate flex-1 pr-2">
                          {track.title}
                        </span>
                        <div className="pr-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isCurrent) togglePlay();
                              else playTrack(track, tracks);
                            }}
                            className={`w-9 h-9 rounded-full bg-sky-400 hover:bg-sky-300 text-black flex items-center justify-center shadow-md shadow-sky-500/20 transition-all ${
                              isCurrent && isPlaying
                                ? 'opacity-100'
                                : 'opacity-0 group-hover:opacity-100 hover:scale-105'
                            }`}
                          >
                            {isCurrent && isPlaying ? (
                              <Pause className="w-4 h-4 fill-black" />
                            ) : (
                              <Play className="w-4 h-4 fill-black ml-0.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section: Trending Now */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-400" />
                    <h2 className="text-xl font-bold text-white">Trending Now</h2>
                  </div>
                  <span className="text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer">
                    Show all ({filteredCategoryTracks.length})
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {filteredCategoryTracks.slice(0, 12).map((track) => (
                    <TrackCard key={track.id} track={track} playlistContext={filteredCategoryTracks} />
                  ))}
                </div>
              </div>

              {/* Section: Curated Playlists */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-sky-400" />
                    <h2 className="text-xl font-bold text-white">Curated For You</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {CURATED_PLAYLISTS.map((playlist) => (
                    <div
                      key={playlist.id}
                      onClick={() => setCurrentTab(`playlist-${playlist.id}`)}
                      className="group p-4 rounded-xl bg-[#121214] hover:bg-[#18181b] border border-transparent hover:border-zinc-800 transition-all cursor-pointer"
                    >
                      <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-3 bg-zinc-900 shadow">
                        <Image
                          src={playlist.coverImage}
                          alt={playlist.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (playlist.tracks[0]) playTrack(playlist.tracks[0], playlist.tracks);
                            }}
                            className="w-9 h-9 rounded-full bg-sky-400 hover:bg-sky-300 text-black flex items-center justify-center shadow-md shadow-sky-500/20"
                          >
                            <Play className="w-4 h-4 fill-black ml-0.5" />
                          </button>
                        </div>
                      </div>
                      <h3 className="font-bold text-sm text-white truncate">{playlist.name}</h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                        {playlist.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section: Top Trending Artists */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-xl font-bold text-white">Popular Artists</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {FEATURED_ARTISTS.map((artist) => (
                    <div
                      key={artist.id}
                      className="p-4 rounded-xl bg-[#121214] hover:bg-[#18181b] border border-transparent hover:border-zinc-800 transition-all flex flex-col items-center text-center group cursor-pointer"
                    >
                      <div className="relative w-28 h-28 rounded-full overflow-hidden mb-3.5 shadow-lg shadow-black/60 group-hover:scale-105 transition-transform duration-300">
                        <Image src={artist.image} alt={artist.name} fill className="object-cover" />
                      </div>
                      <h4 className="font-bold text-sm text-white truncate w-full">{artist.name}</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">{artist.genre}</p>
                      <span className="text-[11px] text-sky-400 font-semibold mt-1">
                        {artist.monthlyListeners} monthly
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== SEARCH TAB ==================== */}
          {currentTab === 'search' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  {searchQuery ? `Results for "${searchQuery}"` : 'Browse Everything'}
                </h1>
                <p className="text-xs text-zinc-400">
                  {searchResults.length} audio tracks available to stream on Melo
                </p>
              </div>

              <div className="bg-[#121214]/60 rounded-xl border border-[#1f1f23] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1f1f23] text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  <div className="flex items-center gap-3.5 flex-1 pr-4">
                    <span className="w-5 text-center">#</span>
                    <span>Title</span>
                  </div>
                  <span className="hidden md:block w-1/4">Album</span>
                  <div className="flex items-center gap-4">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>

                <div className="divide-y divide-zinc-800/20">
                  {searchResults.map((track, i) => (
                    <TrackRow
                      key={track.id}
                      track={track}
                      index={i}
                      playlistContext={searchResults}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== LIKED SONGS TAB ==================== */}
          {currentTab === 'liked' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 bg-gradient-to-b from-indigo-900/60 to-transparent p-6 rounded-2xl border border-indigo-500/20">
                <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-2xl flex-shrink-0">
                  <Heart className="w-20 h-20 text-white fill-white" />
                </div>
                <div className="text-center sm:text-left space-y-2 flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    Playlist
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                    Liked Songs
                  </h1>
                  <p className="text-xs text-zinc-400">
                    Your collection •{' '}
                    {likedTracks.length} tracks
                  </p>
                </div>
              </div>

              {likedTracks.length > 0 && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => playTrack(likedTracks[0], likedTracks)}
                    className="w-12 h-12 rounded-full bg-sky-400 hover:bg-sky-300 text-black flex items-center justify-center shadow-md shadow-sky-500/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Play className="w-6 h-6 fill-black ml-0.5" />
                  </button>
                </div>
              )}

              {likedTracks.length === 0 ? (
                <div className="text-center py-20 text-zinc-500 text-sm">
                  <p>You haven't liked any songs yet.</p>
                  <button
                    onClick={() => setCurrentTab('home')}
                    className="mt-3 px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-all"
                  >
                    Discover Music
                  </button>
                </div>
              ) : (
                <div className="bg-[#121214]/60 rounded-xl border border-[#1f1f23] overflow-hidden">
                  <div className="divide-y divide-zinc-800/20">
                    {likedTracks.map((track, i) => (
                      <TrackRow
                        key={track.id}
                        track={track}
                        index={i}
                        playlistContext={likedTracks}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== SELECTED PLAYLIST VIEW ==================== */}
          {selectedPlaylist && (
            <div className="space-y-8 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 bg-gradient-to-b from-sky-950/40 to-transparent p-6 rounded-2xl border border-sky-500/20">
                <div className="relative w-40 h-40 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 bg-zinc-900">
                  <Image
                    src={selectedPlaylist.coverImage}
                    alt={selectedPlaylist.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center sm:text-left space-y-2 flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    Playlist
                  </span>
                  <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                    {selectedPlaylist.name}
                  </h1>
                  <p className="text-xs text-zinc-300 max-w-xl">{selectedPlaylist.description}</p>
                  <p className="text-xs text-zinc-400">
                    {selectedPlaylist.tracks.length} tracks
                  </p>
                </div>
              </div>

              {selectedPlaylist.tracks.length > 0 && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      playTrack(selectedPlaylist.tracks[0], selectedPlaylist.tracks)
                    }
                    className="w-12 h-12 rounded-full bg-sky-400 hover:bg-sky-300 text-black flex items-center justify-center shadow-md shadow-sky-500/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Play className="w-6 h-6 fill-black ml-0.5" />
                  </button>
                </div>
              )}

              {selectedPlaylist.tracks.length === 0 ? (
                <div className="text-center py-20 text-zinc-500 text-sm">
                  This playlist is empty. Browse songs and add them here!
                </div>
              ) : (
                <div className="bg-[#121214]/60 rounded-xl border border-[#1f1f23] overflow-hidden">
                  <div className="divide-y divide-zinc-800/20">
                    {selectedPlaylist.tracks.map((track, i) => (
                      <TrackRow
                        key={`${track.id}-${i}`}
                        track={track}
                        index={i}
                        playlistContext={selectedPlaylist.tracks}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== LIBRARY TAB ==================== */}
          {currentTab === 'library' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Your Library</h1>
                  <p className="text-xs text-zinc-400">Playlists, collections, and saved tracks</p>
                </div>
                <button
                  onClick={() => setIsCreatePlaylistOpen(true)}
                  className="px-4 py-2 rounded-full bg-sky-400 hover:bg-sky-300 text-black text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-sky-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Playlist</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div
                  onClick={() => setCurrentTab('liked')}
                  className="p-4 rounded-xl bg-gradient-to-br from-indigo-900/80 to-purple-950 border border-indigo-500/30 cursor-pointer hover:scale-105 transition-all shadow-lg flex flex-col justify-between aspect-square"
                >
                  <Heart className="w-8 h-8 text-white fill-white" />
                  <div>
                    <h3 className="font-bold text-base text-white">Liked Songs</h3>
                    <p className="text-xs text-indigo-300">{likedTracks.length} tracks</p>
                  </div>
                </div>

                {playlists.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setCurrentTab(`playlist-${p.id}`)}
                    className="p-3.5 rounded-xl bg-[#121214] hover:bg-[#18181b] border border-transparent hover:border-zinc-800 transition-all cursor-pointer flex flex-col justify-between aspect-square group"
                  >
                    <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-zinc-900 mb-2">
                      <Image src={p.coverImage} alt={p.name} fill className="object-cover" />
                    </div>
                    <div className="truncate">
                      <h4 className="font-semibold text-sm text-white truncate">{p.name}</h4>
                      <p className="text-xs text-zinc-400 truncate">{p.tracks.length} tracks</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <QueueDrawer isOpen={isQueueOpen} onClose={() => setIsQueueOpen(false)} />
      <VisualizerModal />
      <FullscreenPlayer />
      <PlaylistModal
        isOpen={isCreatePlaylistOpen}
        onClose={() => setIsCreatePlaylistOpen(false)}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
      <PlayerBar
        onToggleQueue={() => setIsQueueOpen(!isQueueOpen)}
        isQueueOpen={isQueueOpen}
      />
      <MobileNav currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
}
