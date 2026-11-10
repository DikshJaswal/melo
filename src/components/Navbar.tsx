'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Play,
  LogOut,
  Music,
} from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { Track } from '@/types/music';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  allTracks?: Track[];
}

const CATEGORIES = [
  'All',
  'Bollywood',
  'Trending Hindi',
  'Punjabi',
  'Romance',
  'Lofi',
  'EDM',
  'Party',
];

export default function Navbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  currentTab,
  onTabChange,
  onOpenAuth,
  allTracks = [],
}: NavbarProps) {
  const { user, logout, playTrack } = usePlayer();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
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

  const suggestions = searchQuery.trim()
    ? allTracks
        .filter(
          (t) =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.genre.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <header className="sticky top-0 z-30 bg-[#09090b]/90 backdrop-blur-md border-b border-[#18181b] px-4 md:px-6 py-3 flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-4">
        {/* Navigation Arrows + Search with Live Autocomplete */}
        <div
          ref={searchContainerRef}
          className="relative flex items-center gap-3 md:gap-4 flex-1 max-w-2xl"
        >
          <div className="hidden sm:flex items-center gap-1 text-zinc-400">
            <button
              onClick={() => onTabChange('home')}
              className="w-8 h-8 rounded-full bg-[#18181b] flex items-center justify-center hover:text-white hover:bg-[#27272a] transition-all"
              title="Go to Home"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => onTabChange('search')}
              className="w-8 h-8 rounded-full bg-[#18181b] flex items-center justify-center hover:text-white hover:bg-[#27272a] transition-all"
              title="Go to Search"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setShowSuggestions(true);
              }}
              placeholder="What do you want to play? (Search songs, artists...)"
              className="w-full bg-[#18181b] text-white text-xs md:text-sm rounded-full pl-10 pr-9 py-2 border border-transparent focus:border-cyan-400 focus:bg-[#202026] focus:outline-none transition-all placeholder:text-zinc-500"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  onSearchChange('');
                  setShowSuggestions(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Live Autocomplete Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#121216]/95 backdrop-blur-2xl border border-zinc-800 rounded-2xl p-2 shadow-2xl shadow-cyan-500/10 overflow-hidden select-none">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center justify-between">
                  <span>Song Suggestions</span>
                  <span className="text-zinc-500 font-normal">Instant Play</span>
                </div>

                <div className="space-y-1">
                  {suggestions.map((track) => (
                    <div
                      key={track.id}
                      onClick={() => {
                        playTrack(track, allTracks);
                        setShowSuggestions(false);
                      }}
                      className="group flex items-center justify-between p-2 rounded-xl hover:bg-[#1f1f28] cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0">
                          <Image
                            src={track.artwork}
                            alt={track.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                          </div>
                        </div>

                        <div className="truncate">
                          <p className="text-xs font-bold text-white group-hover:text-cyan-400 truncate transition-colors">
                            {track.title}
                          </p>
                          <p className="text-[11px] text-zinc-400 truncate">
                            {track.artist}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 pl-2">
                        <span className="text-[10px] uppercase font-bold text-zinc-500 px-1.5 py-0.5 rounded bg-zinc-800">
                          {track.genre}
                        </span>
                        <span className="text-xs text-zinc-400 tabular-nums">
                          {formatDuration(track.duration)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  onClick={() => {
                    onTabChange('search');
                    setShowSuggestions(false);
                  }}
                  className="mt-1 pt-2 border-t border-zinc-800/80 text-center text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer py-1"
                >
                  View all results for &quot;{searchQuery}&quot; →
                </div>
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
                className="px-4 py-1.5 md:py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs md:text-sm transition-all hover:scale-105 active:scale-95 shadow-md shadow-cyan-500/25"
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
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 text-black font-black text-xs flex items-center justify-center shadow-md shadow-cyan-500/20">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#18181b] border border-zinc-800 rounded-xl p-1.5 shadow-2xl z-50 select-none">
                  <div className="px-3 py-2 border-b border-zinc-800">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <p className="text-[10px] text-zinc-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileMenuOpen(false);
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

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => {
                onSelectCategory(cat);
                if (currentTab !== 'home' && currentTab !== 'search') {
                  onTabChange('home');
                }
              }}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-cyan-400 text-black font-extrabold shadow-md shadow-cyan-500/25'
                  : 'bg-[#18181b] text-zinc-400 hover:text-white hover:bg-[#27272a]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </header>
  );
}
