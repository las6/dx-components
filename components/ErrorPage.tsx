// @dx-components v1.0.0

const STYLES = `
  .dx-error, .dx-error-page, .dx-not-found, .dx-pending {
    --dx-bg: #0d0d0d;
    --dx-text: #e8e8e8;
    --dx-muted: #888;
    --dx-border: #2a2a2a;
    --dx-font: "Geist Mono", "Fira Code", monospace;
  }

  @media (prefers-color-scheme: light) {
    .dx-error, .dx-error-page, .dx-not-found, .dx-pending {
      --dx-bg: #fff;
      --dx-text: #111;
      --dx-muted: #666;
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
    }

    & .dx-error-page__btn--secondary {
      background: #1a1a1a;
      color: #ccc;
      border-color: #333;
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
  return (
    <>
      <style>{STYLES}</style>
      <div className="dx-error-page" data-dx-version="1.0.0">
        <div className="dx-error-page__card">
          <div className="dx-error-page__icon">
            <span className="dx-error-page__icon-mark">!</span>
          </div>
          <div className="dx-error-page__title">{title}</div>
          <div className="dx-error-page__message">{message}</div>
          <div className="dx-error-page__actions">
            <button
              type="button"
              onClick={() => (reset ? reset() : window.location.reload())}
              className="dx-error-page__btn"
            >
              Reload
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="dx-error-page__btn dx-error-page__btn--secondary"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
