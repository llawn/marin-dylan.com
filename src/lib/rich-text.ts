/** Text that may contain **bold** spans. */
export type RichText = string;

/** The spans of a rich text just like markdown */
export function spans(text: RichText): { text: string; bold: boolean }[] {
    return text
        .split("**")
        .map((part, i) => ({ text: part, bold: i % 2 === 1 }))
        .filter((span) => span.text !== "");
}
