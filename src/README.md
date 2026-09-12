# Your Day to Day Adventure

## Problem Statement

Traditional productivity tools and to-do lists feel like chores. They suffer from a "delayed gratification" problem — the real-world payoff of reading, exercising, or studying takes weeks or months to show up, so motivation fades fast. Video games solve this with instant feedback: XP, levels, and rewards that make progress feel immediate and satisfying.

## Our Solution

Your Day to Day Adventure turns everyday tasks into a Life RPG. Real tasks become "quests" — complete them to earn XP and Gold, level up your character, and grow attributes tied to the kind of work you're doing, all wrapped in a cozy 16-bit dungeon-crawler theme.

## Key Features

- **Quest system** — add, complete, and track tasks tagged to a skill tree
- **Non-linear XP & leveling** — each level requires more XP than the last
- **Attributes** — quests feed specific stats (Strength, Intellect, Discipline, Charisma) based on their skill tree
- **Streaks** — tracks current and longest consecutive-day activity streaks
- **Shop & economy** — spend earned Gold on gear, companions, artifacts, and cosmetic themes
- **Level-up celebration** — animated modal with confetti and a Gold bonus
- **Floating reward notifications**, loading skeletons, and sound effects for quest completion and purchases

## Technology Stack

- **Frontend:** React 19 + TypeScript, bundled with Vite
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (Framer Motion) + canvas-confetti
- **Icons:** lucide-react
- **State / persistence:** React state, synced to `localStorage` via a storage service (see [System Architecture](#system-architecture) for backend plans)

## How It Works

1. Sign in (or use the quick demo login) to load your character.
2. Add a quest, choosing a skill tree (Strength, Intellect, Discipline, Charisma) and difficulty.
3. Completing a quest instantly awards XP and Gold, plays a reward animation, and updates your streak.
4. Crossing an XP threshold triggers the level-up modal with confetti and a Gold bonus.
5. Spend accumulated Gold in the shop on gear, companions, and cosmetic items.

## System Architecture

This build is currently a **frontend-only client-side prototype**: all game logic runs in the browser and state is persisted to `localStorage` via a `StorageService` layer (`src/lib/storage.ts`), rather than a remote database.

```
React UI (components/)
      │
      ▼
App.tsx — central state (user, quests, streak, items)
      │
      ▼
StorageService (lib/storage.ts) ── localStorage
```

Persistence is isolated behind this single service, so the planned next step — swapping `localStorage` for a real backend (e.g. Supabase: Postgres + Auth + Row Level Security) — is a contained change rather than a rewrite. Authentication in this build is also client-side only (`AuthView.tsx` does not yet verify credentials against a server).

## Installation

**Prerequisites:** Node.js 18+ and npm

```bash
git clone <repository-url>
cd your-day-to-day-adventure
npm install
```

Copy the environment example (not required to run the app as-is):

```bash
cp .env.example .env.local
```

## How to Run

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

Other commands:

```bash
npm run build      # production build
npm run preview    # preview the production build
npm run lint        # type-check with tsc --noEmit
```

## Live Demo

_Add your deployed link here once hosted (e.g. Vercel, Netlify)._

## Screenshots

_Add screenshots or a short GIF of the dashboard, quest list, level-up modal, and shop here._

## Future Scope

- Real backend with Supabase (Postgres, Auth, Row Level Security) for cross-device sync and to prevent client-side stat tampering
- Server-side XP/Gold calculation so rewards can't be edited in local storage
- Social features — guilds, leaderboards, shared streak challenges
- Additional themes beyond the dungeon-crawler skin
- Push/email reminders for streak maintenance

## Team Members

_Add team member names and roles here._
