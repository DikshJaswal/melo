'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Play, Pause, SkipBack, SkipForward, Radio } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';

export default function VisualizerModal() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    skipNext,
    skipPrevious,
    isVisualizerOpen,
    setIsVisualizerOpen,
  } = usePlayer();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isVisualizerOpen || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const numBars = 48;
      const barWidth = width / numBars - 4;

      for (let i = 0; i < numBars; i++) {
        let barHeight: number;
        if (isPlaying) {
          const freq = Math.sin(phase + i * 0.25) * 0.5 + 0.5;
          const secondary = Math.cos(phase * 1.5 + i * 0.4) * 0.3 + 0.3;
          barHeight = (freq * 0.7 + secondary * 0.3) * (height * 0.75) + 12;
        } else {
          barHeight = 6;
        }

        const x = i * (barWidth + 4);
        const y = height - barHeight;

        const gradient = ctx.createLinearGradient(0, height, 0, 0);
        gradient.addColorStop(0, '#10b981');
        gradient.addColorStop(0.5, '#1ed760');
        gradient.addColorStop(1, '#06b6d4');

        ctx.fillStyle = gradient;
        ctx.shadowColor = '#1ed760';
        ctx.shadowBlur = isPlaying ? 10 : 0;

        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
        ctx.fill();
      }

      phase += isPlaying ? 0.08 : 0.01;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisualizerOpen, isPlaying]);

  if (!isVisualizerOpen || !currentTrack) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-between p-6 md:p-12 select-none">
      <div className="w-full max-w-4xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Real-Time Spectrum Analyser
          </span>
        </div>

        <button
          onClick={() => setIsVisualizerOpen(false)}
          className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-8 flex-1">
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 pulse-glow">
          <Image
            src={currentTrack.artwork}
            alt={currentTrack.title}
            fill
            className={`object-cover transition-transform duration-700 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-1">
              {currentTrack.genre} • Hi-Res 320kbps
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white truncate">
              {currentTrack.title}
            </h2>
            <p className="text-sm text-zinc-300 font-medium truncate">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="w-full h-32 md:h-44 px-4">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </div>

      <div className="w-full max-w-md flex items-center justify-center gap-8 py-4">
        <button
          onClick={skipPrevious}
          className="w-12 h-12 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center transition-all"
        >
          <SkipBack className="w-5 h-5 fill-current" />
        </button>

        <button
          onClick={togglePlay}
          className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          {isPlaying ? (
            <Pause className="w-7 h-7 fill-black" />
          ) : (
            <Play className="w-7 h-7 fill-black ml-1" />
          )}
        </button>

        <button
          onClick={skipNext}
          className="w-12 h-12 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center transition-all"
        >
          <SkipForward className="w-5 h-5 fill-current" />
        </button>
      </div>
    </div>
  );
}
