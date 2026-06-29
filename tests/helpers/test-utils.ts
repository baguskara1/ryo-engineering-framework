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

export function createMockFile(dir: string, filePath: string, content: string): string {
    const fullPath = path.join(dir, filePath);
    fs.ensureDirSync(path.dirname(fullPath));
    fs.writeFileSync(fullPath, content, "utf8");
    return fullPath;
}
