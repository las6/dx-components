import { defineConfig } from "vitepress";

export default defineConfig({
  title: "dx-components",
  description: "Copy-paste-ready DX components for Vite + TanStack",
  themeConfig: {
    outline: { level: [2, 3], label: "On this page" },
    nav: [
      { text: "GitHub", link: "https://github.com/las6/dx-components" },
    ],
    sidebar: [
      {
        text: "Components",
        items: [
          { text: "ErrorComponent", link: "/#errorcomponent" },
          { text: "ErrorPage", link: "/#errorpage" },
          { text: "NotFoundComponent", link: "/#notfoundcomponent" },
          { text: "PendingComponent", link: "/#pendingcomponent" },
        ],
      },
      {
        text: "Guides",
        items: [
          { text: "Error Reporting", link: "/#error-reporting" },
          { text: "Installation", link: "/#installation" },
          { text: "Theming", link: "/#theming" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/las6/dx-components" },
    ],
  },
});
