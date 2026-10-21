export function mailto(email: string, subject: string, body: string): string {
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function githubProfile(user: string): string {
    return `https://github.com/${user}`;
}
