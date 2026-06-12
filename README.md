# TypeBloom

**Learn faster. Type beautifully.**

TypeBloom is a premium dark-purple typing tutor application. This repository contains the initial product architecture, database draft, design tokens, app shell, landing page, dashboard, course preview, and a working lesson screen powered by a separated TypeScript typing engine.

## Current Slice

- Branded public landing page
- Desktop-style app shell with sidebar navigation
- Dashboard with stats, charts, weak-key preview, and suggested lesson
- Learn page with course cards
- Working lesson screen
- Live WPM, raw WPM, accuracy, errors, time, and consistency
- Virtual keyboard with expected-key and pressed-key states
- Paste prevention and backspace tracking
- Supabase migration draft
- Unit tests for the typing engine

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

On Windows PowerShell, if `npm` is blocked by execution policy, use:

```bash
npm.cmd install
npm.cmd run dev
```

## GitHub Pages

This repo includes `.github/workflows/pages.yml`, which publishes the static TypeBloom preview from `preview/index.html` to GitHub Pages whenever `main` is pushed.

After pushing to GitHub, set the repository Pages source to **GitHub Actions** if GitHub asks for a publishing source. The workflow publishes the site URL in the `github-pages` environment.

## Environment

Copy `.env.example` to `.env.local` and add Supabase values when auth and persistence are enabled.

## Documentation

- `docs/architecture.md`
- `docs/folder-structure.md`
- `docs/routing.md`
- `docs/implementation-checklist.md`
- `supabase/migrations/0001_initial_schema.sql`

## Development Notes

The typing engine is intentionally framework-independent. UI components can call it in lessons, tests, games, custom text, code typing, and number practice without duplicating metric logic.
