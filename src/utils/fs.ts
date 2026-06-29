import fs from "fs-extra";
import { parse, stringify } from "yaml";
import { logger } from "./logger";

export async function ensureDirectory(path: string): Promise<void> {
    try {
        await fs.ensureDir(path);
    } catch (error) {
        logger.error(`Failed to ensure directory ${path}: ${error}`);
        throw error;
    }
}

export async function copyDirectory(src: string, dest: string): Promise<void> {
    try {
        await fs.copy(src, dest);
    } catch (error) {
        logger.error(`Failed to copy directory from ${src} to ${dest}: ${error}`);
        throw error;
    }
}

export async function removeDirectory(path: string): Promise<void> {
    try {
        await fs.remove(path);
    } catch (error) {
        logger.error(`Failed to remove directory ${path}: ${error}`);
        throw error;
    }
}

export async function readYaml<T>(path: string): Promise<T> {
    try {
        const content = await fs.readFile(path, "utf8");
        return parse(content) as T;
    } catch (error) {
        logger.error(`Failed to read YAML file ${path}: ${error}`);
        throw error;
    }
}

export async function writeYaml(path: string, data: Record<string, unknown>): Promise<void> {
    try {
        const content = stringify(data);
        await fs.writeFile(path, content, "utf8");
    } catch (error) {
        logger.error(`Failed to write YAML file ${path}: ${error}`);
        throw error;
    }
}

export async function safeExists(path: string): Promise<boolean> {
    try {
        return await fs.pathExists(path);
    } catch (error) {
        logger.error(`Failed to check existence of ${path}: ${error}`);
        return false;
    }
}

export async function safeReadDir(path: string): Promise<string[]> {
    try {
        return await fs.readdir(path);
    } catch (error) {
        logger.error(`Failed to read directory ${path}: ${error}`);
        return [];
    }
}

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
