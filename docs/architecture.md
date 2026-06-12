# TypeBloom Technical Architecture

## Product Shape

TypeBloom is a desktop-first typing tutor built as a Next.js application with a future Tauri desktop packaging path. The application separates typing logic from UI so lessons, tests, games, code typing, custom text, and number practice can share the same deterministic metrics engine.

## Frontend

- Next.js App Router for public, authenticated, and app-shell routes
- React and TypeScript in strict mode
- Tailwind CSS plus global design primitives for dark purple/pink branding
- Zustand planned for durable user settings and session state
- Framer Motion planned for low-cost transitions and celebration moments
- Recharts planned for analytics pages after persistence lands
- Lucide React for accessible interface icons

## Core Modules

- `src/features/typing-engine`: pure functions for typed text state, backspace behavior, completion, and metrics
- `src/components/typing`: lesson UI, typing text renderer, virtual keyboard, live stats
- `src/data`: demo lessons, course content, and keyboard definitions
- `src/types`: domain interfaces shared by UI and services
- `src/styles`: design tokens and theme constants

## Persistence

Supabase provides authentication, PostgreSQL storage, row-level security, and later sync targets for offline sessions. The schema is privacy-conscious: high-level session results are retained by default, while raw event storage is optional and can be time-limited.

## Offline Strategy

Phase 1 stores demo data in the app bundle. Later phases should add IndexedDB for:

- Downloaded lessons
- Locally completed sessions
- A sync queue with conflict-safe UUIDs
- Sync states: `synced`, `saving`, `offline`, `failed`

## Performance Notes

Typing input should remain immediate. The engine is pure and cheap, the virtual keyboard is data-driven, charts are not rendered during active typing, and persistence should happen after completion or through debounced background writes.

## Security Notes

- Supabase anon keys only in client environment variables
- No service-role keys in the frontend
- Row-level security on user-owned tables
- Paste prevention in tests and lessons
- Custom text private by default
- Optional leaderboard participation
