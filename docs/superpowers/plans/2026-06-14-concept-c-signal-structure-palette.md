# Concept C — Signal & Structure Palette Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the Concept C hybrid/neo-brutalist color system (alternating light/dark editorial zones + electric blue accent) by changing CSS tokens and zone wrappers only — no layout, grid, padding, or animation logic changes.

**Architecture:** Light Zone tokens become the default on `:root`. A `.dark-zone` class re-scopes CSS custom properties for dark sections. Legacy aliases (`--bg`, `--text`, `--accent-raw`, `--border-custom`, `--text-muted`) are kept in sync so existing components inherit new colors without JSX edits. Section alternation is applied via wrapper `<div>`s in `page.tsx` (and one permanent dark wrapper on `Navigation`). The global light/dark theme toggle is retired because it conflicts with fixed editorial rhythm.

**Tech Stack:** Next.js (App Router), Tailwind CSS v4, CSS custom properties, GSAP/Framer Motion (unchanged), existing section components.

---

## Critical Constraints

| Rule | Meaning |
|------|---------|
| Paint only | Change colors/tokens/wrapper classes — not structure |
| No GSAP edits | Do not touch ScrollTrigger configs, timelines, durations, or triggers |
| No layout edits | Do not change grid, flex, padding, margin, or component DOM hierarchy inside sections |
| Token compatibility | `--bg` mirrors `--background`; `--text` mirrors `--foreground`; `--accent-raw` mirrors `--primary` |
| Marquee inheritance | Marquees must live inside a zone wrapper so `var(--text)` resolves correctly |

---

## Current State (Discovery)

| Item | Location | Detail |
|------|----------|--------|
| Default tokens | `src/app/globals.css` lines 125–164 | Dark-first warm palette (`--bg: #0d0d0d`, `--accent-raw: #038c7f`) |
| Light override | `globals.css` lines 169–197 | `.light` class on `<html>` from `ThemeProvider` |
| Body paint | `globals.css` line 270 | `background-color: var(--bg)` |
| Page sections | `src/app/page.tsx` | Hero → 6 marquees + 7 sections → Footer (flat, no zone wrappers) |
| Marquee stroke | `globals.css` lines 949–958 | Already uses `var(--text)` — zone-aware once parent wrapper exists |
| Accent usage | 15+ component files | All reference `var(--accent-raw)` — aliasing to `--primary` avoids mass JSX edits |
| Hardcoded teal | `src/components/sections/skills-section.tsx` lines 31, 42, 118, 129 | `rgba(3, 140, 127, …)` and `rgba(242, 231, 220, …)` |
| Theme toggle | `theme-provider.tsx`, `floating-theme-toggle.tsx`, hero + nav | Global `html.dark` / `html.light` — conflicts with Concept C |
| Mesh gradient | `src/components/background/mesh-gradient.tsx` | Warm brown/cream WebGL colors tied to theme toggle |
| `.light` scoped rules | `globals.css` lines 719, 896, 969 | Contact hover, mobile drawer, skill blocks |
| HTML default | `src/app/layout.tsx` line 68 | `className="dark"` on `<html>` |
| Viewport | `layout.tsx` line 63 | `themeColor: "#0D0D0D"` |

---

## Target Section Rhythm

