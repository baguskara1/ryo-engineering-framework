import fs from "fs-extra";
import { logger } from "./logger";

// Sync versions for use in synchronous command handlers
export function safeExistsSync(path: string): boolean {
    try {
        return fs.existsSync(path);
    } catch {
        return false;
    }
}

export function safeReadDirSync(path: string): string[] {
    try {
        return fs.readdirSync(path);
    } catch {
        return [];
    }
}

export function copyDirectorySync(src: string, dest: string): void {
    try {
        fs.copySync(src, dest);
    } catch (error) {
        logger.error(`Failed to copy directory from ${src} to ${dest}: ${error}`);
        throw error;
    }
}

export function removeDirectorySync(path: string): void {
    try {
        fs.removeSync(path);
    } catch (error) {
        logger.error(`Failed to remove directory ${path}: ${error}`);
        throw error;
    }
}
