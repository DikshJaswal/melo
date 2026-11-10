'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Pause, Heart } from 'lucide-react';
import { Track } from '@/types/music';
import { usePlayer } from '@/context/PlayerContext';

interface TrackCardProps {
  track: Track;
  playlistContext?: Track[];
}

export default function TrackCard({ track, playlistContext }: TrackCardProps) {
  const { currentTrack, isPlaying, playTrack, togglePlay, toggleLike, isLiked } = usePlayer();

  const isCurrentTrack = currentTrack?.id === track.id;
  const liked = isLiked(track.id);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track, playlistContext);
    }
  };

  return (
    <div
      onClick={() => {
        if (!isCurrentTrack) {
          playTrack(track, playlistContext);
        }
      }}
      className={`group relative p-3.5 rounded-xl bg-[#121214] hover:bg-[#18181b] border border-transparent hover:border-[#27272a] transition-all duration-300 cursor-pointer flex flex-col justify-between ${
        isCurrentTrack ? 'bg-[#18181b] border-sky-500/40 shadow-lg shadow-sky-500/10' : ''
      }`}
    >
      <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-3 bg-zinc-900 shadow-md">
        <Image
          src={track.artwork}
          alt={track.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div
          className={`absolute bottom-2.5 right-2.5 transition-all duration-300 ${
            isCurrentTrack
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
          }`}
        >
          <button
            onClick={handlePlayClick}
            className="w-10 h-10 rounded-full bg-sky-400 hover:bg-sky-300 text-black flex items-center justify-center shadow-xl shadow-black/50 hover:scale-105 active:scale-95 transition-all"
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="w-5 h-5 fill-black" />
            ) : (
              <Play className="w-5 h-5 fill-black ml-0.5" />
            )}
          </button>
        </div>

        <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-zinc-300 border border-white/10">
          {track.genre}
        </span>
      </div>

      <div className="flex items-start justify-between gap-2">
        <div className="truncate flex-1">
          <p
            className={`font-semibold text-sm truncate ${
              isCurrentTrack ? 'text-sky-400 font-bold' : 'text-white'
            }`}
          >
            {track.title}
          </p>
          <p className="text-xs text-zinc-400 truncate mt-0.5">{track.artist}</p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(track.id);
          }}
          className={`p-1 transition-transform active:scale-125 ${
            liked ? 'text-sky-400' : 'text-zinc-600 hover:text-zinc-300'
          }`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-sky-400' : ''}`} />
        </button>
      </div>
    </div>
  );
}
