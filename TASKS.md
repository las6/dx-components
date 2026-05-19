# Open Tasks

## 1. Docs framework review

**Current:** VitePress (Vue SFC-based).

**What we want from a docs site:**
- Embed source code that stays in sync (VitePress `<<< @/...` does this)
- Sticky sidebar / ToC navigation from section headings
- **Live React component previews** — show the component rendering with selectable theme presets
- Copyable code output per component

**Problem:** VitePress can't natively render React components. The `<<<` code embed is text-only. To do live React previews we'd either need to:
- Mount React via a Vue wrapper or web component inside VitePress pages
- Switch to a React-based SSG (Astro, Nextra, custom Vite SSG)
- Keep VitePress for docs and link to a separate demo app (our `dev/` app)

**To evaluate:**
- [ ] Is the VitePress Vue barrier worth working around (theme + custom components)?
- [ ] Would Astro (React + MDX) be a better long-term fit? Supports React components in `.mdx` natively.
- [ ] Keep VitePress but add a linked "Live demo" that opens the `dev/` app?

## 2. Theme preset preview

**What we want:** A selector on the docs page that shows the component with different CSS variable presets applied (Dark, Light, Minimal, Inherit). User sees the component re-theme in real time.

**Needs:** live React rendering in docs (see #1). The CSS approach is straightforward — inject/override `--dx-*` variables on a wrapper element and the component re-styles via its `var()` references.

**Presets defined:**
| Dark | `--dx-bg: #0d0d0d` ... |
| Light | `--dx-bg: #fff` ... |
| Minimal | `--dx-bg: transparent` ... |
| Inherit | `--dx-bg: inherit` ... |

**CSS variable passes for the preset overrides are already in `docs/index.md`. Work needed: make them interactive.**

- [ ] Add preset switcher UI to docs
- [ ] Live-update component preview when switching
- [ ] Show resulting CSS override block (already exists, just needs wiring to selector)

## 3. Navigation & sticky behavior

**Current:** VitePress `outline` (right-side ToC) is enabled. `layout: home` means no sidebar by default.

**What's missing:**
- Section headings should be sticky / easily navigable
- Jump-to links at top of page are plain text, not proper nav
- Sidebar could list all components + sections, or the outline could serve this role

**Options:**
- Switch to `layout: doc` — sidebar appears, but we lose the hero section
- Keep `layout: home` and build a custom sticky nav bar or sidebar component
- Use a separate docs page with `layout: doc` and link to it from the landing page

- [ ] Decide on layout strategy
- [ ] Implement sticky section navigation

## Current state

All 4 components are implemented and build clean:
- `ErrorComponent` — dev error overlay with cause chain, stack parsing, copy, reset. Auto-detects prod mode.
- `ErrorPage` — production user-facing error page (Reload + Back)
- `NotFoundComponent` — 404 page template
- `PendingComponent` — route loading skeleton with animated dots

All use:
- Scoped `<style>` blocks with CSS variables (`--dx-*`)
- Native CSS nesting
- `rem`/`em`/`dvh` (no px except border-widths)
- `@media (prefers-color-scheme: light)` auto-detection
- `data-dx-version="1.0.0"` on root elements
- BEM class naming

`dev/` is a Vite + React playground for visual testing.
