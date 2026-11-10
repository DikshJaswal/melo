import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PlayerProvider } from '@/context/PlayerContext';

export const metadata: Metadata = {
  title: 'Melo — Lossless Music Streaming & Web Audio Engine',
  description:
    'High-fidelity Spotify-style music streaming player with real-time spectrum analysis, unlimited playlists, and lossless audio buffering built with Next.js and Tailwind CSS.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Melo',
  },
};

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <head>
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="min-h-full bg-[#09090b] text-[#fafafa] flex flex-col overflow-hidden">
        <PlayerProvider>{children}</PlayerProvider>
      </body>
    </html>
  );
}
