'use client';

import React from 'react';
import { Home, Search, Library, Heart } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';

interface MobileNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function MobileNav({ currentTab, onTabChange }: MobileNavProps) {
  const { likedTrackIds } = usePlayer();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#09090b]/95 backdrop-blur-xl border-t border-[#1f1f23] z-40 flex items-center justify-around px-4 select-none">
      <button
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center gap-1 transition-all ${
          currentTab === 'home' ? 'text-cyan-400 font-bold' : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </button>

      <button
        onClick={() => onTabChange('search')}
        className={`flex flex-col items-center gap-1 transition-all ${
          currentTab === 'search' ? 'text-cyan-400 font-bold' : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px]">Search</span>
      </button>

      <button
        onClick={() => onTabChange('library')}
        className={`flex flex-col items-center gap-1 transition-all ${
          currentTab === 'library' ? 'text-cyan-400 font-bold' : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Library className="w-5 h-5" />
        <span className="text-[10px]">Library</span>
      </button>

      <button
        onClick={() => onTabChange('liked')}
        className={`flex flex-col items-center gap-1 transition-all relative ${
          currentTab === 'liked' ? 'text-cyan-400 font-bold' : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Heart className={`w-5 h-5 ${currentTab === 'liked' ? 'fill-cyan-400' : ''}`} />
        <span className="text-[10px]">Liked</span>
        {likedTrackIds.length > 0 && (
          <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-cyan-400 text-black text-[9px] font-black flex items-center justify-center shadow-lg shadow-cyan-500/50">
            {likedTrackIds.length}
          </span>
        )}
      </button>
    </nav>
  );
}
