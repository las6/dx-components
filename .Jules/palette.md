## 2026-06-01 - Loading state accessibility pattern
**Learning:** Screen readers often announce each incremental change in dynamic loading indicators (like "Loading.", "Loading..", "Loading..."), which can be distracting. Using `aria-hidden="true"` on the dynamic part of the text while providing a static `aria-label` or role="status" on the container ensures a smoother experience.
**Action:** Always wrap dynamic loading dots or progress percentages in `aria-hidden="true"` if a clear status label is already present for assistive technologies.

## 2026-06-01 - Keyboard accessibility for copy buttons
**Learning:** Visual feedback for "Copy to clipboard" actions (like changing text to "Copied!") is often missed by screen reader users. Adding `aria-live="polite"` to the button ensures the success state is announced without interrupting the user.
**Action:** Always include `aria-live="polite"` on buttons that provide temporary text-based feedback upon interaction.

## 2026-06-01 - High-contrast stack traces
**Learning:** Developers often use dim colors for non-essential stack trace frames to focus on "own code". However, these colors frequently fail WCAG AA contrast guidelines, making them unreadable for some users.
**Action:** Ensure that even "muted" or "secondary" text in developer tools maintains a contrast ratio of at least 4.5:1 against its background.

## 2026-06-15 - Keyboard shortcut announcement pattern
**Learning:** Visual `<kbd>` elements within buttons can be confusing for screen readers if they are announced as isolated characters. Providing a complete description in `aria-label` (e.g., "Copy error (Keyboard shortcut: C)") while hiding the `<kbd>` tag itself results in a clearer, more intentional announcement.
**Action:** Use `aria-label` to combine the button action and shortcut description, and add `aria-hidden="true"` to the internal `<kbd>` element.
