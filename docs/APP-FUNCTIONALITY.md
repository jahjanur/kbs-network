# KBs Football Network — Detailed App Functionality

This document describes **in detail** what the application does: every screen, every user role, and every feature. It covers both what is **implemented in the current MVP** (localStorage-based) and what is **planned** in the full specification (Supabase, Stripe, etc.).

---

## 1. Overview

**KBs Football Network** is a football networking platform that connects:

- **Players** — showcase profile and get discovered by clubs and scouts  
- **Coaches** — share experience and find club roles  
- **Clubs** — post jobs, scout talent, manage applications  
- **Scouts** — discover and track talent, build shortlists for clubs  

**Design:** FIFA/EA FC 25 career-mode inspired; premium dark navy + metallic gold; Apple-inspired UI with animations, ambient backgrounds, and smooth transitions.

**MVP state:** Auth and profile data are stored in the browser (localStorage). No backend yet. Full spec uses Supabase (Auth, Postgres, Storage, Realtime) and Stripe for payments.

---

## 2. User Roles

| Role    | Who uses it | Main goal |
|---------|-------------|-----------|
| **Public** | Visitor, no account | Browse landing, pricing, preview discover/jobs; sign up or log in |
| **Player** | Football player | Get discovered, apply to jobs/tryouts, message clubs |
| **Coach** | Coach / staff | Find coaching jobs, get in touch with clubs |
| **Club** | Club / academy | Recruit players and coaches, post jobs, manage applicants |
| **Scout** | Scout (club/agency/independent) | Find and track players, build shortlists, report to clubs |
| **Admin** | Platform admin | (Planned) Manage users, verify clubs, handle reports |

---

## 3. Public (No Account) — What You Can Do

### 3.1 Landing Page (`/`)

- **Hero:** Headline “Where Players, Coaches & Clubs Connect” with gradient gold accents; short value proposition; two CTAs: “Get started free” and “Browse talent”.
- **Join as:** Four cards — **Player**, **Coach**, **Club**, **Scout**. Each has icon, title, short description, and “Sign up as [Role] →”. Clicking a card goes to **Register** (with optional `?role=...` in URL).
- **How it works:** Three steps — (1) Create your profile, (2) Get matched, (3) Connect & hire. Simple copy and step numbers.
- **Trust:** Three points — Verified clubs, Smart matching, Premium experience (with icons).
- **CTA block:** “Ready to get in the game?” with “Create free account” button.
- **Footer:** Year, “Pricing”, “Log in”.
- **Header (global):** KB logo, Discover, Jobs, Pricing, theme toggle (light/dark), Log in, Get started.

**Implemented:** Full layout, animations, ambient background, responsive. No backend.

### 3.2 Pricing (`/pricing`)

- **Three plans:**
  - **Free** — €0 forever: profile, browse, limited apply, basic search, 3 new chats/week.
  - **Premium** — €9/month (highlighted): full contact visibility, unlimited chats, advanced filters, boosted ranking, priority support.
  - **Club** — €29/month: everything in Premium + post jobs, applicant pipeline, verified badge, (later) team accounts.
- Each plan: name, short description, price, feature list, CTA (Get started / Upgrade / Contact).
- **Implemented:** Static content; CTAs link to register. No Stripe yet.

### 3.3 Discover Preview (`/discover`)

- **Tabs:** Players | Coaches | Clubs | Jobs (animated underline).
- **Search:** Text input (name, position, region); **Filters** button opens a placeholder panel.
- **Players tab:** Grid of **FIFA-style player cards** (mock data): photo area, position badge, age, club/region, **rating badge** (e.g. 78). Cards have hover lift and gold glow.
- **Other tabs:** Placeholder “Coming soon” with short message.
- **Implemented:** Mock players, search filter by name/position/region, tabs, filter drawer (UI only). No real DB.

### 3.4 Job Board Preview (`/jobs`)

- Title and short description: “Browse open positions and tryouts. Sign in to apply.”
- Empty state: “Job listings will appear here. Clubs can post from their dashboard.” + “Sign up to get started”.
- **Implemented:** Static page. Real jobs will come from clubs when backend exists.

---

## 4. Authentication & Onboarding — In Detail

