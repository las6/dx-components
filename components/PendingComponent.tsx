// @source dx-components/PendingComponent v1.2.2
import { useState, useEffect } from "react";

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

  .dx-pending {
    font-family: var(--dx-font);
    font-size: 0.8125rem;
    line-height: 1.6;
    background: var(--dx-bg);
    color: var(--dx-text);
    min-height: 100dvh;
    padding: 2rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    & .dx-pending__content {
      display: flex;
      align-items: center;
      gap: 0.625rem;
    }

    & .dx-pending__spinner {
      width: 1rem;
      height: 1rem;
      color: var(--dx-muted);
      animation: dx-pending-spin 0.8s linear infinite;
    }

    & .dx-pending__text {
      color: var(--dx-muted);
      font-size: 0.875rem;
      transition: opacity 0.2s ease;
    }
  }

  @keyframes dx-pending-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dx-pending__spinner {
      animation: none;
    }
  }
`;

export function PendingComponent() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <div
        className="dx-pending"
        data-dx-version="1.2.2"
        role="status"
        aria-label="Loading"
        suppressHydrationWarning
      >
        <div className="dx-pending__content">
          <svg
            className="dx-pending__spinner"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2.5"
              opacity="0.2"
            />
            <path
              d="M12 3a9 9 0 0 1 9 9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="dx-pending__text">
            Loading<span aria-hidden="true">{dots}</span>
          </span>
        </div>
      </div>
    </>
  );
}
