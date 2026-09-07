## 2026-06-01 - Loading state accessibility pattern
**Learning:** Screen readers often announce each incremental change in dynamic loading indicators (like "Loading.", "Loading..", "Loading..."), which can be distracting. Using `aria-hidden="true"` on the dynamic part of the text while providing a static `aria-label` or role="status" on the container ensures a smoother experience.
**Action:** Always wrap dynamic loading dots or progress percentages in `aria-hidden="true"` if a clear status label is already present for assistive technologies.

## 2026-06-01 - Keyboard accessibility for copy buttons
**Learning:** Visual feedback for "Copy to clipboard" actions (like changing text to "Copied!") is often missed by screen reader users. Adding `aria-live="polite"` to the button ensures the success state is announced without interrupting the user.
**Action:** Always include `aria-live="polite"` on buttons that provide temporary text-based feedback upon interaction.

## 2026-06-01 - High-contrast stack traces
**Learning:** Developers often use dim colors for non-essential stack trace frames to focus on "own code". However, these colors frequently fail WCAG AA contrast guidelines, making them unreadable for some users.
**Action:** Ensure that even "muted" or "secondary" text in developer tools maintains a contrast ratio of at least 4.5:1 against its background.

## 2026-06-05 - Improving component accessibility and interactivity
**Learning:** Micro-UX improvements like adding aria-labels with keyboard shortcut hints, hiding decorative icons with aria-hidden="true", and providing explicit hover states significantly enhance the usability and accessibility of developer tools without cluttering the interface.
**Action:** Always include keyboard shortcut hints in aria-labels for buttons that support them, and ensure all interactive elements have a visible hover state (e.g., using a subtle background fill).

## 2026-06-10 - Contextual navigation on error pages
**Learning:** Providing a "Go back" option on 404 and error pages reduces user friction by allowing them to return to their previous context directly, rather than forcing them to start over from the home page.
**Action:** Always provide a "Go back" action alongside the primary navigation target on error or not-found pages to preserve user context.

## 2026-06-15 - Collapsible Stack Traces for DX Components
**Learning:** Collapsing third-party library frames (like those starting with `at` and from `/node_modules/` or internal Vite/React scripts) by default keeps dev error overlays incredibly clean, focusing the developer's attention on their own code, while maintaining full accessibility with a clearly labeled, dynamic ARIA toggle.
**Action:** When designing developer tools with long text outputs or stack traces, filter and collapse non-essential or third-party frames by default, providing clear toggle controls with live count updates.

## 2026-06-20 - ARIA disclosure state for collapsible controls
**Learning:** Expandable disclosure buttons (such as stack trace toggles) require `aria-expanded` attributes (`true`/`false`) so screen readers properly announce whether content is expanded or collapsed.
**Action:** Always include `aria-expanded={boolean}` on interactive buttons that control the visibility of associated content.
