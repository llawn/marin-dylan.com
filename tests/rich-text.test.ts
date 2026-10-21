import { expect, test } from "bun:test";
import { spans } from "../src/lib/rich-text.ts";

test("**spans** are bold in RichText", () => {
    expect(spans("I study at **Centrale Lyon** and **Lyon 1**.")).toEqual([
        { text: "I study at ", bold: false },
        { text: "Centrale Lyon", bold: true },
        { text: " and ", bold: false },
        { text: "Lyon 1", bold: true },
        { text: ".", bold: false },
    ]);
});
