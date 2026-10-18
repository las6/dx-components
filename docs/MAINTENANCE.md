# Maintenance checkpoint — 2026-10-18

The initial main checkout was clean and synchronized. This batch integrates approved clipboard PR #17, including its earlier focus/cleanup corrections, and completes dependency maintenance for both independent packages.

## Clipboard behavior

ErrorComponent uses the Clipboard API when available and falls back to a temporary textarea plus `execCommand("copy")` when that API is unavailable or rejects. The textarea is removed in `finally`; prior keyboard focus and document selection are restored. Failed copy operations do not show the success state or produce unhandled promise rejections.

Thirty component tests pass, including unavailable/denied Clipboard API and fallback false/throw cases. Actual Chrome checks at 1440px and 430px exercised:

- Modern API success, with the copied error text read back from the browser clipboard.
- A genuinely insecure HTTP test hostname: `isSecureContext` false and no navigator.clipboard; the native copy command succeeded with the error payload selected.
- Rejected modern API followed by a successful native fallback.
- False/throw fallback failures: no temporary textarea, restored focus/selection, and no “Copied!” state.

Native fallback acceptance is based on the browser command result and selected payload; insecure-origin clipboard readback is not available. This is Chrome coverage, not a complete Safari/Firefox permissions matrix. The source remains delivered by copy/Git; existing copies in other projects do not update automatically, and this maintenance does not publish an npm release.

## Normal dependency updates

No overrides were added. The root audit fell from 44 entries (21 high, 19 moderate, four low) to one moderate. The independent preview audit fell from five (four high, one moderate) to zero.

Updated supported releases include Astro 7.4.0, its React integration 7.1.0, Starlight 0.42.6, markdown-remark 7.3.3, React/DOM 19.3.1, Vite 8.3.4, Vitest 5.0.5, jsdom 30.1.3, jest-dom 7.0.1 and typescript-eslint 8.71.2. [React integration 7](https://github.com/withastro/astro/blob/main/packages/integrations/react/CHANGELOG.md) moves JSX processing to Oxc and removes the Babel option; this project has no custom Babel configuration. Real documentation React islands and their theme/copy controls pass browser checks after migration.

The remaining [selector-parser CPU-exhaustion advisory](https://github.com/advisories/GHSA-rj75-hqrm-r3gf) is `postcss-selector-parser 6.1.4` through Starlight → Expressive Code → postcss-nested 6. Latest Expressive Code core 0.44.2 still requires postcss-nested ^6.0.1; current postcss-nested 9 uses the patched parser, outside that parent range. Do not force the major transitively. This path processes trusted component CSS while building static documentation; no request-time untrusted-selector parser is exposed by this site. Revisit when Expressive Code updates its supported parent dependency. Audit counts describe this lockfile and can change as advisories are published.

TypeScript remains 6.0.3 because typescript-eslint supports `>=4.8.4 <6.1.0`. It is now explicitly declared at the root, so typecheck does not depend on an incidental executable from another install.

## Runtime and reproducible installation

Current Astro/jsdom need a newer Node runtime than the previous local default 22.18. Use the already installed Node 24.16.0, recorded in root and dev `.node-version`; manifests declare the minimum 22.22.2. No global runtime default was changed. Cloudflare's existing project has no NODE_VERSION override, so its [documented project version-file selection](https://developers.cloudflare.com/pages/configuration/build-image/) applies.

Both independent packages declare pnpm 10.33.0 and have current lockfiles. Removed the two stale npm lockfiles to avoid contradictory install graphs. The README's npm instructions for consumers remain valid; npm was not the deployed build command. The preview allowBuilds placeholder is now a boolean. The stray tracked dev/dist HTML was removed from Git while generated preview output stays ignored. The obsolete SDK age exemption was narrowed to centry-client 1.4.0; this is not a resolution pin.

## Validation and deployment

Root tests (30), lint, explicit typecheck, component-version consistency and frozen installation pass. The static docs build/search index (10 pages), independent preview typecheck/build and preview frozen installation pass. Desktop/mobile production-build browser checks cover ErrorComponent hydration, live theme switching and copying, plus ErrorPage, NotFoundComponent and PendingComponent demos, with no page errors. Screenshots were visually inspected. The docs build emits empty-i18n/default-404 content warnings while successfully generating its pages.

Cloudflare Pages is already connected to GitHub main and runs `pnpm run docs:build` into dist. Push the validated source through that existing integration and record the resulting deployment/source identity and live verification in the private maintenance ledger. No separate npm publication or consumer-source rollout is part of this checkpoint.
