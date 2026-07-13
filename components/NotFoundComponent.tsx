// @source dx-components/NotFoundComponent v1.2.1
import { useEffect } from "react";

const STYLES = `
  .dx-error, .dx-error-page, .dx-not-found, .dx-pending {
    --dx-bg: #0d0d0d;
    --dx-text: #e8e8e8;
    --dx-muted: #888;
    --dx-accent: #c00;
    --dx-surface: #161616;
    --dx-border: #2a2a2a;
    --dx-font: "Geist Mono", "Fira Code", monospace;
  }

  @media (prefers-color-scheme: light) {
    .dx-error, .dx-error-page, .dx-not-found, .dx-pending {
      --dx-bg: #fff;
      --dx-text: #111;
      --dx-muted: #666;
      --dx-accent: #d00;
      --dx-surface: #f5f5f5;
      --dx-border: #ddd;
      --dx-font: system-ui, -apple-system, sans-serif;
    }
  }

  .dx-not-found {
    font-family: var(--dx-font);
    font-size: 0.8125rem;
    line-height: 1.6;
    background: var(--dx-bg);
    color: var(--dx-text);
    min-height: 100dvh;
    padding: 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & .dx-not-found__badge {
      background: var(--dx-border);
      color: var(--dx-muted);
      font-weight: 700;
      font-size: 0.6875rem;
      padding: 0.125em 0.5em;
      border-radius: 0.1875rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
    }

    & .dx-not-found__title {
      color: var(--dx-text);
      font-size: 0.9375rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    & .dx-not-found__message {
      color: var(--dx-muted);
      font-size: 0.8125rem;
      margin-bottom: 1.5rem;
    }

    & .dx-not-found__actions {
      display: flex;
      gap: 0.5rem;
    }

    & .dx-not-found__btn,
    & .dx-not-found__link {
      padding: 0.35em 0.75em;
      font-family: inherit;
      font-size: 0.75rem;
      border: 1px solid var(--dx-border);
      border-radius: 0.25rem;
      background: var(--dx-surface);
      color: var(--dx-muted);
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;

      &:focus-visible {
        outline: 2px solid var(--dx-accent);
        outline-offset: 2px;
      }

      &:hover {
        background: var(--dx-border);
        color: var(--dx-text);
      }
    }

    & .dx-not-found__kbd {
      display: inline-block;
      padding: 0.125em 0.35em;
      font-size: 0.625rem;
      font-family: var(--dx-font);
      background: var(--dx-border);
      color: var(--dx-muted);
      border: 1px solid var(--dx-border);
      border-radius: 0.25rem;
      margin-left: 0.5rem;
      opacity: 0;
      transition: opacity 0.1s;
    }

    & .dx-not-found__btn:hover .dx-not-found__kbd,
    & .dx-not-found__btn:focus-within .dx-not-found__kbd,
    & .dx-not-found__link:hover .dx-not-found__kbd,
    & .dx-not-found__link:focus-within .dx-not-found__kbd {
      opacity: 1;
    }
  }
`;

export interface NotFoundComponentProps {
  data?: unknown;
  isNotFound?: boolean;
  routeId?: string;
}

export function NotFoundComponent(_props: NotFoundComponentProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey
      ) {
        return;
      }

      if (e.key.toLowerCase() === "b") {
        window.history.back();
      } else if (e.key.toLowerCase() === "h") {
        window.location.href = "/";
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <div className="dx-not-found" data-dx-version="1.2.1" suppressHydrationWarning>
        <span className="dx-not-found__badge">404</span>
        <div className="dx-not-found__title">Page not found</div>
        <div className="dx-not-found__message">No route matched this URL.</div>
        <div className="dx-not-found__actions">
          <button
            type="button"
            className="dx-not-found__btn"
            onClick={() => window.history.back()}
            aria-label="Go back (Keyboard shortcut: B)"
          >
            Go back{" "}
            <kbd className="dx-not-found__kbd" aria-hidden="true">
              B
            </kbd>
          </button>
          <a
            className="dx-not-found__link"
            href="/"
            aria-label="Go home (Keyboard shortcut: H)"
          >
            Go home{" "}
            <kbd className="dx-not-found__kbd" aria-hidden="true">
              H
            </kbd>
          </a>
        </div>
      </div>
    </>
  );
}
