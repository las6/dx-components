// @dx-components v1.0.0
import { useState, useEffect } from "react";

const STYLES = `
  .dx-error, .dx-error-page, .dx-not-found, .dx-pending {
    --dx-bg: #0d0d0d;
    --dx-text: #e8e8e8;
    --dx-muted: #888;
    --dx-font: "Geist Mono", "Fira Code", monospace;
  }

  @media (prefers-color-scheme: light) {
    .dx-error, .dx-error-page, .dx-not-found, .dx-pending {
      --dx-bg: #fff;
      --dx-text: #111;
      --dx-muted: #666;
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
      <div className="dx-pending" data-dx-version="1.0.0">
        <span className="dx-pending__text">Loading{dots}</span>
      </div>
    </>
  );
}
