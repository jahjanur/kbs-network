# KBs Football Network — Documentation

MVP specification and UI/UX blueprint for the football networking platform.

## Contents

| Document | Description |
|----------|-------------|
| **[SPECIFICATION.md](./SPECIFICATION.md)** | Full MVP blueprint: system architecture, tech stack, database schema, RLS, API/RPC, functionality by module and role, UI screen map (mobile + desktop), components library, security checklist. |
| **[UI-MOCKUP-GENERATION-PROMPT.md](./UI-MOCKUP-GENERATION-PROMPT.md)** | Ready-to-use prompts for generating high-end UI mockups and Instagram carousel (FC25-inspired, navy + gold, KB logo). |

## Quick Links (from spec)

- **Stack:** Next.js, Supabase (Auth, Postgres, Storage, Realtime), Stripe, Resend, Vercel.
- **Roles:** Public, Player, Coach, Club, Admin.
- **Modules:** A (Auth/Onboarding), B (Profiles), C (Discovery), D (Jobs), E (Matching), F (Messaging), G (Dashboards), H (Billing), I (Admin), J (i18n).
- **Brand:** Deep navy, metallic gold, dark glass, FIFA-style cards (original only).

Use **SPECIFICATION.md** for implementation; use **UI-MOCKUP-GENERATION-PROMPT.md** for design/marketing assets.
