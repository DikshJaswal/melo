'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Sparkles, ArrowLeft, CheckCircle2, ChevronRight, Edit3 } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [showGooglePicker, setShowGooglePicker] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetSent, setResetSent] = useState(false);
  
  // Google account selector customizer
  const [googleName, setGoogleName] = useState('Dikshit Jaswal');
  const [googleEmail, setGoogleEmail] = useState('dikshitjaswal1922@gmail.com');
  const [isEditingGoogle, setIsEditingGoogle] = useState(false);

  const { login } = usePlayer();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setResetSent(true);
      return;
    }
    let finalName = name.trim();
    if (!finalName && email) {
      // Intelligently format email prefix into a clean name (e.g. dikshitjaswal1922 -> Dikshit Jaswal)
      const prefix = email.split('@')[0].replace(/[0-9_.-]+/g, ' ').trim();
      finalName = prefix
        .split(' ')
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
    }
    login(finalName || 'Dikshit Jaswal', email);
    onClose();
  };

  const handleQuickGuest = () => {
    login('Guest Listener', 'guest@melo.app');
    onClose();
  };

  const handleGoogleSelect = (selectedName: string, selectedEmail: string) => {
    login(selectedName.trim() || 'Dikshit Jaswal', selectedEmail.trim() || 'dikshitjaswal1922@gmail.com');
    setShowGooglePicker(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="bg-[#121216] border border-zinc-800 rounded-3xl w-full max-w-md p-7 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#161c28] via-[#0e1118] to-[#07080b] border border-sky-400/30 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-sky-950/50">
            <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="14" width="3.5" height="14" rx="1.75" fill="#38bdf8" />
              <path
                d="M 12 16 C 14 22, 17 24, 20 24 C 23 24, 26 22, 28 16"
                stroke="#7dd3fc"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="28.5" y="14" width="3.5" height="14" rx="1.75" fill="#38bdf8" />
              <circle cx="20" cy="13" r="2.2" fill="#ffffff" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            {mode === 'forgot'
              ? 'Reset Your Password'
              : mode === 'login'
              ? 'Log in to Melo'
              : 'Create your Melo account'}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            {mode === 'forgot'
              ? 'Enter your email to receive an instant recovery link'
              : 'Unlimited music streaming, custom playlists & lossless audio'}
          </p>
        </div>

        {/* Google Account Picker Screen */}
        {showGooglePicker ? (
          <div className="space-y-4 py-1">
            <button
              onClick={() => setShowGooglePicker(false)}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <div className="text-center pb-2">
              <svg className="w-8 h-8 mx-auto mb-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <h3 className="text-base font-bold text-white">Choose a Google Account</h3>
              <p className="text-xs text-zinc-400">to continue to Melo Lossless Music</p>
            </div>

            {/* Account Card */}
            <div className="bg-[#18181e] border border-zinc-800 rounded-2xl p-3.5 hover:border-sky-500/40 transition-all">
              <div
                onClick={() => !isEditingGoogle && handleGoogleSelect(googleName, googleEmail)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 text-black font-black text-sm flex items-center justify-center shadow-md">
                    {googleName.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white flex items-center gap-1.5">
                      {googleName}
                    </p>
                    <p className="text-xs text-zinc-400">{googleEmail}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditingGoogle(!isEditingGoogle);
                  }}
                  className="p-1.5 text-zinc-400 hover:text-sky-400 hover:bg-zinc-800 rounded-lg transition-colors"
                  title="Edit Account Name"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              {/* Editable Name & Email drawer */}
              {isEditingGoogle && (
                <div className="mt-3 pt-3 border-t border-zinc-800/80 space-y-2.5">
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                      Google Account Name
                    </label>
                    <input
                      type="text"
                      value={googleName}
                      onChange={(e) => setGoogleName(e.target.value)}
                      placeholder="e.g. Dikshit Jaswal"
                      className="w-full bg-[#121216] border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                      Google Email Address
                    </label>
                    <input
                      type="email"
                      value={googleEmail}
                      onChange={(e) => setGoogleEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full bg-[#121216] border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleGoogleSelect(googleName, googleEmail)}
                    className="w-full py-2 rounded-xl bg-sky-400 hover:bg-sky-300 text-black font-extrabold text-xs transition-all shadow-md"
                  >
                    Confirm & Sign In as {googleName || 'User'}
                  </button>
                </div>
              )}
            </div>

            {!isEditingGoogle && (
              <button
                type="button"
                onClick={() => handleGoogleSelect(googleName, googleEmail)}
                className="w-full py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-black font-extrabold text-xs shadow-md shadow-sky-500/20 transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>Continue as {googleName}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setIsEditingGoogle(true);
                setGoogleName('');
                setGoogleEmail('');
              }}
              className="w-full text-center text-xs text-zinc-400 hover:text-sky-400 transition-colors py-1"
            >
              + Use a different Google Account
            </button>
          </div>
        ) : (
          <>
            {/* Tab switchers if not in forgot mode */}
            {mode !== 'forgot' ? (
              <div className="flex bg-[#18181e] p-1 rounded-xl mb-5 border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    mode === 'login'
                      ? 'bg-zinc-800 text-sky-400 shadow-sm'
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
                      ? 'bg-zinc-800 text-sky-400 shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMode('login');
                  setResetSent(false);
                }}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </button>
            )}

            {/* Forgot Password Reset Confirmation Screen */}
            {mode === 'forgot' && resetSent ? (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-sky-400 mx-auto" />
                <div>
                  <p className="text-sm font-bold text-white">Password Recovery Link Sent!</p>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                    We sent a secure password reset link to <span className="text-sky-300 font-medium">{email || 'your email'}</span>.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setMode('login');
                    setResetSent(false);
                  }}
                  className="px-6 py-2 rounded-full bg-sky-400 text-black text-xs font-extrabold hover:bg-sky-300 transition-all"
                >
                  Return to Log In
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Dikshit Jaswal"
                        className="w-full bg-[#18181e] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400 transition-colors"
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
                      className="w-full bg-[#18181e] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                        Password
                      </label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => setMode('forgot')}
                          className="text-[11px] text-sky-400 hover:text-sky-300 font-semibold transition-colors"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#18181e] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-black font-extrabold text-sm transition-all hover:scale-[1.01] active:scale-95 shadow-md shadow-sky-500/20 mt-2"
                >
                  {mode === 'forgot'
                    ? 'Send Reset Link'
                    : mode === 'login'
                    ? 'Log In'
                    : 'Create Free Account'}
                </button>
              </form>
            )}

            {mode !== 'forgot' && (
              <>
                <div className="my-4 flex items-center gap-3">
                  <div className="flex-1 h-px bg-zinc-800" />
                  <span className="text-[11px] text-zinc-500 uppercase font-bold">or</span>
                  <div className="flex-1 h-px bg-zinc-800" />
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setShowGooglePicker(true)}
                    className="w-full py-2.5 rounded-xl bg-[#18181e] hover:bg-[#202028] border border-zinc-800 text-white text-xs font-bold flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01]"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleQuickGuest}
                    className="w-full py-2.5 rounded-xl bg-transparent hover:bg-zinc-800/40 text-zinc-400 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    <span>Continue as Guest (Skip Password)</span>
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