| Page block | Zone class | Wrapper contents |
|------------|------------|------------------|
| Hero | *(none — inherits `:root` light)* | `<HeroSection />` |
| About band | `dark-zone` | `<SectionMarquee text="ABOUT" />` + `<AboutSection />` |
| Skills band | *(light — default)* | `<SectionMarquee text="SKILLS" />` + `<SkillsSection />` |
| Work band | `dark-zone` | `<SectionMarquee text="WORK" />` + `<ProjectsSection />` |
| Experience band | *(light)* | `<SectionMarquee text="EXPERIENCE" />` + `<ExperienceSection />` |
| Education band | `dark-zone` | `<SectionMarquee text="EDUCATION" />` + `<EducationSection />` |
| Contact band | *(light)* | `<SectionMarquee text="GET IN TOUCH" />` + `<ContactSection />` |
| Footer | `dark-zone` | `<FooterSection />` |
| Navigation | `dark-zone` *(permanent)* | Fixed nav always dark glass — readable over both zones |
| Loading screen | *(light — inherits `:root`)* | No change needed |

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/globals.css` | Modify | Light `:root` tokens, `.dark-zone` overrides, retire `.light`, update zone-aware rules |
| `src/app/page.tsx` | Modify | Zone wrapper `<div>`s around marquee+section pairs |
| `src/app/layout.tsx` | Modify | Remove `dark` from `<html>`, update `themeColor` |
| `src/components/layout/navigation.tsx` | Modify | Add permanent `dark-zone` class on outer wrapper |
| `src/components/background/mesh-gradient.tsx` | Modify | Neutral gray palette, decouple from theme toggle |
| `src/components/ui/floating-theme-toggle.tsx` | Modify | Hide toggle (CSS `display: none` or remove render) |
| `src/components/sections/skills-section.tsx` | Modify | Replace hardcoded teal/cream rgba with blue/neutral rgba |
| `src/components/providers/theme-provider.tsx` | Modify | Pin theme to `"light"` / no-op toggle (keeps provider API intact for hero/nav imports) |

**No changes:** Section component files (about, project, contact, etc.), GSAP logic, marquee animation keyframes, grid/padding classes.

---

### Task 1: Replace `:root` tokens with Light Zone (Concept C)

**Files:**
- Modify: `src/app/globals.css:122–164`

- [ ] **Step 1: Update the `:root` design token block**

Replace the existing `:root` block (lines 125–164) with:

```css
:root {
  /* ── Concept C — Light Zone (default) ── */
  --background: #F4F4F5;
  --foreground: #0A0A0A;
  --card: #FFFFFF;
  --card-foreground: #0A0A0A;
  --popover: #FFFFFF;
  --popover-foreground: #0A0A0A;
  --primary: #2563EB;
  --primary-foreground: #FAFAFA;
  --secondary: #E4E4E7;
  --secondary-foreground: #0A0A0A;
  --muted: #E4E4E7;
  --muted-foreground: #737373;
  --accent: #2563EB;
  --accent-foreground: #FAFAFA;
  --destructive: hsl(0 84% 60%);
  --destructive-foreground: #FFFFFF;
  --border: #D4D4D4;
  --input: #D4D4D4;
  --ring: #2563EB;
  --radius: 0.625rem;

  /* Legacy aliases — keep components working */
  --bg: #F4F4F5;
  --text: #0A0A0A;
  --accent-raw: #2563EB;
  --surface: rgba(10, 10, 10, 0.04);
  --border-custom: #D4D4D4;
  --text-muted: #737373;
  --accent-glow: rgba(37, 99, 235, 0.15);

  /* Responsive typography sizes — UNCHANGED */
  --text-display: clamp(2.5rem, 5.5vw, 5.5rem);
  --text-heading: clamp(1.75rem, 3.5vw, 3rem);
  --text-subheading: clamp(1.375rem, 2.2vw, 2rem);
  --text-body-lg: clamp(1.125rem, 1.6vw, 1.5rem);
  --text-body: clamp(1rem, 1.3vw, 1.25rem);
  --text-body-sm: clamp(0.875rem, 1vw, 1.0625rem);
  --text-label: clamp(0.6875rem, 0.8vw, 0.8125rem);
  --text-micro: clamp(0.625rem, 0.7vw, 0.8125rem);
}
```

- [ ] **Step 2: Update section header comment**

Change line 123 comment from `Design Tokens — Dark Mode (Default)` to `Design Tokens — Light Zone (Default)`.

- [ ] **Step 3: Verify dev server compiles**

Run: `npm run dev`
Expected: No CSS parse errors; page loads with light gray background.

---

### Task 2: Add `.dark-zone` utility class

**Files:**
- Modify: `src/app/globals.css` (insert after `:root` block, before typography scale media query)

- [ ] **Step 1: Add the dark zone token override block**

```css
/* ───────────────────────────────────────────
   Design Tokens — Dark Zone
   Apply to alternating sections for editorial rhythm.
   ─────────────────────────────────────────── */
