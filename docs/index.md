---
layout: home

hero:
  name: dx-components
  text: Copy-paste DX components for Vite + TanStack
  tagline: Filling the gaps that Next.js handles natively
  actions:
    - theme: brand
      text: Get Started
      link: /#errorcomponent
    - theme: alt
      text: View on GitHub
      link: https://github.com/las6/dx-components

features:
  - title: Copy-paste
    details: Shadcn-inspired delivery — copy the source into your project. No npm package required.
  - title: Zero dependencies
    details: Pure scoped styles, no Tailwind, no CSS imports. Adapt to your brand in one file.
  - title: TanStack-native
    details: Drop-in replacements for errorComponent, notFoundComponent, and pendingComponent.
---

## ErrorComponent

Dev-friendly error overlay with stack traces, copy-to-clipboard, chained `cause` display, and own-code line highlighting.

- **`mode: "dev"`** (default) — full dark overlay with parseable stack frames, call stack count, chained `cause` errors
- **`mode: "prod"`** — auto-detects `import.meta.env.PROD` and delegates to `ErrorPage` for a clean user-facing display

<<< @/../components/ErrorComponent.tsx

### Usage

**TanStack Router (SPA):** use directly as `errorComponent`.

```tsx
import { createRootRoute } from "@tanstack/react-router";
import { ErrorComponent } from "./components/ErrorComponent";

export const Route = createRootRoute({
  errorComponent: ErrorComponent,
});
```

**TanStack Start (root route):** wrap in HTML shell.

```tsx
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { ErrorComponent } from "./components/ErrorComponent";

function RootErrorShell(props: ErrorComponentProps) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body style={{ margin: 0, background: "#0d0d0d" }}>
        <ErrorComponent {...props} />
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
  errorComponent: RootErrorShell,
});
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `error` | `unknown` | The thrown error |
| `reset` | `() => void` | Retry callback |
| `subtitle?` | `string` | Optional subtitle shown next to the error badge |
| `mode?` | `"dev" \| "prod"` | Display mode. Defaults to auto-detect via `import.meta.env.PROD` |

---

## ErrorPage

Clean, production-facing error page. No stack traces, no technical detail — designed for end users.

<<< @/../components/ErrorPage.tsx

### Usage

Can be used standalone or as the prod fallback from `ErrorComponent`:

```tsx
import { ErrorPage } from "./components/ErrorPage";

// Standalone
export const Route = createRootRoute({
  errorComponent: () => <ErrorPage />,
});

// Or with reset
function RootErrorComponent({ reset }: ErrorComponentProps) {
  return <ErrorPage reset={reset} />;
}
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `reset?` | `() => void` | Retry callback. Falls back to `window.location.reload()` |
| `title?` | `string` | Heading text. Default: "This page couldn't load" |
| `message?` | `string` | Subtitle text. Default: "Something went wrong. Please try again." |

---

## NotFoundComponent

404 page template. Dark theme, monospace, "Go home" link.

<<< @/../components/NotFoundComponent.tsx

### Usage

Same pattern as ErrorComponent — use directly in TanStack Router SPA, or wrap in HTML shell for TanStack Start root route.

```tsx
import { createRootRoute } from "@tanstack/react-router";
import { NotFoundComponent } from "./components/NotFoundComponent";

export const Route = createRootRoute({
  notFoundComponent: NotFoundComponent,
});
```

---

## PendingComponent

Route loading skeleton. Animated "Loading..." indicator. Renders inside the parent layout — **no HTML shell needed**, even in TanStack Start.

<<< @/../components/PendingComponent.tsx

### Usage

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { PendingComponent } from "./components/PendingComponent";

export const Route = createFileRoute("/slow")({
  loader: () => fetchSlowData(),
  pendingComponent: PendingComponent,
  pendingMs: 200,
});
```

---

## Error Reporting

Integrate an error tracking SDK (e.g. [Centry](https://github.com/las6/centry-client)) by wrapping the `errorComponent` and calling the report function inside `useEffect`:

```tsx
import { useEffect } from "react";
import { captureException } from "centry-client";
import { ErrorComponent } from "./components/ErrorComponent";

function RootErrorComponent(props: ErrorComponentProps) {
  useEffect(() => {
    captureException(props.error);
  }, [props.error]);

  return <ErrorComponent {...props} />;
}

export const Route = createRootRoute({
  errorComponent: RootErrorComponent,
});
```

Initialize centry once at app startup (before hydration):

```ts
import { init, installGlobalHandlers } from "centry-client";

const centryClient = init({
  project: "my-project",
  enabled: import.meta.env.PROD,
});
installGlobalHandlers(centryClient);
```

---

## Installation

### Copy-paste (recommended)

Copy the source files from the [components directory](https://github.com/las6/dx-components/tree/main/components) into your project.

### npm install

```bash
npm install github:las6/dx-components
```

```tsx
import { ErrorComponent } from "dx-components/components/ErrorComponent";
import { ErrorPage } from "dx-components/components/ErrorPage";
import { NotFoundComponent } from "dx-components/components/NotFoundComponent";
import { PendingComponent } from "dx-components/components/PendingComponent";
```

---

## Theming

All components use scoped `<style>` blocks with CSS custom properties. Override the variables in your global CSS to theme every component at once, or edit the variables directly in the component file.

### Variables

| Variable | Purpose | Dark default |
|---|---|---|
| `--dx-bg` | Page background | `#0d0d0d` |
| `--dx-text` | Primary text | `#e8e8e8` |
| `--dx-muted` | Secondary text | `#888` |
| `--dx-accent` | Error/accent color | `#c00` |
| `--dx-surface` | Card/panel background | `#161616` |
| `--dx-border` | Border color | `#2a2a2a` |
| `--dx-font` | Font family | `"Geist Mono", monospace` |

### Presets

Copy any of these blocks into your global CSS to theme all dx-components.

**Dark** (default):

```css
.dx-error, .dx-error-page, .dx-not-found, .dx-pending {
  --dx-bg: #0d0d0d;
  --dx-text: #e8e8e8;
  --dx-muted: #888;
  --dx-accent: #c00;
  --dx-surface: #161616;
  --dx-border: #2a2a2a;
  --dx-font: "Geist Mono", "Fira Code", monospace;
}
```

**Light**:

```css
.dx-error, .dx-error-page, .dx-not-found, .dx-pending {
  --dx-bg: #fff;
  --dx-text: #111;
  --dx-muted: #666;
  --dx-accent: #d00;
  --dx-surface: #f5f5f5;
  --dx-border: #ddd;
  --dx-font: system-ui, -apple-system, sans-serif;
}
```

**Minimal**:

```css
.dx-error, .dx-error-page, .dx-not-found, .dx-pending {
  --dx-bg: transparent;
  --dx-text: currentColor;
  --dx-muted: #999;
  --dx-accent: #e00;
  --dx-surface: transparent;
  --dx-border: transparent;
  --dx-font: inherit;
}
```

**Inherit**:

```css
.dx-error, .dx-error-page, .dx-not-found, .dx-pending {
  --dx-bg: inherit;
  --dx-text: inherit;
  --dx-muted: inherit;
  --dx-accent: inherit;
  --dx-surface: inherit;
  --dx-border: inherit;
  --dx-font: inherit;
}
```

Components auto-detect `prefers-color-scheme: light` and switch variable defaults. Override the variables to force a single mode.
