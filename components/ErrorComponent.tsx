// @source dx-components/ErrorComponent v1.2
import { useState, useCallback, useEffect } from "react";
import { ErrorPage } from "./ErrorPage";

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

  .dx-error {
    font-family: var(--dx-font);
    font-size: 0.8125rem;
    line-height: 1.6;
    background: var(--dx-bg);
    color: var(--dx-text);
    min-height: 100dvh;
    padding: 2rem;
    box-sizing: border-box;

    & .dx-error__header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    & .dx-error__badge {
      background: var(--dx-accent);
      color: #fff;
      font-weight: 700;
      font-size: 0.6875rem;
      padding: 0.125em 0.5em;
      border-radius: 0.1875rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    & .dx-error__subtitle {
      color: var(--dx-muted);
      font-size: 0.6875rem;
    }

    & .dx-error__message {
      color: var(--dx-accent);
      font-size: 0.9375rem;
      font-weight: 600;
      margin-bottom: 1rem;
      word-break: break-word;
    }

    & .dx-error__stack {
      background: var(--dx-surface);
      border: 1px solid var(--dx-border);
      border-radius: 0.375rem;
      padding: 0.75rem 1rem;
      overflow: auto;
      margin-bottom: 1rem;
    }

    & .dx-error__stack-title {
      color: var(--dx-muted);
      font-size: 0.625rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    & .dx-error__frame {
      margin-bottom: 0.15em;
    }

    & .dx-error__frame[data-own="true"] {
      --_fg: var(--dx-text);
      --_loc: var(--dx-muted);
    }

    & .dx-error__frame[data-own="false"] {
      --_fg: #555;
      --_loc: #444;
    }

    & .dx-error__frame-fn {
      color: var(--_fg);
      font-weight: 500;
    }

    & .dx-error__frame-loc {
      color: var(--_loc);
      font-size: 0.6875rem;
    }

    & .dx-error__frame--nofn {
      color: var(--_fg);
      font-size: 0.8125rem;
    }

    & .dx-error__cause {
      margin-left: 1rem;
      padding-left: 1rem;
      border-left: 2px solid var(--dx-border);
      margin-top: 0.5rem;
    }

    & .dx-error__actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    & .dx-error__btn {
      padding: 0.35em 0.75em;
      cursor: pointer;
      font-size: 0.75rem;
      font-family: inherit;
      border: 1px solid #333;
      border-radius: 0.25rem;
      background: #1a1a1a;
      color: #ccc;
      transition: all 0.2s ease;
    }

    & .dx-error__btn--copy[data-copied="true"] {
      color: #4ade80;
      border-color: #4ade80;
      background: rgba(74, 222, 128, 0.1);
    }

    & .dx-error__kbd {
      display: inline-block;
      padding: 0.125em 0.35em;
      font-size: 0.625rem;
      font-family: var(--dx-font);
      background: #333;
      color: #888;
      border: 1px solid #444;
      border-radius: 0.25rem;
      margin-left: 0.5rem;
      opacity: 0;
      transition: opacity 0.1s;
    }

    & .dx-error__btn:hover .dx-error__kbd,
    & .dx-error__btn:focus-within .dx-error__kbd {
      opacity: 1;
    }
  }
`;

export interface ErrorComponentProps {
  error: unknown;
  reset: () => void;
  subtitle?: string;
  mode?: "dev" | "prod";
}

interface StackFrame {
  fn: string;
  location: string;
}

function parseStackFrames(lines: string[]): StackFrame[] {
  return lines.map((line) => {
    const trimmed = line.trim();
    const match = trimmed.match(/^at\s+(?:(.+?)\s+\()?(.+?):(\d+):(\d+)\)?$/);
    if (match) {
      return {
        fn: match[1] || "",
        location: `${match[2]}:${match[3]}:${match[4]}`,
      };
    }
    return { fn: "", location: trimmed };
  });
}

function getCauses(error: unknown): unknown[] {
  const causes: unknown[] = [];
  let cur = error instanceof Error ? error.cause : undefined;
  while (cur) {
    causes.push(cur);
    cur = cur instanceof Error ? cur.cause : undefined;
  }
  return causes;
}

function ownFileMatcher(line: string) {
  return (
    line.includes("/src/") ||
    line.includes("/routes/") ||
    line.includes("/lib/")
  );
}

function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

function ErrorBlock({
  label,
  message,
  stack,
}: {
  label: string;
  message: string;
  stack: string;
}) {
  const stackLines = stack
    .split("\n")
    .filter((line) => !line.startsWith(message) && line.trim() !== "");

  const frames = parseStackFrames(stackLines);

  return (
    <div>
      <div className="dx-error__header">
        <span className="dx-error__badge">{label}</span>
      </div>

      <div className="dx-error__message">{message}</div>

      {frames.length > 0 && (
        <div className="dx-error__stack">
          <div className="dx-error__stack-title">
            Call Stack ({frames.length})
          </div>
          {frames.map((frame, i) => {
            const isOwn = ownFileMatcher(frame.location);
            return (
              <div
                key={i}
                className={`dx-error__frame${frame.fn ? "" : " dx-error__frame--nofn"}`}
                data-own={isOwn}
              >
                {frame.fn && (
                  <span className="dx-error__frame-fn">{frame.fn}</span>
                )}
                {frame.fn && " "}
                {frame.fn ? (
                  <span className="dx-error__frame-loc">{frame.location}</span>
                ) : (
                  frame.location
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DevErrorDisplay({
  error,
  reset,
  subtitle,
}: {
  error: unknown;
  reset: () => void;
  subtitle?: string;
}) {
  const [copied, setCopied] = useState(false);

  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? (error.stack ?? "") : "";
  const causes = getCauses(error);

  const allMessages = [message];
  let allStack = stack;
  for (const c of causes) {
    const m = c instanceof Error ? c.message : String(c);
    allMessages.push(m);
    allStack += "\n" + (c instanceof Error ? (c.stack ?? String(c)) : String(c));
  }

  const copyText = allMessages.join("\n\nCaused by: ") + "\n\n" + allStack;

  const handleCopy = useCallback(() => {
    copyToClipboard(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [copyText]);

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

      if (e.key.toLowerCase() === "c") {
        handleCopy();
      } else if (e.key.toLowerCase() === "r") {
        reset();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleCopy, reset]);

  return (
    <>
      <style>{STYLES}</style>
      <div className="dx-error" data-dx-version="1.2">
        <ErrorBlock label="Error" message={message} stack={stack} />

        {subtitle && (
          <div className="dx-error__subtitle" style={{ marginBottom: "0.5rem" }}>
            {subtitle}
          </div>
        )}

        {causes.map((cause, i) => (
          <div key={i} className="dx-error__cause">
            <ErrorBlock
              label="Caused by"
              message={cause instanceof Error ? cause.message : String(cause)}
              stack={cause instanceof Error ? (cause.stack ?? "") : ""}
            />
          </div>
        ))}

        <div className="dx-error__actions">
          <button
            type="button"
            onClick={handleCopy}
            className="dx-error__btn dx-error__btn--copy"
            data-copied={copied}
          >
            {copied ? "Copied!" : "Copy error"}{" "}
            <kbd className="dx-error__kbd">C</kbd>
          </button>
          <button type="button" onClick={reset} className="dx-error__btn">
            Try again <kbd className="dx-error__kbd">R</kbd>
          </button>
        </div>
      </div>
    </>
  );
}

export function ErrorComponent({
  error,
  reset,
  subtitle,
  mode,
}: ErrorComponentProps) {
  const isDev =
    mode === "dev" ||
    (mode as string !== "prod" &&
      typeof import.meta !== "undefined" &&
      !import.meta.env?.PROD);

  if (!isDev) {
    return <ErrorPage reset={reset} />;
  }

  return (
    <DevErrorDisplay error={error} reset={reset} subtitle={subtitle} />
  );
}
