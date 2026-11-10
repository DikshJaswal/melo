'use client';

import React from 'react';
import Image from 'next/image';
import { X, Play, Music } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';

interface QueueDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QueueDrawer({ isOpen, onClose }: QueueDrawerProps) {
  const { queue, queueIndex, currentTrack, isPlaying, playTrack } = usePlayer();

  if (!isOpen) return null;

  const upNextTracks = queue.slice(queueIndex + 1);

  return (
    <aside className="fixed right-0 top-0 bottom-16 md:bottom-24 w-full sm:w-80 md:w-96 bg-[#0e0e11]/95 backdrop-blur-2xl border-l border-[#1f1f23] p-5 z-40 flex flex-col shadow-2xl select-none animate-in slide-in-from-right duration-200">
      <div className="flex items-center justify-between pb-4 border-b border-[#1f1f23]">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Music className="w-4 h-4 text-sky-400" />
          <span>Up Next Queue</span>
        </h3>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-[#1f1f23] text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          title="Close Queue"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {currentTrack && (
        <div className="py-4 border-b border-[#1f1f23]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
              Now Playing
            </span>
            {isPlaying && (
              <span className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-full bg-sky-400 animate-pulse" />
                <span className="w-0.5 h-2/3 bg-sky-400 animate-pulse delay-75" />
                <span className="w-0.5 h-4/5 bg-sky-400 animate-pulse delay-150" />
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0">
              <Image src={currentTrack.artwork} alt={currentTrack.title} fill className="object-cover" />
            </div>
            <div className="truncate flex-1">
              <p className="text-sm font-bold text-white truncate">{currentTrack.title}</p>
              <p className="text-xs text-zinc-400 truncate">{currentTrack.artist}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-3 space-y-1.5 scrollbar-thin">
        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block px-1 mb-2">
          Up Next ({upNextTracks.length})
        </span>

        {upNextTracks.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 text-xs">
            Queue finished. Pick any song or playlist to auto-queue!
          </div>
        ) : (
          upNextTracks.map((track, i) => (
            <div
              key={`${track.id}-${i}`}
              onClick={() => playTrack(track, queue)}
              className="group flex items-center justify-between p-2 rounded-xl hover:bg-[#18181b] cursor-pointer transition-all border border-transparent hover:border-zinc-800"
            >
              <div className="flex items-center gap-2.5 truncate flex-1 min-w-0 pr-2">
                <span className="text-[11px] font-semibold text-zinc-500 w-4 text-center tabular-nums">
                  {i + 1}
                </span>
                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0 shadow">
                  <Image src={track.artwork} alt={track.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                </div>
                <div className="truncate flex-1">
                  <p className="text-xs font-semibold text-zinc-200 group-hover:text-sky-400 truncate">
                    {track.title}
                  </p>
                  <p className="text-[11px] text-zinc-400 truncate">{track.artist}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
