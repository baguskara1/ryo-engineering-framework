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

export function loadRegistry(): RegistrySkill[] {

    const registryPath = path.join(
        "registry",
        "index.json"
    );

    if (!fs.existsSync(registryPath)) {
        return [];
    }

    const content = fs.readFileSync(
        registryPath,
        "utf8"
    );

    const registry: RegistryFile = JSON.parse(content);

    return registry.skills;
}