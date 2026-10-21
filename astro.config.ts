import { defineConfig } from "astro/config";
import { site } from "./src/site.ts";

export default defineConfig({
    site: site.url,
    scopedStyleStrategy: "class",
    build: {
        inlineStylesheets: "always",
    },
    server: { port: 3000 },
    devToolbar: { enabled: false },
});
