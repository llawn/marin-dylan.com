// Builds the site into dist/
import { cp, rm } from "node:fs/promises";
import { page } from "../src/page.ts";

const outdir = "dist";

await rm(outdir, { recursive: true, force: true });
await Bun.write(`${outdir}/index.html`, page());

// Static files copied as-is (e.g. .htaccess)
await cp("public", outdir, { recursive: true });

console.log(`Built into ${outdir}/`);
