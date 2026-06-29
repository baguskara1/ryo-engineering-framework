import fs from "fs";
import path from "path";

function getPackageRoot(): string {
    return path.resolve(__dirname, "..", "..");
}

export function resolveAsset(...segments: string[]): string {
    return path.join(getPackageRoot(), ...segments);
}

let cachedVersion: string | null = null;

export function getPackageVersion(): string {
    if (cachedVersion) return cachedVersion;
    const pkgPath = path.join(getPackageRoot(), "package.json");
    const pkg: Record<string, unknown> = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    cachedVersion = String(pkg.version ?? "0.0.0");
    return cachedVersion;
}
