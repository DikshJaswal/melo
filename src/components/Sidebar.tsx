'use client';

import React from 'react';
import {
  Home,
  Search,
  Library,
  Heart,
  PlusSquare,
  Music2,
  Radio,
  Trash2,
  Headphones,
} from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';

interface SidebarProps {
  currentTab: 'home' | 'search' | 'library' | 'liked' | string;
  onTabChange: (tab: string) => void;
  onOpenCreatePlaylist: () => void;
}

export default function Sidebar({
  currentTab,
  onTabChange,
  onOpenCreatePlaylist,
}: SidebarProps) {
  const { likedTrackIds, playlists, deletePlaylist } = usePlayer();

  return (
    <aside className="hidden md:flex w-64 bg-[#09090b] border-r border-[#18181b] flex-col h-full flex-shrink-0 select-none">
      {/* App Branding */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Radio className="w-6 h-6 text-black animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white">Melo</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-medium">Lossless Streaming</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="px-3 py-2 space-y-1">
        <button
          onClick={() => onTabChange('home')}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
            currentTab === 'home'
              ? 'bg-[#18181b] text-emerald-400 font-bold shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-[#121214]'
          }`}
        >
          <Home className={`w-5 h-5 ${currentTab === 'home' ? 'text-emerald-400' : ''}`} />
          <span>Home</span>
        </button>

        <button
          onClick={() => onTabChange('search')}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
            currentTab === 'search'
              ? 'bg-[#18181b] text-emerald-400 font-bold shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-[#121214]'
          }`}
        >
          <Search className={`w-5 h-5 ${currentTab === 'search' ? 'text-emerald-400' : ''}`} />
          <span>Search & Explore</span>
        </button>

        <button
          onClick={() => onTabChange('library')}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
            currentTab === 'library'
              ? 'bg-[#18181b] text-emerald-400 font-bold shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-[#121214]'
          }`}
        >
          <Library className={`w-5 h-5 ${currentTab === 'library' ? 'text-emerald-400' : ''}`} />
          <span>Your Library</span>
        </button>
      </div>

      <div className="my-3 mx-4 border-t border-[#18181b]" />

      {/* Playlists & Collections */}
      <div className="px-3 space-y-1">
        <button
          onClick={() => onTabChange('liked')}
          className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group ${
            currentTab === 'liked'
              ? 'bg-[#18181b] text-white font-semibold'
              : 'text-zinc-400 hover:text-white hover:bg-[#121214]'
          }`}
        >
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <div className="text-left truncate flex-1">
            <p className="truncate text-sm">Liked Songs</p>
            <p className="text-[11px] text-zinc-500">{likedTrackIds.length} tracks</p>
          </div>
        </button>

        <button
          onClick={onOpenCreatePlaylist}
          className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-[#121214] transition-all group"
        >
          <div className="w-8 h-8 rounded-md bg-[#27272a] group-hover:bg-[#3f3f46] flex items-center justify-center flex-shrink-0 transition-colors">
            <PlusSquare className="w-4 h-4 text-zinc-300 group-hover:text-emerald-400" />
          </div>
          <span className="text-sm font-medium">Create Playlist</span>
        </button>
      </div>

      <div className="my-3 mx-4 border-t border-[#18181b]" />

      {/* Playlist List Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-1 space-y-1">
        <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 px-2 mb-2">
          Playlists
        </p>
        {playlists.map((playlist) => {
          const isSelected = currentTab === `playlist-${playlist.id}`;
          return (
            <div
              key={playlist.id}
              className={`group flex items-center justify-between px-2.5 py-2 rounded-lg text-sm cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#18181b] text-emerald-400 font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-[#121214]'
              }`}
              onClick={() => onTabChange(`playlist-${playlist.id}`)}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Music2 className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-emerald-400' : 'text-zinc-600'}`} />
                <span className="truncate text-xs font-medium">{playlist.name}</span>
              </div>
              {playlist.isCustom && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePlaylist(playlist.id);
                  }}
                  title="Delete playlist"
                  className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 transition-opacity p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Audio Engine Spec Badge at bottom */}
      <div className="p-4 border-t border-[#18181b] bg-[#0c0c0e]">
        <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 to-zinc-900 border border-emerald-500/20">
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <Headphones className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Web Audio Engine</span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-snug">
            320kbps Stream • HTML5 AnalyserNode • Zero-latency Buffer
          </p>
        </div>
      </div>
    </aside>
  );
}
