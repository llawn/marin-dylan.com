// Inline SVG icons, so pages make no request to a third-party server.
// Each icon is a standalone file in src/assets/icons/.
// Paths from Feather Icons (https://feathericons.com), MIT licence.

import book from "../assets/icons/book.svg?raw";
import github from "../assets/icons/github.svg?raw";
import mail from "../assets/icons/mail.svg?raw";
import mapPin from "../assets/icons/map-pin.svg?raw";
import moon from "../assets/icons/moon.svg?raw";
import sun from "../assets/icons/sun.svg?raw";

// Drop the outer <svg> tag: Icon.astro supplies its own.
const inner = (svg: string) => svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").trim();

export const ICONS = {
    book: inner(book),
    github: inner(github),
    mail: inner(mail),
    mapPin: inner(mapPin),
    moon: inner(moon),
    sun: inner(sun),
} as const;

export type IconName = keyof typeof ICONS;
