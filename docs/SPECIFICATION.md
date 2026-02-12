# KBs Football Network — MVP Specification & UI/UX Blueprint

**Version:** 1.0 MVP  
**Style:** FIFA/EA FC 25 career-mode inspired, premium dark navy + metallic gold  
**Goal:** Fastest-to-build MVP, scalable later, clean architecture

---

## 1. System Architecture (Fast Stack)

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           VERCEL (Frontend)                                  │
│  Next.js 14+ (App Router) • TypeScript • Tailwind • shadcn/ui • RHF + Zod   │
│  TanStack Query • Supabase JS Client                                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SUPABASE (BaaS)                                       │
│  Auth (email/pass, magic link) • Postgres • Storage • Realtime • Edge Fns   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
┌─────────────────┐    ┌─────────────────────┐    ┌─────────────────────────┐
│ Stripe          │    │ Resend (or Supabase  │    │ Optional later:         │
│ Checkout        │    │ Auth email templates)│    │ Meilisearch (search)    │
│ Customer Portal │    │ Verification, reset,  │    │                          │
│ Webhooks        │    │ notifications        │    │                          │
└─────────────────┘    └─────────────────────┘    └─────────────────────────┘
```

### 1.2 Tech Stack Summary

| Layer | Choice | Purpose |
|-------|--------|---------|
| **Frontend** | Next.js 14+ (App Router), TypeScript | SSR/SSG, API routes, type safety |
| **Styling** | Tailwind CSS | Utility-first, design tokens for navy/gold |
| **Components** | shadcn/ui | Accessible, customizable, dark theme ready |
| **State/Data** | TanStack Query | Server state, cache, mutations |
| **Forms** | React Hook Form + Zod | Validation, minimal re-renders |
| **Auth** | Supabase Auth | Email/password, magic link, RLS integration |
| **Database** | Supabase Postgres | Single source of truth, RLS, functions |
| **Storage** | Supabase Storage | Avatars, gallery, CVs, thumbnails |
| **Realtime** | Supabase Realtime | Chat, notifications |
| **Payments** | Stripe | Subscriptions, webhooks, customer portal |
| **Email** | Resend (or Supabase) | Verification, password reset, notifications |
| **Hosting** | Vercel | Frontend + serverless webhooks |

### 1.3 Data Flow Principles

- **MVP:** All reads/writes go through Supabase client; no custom API server except Stripe webhook (Next.js API route or Supabase Edge Function).
- **Complex queries:** Postgres views + RPC (`/rpc/*`) called from frontend.
- **RLS:** Enforces role-based access; no trusted server required for most operations.
- **Optional later:** Meilisearch for advanced search; MVP uses Postgres full-text + filters.

---

## 2. Database Schema (Supabase Postgres)

### 2.1 Core Tables

#### `users` (extends Supabase `auth.users` via `public.users` or profile pattern)

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | = auth.users.id |
| email | text | From auth |
| role | enum | 'player', 'coach', 'club', 'admin' |
| onboarding_completed | boolean | Default false |
| profile_completion_score | smallint | 0–100, computed or cached |
| created_at | timestamptz | |
| updated_at | timestamptz | |

#### `profiles_player`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users | UNIQUE |
| name | text | |
| age | smallint | |
| nationality | text | ISO or name |
| city | text | |
| country | text | |
| languages | text[] | |
| position_primary | text | e.g. ST, CM, CB |
| positions_secondary | text[] | |
| preferred_foot | text | left, right, both |
| height_cm | smallint | |
| weight_kg | smallint | |
| current_club | text | Optional |
| league_level | text | e.g. amateur, semi-pro, pro, tier |
| contract_status | text | contract, free, loan, etc. |
| availability | text | available, not_available, date |
| availability_date | date | If date-specific |
| bio | text | |
| rating | smallint | 1–99 or null, display only |
| visibility | text | public, limited, premium_locked |
| highlight_video_url | text | |
| created_at | timestamptz | |
| updated_at | timestamptz | |

#### `profiles_coach`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users | UNIQUE |
| name | text | |
| experience_years | smallint | |
| certifications | jsonb / text[] | Licenses, badges |
| roles_preferred | text[] | head, assistant, youth |
| city | text | |
| country | text | |
| languages | text[] | |
| relocation | boolean | |
| availability | text | |
| availability_date | date | |
| bio | text | |
| visibility | text | public, limited, premium_locked |
| created_at | timestamptz | |
| updated_at | timestamptz | |

#### `profiles_club`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users | UNIQUE |
| club_name | text | |
| league | text | |
| region | text | |
| country | text | |
| verified_status | text | pending, approved, rejected |
| verified_at | timestamptz | |
| website | text | |
| bio | text | |
| recruitment_focus | text[] | positions, age range, etc. |
| facilities | text | Optional |
| visibility | text | public, limited |
| created_at | timestamptz | |
| updated_at | timestamptz | |

#### `media`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users | |
| type | text | avatar, gallery, document, thumbnail |
| url | text | Supabase Storage path or public URL |
| metadata | jsonb | caption, order, etc. |
| created_at | timestamptz | |

#### `jobs`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| club_id | uuid FK → profiles_club | |
| type | text | player, coach |
| position | text | For player: ST, CM; for coach: head, assistant |
| requirements | text | |
| location | text | |
| country | text | |
| start_date | date | |
| end_date | date | Optional tryout window |
| notes | text | |
| status | text | draft, published, closed |
| created_at | timestamptz | |
| updated_at | timestamptz | |

#### `applications`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| job_id | uuid FK → jobs | |
| applicant_id | uuid FK → users | |
| status | text | new, reviewed, shortlisted, interview, offer, closed |
| club_notes | text | Internal, only club sees |
| club_rating | smallint | 1–5 or null |
| created_at | timestamptz | |
| updated_at | timestamptz | |
| UNIQUE(job_id, applicant_id) | | |

#### `player_stats` (optional MVP; can be jsonb on profile)

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| player_id | uuid FK → profiles_player | |
| season | text | e.g. 2024/25 |
| stats | jsonb | goals, assists, apps, etc. |
| achievements | text[] | |
| created_at | timestamptz | |

#### `favorites`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users | |
| target_type | text | user, job |
| target_id | uuid | user_id or job_id |
| created_at | timestamptz | |
| UNIQUE(user_id, target_type, target_id) | | |

#### `conversations`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_a_id | uuid FK → users | Smaller uuid first for consistency |
| user_b_id | uuid FK → users | |
| last_message_at | timestamptz | |
| created_at | timestamptz | |
| UNIQUE(user_a_id, user_b_id) | | |

#### `messages`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| conversation_id | uuid FK → conversations | |
| sender_id | uuid FK → users | |
| content | text | |
| attachment_url | text | Optional |
| read_at | timestamptz | Optional for read receipts |
| created_at | timestamptz | |

#### `reports`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| reporter_id | uuid FK → users | |
| target_type | text | user, message, job |
| target_id | uuid | |
| reason | text | |
| status | text | pending, resolved, dismissed |
| created_at | timestamptz | |

#### `subscriptions`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users | UNIQUE per user (one active sub) |
| plan | text | free, premium_player, premium_coach, club |
| status | text | active, canceled, past_due, trialing |
| stripe_customer_id | text | |
| stripe_subscription_id | text | |
| current_period_end | timestamptz | |
| created_at | timestamptz | |
| updated_at | timestamptz | |

#### `notifications`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users | |
| type | text | message, application_update, match, etc. |
| payload | jsonb | title, body, link, ids |
| read | boolean | Default false |
| created_at | timestamptz | |

#### `saved_searches` (optional MVP)

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users | |
| name | text | |
| filters | jsonb | Same shape as search API |
| alert_enabled | boolean | |
| created_at | timestamptz | |

### 2.2 Enums (create in Postgres)

```sql
-- role: player, coach, club, admin
-- visibility: public, limited, premium_locked (profiles); public, limited (club)
-- job status: draft, published, closed
-- application status: new, reviewed, shortlisted, interview, offer, closed
-- subscription plan: free, premium_player, premium_coach, club
-- subscription status: active, canceled, past_due, trialing
-- report status: pending, resolved, dismissed
-- verified_status: pending, approved, rejected
```

### 2.3 Row Level Security (RLS) Summary

| Table | Policy idea |
|-------|-------------|
| users | Users read/update own row; admin read all. |
| profiles_* | Own profile: full CRUD. Others: read by visibility + subscription. Admin: all. |
| media | Own media: CRUD. Others: read if profile visible. |
| jobs | Club: CRUD own. Others: read published. |
| applications | Club: read/update for own jobs. Applicant: read own. Insert: applicant for published job. |
| favorites | CRUD own only. |
| conversations | Read/insert if user is user_a or user_b. |
| messages | Read/insert in own conversations. |
| reports | Insert own; admin read/update. |
| subscriptions | Read own; write only via service role (Stripe webhook). |
| notifications | Read/update own only. |

---

## 3. API Endpoints & RPC

### 3.1 Auth (Supabase)

- Sign up: `supabase.auth.signUp({ email, password })`
- Sign in: `supabase.auth.signInWithPassword({ email, password })`
- Magic link: `supabase.auth.signInWithOtp({ email })`
- Reset password: `supabase.auth.resetPasswordForEmail({ email })`
- Session: `supabase.auth.getSession()` / `onAuthStateChange`

### 3.2 REST (Supabase Auto API)

- Tables exposed via Supabase client: `from('profiles_player')`, etc., with RLS.
- Storage: `supabase.storage.from('avatars').upload()` / `getPublicUrl()`.

### 3.3 Custom RPC (Postgres Functions)

| RPC | Purpose | Main params |
|-----|---------|-------------|
| `match_recommendations` | Recommended clubs/jobs for player/coach; recommended players/coaches for club | user_id, limit, offset |
| `search_players` | Full-text + filters (position, age, league, region, availability, languages, foot) | filters jsonb, limit, offset |
| `search_coaches` | Same pattern for coaches | filters jsonb, limit, offset |
| `search_clubs` | Search clubs (league, region, verified) | filters jsonb, limit, offset |
| `job_feed` | Published jobs with filters | filters jsonb, limit, offset |
| `get_conversation_with_messages` | Conversation + paginated messages | conversation_id, before_ts, limit |
| `unread_counts` | Unread messages + notifications per user | user_id |

### 3.4 Serverless / Webhooks

- **Stripe webhook:** `POST /api/webhooks/stripe` (Next.js API route or Supabase Edge Function).  
  Actions: `customer.subscription.created/updated/deleted` → upsert `subscriptions`, set plan/status/current_period_end.

---

## 4. Full Functionality List

### By Module

**MODULE A — Authentication & Onboarding**  
- Register (email + password).  
- Login (email + password, optional magic link).  
- Email verification + password reset.  
- Role selection (Player / Coach / Club) after signup.  
- Onboarding wizard per role (steps: basic info → football info → media/visibility).  
- Profile completion score (computed from required fields) + prompts to complete.  
- Settings: email, password, notifications.  
- Privacy: visibility toggles, who can message.

**MODULE B — Profiles**  
- **Player:** Identity (name, age, nationality, city, languages). Football (position(s), foot, height/weight). Club status (current club, league level, contract/availability). Stats (season stats, achievements, awards). Media (highlight link, gallery, CV). Visibility (public/limited/premium_locked).  
- **Coach:** Experience timeline, certifications, preferred roles, languages, relocation, availability, media, references.  
- **Club:** Verified badge workflow (submit → admin approve). Club info (league, region, facilities). Recruitment focus + needs. Gallery. (Club staff accounts: optional later.)

**MODULE C — Discovery & Search**  
- Browse: players / coaches / clubs / jobs (tabs).  
- Filters: position, age, league level, region, availability, languages, preferred foot (players), role (coaches), verified (clubs).  
- Sort: best match, newest, active, rating.  
- Save search + alerts (optional MVP).  
- Favorites/shortlists (players, coaches, clubs, jobs).  
- Locked fields on free plan (contact/visibility rules).

**MODULE D — Jobs / Tryouts Board**  
- Club: create listing (role type, position, requirements, location, dates, notes); draft/publish.  
- Public jobs list (limited preview for non-auth).  
- Apply with one click (auth required).  
- Application pipeline: New → Reviewed → Shortlisted → Interview → Offer → Closed.  
- Club: internal notes + ratings on applicants; move status.

**MODULE E — Matching (Rule-Based MVP)**  
- Scoring rules: position, location, league level, availability, language.  
- Recommended feed: player/coach sees clubs/jobs; club sees players/coaches.  
- “Why matched” tags.  
- Actions: Save, Hide, Message.

**MODULE F — Messaging**  
- 1:1 chat: Player ↔ Club, Coach ↔ Club.  
- Free: limited new chats per week; Premium: unlimited.  
- Attachments: CV, images (optional MVP).  
- Block/report user.  
- Notifications: in-app + email.

**MODULE G — Dashboards by Role**  
- **Player:** Profile completion, recommended matches, application tracker, messages preview, saved jobs/clubs.  
- **Coach:** Recommended jobs/clubs, messages, applications.  
- **Club:** Listings, applicant pipeline (kanban), saved lists, recommended talents, verification status.

**MODULE H — Subscription & Billing**  
- Plans: Free, Premium (Player/Coach), Club (optional).  
- Paywall: Premium = full contact visibility, more filters, unlimited chats, boosted ranking.  
- Stripe Checkout + Customer Portal.  
- Invoices + cancellation.  
- Webhooks update `subscriptions` table.

**MODULE I — Admin Panel**  
- Users: list, search, ban (flag or disable).  
- Club verification: approve/reject.  
- Reports queue: list, resolve/dismiss.  
- Subscription overview.  
- Analytics: signups, conversions, active users, message counts.

**MODULE J — Multi-language**  
- English + German first.  
- Language switcher.  
- Content localized (i18n); German text-length safe UI.

### By Role

| Role | Main capabilities |
|------|-------------------|
| **Public** | Landing, pricing, browse preview (locked), job board preview, register/login. |
| **Player** | Full profile, discovery, apply to jobs, recommendations, messaging (within limits), dashboard, favorites, subscription. |
| **Coach** | Same as player where applicable; coach-specific profile and job types. |
| **Club** | Club profile, create/manage jobs, applicant pipeline, recommendations, messaging, verification request, subscription. |
| **Admin** | User management, verification, reports, analytics, subscription overview. |

---

## 5. UI/UX Screen Map

### 5.1 Public (no account)

| Screen | Mobile | Desktop | Notes |
|--------|--------|---------|-------|
| Landing | ✓ | ✓ | Hero, role CTAs (Player/Coach/Club), trust (testimonials/logos), how it works, KB logo top-left. |
| Pricing | ✓ | ✓ | Free vs Premium (and Club) comparison, CTA to sign up. |
| Browse preview | ✓ | ✓ | Teaser grid; key info locked, CTA to register. |
| Job board preview | ✓ | ✓ | List of published jobs (limited); apply requires login. |
| Login | ✓ | ✓ | Email/password, magic link option, link to register. |
| Register | ✓ | ✓ | Email, password, confirm; then role selection. |
| Forgot password | ✓ | ✓ | Email submit, success message. |

### 5.2 Auth & Onboarding

| Screen | Mobile | Desktop | Notes |
|--------|--------|---------|-------|
| Role selection | ✓ | ✓ | Cards: Player / Coach / Club. |
| Onboarding wizard | ✓ | ✓ | Multi-step (3–5 steps) per role; progress indicator. |
| Email verification | ✓ | ✓ | Message + resend link. |

### 5.3 App — Global

| Screen | Mobile | Desktop | Notes |
|--------|--------|---------|-------|
| App shell | ✓ | ✓ | Top bar: KB logo, nav (Discovery, Jobs, Messages, Favorites), notifications, profile menu. |
| Notifications panel | ✓ | ✓ | Dropdown or drawer; mark read, links to source. |
| Settings | ✓ | ✓ | Account, notifications, privacy, language. |
| Subscription / Billing | ✓ | ✓ | Current plan, upgrade, Stripe Customer Portal link. |

### 5.4 Discovery & Search

| Screen | Mobile | Desktop | Notes |
|--------|--------|---------|-------|
| Discovery home | ✓ | ✓ | Tabs: Players | Coaches | Clubs | Jobs. |
| Search + filters | ✓ | ✓ | Filter drawer/sheet (position, age, region, etc.); sort dropdown. |
| Results grid | ✓ | ✓ | FIFA-style cards (photo, position, age, club/region, rating badge). |
| Profile detail (player/coach/club) | ✓ | ✓ | Full profile; contact/locked sections per plan; Message / Save / Apply (context). |
| Job listing detail | ✓ | ✓ | Job info; Apply CTA; club snippet. |

### 5.5 Jobs & Applications

| Screen | Mobile | Desktop | Notes |
|--------|--------|---------|-------|
| Job board (full) | ✓ | ✓ | List/grid of jobs; filters. |
| Club: Create job | ✓ | ✓ | Multi-step form (type, position, location, dates, requirements, notes). |
| Club: My listings | ✓ | ✓ | List of jobs; edit, close, view applicants. |
| Club: Applicant pipeline | ✓ | ✓ | Kanban: New → Reviewed → Shortlisted → Interview → Offer → Closed. |
| Club: Applicant detail | ✓ | ✓ | Profile summary, notes, rating, status change. |
| Player/Coach: My applications | ✓ | ✓ | List with status; link to job. |

### 5.6 Messaging

| Screen | Mobile | Desktop | Notes |
|--------|--------|---------|-------|
| Inbox | ✓ | ✓ | Conversation list; last message preview; unread badge. |
| Chat | ✓ | ✓ | Thread view; send message; optional attachments; block/report. |

### 5.7 Dashboards

| Screen | Mobile | Desktop | Notes |
|--------|--------|---------|-------|
| Player dashboard | ✓ | ✓ | Profile completion meter, recommended matches, application tracker, messages preview, saved. |
| Coach dashboard | ✓ | ✓ | Recommended jobs/clubs, applications, messages. |
| Club dashboard | ✓ | ✓ | Listings overview, pipeline summary, recommended talents, verification status, saved. |

### 5.8 Favorites / Shortlists

| Screen | Mobile | Desktop | Notes |
|--------|--------|---------|-------|
| Favorites | ✓ | ✓ | Tabs or sections: Players, Coaches, Clubs, Jobs; card grid; remove. |

### 5.9 Admin

| Screen | Mobile | Desktop | Notes |
|--------|--------|---------|-------|
| Admin home | ✓ | ✓ | Links to users, verification, reports, analytics. |
| Users list | ✓ | ✓ | Search, filter by role, ban. |
| Club verification queue | ✓ | ✓ | List; approve/reject with reason. |
| Reports queue | ✓ | ✓ | List; resolve/dismiss. |
| Subscription overview | ✓ | ✓ | Counts by plan, revenue (from Stripe or DB). |
| Analytics | ✓ | ✓ | Signups, conversions, active users, messages (charts/tables). |

---

## 6. Components Library (FC25-Inspired)

### 6.1 Design Tokens (Tailwind)

- **Backgrounds:** Deep navy (`#0a0e17`, `#0f172a`), gradients to darker.  
- **Surfaces:** Charcoal/dark glass (`rgba(30,41,59,0.8)`), blur (backdrop-blur).  
- **Accents:** Metallic gold (`#c9a227`, `#d4af37`), gold-500/400 for hover glow.  
- **Text:** White (`#ffffff`), ice gray (`#94a3b8`, `#cbd5e1`).  
- **Borders:** Subtle slate/gold, low opacity.  
- **Shadows:** Soft shadows; gold glow on hover (shadow-gold).

### 6.2 Core Components

| Component | Usage | Style notes |
|-----------|--------|-------------|
| **Player/Coach/Club card** | Discovery grid, favorites, recommendations | Photo, position/role badge, age, club/region, rating chip; glass panel; gold border on hover. |
| **Rating badge** | Player/coach cards | Circular or pill; number 1–99; gold gradient. |
| **Header / Nav** | App shell | KB logo left; nav items; notifications icon; avatar + dropdown. |
| **Tabs** | Discovery (Players/Coaches/Clubs/Jobs) | Underline or pill; active state gold. |
| **Filter drawer** | Discovery, job board | Slide-over (mobile) or side panel (desktop); checkboxes, ranges, apply/reset. |
| **Badges** | Position, status, verified | Pill shape; position = color by role; verified = gold check. |
| **Buttons** | Primary CTA | Gold fill or outline; hover glow. |
| **Form inputs** | Onboarding, create job, settings | Dark bg, light border, gold focus ring. |
| **Kanban column** | Applicant pipeline | Column header (status); cards for applicants; drag or buttons to move. |
| **Message bubble** | Chat | Sent = gold tint; received = dark glass; timestamps. |
| **Empty states** | No results, no messages | Illustration or icon + short copy + CTA. |
| **Watermark** | Selected screens (e.g. profile, share) | KB shield logo, low opacity. |

### 6.3 Responsive Rules

- **Mobile:** Single column; bottom nav or hamburger; full-width cards; filter as bottom sheet.  
- **Desktop:** Sidebar or top nav; multi-column grids; filter as left/side drawer.  
- **Touch:** Large tap targets; swipe for inbox/notifications where appropriate.

---

## 7. Security Checklist (MVP)

- [ ] RLS on all tables; no public read/write without policy.  
- [ ] Admin role checked in RLS or app layer (e.g. `role = 'admin'`).  
- [ ] Stripe webhook: verify signature; idempotent upsert.  
- [ ] File upload: validate type/size; scan if needed (optional).  
- [ ] Rate limit: Supabase or Vercel (e.g. auth, messaging).  
- [ ] Sensitive fields (email, contact) only to permitted roles/plans.

---

*End of main specification. See `UI-MOCKUP-GENERATION-PROMPT.md` for the second deliverable.*
