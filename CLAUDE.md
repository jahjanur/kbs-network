# CLAUDE.md — KBs Football Network

## Project Overview

KBs Football Network is a premium professional platform connecting football players, coaches, scouts, clubs, and sponsors across Austria. Built with Next.js (App Router), React 19, TypeScript 5, TailwindCSS v4, Framer Motion 12, and next-themes.

---

## Tech Stack & Conventions

- **Framework:** Next.js 16 (App Router, `src/app/` directory)
- **UI:** React 19, TypeScript strict mode
- **Styling:** TailwindCSS v4 with CSS custom properties (`globals.css`)
- **Animations:** Framer Motion 12
- **Theme:** next-themes (class-based dark mode)
- **Components:** `src/components/` — reusable UI in `ui/`, landing sections in `landing/`
- **State:** React Query for server state
- **Dark mode fix:** TailwindCSS v4 requires `@variant dark (&:where(.dark, .dark *));` in globals.css

### Key Paths

- `src/app/globals.css` — Design system, CSS vars, keyframes
- `src/components/ui/` — Reusable primitives (Button, Input, etc.)
- `src/components/landing/` — Landing page sections
- `src/app/dashboard/` — Authenticated dashboard pages
- `src/app/providers.tsx` — ThemeProvider + React Query

---

## Development Workflow

Follow this structured workflow for every task:

### Step 1: Identify the Task Type

Before writing code, classify the task:
- **New feature** — Use the feature template mindset
- **Modify existing code** — Use the modify template mindset
- **Bug fix** — Use the bugfix template mindset
- **Optimization** — Profile first, then apply targeted fixes
- **Test generation** — Write tests that verify behavior, not implementation

### Step 2: Understand Context

- Read ALL relevant files before making changes
- Check `git diff` to understand recent changes
- Look at similar patterns in the codebase before creating new ones
- Understand the full call chain before modifying a function

### Step 3: Plan Before Coding

For non-trivial tasks:
- Write a clear task description
- List explicit requirements
- Identify constraints (no new deps, preserve existing behavior, etc.)
- Consider edge cases and failure modes

### Step 4: Implement with Quality

Apply the universal checklist and pattern checklist (below) during implementation.

### Step 5: Review & Verify

- Run `npm run build` to verify zero errors
- Apply the integrated review workflow
- Iterate if needed — refine based on results

---

## Universal Code Quality Checklist

Apply these checks to ALL code — generated or handwritten:

### 1. Single Responsibility

Every function must do ONE thing. If you can't explain it in one sentence, split it up.

### 2. Clear Naming

No `x`, `data`, `temp`, `val` in production code. Names must reveal intent. Six months from now, the name should still make sense.

### 3. Error Handling

- Validate at system boundaries (user input, external APIs, form submissions)
- Use try-catch for async operations that can fail
- Provide meaningful error messages
- Don't swallow errors silently

### 4. No Magic Numbers

Extract hard-coded values into named constants. Every number and string literal in logic should have a name that explains its purpose.

### 5. Minimal Nesting

Max 3 levels of nesting. Use early returns, guard clauses, and extracted functions to flatten logic.

### 6. No Copy-Paste

If code appears in 2+ places, extract it. DRY — but don't create premature abstractions for one-time operations.

---

## AI Pattern Checklist

Apply these checks specifically when reviewing AI-generated or AI-assisted code:

### Pattern 1: Context Gap Check

- Compare before/after using git diff
- Verify ALL original functionality is preserved
- Check that new features integrate with existing operations
- Confirm business logic completeness
- Ask: What did the original code do? What does the new code do? What's missing?

### Pattern 2: Phantom Dependency Check

- Verify every import exists in the actual package.json
- Check that libraries are actively maintained
- Confirm using current, non-deprecated imports
- Validate function signatures match current documentation
- Red flags: "pro", "advanced", "fast", "optimized", "enhanced" in library names

### Pattern 3: Over-Engineering Check

- Does the complexity match the problem scope?
- Is this design pattern necessary for current requirements?
- Would simpler code achieve the same goal?
- Are we building for hypothetical future needs?
- YAGNI: "You Aren't Gonna Need It" — Don't add complexity until actually required

### Pattern 4: Test Theater Check

- Do tests interact with real systems (databases, APIs, files)?
- Are failure cases tested, not just happy paths?
- Do tests verify behavior, not implementation details?
- Are edge conditions and integration points covered?
- Ask: What would happen if this test passed but the feature was broken?

### Pattern 5: Architectural Mismatch Check

- Does code follow existing patterns in this codebase?
- Does it use established conventions (App Router, CSS vars, Framer Motion)?
- Does it integrate with the architecture (component structure, providers)?
- Does it match the tech stack and framework usage?
- Compare: Look at similar features — does the new code follow the same patterns?

---

## Integrated Review Workflow

For every code change, run this 3-step review:

### Step 1: Universal Review

- [ ] Structure & Organization — single responsibility, minimal nesting
- [ ] Naming & Clarity — all names reveal intent
- [ ] Error Handling — boundaries validated, async errors caught
- [ ] Testability — functions are pure where possible, side effects isolated

### Step 2: AI Pattern Review

- [ ] Context Gap — no lost functionality, full integration
- [ ] Phantom Dependencies — all imports verified
- [ ] Over-Engineering — complexity matches the problem
- [ ] Test Theater — tests verify real behavior
- [ ] Architectural Mismatch — follows codebase conventions

### Step 3: Decision

- **Accept:** Code passes both reviews
- **Modify:** Code has fixable issues — fix them before proceeding
- **Reject:** Code has fundamental problems — rethink the approach

---

## Task Templates

### New Feature Thinking

When implementing a new feature, think through:
1. What is the clear feature description?
2. What system context is relevant (architecture, tech stack)?
3. What specific functionality is needed?
4. What similar features exist in the codebase to follow as patterns?
5. What constraints apply (allowed libraries, code standards, integration points)?
6. What are the key engineering decisions and edge cases?

### Modifying Existing Code Thinking

When modifying existing code, think through:
1. What modification is needed?
2. What is the complete current implementation? (READ IT FIRST)
3. What new functionality needs to be added?
4. What existing functionality MUST be preserved? (List explicitly)
5. Constraints: No unnecessary signature changes, no new dependencies unless required

### Bug Fix Thinking

When fixing a bug, think through:
1. What is the specific bug? What symptoms are observed?
2. What is the expected behavior?
3. What is the relevant system state?
4. What could cause this symptom? (List hypotheses)
5. How to verify the fix? (Test approach)
6. Fix the root cause, not symptoms
7. Add a test case to prevent regression
8. Maintain all existing functionality

---

## Tips

- Think through the problem, edge cases, and everything you want the solution to do BEFORE writing code
- Use the templates as starting points — adapt them to the specific task
- When in doubt, read more code before writing any
- Always run `npm run build` after changes to catch errors early

---

## Project-Specific Rules

- Use CSS custom properties (`var(--gold)`, `var(--foreground)`, etc.) — never hardcode colors
- Use Framer Motion for animations — no raw CSS transitions for complex animations
- Follow glass-card / gradient-border-card patterns for card components
- Austria map SVG paths use province codes AT1-AT9
- Button component uses CVA (class-variance-authority) for variants
- All landing sections are in `src/components/landing/` and composed in `landing-content.tsx`
- Theme-aware assets: use conditional rendering based on theme, not CSS media queries
