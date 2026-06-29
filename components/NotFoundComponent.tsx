// @source dx-components/NotFoundComponent v1.2.1

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

    & .dx-not-found__btn {
      padding: 0.35em 0.75em;
      font-size: 0.75rem;
      font-family: inherit;
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
  }
`;

export interface NotFoundComponentProps {
  data?: unknown;
  isNotFound?: boolean;
  routeId?: string;
}

export function NotFoundComponent(_props: NotFoundComponentProps) {
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
          >
            Go back
          </button>
          <a className="dx-not-found__btn" href="/">
            Go home
          </a>
        </div>
      </div>
    </>
  );
}
