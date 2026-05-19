import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://las6.github.io/dx-components",
  integrations: [
    starlight({
      title: "dx-components",
      description: "Copy-paste-ready DX components for Vite + TanStack",
      favicon: "/favicon.svg",
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/las6/dx-components" },
      ],
      sidebar: [
        {
          label: "Components",
          items: [
            { label: "ErrorComponent", link: "/" },
            { label: "ErrorPage", link: "/errorpage" },
            { label: "NotFoundComponent", link: "/notfoundcomponent" },
            { label: "PendingComponent", link: "/pendingcomponent" },
          ],
        },
        {
          label: "Guides",
          items: [
            { label: "Error Reporting", link: "/error-reporting" },
            { label: "Installation", link: "/installation" },
            { label: "Theming", link: "/theming" },
          ],
        },
      ],
      customCss: ["./src/styles/custom.css"],
    }),
    react(),
  ],
});
