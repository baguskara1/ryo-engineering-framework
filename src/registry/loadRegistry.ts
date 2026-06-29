import fs from "fs";
import path from "path";

export interface RegistrySkill {
    name: string;
    category: string;
    version: string;
}

interface RegistryFile {
    skills: RegistrySkill[];
}

let cache: RegistrySkill[] | null = null;

export function getRegistryPath(): string {
    return path.join("registry", "index.json");
}

export function loadRegistry(): RegistrySkill[] {
    if (cache) return cache;

    const registryPath = getRegistryPath();

    if (!fs.existsSync(registryPath)) {
        cache = [];
        return cache;
    }

    try {
        const content = fs.readFileSync(registryPath, "utf8");
        const registry: RegistryFile = JSON.parse(content);
        cache = registry.skills;
        return cache;
    } catch {
        cache = [];
        return cache;
    }
}

export function findInRegistry(name: string): RegistrySkill | undefined {
    return loadRegistry().find(s => s.name === name);
}

export function searchInRegistry(keyword: string): RegistrySkill[] {
    const kw = keyword.toLowerCase();
    return loadRegistry().filter(s =>
        s.name.toLowerCase().includes(kw) ||
        s.category.toLowerCase().includes(kw)
    );
}

export function clearRegistryCache(): void {
    cache = null;
}