.dark-zone {
  --background: #0A0A0A;
  --foreground: #FAFAFA;
  --card: #141414;
  --card-foreground: #FAFAFA;
  --popover: #141414;
  --popover-foreground: #FAFAFA;
  --primary: #3B82F6;
  --primary-foreground: #FAFAFA;
  --secondary: #1A1A1A;
  --secondary-foreground: #FAFAFA;
  --muted: #1A1A1A;
  --muted-foreground: #A3A3A3;
  --accent: #3B82F6;
  --accent-foreground: #FAFAFA;
  --border: #262626;
  --input: #262626;
  --ring: #3B82F6;

  --bg: #0A0A0A;
  --text: #FAFAFA;
  --accent-raw: #3B82F6;
  --surface: rgba(250, 250, 250, 0.06);
  --border-custom: #262626;
  --text-muted: #A3A3A3;
  --accent-glow: rgba(59, 130, 246, 0.15);

  background-color: var(--bg);
  color: var(--text);
}
```

- [ ] **Step 2: Add light zone surface helper (optional explicit bg on light bands)**

Insert immediately after `.dark-zone`:

```css
.light-zone {
  background-color: var(--bg);
  color: var(--text);
}
```

Rationale: Light sections on a page with mesh gradient need an explicit opaque background so the gradient doesn't bleed through inconsistently.

---

### Task 3: Retire global `.light` theme overrides

**Files:**
- Modify: `src/app/globals.css:169–197, 719, 896, 969`

- [ ] **Step 1: Delete the entire `.light { … }` token block** (lines 169–197)

Concept C replaces user-toggle light mode with fixed zone alternation.

- [ ] **Step 2: Replace `.light .contact-field:hover` with zone-aware rule**

Delete:
```css
.light .contact-field:hover:not(:focus) {
  border-color: rgba(43, 30, 23, 0.18);
}
```

Replace the default `.contact-field:hover:not(:focus)` rule (line 715–717) with:
```css
.contact-field:hover:not(:focus) {
  border-color: color-mix(in srgb, var(--border-custom) 80%, var(--text) 20%);
}
```

Delete the old dark-only hover rule that used warm rgba.

- [ ] **Step 3: Replace `.light .mobile-drawer` rule**

Delete `.light .mobile-drawer` block. Update `.mobile-drawer` to:
```css
.mobile-drawer {
  background-color: color-mix(in srgb, var(--bg) 92%, transparent);
  border-left: 1px solid var(--border-custom);
}
```

Navigation is permanently `dark-zone`, so drawer inherits dark tokens automatically.

- [ ] **Step 4: Replace `.light .skill-block` rule**

Delete:
```css
.light .skill-block {
  background-color: rgba(13, 13, 13, 0.05) !important;
}
```

Add zone-aware defaults in the Skills block section:
```css
.skill-block {
  background-color: rgba(10, 10, 10, 0.04);
}

.dark-zone .skill-block {
  background-color: rgba(250, 250, 250, 0.04);
}
```

---

### Task 4: Apply section alternation in `page.tsx`

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Wrap Hero in light-zone**

```tsx
<div className="light-zone">
  <HeroSection revealed={heroRevealed} onReady={handleHeroReady} />
</div>
```

- [ ] **Step 2: Wrap alternating bands**

Replace the flat section list (lines 45–81) with:

```tsx
{/* ─── About (Dark) ─── */}
<div className="dark-zone">
  <SectionMarquee text="ABOUT" direction="left" speed={22} />
  <AboutSection />
</div>

{/* ─── Skills (Light) ─── */}
<div className="light-zone">
  <SectionMarquee text="SKILLS" direction="right" speed={18} />
  <SkillsSection />
</div>

{/* ─── Work (Dark) ─── */}
<div className="dark-zone">
  <SectionMarquee text="WORK" direction="left" speed={16} />
  <ProjectsSection />
</div>

{/* ─── Experience (Light) ─── */}
<div className="light-zone">
  <SectionMarquee text="EXPERIENCE" direction="right" speed={24} />
  <ExperienceSection />
</div>

{/* ─── Education (Dark) ─── */}
<div className="dark-zone">
  <SectionMarquee text="EDUCATION" direction="left" speed={24} />
  <EducationSection />
</div>

{/* ─── Contact (Light) ─── */}
<div className="light-zone">
  <SectionMarquee text="GET IN TOUCH" direction="right" speed={26} />
  <ContactSection />
</div>

{/* ─── Footer (Dark) ─── */}
<div className="dark-zone">
  <FooterSection />
