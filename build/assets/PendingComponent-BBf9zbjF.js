import{a as n,j as e}from"./index-DVR4eZYB.js";const s=`
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
`;function i(){const[d,r]=n.useState("");return n.useEffect(()=>{const o=setInterval(()=>{r(t=>t.length>=3?"":t+".")},400);return()=>clearInterval(o)},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:s}),e.jsx("div",{className:"dx-pending","data-dx-version":"1.0.0",children:e.jsxs("span",{className:"dx-pending__text",children:["Loading",d]})})]})}export{i as P};
