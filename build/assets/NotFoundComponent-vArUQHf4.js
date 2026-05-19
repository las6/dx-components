import{j as e}from"./index-DVR4eZYB.js";const d=`
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

    & .dx-not-found__link {
      padding: 0.35em 0.75em;
      font-size: 0.75rem;
      border: 1px solid var(--dx-border);
      border-radius: 0.25rem;
      background: #1a1a1a;
      color: var(--dx-muted);
      text-decoration: none;
      cursor: pointer;

      &:hover {
        color: var(--dx-text);
      }
    }
  }
`;function n(o){return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:d}),e.jsxs("div",{className:"dx-not-found","data-dx-version":"1.0.0",children:[e.jsx("span",{className:"dx-not-found__badge",children:"404"}),e.jsx("div",{className:"dx-not-found__title",children:"Page not found"}),e.jsx("div",{className:"dx-not-found__message",children:"No route matched this URL."}),e.jsx("a",{className:"dx-not-found__link",href:"/",children:"Go home"})]})]})}export{n as N};
