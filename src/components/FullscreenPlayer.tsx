'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import {
  Minimize2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
} from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';

export default function FullscreenPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    isShuffle,
    repeatMode,
    togglePlay,
    seek,
    skipNext,
    skipPrevious,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
    isLiked,
    isFullscreenOpen,
    setIsFullscreenOpen,
  } = usePlayer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreenOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsFullscreenOpen]);

  if (!isFullscreenOpen || !currentTrack) return null;

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const liked = isLiked(currentTrack.id);

  return (
    <div className="fixed inset-0 z-50 bg-[#09090b] flex flex-col justify-between p-8 md:p-14 select-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-25 filter blur-3xl pointer-events-none scale-150 transition-all duration-1000"
        style={{
          backgroundImage: `url(${currentTrack.artwork})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />

      <div className="relative z-10 w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Now Playing • Melo Ambient Cinema
          </span>
        </div>

        <button
          onClick={() => setIsFullscreenOpen(false)}
          className="w-10 h-10 rounded-full bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
          title="Exit Fullscreen (Esc)"
        >
          <Minimize2 className="w-5 h-5" />
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        <div
          className={`relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/10 transition-transform duration-700 ${
            isPlaying ? 'scale-105 shadow-cyan-500/20' : 'scale-95'
          }`}
        >
          <Image
            src={currentTrack.artwork}
            alt={currentTrack.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="text-center max-w-xl">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {currentTrack.title}
            </h1>
            <button
              onClick={() => toggleLike(currentTrack.id)}
              className="p-1 text-zinc-400 hover:text-white transition-transform active:scale-125"
            >
              <Heart
                className={`w-7 h-7 ${
                  liked ? 'text-cyan-400 fill-cyan-400' : 'text-zinc-500 hover:text-white'
                }`}
              />
            </button>
          </div>
          <p className="text-lg text-zinc-300 font-medium mt-1">{currentTrack.artist}</p>
          <p className="text-xs text-cyan-400 uppercase tracking-widest font-semibold mt-2">
            {currentTrack.album} • {currentTrack.genre}
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center gap-4">
        <div className="w-full flex items-center gap-3 text-xs text-zinc-400 font-medium">
          <span className="w-10 text-right tabular-nums">{formatTime(currentTime)}</span>
          <div className="relative flex-1 h-1.5 rounded-full bg-zinc-800 cursor-pointer overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-cyan-400 shadow-[0_0_8px_rgba(0,242,254,0.8)] rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progressPercent || 0}
              onChange={(e) => {
                const newTime = (parseFloat(e.target.value) / 100) * duration;
                seek(newTime);
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <span className="w-10 text-left tabular-nums">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center gap-8">
          <button
            onClick={toggleShuffle}
            className={`p-2 transition-colors ${
              isShuffle ? 'text-cyan-400' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Shuffle className="w-5 h-5" />
          </button>

          <button
            onClick={skipPrevious}
            className="text-zinc-300 hover:text-white transition-colors"
          >
            <SkipBack className="w-7 h-7 fill-current" />
          </button>

          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black flex items-center justify-center shadow-2xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-black" />
            ) : (
              <Play className="w-8 h-8 fill-black ml-1" />
            )}
          </button>

          <button
            onClick={skipNext}
            className="text-zinc-300 hover:text-white transition-colors"
          >
            <SkipForward className="w-7 h-7 fill-current" />
          </button>

          <button
            onClick={toggleRepeat}
            className={`p-2 transition-colors ${
              repeatMode !== 'off' ? 'text-cyan-400' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {repeatMode === 'one' ? (
              <Repeat1 className="w-5 h-5" />
            ) : (
              <Repeat className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
