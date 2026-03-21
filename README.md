# Nile Distribution Platform (NDP)

> The Operating System for Film Distribution in Africa

Built by Nile Entertainment Group.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: DM Sans + Syne (Google Fonts)
- **Deployment**: Vercel-ready

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production

```bash
npm run build
npm start
```

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option B — GitHub Import

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Click **Deploy** — Vercel auto-detects Next.js

No environment variables required for the demo.

## Project Structure

```
ndp-platform/
├── app/
│   ├── globals.css          # Global styles + Tailwind
│   ├── layout.tsx           # Root layout + metadata
│   └── page.tsx             # Entry point → NDPApp
├── components/
│   ├── NDPApp.tsx           # Root app state (landing vs dashboard)
│   ├── LandingPage.tsx      # Public landing page
│   ├── Dashboard.tsx        # Dashboard shell + routing
│   ├── Sidebar.tsx          # Navigation sidebar
│   ├── TopBar.tsx           # Top navigation bar
│   ├── LiveTicker.tsx       # Realtime ticket ticker
│   ├── ui/
│   │   ├── index.tsx        # Shared UI primitives
│   │   └── FilmPoster.tsx   # Film poster component
│   └── screens/
│       ├── ProducerOverview.tsx
│       ├── ProducerFilms.tsx  (alias: FilmsView.tsx)
│       ├── SubmitFilm.tsx
│       ├── AnalyticsView.tsx
│       ├── MarketingView.tsx
│       ├── ChatView.tsx
│       ├── CinemaOverview.tsx
│       ├── AdminOverview.tsx
│       ├── AdminFilms.tsx
│       ├── AdminCinemas.tsx
│       └── AdminReports.tsx
└── lib/
    └── data.ts              # All types, demo data, helpers
```

## Demo Roles

Click the **P / C / A** buttons in the bottom-right corner to switch between:

| Button | Role | Color |
|--------|------|-------|
| P | Producer | Red |
| C | Cinema Manager | Orange |
| A | Admin / Distributor | Teal |

Or use the landing page CTAs:
- **Submit Your Film** → Producer Dashboard
- **Request Demo** → Admin Dashboard
- **I'm a Cinema Partner** → Cinema Dashboard

## Demo Data

### Films
| Title | Genre | Cinemas | Revenue |
|-------|-------|---------|---------|
| RED CIRCLE | Thriller | 12 | ₦48.7M |
| LAGOS NIGHTS | Drama | 8 | ₦29.3M |
| SHADOWS OF ABUJA | Action | 6 | ₦18.9M |

### Cinemas (10 across 7 cities)
Lagos · Abuja · Port Harcourt · Enugu · Ibadan · Benin · Calabar

## License

© 2024 Nile Entertainment Group. All rights reserved.
