'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Sparkles } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = usePlayer();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || email.split('@')[0] || 'Music Lover';
    login(finalName, email);
    onClose();
  };

  const handleQuickGuest = () => {
    login('Guest Listener', 'guest@melo.app');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="bg-[#121214] border border-[#27272a] rounded-3xl w-full max-w-md p-7 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyan-500/25">
            <span className="text-black font-black text-xl">M</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            {mode === 'login' ? 'Log in to Melo' : 'Create your Melo account'}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Unlimited music streaming, custom playlists, and lossless audio
          </p>
        </div>

        <div className="flex bg-[#18181b] p-1 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'login'
                ? 'bg-zinc-800 text-cyan-400 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'signup'
                ? 'bg-zinc-800 text-cyan-400 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                Your Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-[#18181b] border border-[#27272a] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-[#18181b] border border-[#27272a] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#18181b] border border-[#27272a] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-cyan-500/25 mt-2"
          >
            {mode === 'login' ? 'Log In' : 'Create Free Account'}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-[11px] text-zinc-500 uppercase font-bold">or</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <button
          type="button"
          onClick={handleQuickGuest}
          className="w-full py-2.5 rounded-xl bg-[#18181b] hover:bg-[#222226] border border-zinc-800 text-zinc-200 text-xs font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Continue as Guest (No Password Needed)</span>
        </button>
      </div>
    </div>
  );
}