</div>
```

- [ ] **Step 3: Confirm no imports or props changed**

Only wrapper `<div>`s added. Section components receive identical props.

---

### Task 5: Permanent dark navigation

**Files:**
- Modify: `src/components/layout/navigation.tsx`

- [ ] **Step 1: Add `dark-zone` to the outermost nav wrapper**

Find the top-level wrapper `ref={navWrapRef}` (approximately line 180) and add `dark-zone` to its `className`:

```tsx
<div ref={navWrapRef} className="dark-zone fixed top-0 left-0 right-0 z-50 …">
```

Do not change GSAP refs, ScrollTrigger config, or drawer animation logic.

- [ ] **Step 2: Hide the nav theme toggle button**

Remove or comment out the Sun/Moon toggle button in the nav drawer (keep the button element out of DOM to avoid confusion). Do not remove `useTheme` import yet if other nav code references it — remove unused import after toggle removal.

---

### Task 6: Retire global theme toggle (paint-layer only)

**Files:**
- Modify: `src/app/layout.tsx:68,63`
- Modify: `src/components/providers/theme-provider.tsx`
- Modify: `src/components/ui/floating-theme-toggle.tsx`
- Modify: `src/components/sections/hero-section.tsx` (theme toggle button only)

- [ ] **Step 1: Update `layout.tsx`**

Change:
```tsx
<html lang="en" className="dark" suppressHydrationWarning>
```
To:
```tsx
<html lang="en" suppressHydrationWarning>
```

Change viewport:
```tsx
themeColor: "#F4F4F5",
```

- [ ] **Step 2: Pin ThemeProvider to light (no-op toggle)**

In `theme-provider.tsx`, simplify to always use light — keeps `useTheme()` from crashing in hero/nav:

```tsx
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme: Theme = "light";
  const toggleTheme = useCallback(() => {}, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

Remove localStorage read/write and `mounted` visibility hack (no longer needed without theme flash).

- [ ] **Step 3: Hide floating theme toggle**

In `floating-theme-toggle.tsx`, return `null` at the top of the component:

```tsx
export function FloatingThemeToggle() {
  return null;
}
```

- [ ] **Step 4: Hide hero theme toggle button**

In `hero-section.tsx`, remove the Sun/Moon toggle `<button>` (desktop + mobile instances). Keep `useTheme` import removed if no longer referenced. Do not touch GSAP reveal timeline or marquee logic.

---

### Task 7: Neutralize mesh gradient colors

**Files:**
- Modify: `src/components/background/mesh-gradient.tsx:8–9, 32, 47, 61`

- [ ] **Step 1: Replace warm palette constants**

```tsx
const NEUTRAL_COLORS = ["#F4F4F5", "#E4E4E7", "#D4D4D4", "#A3A3A3"];
```

- [ ] **Step 2: Use neutral colors unconditionally**

```tsx
const colors = NEUTRAL_COLORS;
```

Remove `useTheme` import and `theme` variable if no longer needed.

- [ ] **Step 3: Update CSS fallback orbs**

In `CSSGradientFallback`, replace warm rgba values with:
```tsx
background: `radial-gradient(circle, rgba(163, 163, 163, 0.2) 0%, transparent 70%)`,
```
(for both orbs — subtle gray, not brown/cream)

- [ ] **Step 4: Lower overall opacity**

Set WebGL shader `style={{ opacity: 0.25 }}` (down from 0.65) so zone backgrounds dominate and gradient is ambient only.

---

### Task 8: Fix hardcoded teal in skills proximity glow

**Files:**
- Modify: `src/components/sections/skills-section.tsx:31–33, 42, 118–120, 129, 82, 169`

- [ ] **Step 1: Update hover glow color (both SkillCell and mobile variant)**

Replace:
```tsx
block.style.backgroundColor = `rgba(3, 140, 127, ${(intensity * 0.18).toFixed(3)})`;
```
With:
```tsx
block.style.backgroundColor = `rgba(37, 99, 235, ${(intensity * 0.18).toFixed(3)})`;
```

(Dark zone will use `#3B82F6` = `rgb(59, 130, 246)` — acceptable approximation; optional refinement: read `--accent-raw` via `getComputedStyle` in a follow-up, not required for v1.)

- [ ] **Step 2: Update mouse-leave reset color**

Replace:
```tsx
block.style.backgroundColor = "rgba(242, 231, 220, 0.04)";
```
With:
```tsx
block.style.backgroundColor = "rgba(10, 10, 10, 0.04)";
```

- [ ] **Step 3: Update static inline block backgrounds**

Replace all `rgba(242, 231, 220, 0.04)` occurrences with `rgba(10, 10, 10, 0.04)`.

Do not touch GSAP entrance animations or grid structure.

---

### Task 9: Verify marquee zone inheritance

**Files:**
- Read only: `src/components/layout/section-marquee.tsx`, `src/app/globals.css:949–958`

- [ ] **Step 1: Confirm no marquee code changes needed**

Marquee already uses:
- `.marquee-text-solid { color: var(--text); }`
- `.marquee-text-outline { -webkit-text-stroke: 1px color-mix(in srgb, var(--text) 18%, transparent); }`
- HR dividers: `var(--border-custom)`

Because Task 4 wraps each marquee inside its zone `<div>`, stroke/fill automatically resolves to black on light bands and white on dark bands.

- [ ] **Step 2: Visual spot-check after Task 4**

| Marquee | Expected solid text | Expected stroke |
|---------|--------------------|-----------------|
| ABOUT (dark zone) | White at 32% opacity | White stroke |
| SKILLS (light zone) | Black at 32% opacity | Black stroke |
| WORK (dark zone) | White | White stroke |

---

### Task 10: Accent color audit (confirm `--accent-raw` alias works)

**Files:**
- Read only: components using `var(--accent-raw)`

- [ ] **Step 1: Confirm alias covers all accent touchpoints without JSX edits**

These components already use `var(--accent-raw)` and will pick up electric blue via Task 1/2 aliases:

| Component | Accent usage |
|-----------|-------------|
| `contact-section.tsx` | Submit button background |
| `hero-section.tsx` | Role highlight, social hover, marquee dots |
| `navigation.tsx` | Link hover, active number |
| `project-section.tsx` | Tags, expand state, category labels |
| `career-section.tsx` | Current role indicator, company name |
| `footer-section.tsx` | Heart icon |
| `loading-screen.tsx` | Progress bar |
| `globals.css` | Selection, focus ring, scrollbar, contact submit glow |

- [ ] **Step 2: Spot-check primary button contrast**

Contact submit uses `backgroundColor: var(--accent-raw)` + `color: var(--bg)`.
- Light zone: blue `#2563EB` on light text `#F4F4F5` — verify WCAG; if contrast fails, use `color: #FAFAFA` (already on `--primary-foreground` — optional one-line fix in contact-section only).

---

### Task 11: Visual verification checklist

- [ ] **Step 1: Run dev server**

Run: `npm run dev`
Open: `http://localhost:3000`

- [ ] **Step 2: Scroll full page — confirm alternation**

Expected rhythm: Light hero → Dark about → Light skills → Dark work → Light experience → Dark education → Light contact → Dark footer.

- [ ] **Step 3: Check marquees**

Stroke text visible on both zones. No warm cream/teal remnants.

- [ ] **Step 4: Check interactive accents**

Links, buttons, hover states show electric blue (`#2563EB` light / `#3B82F6` dark).

- [ ] **Step 5: Check navigation**

Nav readable at all scroll positions (permanent dark glass).

- [ ] **Step 6: Check loading screen**

Loading screen uses light `:root` tokens (gray bg, blue progress).

- [ ] **Step 7: Run linter**

Run: `npm run lint`
Expected: PASS (fix any unused imports from theme toggle removal).

- [ ] **Step 8: Commit**

```bash
git add src/app/globals.css src/app/page.tsx src/app/layout.tsx \
  src/components/layout/navigation.tsx src/components/background/mesh-gradient.tsx \
  src/components/providers/theme-provider.tsx src/components/ui/floating-theme-toggle.tsx \
  src/components/sections/hero-section.tsx src/components/sections/skills-section.tsx \
  docs/superpowers/plans/2026-06-14-concept-c-signal-structure-palette.md
git commit -m "feat: apply Concept C Signal & Structure color palette with editorial zone alternation"
```

---

## Self-Review

| Spec requirement | Task |
|-----------------|------|
| Light tokens on `:root` | Task 1 |
| `.dark-zone` utility class | Task 2 |
| `--background` / `--text` legacy compatibility | Task 1 (aliases) |
| Section alternation in `page.tsx` | Task 4 |
| Marquee inherits zone `--text` | Task 4 + 9 (no marquee code change) |
| Electric blue accent on interactive elements | Task 1/2 (`--accent-raw` alias) + Task 10 |
| Do not break layout/GSAP | All tasks scoped to tokens/wrappers only |
| Theme toggle conflict resolved | Task 6 |

**Placeholder scan:** None found.

**Type consistency:** `--accent-raw` always mirrors `--primary` in both zones. `--bg` mirrors `--background`. `--text-muted` mirrors `--muted-foreground`.

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-06-14-concept-c-signal-structure-palette.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — Dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