### 4.1 Register (`/register`)

- **Form fields:** Email, Password, Confirm password.
- **Validation:** Email format; password min 8 characters; passwords must match (Zod + React Hook Form).
- **Submit:** Currently stores nothing in backend; **redirects to Role selection** (`/register/role`).
- **Link:** “Already have an account? Log in”.

**Implemented:** Full form, validation, redirect. No Supabase sign-up yet.

### 4.2 Role Selection (`/register/role`)

- **Four options:** Player, Coach, Club, Scout. Each is a card with icon, title, description, “Continue as [Role] →”.
- **On click:**  
  - Saves chosen **role** in localStorage (`kbs_role`).  
  - Navigates to **role-specific onboarding**: `/onboarding/player`, `/onboarding/coach`, `/onboarding/club`, or `/onboarding/scout`.
- **Back:** “← Back” goes to previous page (register).

**Implemented:** All four roles; localStorage; navigation to correct onboarding.

### 4.3 Onboarding — Player (`/onboarding/player`)

Multi-step wizard; progress bar at top; “Step X of 4: [Step name]”.

- **Step 1 — Basic info:**  
  Full name, Age, Nationality, City, Country.  
  **Next** → Step 2.

- **Step 2 — Football details:**  
  Primary position (dropdown: ST, CF, LW, RW, CAM, CM, CDM, LB, RB, CB, GK), Other positions (multi-select chips), Preferred foot (Left/Right/Both), Height (cm), Weight (kg).  
  **Back** / **Next**.

- **Step 3 — Club & availability:**  
  Current club (optional), League level (Youth / Amateur / Semi-pro / Professional / Top tier), Availability (e.g. Available now, End of season), Languages (add/remove tags), Short bio (textarea).  
  **Back** / **Next**.

- **Step 4 — Media & finish:**  
  Highlight video URL (optional). Short note: “You can add more photos and documents later from your profile.”  
  **Back** / **Complete profile**.

**On “Complete profile”:**  
- Full **Player profile** object is saved to localStorage (`kbs_profile`).  
- Onboarding completion flag set (`kbs_onboarding_done` = true).  
- **Redirect to Dashboard** (`/dashboard`), which then sends the user to `/dashboard/player`.

**Implemented:** All steps, validation, localStorage, redirect.

### 4.4 Onboarding — Coach (`/onboarding/coach`)

- **Step 1 — Basic info:** Name, City, Country.  
- **Step 2 — Experience & certifications:** Years of experience, Certifications (e.g. UEFA A; add/remove), Preferred roles (Head coach, Assistant, Youth, GK coach, Fitness coach — multi-select).  
- **Step 3 — Preferences & availability:** Availability dropdown, Languages (add/remove), “Open to relocation” checkbox, Short bio.  
- **Step 4 — Finish:** Short review note; **Complete profile**.

**On complete:** Same as player — profile saved, onboarding flag set, redirect to `/dashboard` → `/dashboard/coach`.

**Implemented:** Full flow.

### 4.5 Onboarding — Club (`/onboarding/club`)

- **Step 1 — Club info:** Club name, League, Region, Country.  
- **Step 2 — About & facilities:** Website (optional), About the club (textarea), Facilities (optional).  
- **Step 3 — Recruitment focus:** Multi-select: First team, Youth academy, Women’s team, Goalkeepers, Coaching staff, Scouts.  
- **Step 4 — Finish:** Note that verified badge and job posting come from dashboard; **Complete profile**.

**On complete:** Profile saved, redirect to `/dashboard` → `/dashboard/club`.

**Implemented:** Full flow.

### 4.6 Onboarding — Scout (`/onboarding/scout`)

- **Step 1 — Basic info:** Full name, Affiliation (club, agency, or independent).  
- **Step 2 — Regions & leagues:** Regions you cover (add/remove tags), Leagues you follow (add/remove).  
- **Step 3 — What you’re looking for:** Positions (same as player positions — multi-select), Age range (min and max), Notes (optional).  
- **Step 4 — Finish:** Note about shortlists from dashboard; **Complete profile**.

**On complete:** Profile saved, redirect to `/dashboard` → `/dashboard/scout`.

