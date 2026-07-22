// @source dx-components/ErrorPage v1.2.2
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

  .dx-error-page {
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
    align-items: center;
    justify-content: center;

    & .dx-error-page__card {
      text-align: center;
      max-width: 30rem;
    }

    & .dx-error-page__icon {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: 2px solid var(--dx-border);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
    }

    & .dx-error-page__icon-mark {
      color: #f5a623;
      font-size: 1.375rem;
      font-weight: 700;
      line-height: 1;
    }

    & .dx-error-page__title {
      color: var(--dx-text);
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    & .dx-error-page__message {
      color: var(--dx-muted);
      font-size: 0.8125rem;
      margin-bottom: 1.5rem;
    }

    & .dx-error-page__actions {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
    }

    & .dx-error-page__btn {
      padding: 0.5em 1em;
      cursor: pointer;
      font-size: 0.75rem;
      font-family: inherit;
      border: 1px solid var(--dx-border);
      border-radius: 0.25rem;
      background: var(--dx-bg);
      color: var(--dx-text);
      transition: all 0.2s ease;

      &:focus-visible {
        outline: 2px solid var(--dx-accent);
        outline-offset: 2px;
      }

      &:hover {
        background: var(--dx-border);
      }
    }

    & .dx-error-page__btn--secondary {
      background: var(--dx-surface);
      color: var(--dx-muted);
      border-color: var(--dx-border);
    }

    & .dx-error-page__kbd {
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

    & .dx-error-page__btn:hover .dx-error-page__kbd,
    & .dx-error-page__btn:focus-within .dx-error-page__kbd {
      opacity: 1;
    }
  }
`;

export interface ErrorPageProps {
  reset?: () => void;
  title?: string;
  message?: string;
}

export function ErrorPage({
  reset,
  title = "This page couldn't load",
  message = "Something went wrong. Please try again.",
}: ErrorPageProps) {
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

      const key = e.key.toLowerCase();
      if (key === "r") {
        if (reset) {
          reset();
        } else {
          window.location.reload();
        }
      } else if (key === "b") {
        window.history.back();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [reset]);

  const handleReload = () => {
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="dx-error-page" data-dx-version="1.2.2" suppressHydrationWarning>
        <div className="dx-error-page__card">
          <div className="dx-error-page__icon">
            <span className="dx-error-page__icon-mark" aria-hidden="true">
              !
            </span>
          </div>
          <div className="dx-error-page__title">{title}</div>
          <div className="dx-error-page__message">{message}</div>
          <div className="dx-error-page__actions">
            <button
              type="button"
              onClick={handleReload}
              className="dx-error-page__btn"
              aria-label="Reload (Keyboard shortcut: R)"
            >
              Reload
              <kbd className="dx-error-page__kbd" aria-hidden="true">
                R
              </kbd>
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="dx-error-page__btn dx-error-page__btn--secondary"
              aria-label="Back (Keyboard shortcut: B)"
            >
              Back
              <kbd className="dx-error-page__kbd" aria-hidden="true">
                B
              </kbd>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
