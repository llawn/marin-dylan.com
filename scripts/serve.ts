// Serve the production build from dist/
import { join, normalize } from "node:path";

const root = "dist";
const port = Number(process.env.PORT ?? 3000);

const server = Bun.serve({
    port,
    async fetch(req) {
        let path = normalize(decodeURIComponent(new URL(req.url).pathname));
        if (path.endsWith("/")) path += "index.html";

        const file = Bun.file(join(root, path));
        if (await file.exists()) return new Response(file);

        if (await Bun.file(join(root, path, "index.html")).exists()) {
            return Response.redirect(`${path}/`, 301);
        }
        return new Response("Not Found", { status: 404 });
    },
});

console.log(`Serving ${root}/ at ${server.url}`);
