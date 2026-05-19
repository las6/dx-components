# Open Tasks

## X. Docs framework (DONE)

**Replaced VitePress with Ladle.** Ladle is React-first, Vite-native, and supports:
- Live React component stories with interactive controls
- Global `Provider` for theme preset selector (Dark, Light, Minimal, Inherit)
- MDX documentation page (`stories/guide.stories.mdx`) with inline component renders
- Auto sidebar with story navigation
- `ladle build` for static site, `ladle serve` for dev server

**Structure:**
```
.ladle/
  components.tsx     # GlobalProvider — theme preset switcher
  config.mjs         # Story glob config
stories/
  guide.stories.mdx           # Docs page (intro, installation, usage, theming)
  ErrorComponent.stories.tsx   # 7 stories (default, chained cause, prod, string, no stack, deep stack, flaky)
  ErrorPage.stories.tsx        # 3 stories (default, custom text, with reset)
  NotFoundComponent.stories.tsx # 1 story
  PendingComponent.stories.tsx  # 1 story
```

**Commands:** `npm run ladle` / `npm run ladle:build`

**Remaining open question from VitePress era:** We might want code embeds that show the source inline (VitePress `<<<` did this). Ladle has a "Show code" button per story. Not quite the same — code is shown in a separate pane, not inline in docs text. This is acceptable for now.

## 2. Theme preset preview (DONE)

Implemented via `.ladle/components.tsx` `GlobalProvider`. The provider:
- Injects `<style>` with `[data-dx-preset="..."]` selectors that override `--dx-*` CSS variables
- Renders a floating button bar (top-right) for preset selection
- Changes `data-dx-preset` attribute on the wrapper div

The `[data-dx-preset="..."] .dx-error` selector has higher specificity (0,1,1) than `.dx-error` (0,1,0), so it overrides the component's own variable defaults.

## 3. Remaining navigation improvements

Ladle provides automatic sidebar navigation from story files and exports. The MDX docs page is under "Guide / Dx components" in the sidebar. Story exports are grouped by component name.

**What's fine:**
- Sidebar navigation with component names and story variants
- Built-in outline/ToC on each story page
- Ladle's native dark theme for the shell

**Could improve:**
- The MDX page renders components inline with `minHeight` constraints. At `100dvh` the full component would fill the canvas entirely — might interfere with Ladle's UI. Currently using `minHeight: "60dvh"` etc. for inline previews. The full-component view is in individual story pages.
- ~~Jump-to links~~ — not needed since Ladle sidebar handles this
- ~~Sticky section titles~~ — Ladle has this built in

## Current state

All 4 components + Ladle stories build clean:
- `npx tsc --noEmit` (dev/) — passes
- `npx vite build` (dev/) — passes
- `npx ladle build` — passes (13 stories, 0.53 MiB output)

Components:
- `ErrorComponent` — dev error overlay with cause chain, stack parsing, copy, reset. Auto-detects prod mode.
- `ErrorPage` — production user-facing error page (Reload + Back)
- `NotFoundComponent` — 404 page template
- `PendingComponent` — route loading skeleton with animated dots

All use scoped `<style>` blocks with CSS variables, native CSS nesting, `rem`/`em`/`dvh`, `@media (prefers-color-scheme: light)`, `data-dx-version="1.0.0"`, BEM naming.

`dev/` remains as a Vite + React playground (components test app).

`build/` is Ladle's static HTML output (like Storybook build). `.gitignore` it.
