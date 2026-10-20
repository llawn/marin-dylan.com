// Dev server.
// Each request renders the page in a fresh Bun process, so it always shows the saved files,
// and an error in them is shown in the browser instead of stopping the server (unlike `bun --watch`).

const port = Number(process.env.PORT ?? 3000);
const RENDER = 'import { page } from "./src/page.ts"; process.stdout.write(page());';

async function render(): Promise<Response> {
    const proc = Bun.spawn(["bun", "-e", RENDER], { stdout: "pipe", stderr: "pipe" });
    const [html, error, code] = await Promise.all([
        new Response(proc.stdout).text(),
        new Response(proc.stderr).text(),
        proc.exited,
    ]);
    if (code !== 0) return new Response(error, { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

const server = Bun.serve({ port, routes: { "/": render } });

console.log(`Dev server at ${server.url}`);
