'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Pause, Heart } from 'lucide-react';
import { Track } from '@/types/music';
import { usePlayer } from '@/context/PlayerContext';

interface TrackRowProps {
  track: Track;
  index: number;
  playlistContext?: Track[];
}

export default function TrackRow({ track, index, playlistContext }: TrackRowProps) {
  const { currentTrack, isPlaying, playTrack, togglePlay, toggleLike, isLiked } =
    usePlayer();

  const isCurrentTrack = currentTrack?.id === track.id;
  const liked = isLiked(track.id);

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleRowClick = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track, playlistContext);
    }
  };

  return (
    <div
      onClick={handleRowClick}
      className={`group flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer transition-all ${
        isCurrentTrack
          ? 'bg-[#18181b] text-sky-400 font-medium'
          : 'hover:bg-[#121214] text-zinc-400 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-4">
        <div className="w-5 text-center flex items-center justify-center flex-shrink-0">
          <span
            className={`text-xs font-semibold tabular-nums ${
              isCurrentTrack ? 'text-sky-400' : 'text-zinc-500'
            } group-hover:hidden`}
          >
            {isCurrentTrack && isPlaying ? (
              <span className="flex items-end justify-center gap-0.5 h-3 w-3">
                <span className="w-0.5 h-full bg-sky-400 animate-pulse" />
                <span className="w-0.5 h-2/3 bg-sky-400 animate-pulse delay-75" />
                <span className="w-0.5 h-4/5 bg-sky-400 animate-pulse delay-150" />
              </span>
            ) : (
              index + 1
            )}
          </span>
          <button className="hidden group-hover:block text-white">
            {isCurrentTrack && isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
          </button>
        </div>

        <div className="relative w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-zinc-900 shadow">
          <Image src={track.artwork} alt={track.title} fill className="object-cover" />
        </div>

        <div className="truncate flex-1">
          <p
            className={`text-sm font-semibold truncate ${
              isCurrentTrack ? 'text-sky-400 font-bold' : 'text-white'
            }`}
          >
            {track.title}
          </p>
          <p className="text-xs text-zinc-400 truncate mt-0.5">{track.artist}</p>
        </div>
      </div>

      <div className="hidden md:block w-1/4 truncate text-xs text-zinc-400 pr-4">
        {track.album}
      </div>

      <div className="flex items-center gap-4 text-xs font-medium tabular-nums text-zinc-400 flex-shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(track.id);
          }}
          className={`p-1 transition-transform active:scale-125 ${
            liked ? 'text-sky-400' : 'opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-white'
          }`}
          title={liked ? 'Remove from Liked' : 'Save to Liked'}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-sky-400' : ''}`} />
        </button>

        <span>{formatDuration(track.duration)}</span>
      </div>
    </div>
  );
}
