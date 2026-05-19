import { useState, useCallback, useMemo } from "react";
import { ErrorComponent } from "../../components/ErrorComponent";
import { ErrorPage } from "../../components/ErrorPage";
import { NotFoundComponent } from "../../components/NotFoundComponent";
import { PendingComponent } from "../../components/PendingComponent";

type View = "error-dev" | "error-prod" | "error-page" | "flaky" | "notFound" | "pending";
type ErrorType = "basic" | "chained" | "string" | "noStack" | "deepRecursion";

interface ViewDef {
  key: View;
  label: string;
}

const views: ViewDef[] = [
  { key: "error-dev", label: "Error (dev)" },
  { key: "error-prod", label: "Error (prod)" },
  { key: "error-page", label: "ErrorPage" },
  { key: "flaky", label: "Flaky route" },
  { key: "notFound", label: "NotFound" },
  { key: "pending", label: "Pending" },
];

function makeError(type: ErrorType): unknown {
  switch (type) {
    case "chained":
      return new Error("Could not load user data", {
        cause: new Error("Database connection refused", {
          cause: new Error("ECONNREFUSED 127.0.0.1:5432"),
        }),
      });
    case "string":
      return "Raw string error thrown without Error constructor";
    case "noStack": {
      const e = new Error("Error with no stack trace available");
      Object.defineProperty(e, "stack", { value: undefined });
      return e;
    }
    case "deepRecursion": {
      const e = new Error("Maximum call stack size exceeded");
      e.stack =
        "RangeError: Maximum call stack size exceeded\n" +
        "    at deep (/src/utils/deep.ts:15:12)\n" +
        Array.from({ length: 25 }, (_, i) =>
          `    at deep (/src/utils/deep.ts:12:5) [as ${i}]`,
        ).join("\n") +
        "\n    at Object.<anonymous> (/src/utils/deep.ts:42:1)\n" +
        "    at Module._compile (node:internal/modules/cjs/loader:1521:14)\n" +
        "    at Module._extensions..js (node:internal/modules/cjs/loader:1623:10)\n" +
        "    at Module.load (node:internal/modules/cjs/loader:1266:32)\n" +
        "    at Module._load (node:internal/modules/cjs/loader:1091:12)\n" +
        "    at TracingChannel.traceSync (node:diagnostics_channel:322:14)\n" +
        "    at wrapModuleLoad (node:internal/modules/cjs/loader:217:24)\n" +
        "    at Module.executeUserEntryPoint (node:internal/modules/run_main:170:5)";
      return e;
    }
    default:
      return new Error("Could not load user data — database connection refused");
  }
}

export function App() {
  const [view, setView] = useState<View>("error-dev");
  const [errorType, setErrorType] = useState<ErrorType>("basic");

  const error = useMemo(() => makeError(errorType), [errorType]);

  return (
    <div>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          flexWrap: "wrap",
          gap: "0.35rem",
          padding: "0.5rem 2rem",
          background: "#111",
          borderBottom: "1px solid #2a2a2a",
        }}
      >
        {views.map((v) => (
          <button
            key={v.key}
            type="button"
            onClick={() => setView(v.key)}
            style={{
              padding: "0.3rem 0.6rem",
              cursor: "pointer",
              fontSize: "11px",
              border: "1px solid #333",
              borderRadius: "4px",
              background: view === v.key ? "#333" : "#1a1a1a",
              color: view === v.key ? "#fff" : "#888",
              fontFamily: "monospace",
            }}
          >
            {v.label}
          </button>
        ))}
      </nav>

      <div style={{ paddingTop: "3rem" }}>
        {(view === "error-dev" || view === "error-prod") && (
          <div>
            <div
              style={{
                padding: "0.5rem 2rem",
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              {(["basic", "chained", "string", "noStack", "deepRecursion"] as ErrorType[]).map(
                (t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setErrorType(t)}
                    style={{
                      padding: "0.25rem 0.5rem",
                      cursor: "pointer",
                      fontSize: "11px",
                      border: "1px solid #333",
                      borderRadius: "3px",
                      background: errorType === t ? "#2a2a2a" : "#1a1a1a",
                      color: errorType === t ? "#e8e8e8" : "#888",
                      fontFamily: "monospace",
                    }}
                  >
                    {t}
                  </button>
                ),
              )}
            </div>
            <ErrorComponent
              error={error}
              reset={() => setErrorType((t) => t)}
              subtitle="Loader or server function threw"
              mode={view === "error-prod" ? "prod" : "dev"}
            />
          </div>
        )}

        {view === "error-page" && (
          <ErrorPage
            reset={() => window.location.reload()}
          />
        )}

        {view === "flaky" && <FlakyView />}

        {view === "notFound" && <NotFoundComponent />}
        {view === "pending" && <PendingComponent />}
      </div>
    </div>
  );
}

function FlakyView() {
  const [key, setKey] = useState(0);
  const [failureRate, setFailureRate] = useState(30);
  const [lastResult, setLastResult] = useState<"success" | "fail" | null>(null);

  const reset = useCallback(() => {
    setKey((k) => k + 1);
    setLastResult(null);
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <div
        style={{
          background: "#111",
          border: "1px solid #2a2a2a",
          borderRadius: "6px",
          padding: "1rem",
          marginBottom: "1rem",
          maxWidth: "400px",
        }}
      >
        <div style={{ color: "#888", fontSize: "12px", marginBottom: "0.5rem" }}>
          Failure rate: {failureRate}%
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={failureRate}
          onChange={(e) => {
            setFailureRate(Number(e.target.value));
            reset();
          }}
          style={{ width: "100%" }}
        />
      </div>

      <ErrorBoundary key={key} failureRate={failureRate} setLastResult={setLastResult} onReset={reset} />

      {lastResult && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            fontSize: "12px",
            background: lastResult === "success" ? "#1a2a1a" : "#2a1a1a",
            color: lastResult === "success" ? "#4ade80" : "#ff6b6b",
          }}
        >
          Last attempt: {lastResult === "success" ? "Passed" : "Failed"}
        </div>
      )}
    </div>
  );
}

function ErrorBoundary({
  failureRate,
  setLastResult,
  onReset,
}: {
  failureRate: number;
  setLastResult: (r: "success" | "fail") => void;
  onReset: () => void;
}) {
  try {
    if (Math.random() * 100 < failureRate) {
      throw new Error(
        `Simulated random failure (${failureRate}% chance) — render #${Math.random().toString(36).slice(2, 6)}`,
      );
    }
    setLastResult("success");
    return (
      <div style={{ color: "#4ade80", fontSize: "14px" }}>
        Page loaded successfully
      </div>
    );
  } catch (e) {
    setLastResult("fail");
    return (
      <ErrorComponent
        error={e as Error}
        reset={onReset}
        subtitle={`Random error at ${failureRate}% failure rate`}
      />
    );
  }
}