**Implemented:** Full flow.

### 4.7 Login (`/login`)

- **Form:** Email, Password; optional “Remember me”; “Forgot password?” link.
- **Submit:** In MVP, **redirects to `/dashboard`**. Dashboard layout checks localStorage: if no role or onboarding not done, user is sent to `/register/role`. So “login” effectively means “go to app” (session is client-side only).
- **Planned:** Supabase sign-in; then redirect to dashboard with real session.

**Implemented:** Form, validation, redirect to dashboard.

### 4.8 Forgot Password (`/forgot-password`)

- **Form:** Email only.
- **Submit:** Shows a demo message: “Check your email for the reset link. (Demo: not sent).”
- **Planned:** Supabase `resetPasswordForEmail`; real email via Resend or Supabase.

**Implemented:** UI and copy only.

---

## 5. App Shell (After Login / Onboarding)

Once the user has a **role** and **onboarding completed** (stored in localStorage), they use the **dashboard layout**.

### 5.1 Dashboard Layout (Shared)

- **Header:**  
  - KB logo (→ home/dashboard).  
  - Nav links: **Dashboard**, **Discover**, **Jobs**, **Messages**, **Favorites**, **Profile**.  
  - Theme toggle, **role badge** (e.g. “player”), **Log out** (clears localStorage and redirects to `/`).
- **Access control:** If `kbs_role` or `kbs_onboarding_done` is missing, user is **redirected to `/register/role`**.
- **Main area:** Renders the current page (dashboard home, discover, jobs, messages, favorites, profile, or club sub-pages).

**Implemented:** Layout, nav, role badge, logout, redirect guard.

### 5.2 Dashboard Home (`/dashboard`)

- **Behavior:** Redirects to role-specific dashboard:  
  `/dashboard/player`, `/dashboard/coach`, `/dashboard/club`, or `/dashboard/scout` (based on `kbs_role`).
- If no role, redirects to `/register/role`.

**Implemented:** Redirect logic only.

---

## 6. Player — Detailed Functionality

### 6.1 Player Dashboard (`/dashboard/player`)

- **Welcome:** “Welcome back, [First name]” (from stored profile).
- **Profile completion:**  
  - Block with icon, “Profile completion”, short description.  
  - Progress bar (percentage). Percentage is derived from how many of (name, position, city, country, availability/league level) are filled.  
  - **Edit profile** button → `/dashboard/profile`.
- **Recommended for you:**  
  - Section title + “View all” → Discover.  
  - Up to three **recommended items** (mock): e.g. “FC North Academy” (Club), “Youth League Tryouts” (Job), “United South” (Club), each with a short “match” reason (e.g. “Position & region”).  
  - **Planned:** Real recommendations from matching logic (position, location, level, etc.).
- **My applications:**  
  - “No applications yet” empty state + **Find jobs** → `/jobs`.  
  - **Planned:** List of applications with status (New, Reviewed, Shortlisted, Interview, Offer, Closed).
- **Quick links:** Two cards — **Messages** (→ `/dashboard/messages`), **Favorites** (→ `/dashboard/favorites`).

**Implemented:** All sections; recommendations and applications are mock/empty. Profile completion uses stored profile.

### 6.2 Player Profile Edit (`/dashboard/profile` when role = player)

- **Form sections (single page):**  
  Name, Age, City, Country, Primary position, Preferred foot, Current club, League level, Bio, Highlight video URL.
- **Actions:** Cancel (→ dashboard), **Save changes** (writes profile to localStorage and shows “Saved!”).
- **Planned:** Photo upload, secondary positions, height/weight, availability, languages, visibility settings; sync with Supabase.

**Implemented:** All fields listed above; save to localStorage.

---

## 7. Coach — Detailed Functionality

### 7.1 Coach Dashboard (`/dashboard/coach`)

- **Welcome:** “Welcome back, [First name]”.
- **Profile completion:** Same idea as player (block + bar + Edit profile).
- **Recommended jobs:** Section with mock coaching jobs (e.g. Youth Head Coach at FC North Academy, Assistant Coach at United South). “View all” → Jobs.
- **My applications:** Empty state + “Find coaching jobs”.
- **Quick links:** Messages, Favorites.

