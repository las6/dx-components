import type { GlobalProvider } from "@ladle/react";
import { useState } from "react";

type Preset = "dark" | "light" | "minimal" | "inherit";

const PRESET_CSS = `
[data-dx-preset="dark"] .dx-error,
[data-dx-preset="dark"] .dx-error-page,
[data-dx-preset="dark"] .dx-not-found,
[data-dx-preset="dark"] .dx-pending {
  --dx-bg: #0d0d0d;
  --dx-text: #e8e8e8;
  --dx-muted: #888;
  --dx-accent: #c00;
  --dx-surface: #161616;
  --dx-border: #2a2a2a;
  --dx-font: "Geist Mono", "Fira Code", monospace;
}

[data-dx-preset="light"] .dx-error,
[data-dx-preset="light"] .dx-error-page,
[data-dx-preset="light"] .dx-not-found,
[data-dx-preset="light"] .dx-pending {
  --dx-bg: #fff;
  --dx-text: #111;
  --dx-muted: #666;
  --dx-accent: #d00;
  --dx-surface: #f5f5f5;
  --dx-border: #ddd;
  --dx-font: system-ui, -apple-system, sans-serif;
}

[data-dx-preset="minimal"] .dx-error,
[data-dx-preset="minimal"] .dx-error-page,
[data-dx-preset="minimal"] .dx-not-found,
[data-dx-preset="minimal"] .dx-pending {
  --dx-bg: transparent;
  --dx-text: currentColor;
  --dx-muted: #999;
  --dx-accent: #e00;
  --dx-surface: transparent;
  --dx-border: transparent;
  --dx-font: inherit;
}

[data-dx-preset="inherit"] .dx-error,
[data-dx-preset="inherit"] .dx-error-page,
[data-dx-preset="inherit"] .dx-not-found,
[data-dx-preset="inherit"] .dx-pending {
  --dx-bg: inherit;
  --dx-text: inherit;
  --dx-muted: inherit;
  --dx-accent: inherit;
  --dx-surface: inherit;
  --dx-border: inherit;
  --dx-font: inherit;
}
`;

const LABELS: Record<Preset, string> = {
  dark: "Dark",
  light: "Light",
  minimal: "Minimal",
  inherit: "Inherit",
};

export const Provider: GlobalProvider = ({ children }) => {
  const [preset, setPreset] = useState<Preset>("dark");

  return (
    <>
      <style>{PRESET_CSS}</style>
      <div data-dx-preset={preset}>
        <div
          style={{
            position: "fixed",
            top: "0.25rem",
            right: "10rem",
            zIndex: 1000,
            display: "flex",
            gap: "0.25rem",
            background: "#1e1e1e",
            border: "1px solid #333",
            borderRadius: "0.375rem",
            padding: "0.25rem",
          }}
        >
          {(Object.keys(LABELS) as Preset[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setPreset(key)}
              style={{
                padding: "0.125rem 0.5rem",
                border: "none",
                borderRadius: "0.25rem",
                cursor: "pointer",
                fontSize: "0.6875rem",
                fontFamily: "inherit",
                background: preset === key ? "#333" : "transparent",
                color: preset === key ? "#e8e8e8" : "#888",
              }}
            >
              {LABELS[key]}
            </button>
          ))}
        </div>
        {children}
      </div>
    </>
  );
};
