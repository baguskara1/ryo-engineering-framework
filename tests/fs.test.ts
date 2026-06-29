import { describe, it, expect, afterEach, beforeEach } from "vitest";

import {
    safeExistsSync,
    safeReadDirSync,
    copyDirectorySync,
    removeDirectorySync,
} from "../src/utils/fs";
import { createTempDir, cleanupTempDir, createMockFile } from "./helpers/test-utils";

let testDir: string;

describe("fs utilities", () => {

    beforeEach(() => {
        testDir = createTempDir();
    });

    afterEach(() => {
        cleanupTempDir(testDir);
    });

    it("safeExistsSync returns true for existing path", () => {
        expect(safeExistsSync(testDir)).toBe(true);
    });

    it("safeExistsSync returns false for non-existing path", () => {
        expect(safeExistsSync(createTempDir() + "-nonexistent")).toBe(false);
    });

    it("safeReadDirSync returns contents of directory", () => {
        createMockFile(testDir, "test.txt", "hello");
        const contents = safeReadDirSync(testDir);
        expect(contents).toContain("test.txt");
    });

    it("safeReadDirSync returns empty array for non-existing directory", () => {
        const contents = safeReadDirSync(createTempDir() + "-nonexistent");
        expect(contents).toEqual([]);
    });

    it("copyDirectorySync copies directory recursively", () => {
        createMockFile(testDir, "file.txt", "content");
        const dest = createTempDir();
        try {
            copyDirectorySync(testDir, dest);
            expect(safeExistsSync(dest)).toBe(true);
        } finally {
            cleanupTempDir(dest);
        }
    });

    it("removeDirectorySync removes directory", () => {
        const dir = createTempDir();
        expect(safeExistsSync(dir)).toBe(true);
        removeDirectorySync(dir);
        expect(safeExistsSync(dir)).toBe(false);
    });

});
