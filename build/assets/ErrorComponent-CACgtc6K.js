import{j as r,a as p}from"./index-DVR4eZYB.js";import{E as g}from"./ErrorPage-CvnHME5B.js";const b=`
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
    }

    & .dx-error__btn--copy[data-copied="true"] {
      color: #4ade80;
    }
  }
`;function h(e){return e.map(s=>{const o=s.trim(),a=o.match(/^at\s+(?:(.+?)\s+\()?(.+?):(\d+):(\d+)\)?$/);return a?{fn:a[1]||"",location:`${a[2]}:${a[3]}:${a[4]}`}:{fn:"",location:o}})}function v(e){const s=[];let o=e instanceof Error?e.cause:void 0;for(;o;)s.push(o),o=o instanceof Error?o.cause:void 0;return s}function j(e){return e.includes("/src/")||e.includes("/routes/")||e.includes("/lib/")}function k(e){return navigator.clipboard.writeText(e)}function f({label:e,message:s,stack:o}){const a=o.split(`
`).filter(t=>!t.startsWith(s)&&t.trim()!==""),d=h(a);return r.jsxs("div",{children:[r.jsx("div",{className:"dx-error__header",children:r.jsx("span",{className:"dx-error__badge",children:e})}),r.jsx("div",{className:"dx-error__message",children:s}),d.length>0&&r.jsxs("div",{className:"dx-error__stack",children:[r.jsxs("div",{className:"dx-error__stack-title",children:["Call Stack (",d.length,")"]}),d.map((t,i)=>{const c=j(t.location);return r.jsxs("div",{className:`dx-error__frame${t.fn?"":" dx-error__frame--nofn"}`,"data-own":c,children:[t.fn&&r.jsx("span",{className:"dx-error__frame-fn",children:t.fn}),t.fn&&" ",t.fn?r.jsx("span",{className:"dx-error__frame-loc",children:t.location}):t.location]},i)})]})]})}function y({error:e,reset:s,subtitle:o}){const[a,d]=p.useState(!1),t=e instanceof Error?e.message:String(e),i=e instanceof Error?e.stack??"":"",c=v(e),m=[t];let l=i;for(const n of c){const x=n instanceof Error?n.message:String(n);m.push(x),l+=`
`+(n instanceof Error?n.stack??String(n):String(n))}const _=m.join(`

Caused by: `)+`

`+l;function u(){k(_).then(()=>{d(!0),setTimeout(()=>d(!1),2e3)})}return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:b}),r.jsxs("div",{className:"dx-error","data-dx-version":"1.0.0",children:[r.jsx(f,{label:"Error",message:t,stack:i}),o&&r.jsx("div",{className:"dx-error__subtitle",style:{marginBottom:"0.5rem"},children:o}),c.map((n,x)=>r.jsx("div",{className:"dx-error__cause",children:r.jsx(f,{label:"Caused by",message:n instanceof Error?n.message:String(n),stack:n instanceof Error?n.stack??"":""})},x)),r.jsxs("div",{className:"dx-error__actions",children:[r.jsx("button",{type:"button",onClick:u,className:"dx-error__btn dx-error__btn--copy","data-copied":a,children:a?"Copied!":"Copy error"}),r.jsx("button",{type:"button",onClick:s,className:"dx-error__btn",children:"Try again"})]})]})]})}function w({error:e,reset:s,subtitle:o,mode:a}){return a==="dev"||a!=="prod"&&typeof import.meta<"u"&&!1?r.jsx(y,{error:e,reset:s,subtitle:o}):r.jsx(g,{reset:s})}export{w as E};
