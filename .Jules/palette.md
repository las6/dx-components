## 2026-06-01 - Loading state accessibility pattern
**Learning:** Screen readers often announce each incremental change in dynamic loading indicators (like "Loading.", "Loading..", "Loading..."), which can be distracting. Using `aria-hidden="true"` on the dynamic part of the text while providing a static `aria-label` or role="status" on the container ensures a smoother experience.
**Action:** Always wrap dynamic loading dots or progress percentages in `aria-hidden="true"` if a clear status label is already present for assistive technologies.
