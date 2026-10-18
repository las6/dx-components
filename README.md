# dx-components

Copy-paste-ready DX components for the Vite + TanStack ecosystem — filling gaps that Next.js handles natively.

## Quick Start

Choose your delivery model:

### Option A: Copy source (recommended)

Copy the component files from [`components/`](./components/) into your project.

### Option B: npm install

```bash
npm install github:las6/dx-components
```

Then import directly:

```tsx
import { ErrorComponent } from "dx-components/components/ErrorComponent";
```

## Components

### ErrorComponent

A dev-friendly error overlay with stack traces, copy-to-clipboard, and own-code line highlighting. Works as a drop-in `errorComponent` for TanStack Router and TanStack Start.

```tsx
import { ErrorComponent } from "./components/ErrorComponent";

// TanStack Router (SPA) — use directly
export const Route = createRootRoute({
  errorComponent: ErrorComponent,
});

// TanStack Start — wrap in HTML shell for root route
import { HeadContent, Scripts } from "@tanstack/react-router";

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

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `error` | `unknown` | The thrown error (from `ErrorComponentProps`) |
| `reset` | `() => void` | Retry callback (from `ErrorComponentProps`) |
| `subtitle?` | `string` | Optional subtitle shown next to the error badge |

### NotFoundComponent

A 404 page template. Drop-in `notFoundComponent` for TanStack Router and TanStack Start.

```tsx
import { NotFoundComponent } from "./components/NotFoundComponent";

// TanStack Router (SPA)
export const Route = createRootRoute({
  notFoundComponent: NotFoundComponent,
});

// TanStack Start — wrap in HTML shell for root route
import { HeadContent, Scripts } from "@tanstack/react-router";

function RootNotFoundShell() {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body style={{ margin: 0, background: "#0d0d0d" }}>
        <NotFoundComponent />
        <Scripts />
      </body>
    </html>
  );
}
```

### PendingComponent

A route loading skeleton. Drop-in `pendingComponent` for TanStack Router. Renders inside the parent layout — no HTML shell needed.

```tsx
import { PendingComponent } from "./components/PendingComponent";

export const Route = createFileRoute("/slow")({
  loader: () => fetchSlowData(),
  pendingComponent: PendingComponent,
  pendingMs: 200,
});
```

## Guides

- [Vite preload recovery](./src/content/docs/vite-preload-recovery.mdx) — a copyable browser helper for guarded reloads, persistent-error reporting, and apps with unsaved edits.

## Design

- **Inline styles** — zero dependencies, no Tailwind or CSS imports needed
- **Dark theme** — uses `#0d0d0d` background, monospace font stack
- **Copy-paste** — each file is self-contained, adapt styles to your project
- **No build step** — components ship as source `.tsx`, your bundler handles compilation

## Maintaining this repository

Use Node 24.16.0 (the version in `.node-version`) and pnpm 10.33.0. The root documentation/test package and the independent `dev/` preview each have their own pnpm lockfile. Stale npm lockfiles and the stray tracked preview build HTML have been removed; generated builds stay ignored. Consumer installation with npm remains supported.

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
pnpm lint
pnpm version:check
pnpm docs:build
pnpm --dir dev install --frozen-lockfile
pnpm --dir dev build
pnpm dev
```

Cloudflare Pages builds `main` with `pnpm run docs:build` into `dist`; Git pushes trigger deployment. See [the maintenance checkpoint](./docs/MAINTENANCE.md) for the current dependency result and clipboard verification.

## License

MIT
