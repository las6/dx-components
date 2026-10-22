// @source dx-components/PendingComponent v1.2.2

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

    & .dx-pending__text {
      color: var(--dx-muted);
      font-size: 0.875rem;
    }

    & .dx-pending__dots {
      display: inline-block;
      animation: dx-pending-dots 1.6s step-end infinite;
    }
  }

  @keyframes dx-pending-dots {
    0%, 100% { clip-path: inset(0 100% 0 0); }
    25% { clip-path: inset(0 66.6667% 0 0); }
    50% { clip-path: inset(0 33.3333% 0 0); }
    75% { clip-path: inset(0 0 0 0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .dx-pending .dx-pending__dots { animation: none; }
  }
`;

export function PendingComponent() {
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
        <span className="dx-pending__text">
          Loading<span className="dx-pending__dots" aria-hidden="true">...</span>
        </span>
      </div>
    </>
  );
}
