// The theme of the page in the browser.

import { isTheme, THEME_KEY, type Theme } from "../lib/theme.ts";

const root = document.documentElement;
const systemDark = matchMedia("(prefers-color-scheme: dark)");
const CHANGE = "themechange";

export function chosenTheme(): Theme | undefined {
    const theme = root.dataset.theme;
    return isTheme(theme) ? theme : undefined;
}

export const shownTheme = (): Theme => chosenTheme() ?? (systemDark.matches ? "dark" : "light");

/** Save the choice */
export function chooseTheme(theme: Theme): void {
    root.dataset.theme = theme;
    try {
        localStorage.setItem(THEME_KEY, theme);
    } catch {
        // Storage refused (private browsing)
    }
    document.dispatchEvent(new Event(CHANGE));
}

/** Calls `listener` whenever the theme shown may have changed. */
export function onThemeChange(listener: () => void): void {
    systemDark.addEventListener("change", listener);
    document.addEventListener(CHANGE, listener);
}
