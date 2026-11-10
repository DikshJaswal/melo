'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  Volume1,
  VolumeX,
  Heart,
  ListMusic,
  Activity,
  Maximize2,
  Disc3,
} from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';

interface PlayerBarProps {
  onToggleQueue: () => void;
  isQueueOpen: boolean;
}

export default function PlayerBar({ onToggleQueue, isQueueOpen }: PlayerBarProps) {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    audioBufferPercent,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    skipNext,
    skipPrevious,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
    isLiked,
    isVisualizerOpen,
    setIsVisualizerOpen,
    setIsFullscreenOpen,
  } = usePlayer();

  const [isHoveringScrubber, setIsHoveringScrubber] = useState(false);

  if (!currentTrack) return null;

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const liked = isLiked(currentTrack.id);

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPercent = parseFloat(e.target.value);
    const newTime = (newPercent / 100) * duration;
    seek(newTime);
  };

  return (
    <footer className="fixed bottom-16 md:bottom-0 left-0 right-0 h-16 md:h-24 bg-[#0e0e11]/95 backdrop-blur-xl border-t border-[#1f1f23] px-3 md:px-6 z-40 flex items-center justify-between select-none shadow-2xl">
      {/* LEFT: Current Track Details */}
      <div
        className="flex items-center gap-3 w-auto md:w-1/4 max-w-[70%] md:max-w-none md:min-w-[200px] cursor-pointer"
        onClick={() => {
          if (window.innerWidth < 768) {
            setIsFullscreenOpen(true);
          }
        }}
      >
        <div className="relative w-11 h-11 md:w-14 md:h-14 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-900 shadow-md group">
          <Image
            src={currentTrack.artwork}
            alt={currentTrack.title}
            fill
            className={`object-cover transition-transform duration-500 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
              <Disc3 className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 animate-spin-slow opacity-80" />
            </div>
          )}
        </div>

        <div className="flex flex-col truncate pr-1">
          <span className="text-xs md:text-sm font-semibold text-white truncate hover:underline">
            {currentTrack.title}
          </span>
          <span className="text-[11px] md:text-xs text-zinc-400 truncate hover:text-white transition-colors">
            {currentTrack.artist}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(currentTrack.id);
          }}
          className="text-zinc-400 hover:text-white transition-transform active:scale-125 p-1 ml-0.5"
          title={liked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}
        >
          <Heart
            className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
              liked ? 'text-cyan-400 fill-cyan-400' : 'hover:text-white'
            }`}
          />
        </button>
      </div>

      {/* MOBILE PLAY / PAUSE BUTTON */}
      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-cyan-400 text-black flex items-center justify-center active:scale-95 transition-all shadow-lg shadow-cyan-500/25"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-black" />
          ) : (
            <Play className="w-5 h-5 fill-black ml-0.5" />
          )}
        </button>
      </div>

      {/* DESKTOP CENTER: Main Controls + Time Scrubber */}
      <div className="hidden md:flex flex-col items-center gap-1.5 w-2/4 max-w-2xl px-4">
        {/* Playback Buttons */}
        <div className="flex items-center gap-5">
          <button
            onClick={toggleShuffle}
            title={isShuffle ? 'Disable Shuffle' : 'Enable Shuffle'}
            className={`relative p-1 text-xs transition-colors ${
              isShuffle ? 'text-cyan-400' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Shuffle className="w-4 h-4" />
            {isShuffle && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-sm shadow-cyan-400" />
            )}
          </button>

          <button
            onClick={skipPrevious}
            title="Previous (or restart)"
            className="text-zinc-400 hover:text-white active:scale-95 transition-all p-1"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          <button
            onClick={togglePlay}
            title={isPlaying ? 'Pause' : 'Play'}
            className="w-10 h-10 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/30"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-black" />
            ) : (
              <Play className="w-5 h-5 fill-black ml-0.5" />
            )}
          </button>

          <button
            onClick={skipNext}
            title="Next"
            className="text-zinc-400 hover:text-white active:scale-95 transition-all p-1"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>

          <button
            onClick={toggleRepeat}
            title={`Repeat: ${repeatMode.toUpperCase()}`}
            className={`relative p-1 transition-colors ${
              repeatMode !== 'off' ? 'text-cyan-400' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {repeatMode === 'one' ? (
              <Repeat1 className="w-4 h-4" />
            ) : (
              <Repeat className="w-4 h-4" />
            )}
            {repeatMode !== 'off' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-sm shadow-cyan-400" />
            )}
          </button>
        </div>

        {/* Time Progress Bar */}
        <div className="w-full flex items-center gap-2.5 text-xs text-zinc-400 font-medium">
          <span className="w-9 text-right tabular-nums">{formatTime(currentTime)}</span>

          <div
            className="relative flex-1 flex items-center group py-1"
            onMouseEnter={() => setIsHoveringScrubber(true)}
            onMouseLeave={() => setIsHoveringScrubber(false)}
          >
            <div className="absolute left-0 right-0 h-1 rounded-full bg-zinc-800 pointer-events-none" />

            <div
              className="absolute left-0 h-1 rounded-full bg-zinc-700 pointer-events-none transition-all"
              style={{ width: `${Math.min(100, audioBufferPercent)}%` }}
            />

            <div
              className={`absolute left-0 h-1 rounded-full transition-all pointer-events-none ${
                isHoveringScrubber
                  ? 'bg-cyan-400 shadow-[0_0_8px_rgba(0,242,254,0.8)]'
                  : 'bg-white'
              }`}
              style={{ width: `${progressPercent}%` }}
            />

            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progressPercent || 0}
              onChange={handleScrubberChange}
              className="relative w-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>

          <span className="w-9 text-left tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>

      {/* DESKTOP RIGHT: Volume & Utilities */}
      <div className="hidden md:flex items-center justify-end gap-3 w-1/4 min-w-[200px]">
        <button
          onClick={() => setIsVisualizerOpen(!isVisualizerOpen)}
          title="Open Audio Spectrum Visualizer"
          className={`p-2 rounded-lg transition-all ${
            isVisualizerOpen
              ? 'text-cyan-400 bg-cyan-500/10'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
          }`}
        >
          <Activity className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleQueue}
          title="Play Queue"
          className={`p-2 rounded-lg transition-all ${
            isQueueOpen
              ? 'text-cyan-400 bg-cyan-500/10'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
          }`}
        >
          <ListMusic className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 group w-32">
          <button
            onClick={toggleMute}
            className="text-zinc-400 hover:text-white transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : volume < 0.5 ? (
              <Volume1 className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 h-1 rounded-full cursor-pointer bg-zinc-700"
          />
        </div>

        <button
          onClick={() => setIsFullscreenOpen(true)}
          title="Enter Fullscreen Ambient Player"
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
