import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import fs from "fs-extra";
import { logger } from "../src/utils/logger";

import {
    safeExistsSync,
    safeReadDirSync,
    copyDirectorySync,
    removeDirectorySync,
} from "../src/utils/fs";
import { createTempDir, cleanupTempDir, createMockFile } from "./helpers/test-utils";

describe("fs utilities", () => {

    let testDir: string;

    beforeEach(() => {
        testDir = createTempDir();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        cleanupTempDir(testDir);
    });

    describe("safeExistsSync", () => {

        it("returns true for existing path", () => {
            expect(safeExistsSync(testDir)).toBe(true);
        });

        it("returns false for non-existing path", () => {
            expect(safeExistsSync(createTempDir() + "-nonexistent")).toBe(false);
        });

        it("returns false when fs.existsSync throws", () => {
            vi.spyOn(fs, "existsSync").mockImplementation(() => {
                throw new Error("unexpected");
            });
            expect(safeExistsSync("/any")).toBe(false);
        });
    });

    describe("safeReadDirSync", () => {

        it("returns contents of directory", () => {
            createMockFile(testDir, "test.txt", "hello");
            const contents = safeReadDirSync(testDir);
            expect(contents).toContain("test.txt");
        });

        it("returns empty array for non-existing directory", () => {
            const contents = safeReadDirSync(createTempDir() + "-nonexistent");
            expect(contents).toEqual([]);
        });

        it("returns empty array when fs.readdirSync throws", () => {
            vi.spyOn(fs, "readdirSync").mockImplementation(() => {
                throw new Error("EACCES");
            });
            expect(safeReadDirSync("/bad")).toEqual([]);
        });
    });

    describe("copyDirectorySync", () => {

        it("copies directory recursively", () => {
            createMockFile(testDir, "file.txt", "content");
            const dest = createTempDir();
            try {
                copyDirectorySync(testDir, dest);
                expect(safeExistsSync(dest)).toBe(true);
                expect(safeExistsSync(dest + "/file.txt")).toBe(true);
            } finally {
                cleanupTempDir(dest);
            }
        });

        it("throws when fs.copySync fails", () => {
            const loggerSpy = vi.spyOn(logger, "error").mockImplementation(() => {});
            vi.spyOn(fs, "copySync").mockImplementation(() => {
                throw new Error("ENOENT");
            });
            expect(() => copyDirectorySync("/src", "/bad")).toThrow("ENOENT");
            expect(loggerSpy).toHaveBeenCalled();
        });
    });

    describe("removeDirectorySync", () => {

        it("removes directory", () => {
            const dir = createTempDir();
            expect(safeExistsSync(dir)).toBe(true);
            removeDirectorySync(dir);
            expect(safeExistsSync(dir)).toBe(false);
        });

        it("throws when fs.removeSync fails", () => {
            const loggerSpy = vi.spyOn(logger, "error").mockImplementation(() => {});
            vi.spyOn(fs, "removeSync").mockImplementation(() => {
                throw new Error("EBUSY");
            });
            expect(() => removeDirectorySync("/locked")).toThrow("EBUSY");
            expect(loggerSpy).toHaveBeenCalled();
        });
    });
});
