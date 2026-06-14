# Section Marquee Text-Stroke Alternation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Alternate each repeated marquee title between solid fill and transparent stroke-only styling to add premium visual depth without breaking the infinite scroll loop.

**Architecture:** All changes live in `section-marquee.tsx` (render logic) plus two small utility classes in `globals.css` (theme-aware stroke colors). The existing dual-track GSAP/CSS loop (`translateX(-50%)` over two identical tracks) stays untouched — only per-item styling changes based on map index parity.

**Tech Stack:** Next.js (App Router), React, Tailwind CSS v4, CSS custom properties (`--text`), existing CSS marquee keyframes in `globals.css`.

---

## Current State (Discovery)

| Item | Location | Detail |
|------|----------|--------|
| Component | `src/components/layout/section-marquee.tsx` | Not `components/SectionMarquee.tsx` |
| Usage | `src/app/page.tsx` | 6 instances: ABOUT, SKILLS, WORK, EXPERIENCE, EDUCATION, GET IN TOUCH |
| Loop structure | `renderTrack()` lines 66–86 | `copies = 6`; inner `Array.from({ length: copies }).map((_, i) => …)` |
| Current alternation | inline `style` line 77 | `opacity: i % 2 === 0 ? 0.32 : 0.16` — both solid, different opacity |
| Seamless loop | lines 112–113 | Two identical `renderTrack(0)` + `renderTrack(1)`; CSS animates `-50%` |
| Animation CSS | `src/app/globals.css` lines 914–947 | `.section-marquee-left` / `.section-marquee-right` keyframes |
| Theme token | `globals.css` `:root` / `.light` | `--text: #f2e7dc` (dark), `--text: #0d0d0d` (light) |

### Loop / alignment invariant

```
Track 0: [solid₀][gap][stroke₁][gap][solid₂]…[stroke₅][gap]
Track 1: [solid₀][gap][stroke₁][gap]…          (identical copy)
         └──────────── -50% translate ──────────┘
```

With `copies = 6`, index 5 (odd/stroke) meets index 0 of the next track (even/solid) — alternation stays continuous at the seam. **Do not change `copies`, spacer width, font metrics, or track duplication.**

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/layout/section-marquee.tsx` | Modify | Index-based class selection in inner map |
| `src/app/globals.css` | Modify | Theme-aware `.marquee-text-solid` / `.marquee-text-outline` classes |
| `src/app/page.tsx` | No change | Already passes `text`, `direction`, `speed` only |

---

### Task 1: Add theme-aware marquee text utility classes

**Files:**
- Modify: `src/app/globals.css` (after line 947, inside the Section Transition Marquees block)

- [ ] **Step 1: Add solid variant class**

```css
.marquee-text-solid {
  color: var(--text);
  opacity: 0.32;
}
```

- [ ] **Step 2: Add outline variant class**

Use `color-mix` so stroke adapts to light/dark via `--text`:

```css
.marquee-text-outline {
  color: transparent;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px color-mix(in srgb, var(--text) 18%, transparent);
}
```

Rationale: `18%` approximates the current odd-index opacity (`0.16`) while keeping stroke visible. Tune in Task 3 if needed.

- [ ] **Step 3: Verify reduced-motion block is unchanged**

The existing `@media (prefers-reduced-motion: reduce)` rule for `.section-marquee-left/right` must remain as-is (animation: none). Text styles are independent.

---

### Task 2: Wire index-based alternation in SectionMarquee

**Files:**
- Modify: `src/components/layout/section-marquee.tsx:68-84`

- [ ] **Step 1: Replace inline color/opacity with conditional classes**

Current inner span (lines 70–81):

```tsx
<span
  className="font-display whitespace-nowrap tracking-[-0.04em] uppercase"
  style={{
    fontSize: "clamp(3rem, 8vw, 7.5rem)",
    fontWeight: 400,
    lineHeight: 1,
    color: "var(--text)",
    opacity: i % 2 === 0 ? 0.32 : 0.16,
  }}
>
  {text}
