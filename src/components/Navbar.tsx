'use client';

import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Zap,
} from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { CURATED_TRACKS } from '@/services/musicService';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const CATEGORIES = [
  'All',
  'Trending',
  'Synthwave',
  'Lofi',
  'EDM',
  'Cyberpunk',
  'Ambient',
  'House',
];

export default function Navbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  currentTab,
  onTabChange,
}: NavbarProps) {
  const { playTrack } = usePlayer();

  const handleRecruiterDemo = () => {
    playTrack(CURATED_TRACKS[0], CURATED_TRACKS);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#09090b]/90 backdrop-blur-md border-b border-[#18181b] px-6 py-3.5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        {/* Navigation Arrows + Search */}
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="flex items-center gap-1 text-zinc-400">
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
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentTab !== 'search' && e.target.value.length > 0) {
                  onTabChange('search');
                }
              }}
              placeholder="What do you want to play? (Artists, songs, or genres)"
              className="w-full bg-[#18181b] text-white text-sm rounded-full pl-10 pr-9 py-2 border border-transparent focus:border-emerald-500/50 focus:bg-[#222226] focus:outline-none transition-all placeholder:text-zinc-500"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {/* 1-Click Recruiter Demo Button */}
          <button
            onClick={handleRecruiterDemo}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all hover:scale-105 shadow-sm shadow-emerald-500/10"
          >
            <Zap className="w-3.5 h-3.5 fill-emerald-400" />
            <span>⚡ 1-Click Recruiter Demo</span>
          </button>

          <a
            href="https://github.com/DikshJaswal"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-[#18181b] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#27272a] transition-all"
            title="GitHub Profile"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-black font-extrabold text-xs flex items-center justify-center shadow-md">
            DJ
          </div>
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
                  ? 'bg-white text-black font-bold shadow-sm'
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
