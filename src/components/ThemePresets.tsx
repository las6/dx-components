import { useState, useEffect } from "react";

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

interface Props {
  children: React.ReactNode;
}

export default function ThemePresets({ children }: Props) {
  const [preset, setPreset] = useState<Preset>("dark");

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "dx-preset-css";
    style.textContent = PRESET_CSS;
    if (!document.getElementById("dx-preset-css")) {
      document.head.appendChild(style);
    }
    return () => {
      const el = document.getElementById("dx-preset-css");
      if (el) el.remove();
    };
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "0.25rem",
          padding: "0.5rem",
          background: "var(--sl-color-gray-6)",
          borderRadius: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        {(Object.keys(LABELS) as Preset[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setPreset(key)}
            style={{
              padding: "0.25rem 0.75rem",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontSize: "0.8125rem",
              fontFamily: "inherit",
              background:
                preset === key
                  ? "var(--sl-color-accent)"
                  : "transparent",
              color:
                preset === key
                  ? "var(--sl-color-white)"
                  : "var(--sl-color-gray-2)",
            }}
          >
            {LABELS[key]}
          </button>
        ))}
      </div>
      <div data-dx-preset={preset}>{children}</div>
    </>
  );
}
