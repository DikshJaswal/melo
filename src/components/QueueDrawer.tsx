'use client';

import React from 'react';
import Image from 'next/image';
import { X, Play, Music, Sparkles } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';

interface QueueDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QueueDrawer({ isOpen, onClose }: QueueDrawerProps) {
  const { queue, queueIndex, currentTrack, playTrack, isPlaying } = usePlayer();

  if (!isOpen) return null;

  const upNextTracks = queue.slice(queueIndex + 1);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-35 md:hidden"
      />

      <aside className="fixed right-0 top-0 bottom-24 w-80 sm:w-96 bg-[#0c0d12]/95 backdrop-blur-2xl border-l border-[#1c1d24] p-5 z-40 flex flex-col shadow-2xl select-none animate-in slide-in-from-right duration-250">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#1c1d24]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <Music className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Up Next</h3>
              <p className="text-[10px] text-zinc-400 font-medium">
                {upNextTracks.length} song{upNextTracks.length !== 1 ? 's' : ''} in queue
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-[#1f1f23] text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
            title="Close Up Next"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {currentTrack && (
          <div className="py-3.5 border-b border-[#1c1d24]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping inline-block" />
                Now Playing
              </span>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-full bg-sky-400 animate-pulse rounded-full" />
                  <span className="w-0.5 h-2 bg-sky-300 animate-pulse delay-75 rounded-full" />
                  <span className="w-0.5 h-2.5 bg-sky-400 animate-pulse delay-150 rounded-full" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gradient-to-r from-sky-950/40 via-sky-900/10 to-transparent border border-sky-500/30">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0 shadow-md">
                <Image src={currentTrack.artwork} alt={currentTrack.title} fill className="object-cover" />
              </div>
              <div className="truncate flex-1">
                <p className="text-xs font-bold text-white truncate">{currentTrack.title}</p>
                <p className="text-[11px] text-zinc-400 truncate mt-0.5">{currentTrack.artist}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto py-3 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block px-1 mb-2">
            Coming Up Next
          </span>

          {upNextTracks.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-xl border border-dashed border-zinc-800 text-zinc-500 text-xs">
              <Sparkles className="w-5 h-5 mx-auto mb-2 text-sky-400/50" />
              Queue will auto-refill or pick any song from playlists!
            </div>
          ) : (
            upNextTracks.map((track, i) => (
              <div
                key={`${track.id}-${i}`}
                onClick={() => playTrack(track, queue)}
                className="group flex items-center justify-between p-2 rounded-xl hover:bg-[#16171d] cursor-pointer transition-all border border-transparent hover:border-zinc-800"
              >
                <div className="flex items-center gap-3 truncate flex-1 pr-2">
                  <span className="text-[10px] font-bold text-zinc-600 w-3 text-center">
                    {i + 1}
                  </span>
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0 shadow-sm">
                    <Image src={track.artwork} alt={track.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                    </div>
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-zinc-200 group-hover:text-sky-400 truncate transition-colors">
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
    </>
  );
}