**Implemented:** Structure and mock data; no real jobs or applications.

### 7.2 Coach Profile Edit (`/dashboard/profile` when role = coach)

- **Fields:** Name, City, Country, Years of experience, Bio.
- **Planned:** Certifications, preferred roles, languages, relocation, availability, visibility.

**Implemented:** Listed fields; save to localStorage.

---

## 8. Club — Detailed Functionality

### 8.1 Club Dashboard (`/dashboard/club`)

- **Title:** “[Club name] dashboard” (from stored profile).
- **Stats row (four blocks):**  
  - **Active listings:** 0 + “Post a job” → `/dashboard/club/jobs`.  
  - **Applicants:** 0 + “View pipeline” → `/dashboard/club/applicants`.  
  - **Messages:** 0.  
  - **Verification:** “Not verified” + “Request badge” (button does nothing in MVP).
- **Recommended talent:** Empty state: “Recommendations will appear here based on your club profile” + “Browse players & coaches” → Discover.
- **Quick actions:**  
  - **Post a job** → `/dashboard/club/jobs`.  
  - **Edit club profile** → `/dashboard/profile`.

**Implemented:** All blocks and links; counts are 0; verification is UI only.

### 8.2 Club — Job Listings (`/dashboard/club/jobs`)

- **Header:** “Job listings” + **Post a job** button (no action yet).
- **Content:** Empty state: “No job listings yet” + “Post player or coach vacancies to receive applications” + “Create your first listing”.
- **Planned:** List of draft/published/closed jobs; create/edit form (role type, position, location, dates, requirements); publish/close actions; Supabase `jobs` table.

**Implemented:** Page and empty state only.

### 8.3 Club — Applicant Pipeline (`/dashboard/club/applicants`)

- **Header:** “Applicant pipeline” + short description of stages: New → Reviewed → Shortlisted → Interview → Offer → Closed.
- **Content:** Empty state: “No applicants yet” + “When you post a job, applications will appear here in a kanban board” + “Post a job”.
- **Planned:** Kanban columns; drag or buttons to move applicants; internal notes and ratings; Supabase `applications` table.

**Implemented:** Page and copy only.

### 8.4 Club Profile Edit (`/dashboard/profile` when role = club)

- **Fields:** Club name, League, Region, Country, Website, About the club.
- **Planned:** Facilities, recruitment focus, verification request; media.

**Implemented:** Listed fields; save to localStorage.

---

## 9. Scout — Detailed Functionality

### 9.1 Scout Dashboard (`/dashboard/scout`)

- **Welcome:** “Welcome back, [First name]”.
- **Shortlist:** Empty state: “Players you’ve saved for reports and tracking” + “Browse players” → Discover.  
  **Planned:** List of shortlisted players; remove; optional notes/ratings.
- **Saved searches:** Empty state: “Get alerts when new talent matches your criteria” + note that saving a search from Discover will create alerts.  
  **Planned:** List of saved filters; alerts (email/in-app).
- **Quick links:** **Favorites** (saved players/clubs), **Scout profile** (→ `/dashboard/profile`).

**Implemented:** Sections and links; shortlist and saved searches are empty/planned.

### 9.2 Scout Profile Edit (`/dashboard/profile` when role = scout)

- **Fields:** Name, Affiliation, Age range (min, max), Notes.
- **Planned:** Regions of interest, leagues of interest, positions; sync with Supabase.

**Implemented:** Listed fields; save to localStorage.

---

## 10. Shared App Pages (All Roles)

### 10.1 Discover (`/discover`)

- Same as public discover: tabs (Players, Coaches, Clubs, Jobs), search, filter button, player grid with mock data.
- **Planned (logged-in):** Save/favorite profiles and jobs; see contact details if Premium; “Message” / “Apply” from card; real data from Supabase; matching scores.

**Implemented:** Same UI as public; no extra actions yet.

### 10.2 Jobs (`/jobs`)

- Same as public: title, short description, empty state, “Sign up to get started” (or for logged-in users, “Browse jobs”).
- **Planned:** List of published jobs; filters; one-click apply; application status in dashboard.

**Implemented:** Static/empty.

