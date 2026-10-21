// The built site (dist/, made by `astro build`)
import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const page = () => readFileSync("dist/index.html", "utf8");

test("The page is a HTML document and sections well defined", () => {
    const html = page();
    expect(html).toStartWith("<!DOCTYPE html>");
    expect(html).toContain("</html>");
    for (const id of ['id="about"', 'id="contact"', 'class="hero']) expect(html).toContain(id);
});

test("The page shows my photo", () => {
    const html = page();
    expect(html).toMatch(/src="\/_astro\/photo\.[^"]+\.webp"/);
});

test("fonts exist", () => {
    const css = readFileSync("src/styles/fonts.css", "utf8");
    const urls = [...css.matchAll(/url\("\/(.+?)"\)/g)].map((m) => m[1]!);
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) expect(Bun.file(`public/${url}`).size).toBeGreaterThan(0);
});
