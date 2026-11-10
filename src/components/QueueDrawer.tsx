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
  const { queue, queueIndex, currentTrack, playTrack } = usePlayer();

  if (!isOpen) return null;

  const upNextTracks = queue.slice(queueIndex + 1);

  return (
    <aside className="fixed right-0 top-0 bottom-24 w-80 md:w-96 bg-[#0e0e11]/95 backdrop-blur-xl border-l border-[#1f1f23] p-5 z-40 flex flex-col shadow-2xl select-none">
      <div className="flex items-center justify-between pb-4 border-b border-[#1f1f23]">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Music className="w-4 h-4 text-sky-400" />
          <span>Play Queue</span>
        </h3>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-[#1f1f23] text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {currentTrack && (
        <div className="py-4 border-b border-[#1f1f23]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 mb-2.5 block">
            Now Playing
          </span>
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20">
            <div className="relative w-12 h-12 rounded-md overflow-hidden bg-zinc-900 flex-shrink-0">
              <Image src={currentTrack.artwork} alt={currentTrack.title} fill className="object-cover" />
            </div>
            <div className="truncate flex-1">
              <p className="text-sm font-semibold text-white truncate">{currentTrack.title}</p>
              <p className="text-xs text-zinc-400 truncate">{currentTrack.artist}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-3 space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block px-1">
          Next In Queue ({upNextTracks.length})
        </span>

        {upNextTracks.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 text-xs">
            Queue is empty. Select any track or playlist to queue songs!
          </div>
        ) : (
          upNextTracks.map((track, i) => (
            <div
              key={`${track.id}-${i}`}
              onClick={() => playTrack(track, queue)}
              className="group flex items-center justify-between p-2 rounded-lg hover:bg-[#18181b] cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3 truncate">
                <div className="relative w-10 h-10 rounded-md overflow-hidden bg-zinc-900 flex-shrink-0">
                  <Image src={track.artwork} alt={track.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                </div>
                <div className="truncate">
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
