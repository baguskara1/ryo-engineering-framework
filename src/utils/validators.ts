export function isValidName(name: string): boolean {
    return /^[a-z0-9-]+$/.test(name);
}