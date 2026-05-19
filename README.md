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

## Design

- **Inline styles** — zero dependencies, no Tailwind or CSS imports needed
- **Dark theme** — uses `#0d0d0d` background, monospace font stack
- **Copy-paste** — each file is self-contained, adapt styles to your project
- **No build step** — components ship as source `.tsx`, your bundler handles compilation

## License

MIT
