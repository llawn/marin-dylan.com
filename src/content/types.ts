import type { ImageMetadata } from "astro";
import type { RichText } from "../lib/rich-text.ts";

export interface Hero {
    tagline: string;
    school: string;
    location: string;
    availability: string;
    photo: {
        src: ImageMetadata;
        alt: string;
    };
}

export interface Contact {
    emailSubject: string;
    emailBody: string;
}

/** Text of the home page. */
export interface HomeContent {
    description: string;
    hero: Hero;
    about: RichText;
    contact: Contact;
    labels: {
        about: string;
        contact: string;
        emailButton: string;
    };
}
