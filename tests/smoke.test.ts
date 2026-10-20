import { expect, test } from "bun:test";
import { page } from "../src/page.ts";

// The page renders as a HTML document
test("page renders", () => {
    const html = page();
    expect(html).toStartWith("<!DOCTYPE html>");
    expect(html).toContain("</html>");
});
