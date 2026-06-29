import fs from "fs-extra";
import os from "os";
import path from "path";
import { randomBytes } from "crypto";

export function createTempDir(): string {
    const dir = path.join(
        os.tmpdir(),
        `ryo-test-${randomBytes(6).toString("hex")}`
    );
    fs.ensureDirSync(dir);
    return dir;
}

export function cleanupTempDir(dir: string): void {
    if (fs.existsSync(dir)) {
        fs.removeSync(dir);
    }
}

export function createMockSkill(dir: string, category: string, name: string): string {
    const skillPath = path.join(dir, "skills", category, name);
    fs.ensureDirSync(skillPath);
    return skillPath;
}

export function createMockFile(dir: string, filePath: string, content: string): string {
    const fullPath = path.join(dir, filePath);
    fs.ensureDirSync(path.dirname(fullPath));
    fs.writeFileSync(fullPath, content, "utf8");
    return fullPath;
}

export function createMockRegistry(dir: string, skills: Array<{ name: string; category: string; version: string }>): string {
    const registryPath = path.join(dir, "registry", "index.json");
    fs.ensureDirSync(path.dirname(registryPath));
    fs.writeJsonSync(registryPath, { skills });
    return registryPath;
}
