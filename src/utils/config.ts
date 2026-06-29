import fs from "fs";
import path from "path";

export interface RyoConfig {
    registryUrl?: string;
    skillsDir?: string;
    verbose?: boolean;
}

let cachedConfig: RyoConfig | null = null;

function findConfigPath(): string | null {
    let current = process.cwd();
    const root = path.parse(current).root;
    let depth = 0;
    const MAX_DEPTH = 20;

    while (current !== root && depth < MAX_DEPTH) {
        const configPath = path.join(current, "ryo.json");
        if (fs.existsSync(configPath)) {
            return configPath;
        }
        current = path.dirname(current);
        depth++;
    }

    return null;
}

export function loadConfig(): RyoConfig {
    if (cachedConfig) return cachedConfig;

    const configPath = findConfigPath();

    if (!configPath) {
        cachedConfig = {};
        return cachedConfig;
    }

    try {
        const content = fs.readFileSync(configPath, "utf8");
        cachedConfig = JSON.parse(content) as RyoConfig;
        return cachedConfig;
    } catch {
        cachedConfig = {};
        return cachedConfig;
    }
}

export function getConfig(): RyoConfig {
    return cachedConfig || loadConfig();
}

export function isVerbose(): boolean {
    return getConfig().verbose === true;
}

export function clearConfigCache(): void {
    cachedConfig = null;
}
