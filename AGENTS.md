A public GitHub repo of copy-paste-ready DX components for the Vite + TanStack ecosystem — filling gaps that Next.js handles natively.

Audit doc: ~/Personal/las6-assistant/data/dx-components-audit-2026-05.md

## Delivery model
Shadcn-inspired: source is the deliverable (copy from GitHub or CLI pull). Optionally also publishable via `npm install github:las6/dx-components` for zero-config use.

## v1 scope
1. **ErrorComponent** — DevError canonical (from workload-walrus). Generic subtitle, TanStack Start + Router variants documented.
2. **NotFoundComponent** — 404 page template
3. **PendingComponent** — route loading skeleton

## Repo structure ideas
```
components/
  ErrorComponent.tsx       # standalone, inline styles
  NotFoundComponent.tsx
  PendingComponent.tsx
README.md                  # usage per framework variant
```

## Why not a compiled package
- Components need per-project adaptation (brand colors, nav targets)
- No monorepo, separate Vercel deploys
- Copy model is proven DX (shadcn)

## Blocked on
- Fix error display task (96a3ad60) — validates the canonical component first