</span>
```

Replace with:

```tsx
<span
  className={`font-display whitespace-nowrap tracking-[-0.04em] uppercase ${
    i % 2 === 0 ? "marquee-text-solid" : "marquee-text-outline"
  }`}
  style={{
    fontSize: "clamp(3rem, 8vw, 7.5rem)",
    fontWeight: 400,
    lineHeight: 1,
  }}
>
  {text}
</span>
```

**Preserved for alignment (do not remove):**
- Outer wrapper: `className="flex items-center shrink-0"`
- Spacer: `width: "clamp(32px, 4vw, 64px)"` — identical for every item
- Shared typography inline styles (fontSize, fontWeight, lineHeight)
- `copies = 6` and dual `renderTrack()` calls

- [ ] **Step 2: Confirm no Tailwind arbitrary stroke on the element**

Prefer CSS classes over `[-webkit-text-stroke:…]` arbitrary utilities — easier to theme and tune in one place.

---

### Task 3: Visual QA and stroke tuning

**Files:**
- Modify (if needed): `src/app/globals.css` (`.marquee-text-outline` color-mix percentage)

- [ ] **Step 1: Run dev server**

Run: `npm run dev`  
Open: `http://localhost:3000`

- [ ] **Step 2: Check all six marquees on `page.tsx`**

Scroll through and verify on each band:
- Solid / outline alternates consistently
- No visible “jump” at the loop seam (where track 0 meets track 1)
- Long titles (`EXPERIENCE`, `GET IN TOUCH`) keep even spacing vs short ones (`WORK`)

- [ ] **Step 3: Toggle light/dark theme**

Stroke must remain subtle in both modes (uses `--text` via `color-mix`).

- [ ] **Step 4: Tune stroke opacity if needed**

Adjust `color-mix` percentage in `.marquee-text-outline`:
- Too faint → increase toward `22%`
- Too loud → decrease toward `14%`

Do **not** change spacer width or font size to fix visual weight — only stroke mix percentage or solid opacity (`0.32`).

- [ ] **Step 5: Check reduced motion**

With `prefers-reduced-motion: reduce`, animation stops but alternation styles should still render.

---

### Task 4: Optional — cn() helper cleanup (YAGNI: skip unless already imported)

**Files:**
- Modify: `src/components/layout/section-marquee.tsx` (only if project already uses `cn` elsewhere in layout components)

If `cn` from `@/lib/utils` is standard in this codebase, refactor className to:

```tsx
className={cn(
  "font-display whitespace-nowrap tracking-[-0.04em] uppercase",
  i % 2 === 0 ? "marquee-text-solid" : "marquee-text-outline"
)}
```

Otherwise keep template literal — no new dependency for this small change.

---

## Alignment / Jitter Prevention Checklist

1. **Same DOM shape** — both variants use one `<span>` + one spacer `<span>`; no extra wrappers on outline items.
2. **Same metrics** — `fontSize`, `fontWeight`, `lineHeight`, `tracking`, `whitespace-nowrap` unchanged.
3. **Stroke does not affect layout width** — `-webkit-text-stroke` paints on the glyph outline; with `transparent` fill, advance width matches solid text (no extra `padding` or `margin`).
4. **Pattern continuity** — even index = solid, odd = outline; `copies` stays even (6) so track boundary alternation holds.
5. **Identical tracks** — both `renderTrack(0)` and `renderTrack(1)` use the same function; no per-track overrides.

---

## Out of Scope

- Changing marquee speed, direction, or copy count
- GSAP scroll-trigger fade logic (lines 32–61)
- Per-section customization props (e.g. `variant="outline"`) — global alternation only
- Automated tests (no existing component test harness for marquees)

---

## Spec Coverage Self-Review

| Requirement | Task |
|-------------|------|
| Locate scrolling text component | Discovery → `section-marquee.tsx` |
| Inspect loop/map structure | Discovery → `renderTrack`, `copies`, dual tracks |
| Conditional Tailwind/CSS by index | Task 2 |
| Uniform spacing / no jitter | Alignment checklist + Task 2 constraints |
| Theme-compatible stroke | Task 1 `color-mix` + `--text` |

No placeholders or TBD items remain.
