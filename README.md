# 🎵 Melo — Lossless Web Audio & Music Streaming Engine

> **A high-performance, Spotify-inspired music player web application featuring real-time spectrum analysis, lossless audio buffering, dynamic catalog discovery, and infinite custom playlists.**

---

## ⚡ Live Features

- **🎧 Lossless Web Audio Engine**: Powered by the HTML5 Audio API & Web Audio `AnalyserNode` with dynamic frequency calculation, zero-latency streaming, and audio buffer tracking.
- **🌐 100% Legal & Free Real-Time Streaming**: Automated music discovery via the decentralized **Audius API** (`api.audius.co`) combined with ultra-fast curated CDN fallback tracks. Zero licensing costs, zero ban risk, runs 24/7.
- **🎛️ Spotify-Grade Bottom Player Bar**:
  - Seamless play, pause, seek, volume, shuffle, and 3-way repeat (`Off` / `All` / `One`).
  - Interactive dual-layer progress scrubber (buffered rail + played rail with hover glow).
  - Spinning vinyl artwork effect on active track playback.
- **📊 Real-Time Spectrum Visualizer**:
  - Fullscreen canvas-based audio spectrum analyser displaying bouncing frequency bars with cyan-to-emerald gradient shading.
- **✨ Ambient Fullscreen Mode**:
  - Immersive cinema player featuring dynamic ambient backlight glow matching the current album art.
- **📑 Playlist Management & Favorites**:
  - 1-click "Liked Songs" heart collection.
  - Custom playlist creation with local persistent storage (`localStorage`).
  - Up-Next Play Queue slide-over drawer with instant reordering and direct track jump.
- **⚡ Recruiter 1-Click Demo Mode**:
  - Instant play button located in the top navbar that auto-loads a festival track and initiates playback immediately.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Audio Engine** | HTML5 Audio API + Web Audio `AnalyserNode` + Canvas 2D |
| **Icons** | Lucide React |
| **Music APIs** | Decentralized Audius Protocol (`api.audius.co`) + Pixabay Lossless CDN |
| **State Management** | React Context (`PlayerContext`) with LocalStorage hydration |

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/DikshJaswal/melo.git
cd melo
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm start
```

---

## 🛡️ Architecture & Legal Compliance

Melo does not pirate or scrape protected MP3 files onto private servers:
1. **Zero Storage Costs:** All audio packets stream directly from public decentralized nodes and licensed royalty-free CDN CDNs.
2. **Bandwidth Optimization:** Server bandwidth is $0 because audio files are delivered directly from edge CDNs to the browser audio context.
3. **Persistent Playback:** The `<audio>` element is mounted at the root provider (`PlayerProvider`) level, ensuring continuous, un-interrupted music playback across all route changes and tab navigations.

---

## 👤 Author

**Dikshit Jaswal**  
- Portfolio: [portfolio-website-lake-nine-35.vercel.app](https://portfolio-website-lake-nine-35.vercel.app/)  
- GitHub: [@DikshJaswal](https://github.com/DikshJaswal)  
- Email: dikshitjaswal1922@gmail.com
