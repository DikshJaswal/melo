'use client';

import React, { useState, useRef, useEffect } from 'react';
import SafeImage from '@/components/SafeImage';
import {
  Search,
  X,
  Play,
  LogOut,
  Loader2,
} from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { Track } from '@/types/music';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  allTracks?: Track[];
  searchResults?: Track[];
  isSearching?: boolean;
  onPlaySong?: (track: Track, context?: Track[]) => void;
}

export default function Navbar({
  searchQuery,
  onSearchChange,
  currentTab,
  onTabChange,
  onOpenAuth,
  allTracks = [],
  searchResults = [],
  isSearching = false,
  onPlaySong,
}: NavbarProps) {
  const { user, logout, updateProfile, playTrack } = usePlayer();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Use dynamic search results first if available, otherwise filter allTracks
  const suggestions = searchQuery.trim()
    ? (searchResults && searchResults.length > 0
        ? searchResults
        : allTracks.filter(
            (t) =>
              t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.genre.toLowerCase().includes(searchQuery.toLowerCase())
          )
      ).slice(0, 6)
    : [];

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectSong = (track: Track) => {
    const context = searchResults.length > 0 ? searchResults : allTracks;
    if (onPlaySong) {
      onPlaySong(track, context);
    } else {
      playTrack(track, context);
    }
    setShowSuggestions(false);
    onTabChange('search');
  };

  return (
    <header className="sticky top-0 z-30 bg-[#09090b]/95 backdrop-blur-md border-b border-[#18181b] px-4 md:px-6 py-3 flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-4">
        {/* Search with Live Autocomplete */}
        <div
          ref={searchContainerRef}
          className="relative flex items-center flex-1 max-w-xl"
        >
          {/* Search Input Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => {
                const val = e.target.value;
                onSearchChange(val);
                setShowSuggestions(true);
                if (val.trim().length > 0 && currentTab !== 'search') {
                  onTabChange('search');
                } else if (val.trim().length === 0 && currentTab === 'search') {
                  onTabChange('home');
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onTabChange('search');
                  setShowSuggestions(false);
                }
              }}
              placeholder="What do you want to play? (Search any song, artist...)"
              className="w-full bg-[#141418] text-white text-xs md:text-sm rounded-full pl-10 pr-10 py-2 border border-zinc-800 focus:border-sky-400 focus:bg-[#1a1a20] focus:outline-none transition-all placeholder:text-zinc-500 shadow-inner"
            />
            {isSearching ? (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <Loader2 className="w-4 h-4 text-sky-400 animate-spin" />
              </div>
            ) : searchQuery ? (
              <button
                onClick={() => {
                  onSearchChange('');
                  setShowSuggestions(false);
                  if (currentTab === 'search') {
                    onTabChange('home');
                  }
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}

            {/* Live Autocomplete Suggestions Dropdown */}
            {showSuggestions && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#121216]/98 backdrop-blur-2xl border border-zinc-800 rounded-2xl p-2 shadow-2xl shadow-black/80 overflow-hidden select-none">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-400 flex items-center justify-between">
                  <span>{isSearching ? 'Searching...' : 'Song Suggestions'}</span>
                  <span className="text-zinc-500 font-normal">Click to Play</span>
                </div>
                {isSearching && suggestions.length === 0 ? (
                  <div className="p-4 text-center text-xs text-zinc-400 flex items-center justify-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-sky-400 animate-spin" />
                    <span>Searching millions of full-length tracks...</span>
                  </div>
                ) : suggestions.length > 0 ? (
                  <div className="space-y-1">
                    {suggestions.map((track) => (
                      <div
                        key={track.id}
                        onClick={() => handleSelectSong(track)}
                        className="group flex items-center justify-between p-2 rounded-xl hover:bg-[#1e1e24] cursor-pointer transition-all border border-transparent hover:border-zinc-700/50"
                      >
                        <div className="flex items-center gap-3 truncate">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0">
                            <SafeImage
                              src={track.artwork}
                              alt={track.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="w-4 h-4 fill-sky-400 text-sky-400 ml-0.5" />
                            </div>
                          </div>
                          <div className="truncate">
                            <p className="text-xs font-bold text-white group-hover:text-sky-400 truncate transition-colors">
                              {track.title}
                            </p>
                            <p className="text-[11px] text-zinc-400 truncate">
                              {track.artist}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pr-2 text-zinc-500 text-[11px]">
                          <span className="text-[10px] uppercase font-semibold text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-full">
                            {track.genre}
                          </span>
                          <span>{formatDuration(track.duration)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-xs text-zinc-500">
                    Press Enter to search for &quot;{searchQuery}&quot;
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Real User Auth / Profile Actions */}
        <div className="flex items-center gap-2 md:gap-3 relative">
          {!user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('signup')}
                className="text-xs md:text-sm font-bold text-zinc-400 hover:text-white px-2 py-1.5 transition-colors"
              >
                Sign up
              </button>
              <button
                onClick={() => onOpenAuth('login')}
                className="px-5 py-1.5 md:py-2 rounded-full bg-sky-400 hover:bg-sky-300 text-black font-extrabold text-xs md:text-sm transition-all hover:scale-105 active:scale-95 shadow-md shadow-sky-500/20"
              >
                Log in
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1 pl-2.5 rounded-full bg-[#18181b] hover:bg-[#222226] border border-zinc-800 transition-all"
              >
                <span className="text-xs font-bold text-white max-w-[100px] truncate">
                  {user.name}
                </span>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 text-black font-black text-xs flex items-center justify-center shadow-md shadow-sky-500/20">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#18181b] border border-zinc-800 rounded-xl p-1.5 shadow-2xl z-50 select-none">
                  {isEditingName ? (
                    <div className="p-2 space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-400 block">
                        Edit Display Name
                      </label>
                      <input
                        type="text"
                        value={editNameValue}
                        onChange={(e) => setEditNameValue(e.target.value)}
                        className="w-full bg-[#121216] border border-sky-400/50 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            if (editNameValue.trim()) updateProfile(editNameValue.trim());
                            setIsEditingName(false);
                          }
                        }}
                      />
                      <div className="flex items-center gap-1.5 pt-1">
                        <button
                          onClick={() => {
                            if (editNameValue.trim()) updateProfile(editNameValue.trim());
                            setIsEditingName(false);
                          }}
                          className="flex-1 py-1 rounded-md bg-sky-400 text-black text-[11px] font-bold hover:bg-sky-300 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setIsEditingName(false)}
                          className="flex-1 py-1 rounded-md bg-zinc-800 text-zinc-300 text-[11px] hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="px-3 py-2 border-b border-zinc-800">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-white truncate max-w-[120px]">{user.name}</p>
                        <button
                          onClick={() => {
                            setEditNameValue(user.name);
                            setIsEditingName(true);
                          }}
                          className="text-[10px] text-sky-400 hover:text-sky-300 font-semibold hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-[10px] text-zinc-400 truncate">{user.email}</p>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setIsProfileMenuOpen(false);
                      setIsEditingName(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-zinc-800/80 rounded-lg transition-colors mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
