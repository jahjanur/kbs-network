# KBs Football Network

Premium football networking platform connecting **Players**, **Coaches**, and **Clubs** — FIFA/FC25-inspired UI, dark navy + metallic gold.

## Stack

- **Next.js 16** (App Router), TypeScript, Tailwind CSS v4
- **TanStack Query**, React Hook Form, Zod
- **Supabase** (Auth, Postgres, Storage, Realtime) — optional for MVP; app runs without env
- See `docs/SPECIFICATION.md` for full architecture and schema

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Supabase (optional)

Copy `.env.example` to `.env.local` and add your Supabase URL and anon key. Without them, the app runs with mock data and no auth.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing (hero, role CTAs, how it works) |
| `/discover` | Discovery — players grid (FIFA-style cards), tabs for Coaches/Clubs/Jobs |
| `/jobs` | Job board (placeholder) |
| `/pricing` | Pricing (Free / Premium / Club) |
| `/login` | Log in |
| `/register` | Sign up |
| `/register/role` | Role selection (Player / Coach / Club) |
| `/forgot-password` | Password reset |

## Project structure

- `src/app/` — App Router pages and layouts
- `src/components/` — KB logo, Header, PlayerCard, Button
- `src/lib/` — `utils.ts`, Supabase client
- `docs/` — Full MVP spec and UI mockup prompts

Design: deep navy (`#0a0e17`), metallic gold (`#c9a227`), glass panels, FC25-style player cards.
