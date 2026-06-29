import path from "path";

export function getPackageRoot(): string {
    return path.resolve(__dirname, "..", "..");
}

export function resolveAsset(...segments: string[]): string {
    return path.join(getPackageRoot(), ...segments);
}
