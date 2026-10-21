// Light and dark theme

export type Theme = "light" | "dark";

/** To save the theme */
export const THEME_KEY = "theme";

export const isTheme = (value: unknown): value is Theme => value === "light" || value === "dark";

/** CSS applying `declarations` */
export function whenDark(root: string, declarations: string): string {
    return `
      @media (prefers-color-scheme: dark) {
        ${root}:not([data-theme="light"]) {${declarations}}
      }${root}[data-theme="dark"] {${declarations}}
    `;
}
