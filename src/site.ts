/** Shared by every page. */
export const site = {
    url: "https://marin-dylan.dev",
    lang: "en",
    name: { given: "Dylan", family: "Marin" },
    email: "dylan.marin@etu.ec-lyon.fr",
    githubUser: "llawn",
} as const;

export type PersonName = typeof site.name;

export function fullName({ given, family }: PersonName): string {
    return `${family} ${given}`;
}
