import type { Metadata } from 'next';
import './globals.css';
import { PlayerProvider } from '@/context/PlayerContext';

export const metadata: Metadata = {
  title: 'Melo — Lossless Music Streaming & Web Audio Engine',
  description:
    'High-fidelity Spotify-style music streaming player with real-time spectrum analysis, unlimited playlists, and lossless audio buffering built with Next.js and Tailwind CSS.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full bg-[#09090b] text-[#fafafa] flex flex-col overflow-hidden">
        <PlayerProvider>{children}</PlayerProvider>
      </body>
    </html>
  );
}