### 10.3 Messages (`/dashboard/messages`)

- **Content:** Empty state: “No conversations yet” + “When you message a club or get messaged, it will appear here” + “Discover players & clubs”.
- **Planned:** Conversation list; open thread; send/receive messages; attachments (e.g. CV, images); read receipts; Supabase Realtime; limits by plan (e.g. free: 3 new chats/week).

**Implemented:** Page and copy only.

### 10.4 Favorites (`/dashboard/favorites`)

- **Content:** Empty state: “No saved items yet” + “Save players, coaches, clubs, or jobs from Discover or the job board” + “Discover”.
- **Planned:** Tabs or sections (Players, Coaches, Clubs, Jobs); add/remove favorites; sync with Supabase `favorites` table.

**Implemented:** Page and copy only.

### 10.5 Profile (`/dashboard/profile`)

- **Behavior:** Redirects to role-specific edit if no profile; otherwise shows **Edit profile** form for current role (Player, Coach, Club, or Scout) with fields as described in sections 6.2, 7.2, 8.4, 9.2.
- **Actions:** Cancel (→ dashboard), Save changes (localStorage + “Saved!”).
- **Planned:** Avatar and media upload (Supabase Storage); visibility; public profile view (e.g. `/profile/[id]`).

**Implemented:** Role-based form and localStorage save.

---

## 11. Theme & Accessibility

- **Light/Dark mode:** Toggle in header (and auth layout). Uses `next-themes`; preference stored in localStorage; respects system preference by default.
- **Light theme:** White/near-white background, navy/dark blue for primary buttons and surfaces, gold for accents and highlights.
- **Dark theme:** Deep navy background, gold accents; same structure.
- **Implemented:** Full theme switch; CSS variables and components updated for both themes.

---

## 12. Data & Session (MVP vs Planned)

### 12.1 Current MVP (localStorage)

- **`kbs_role`:** `"player"` | `"coach"` | `"club"` | `"scout"`.
- **`kbs_onboarding_done`:** `"true"` when user has completed onboarding.
- **`kbs_profile`:** JSON string of one of `PlayerProfile` | `CoachProfile` | `ClubProfile` | `ScoutProfile` (see `src/lib/user-store.ts` for exact fields).
- **Log out:** Clears these three keys and redirects to `/`.
- No server; no persistence across devices or browsers.

### 12.2 Planned (Supabase + Stripe)

- **Auth:** Supabase Auth (email/password, magic link); session and refresh.
- **Database:** Tables for users, profiles (player/coach/club), jobs, applications, favorites, conversations, messages, reports, subscriptions, notifications (see `docs/SPECIFICATION.md`).
- **Storage:** Avatars, gallery, documents (Supabase Storage).
- **Realtime:** Chat and notifications (Supabase Realtime).
- **Payments:** Stripe subscriptions (Free / Premium / Club); webhooks to update subscription status.
- **Email:** Verification, password reset, notifications (e.g. Resend or Supabase).

---

## 13. Summary Table — What Works Today

| Feature | Implemented | Notes |
|--------|-------------|--------|
| Landing, Pricing, Discover (preview), Jobs (preview) | ✅ | Full UI; Discover has mock players |
| Register, Login, Forgot password (UI) | ✅ | No backend auth |
| Role selection (Player, Coach, Club, Scout) | ✅ | Saves role; goes to onboarding |
| Onboarding (all 4 roles) | ✅ | Multi-step; saves profile to localStorage |
| Dashboard layout & redirect by role | ✅ | Guard: no role → register/role |
| Player / Coach / Club / Scout dashboards | ✅ | Mock recommendations; empty applications/shortlist |
| Profile edit (all 4 roles) | ✅ | Role-specific fields; save to localStorage |
| Club: Job listings page | ✅ | Empty state only |
| Club: Applicant pipeline page | ✅ | Empty state only |
| Messages, Favorites | ✅ | Empty states only |
| Theme (light/dark) | ✅ | next-themes |
| Log out | ✅ | Clears localStorage; redirect to / |
| Real auth, DB, jobs, applications, chat, payments | ❌ | Spec in SPECIFICATION.md |

This is the **detailed functionality** of the app as built and as planned.
