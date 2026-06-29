import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import fs from "fs-extra";
import { logger } from "../src/utils/logger";
import * as yaml from "yaml";

import {
    ensureDirectory,
    copyDirectory,
    removeDirectory,
    readYaml,
    writeYaml,
    safeExists,
    safeReadDir,
    safeExistsSync,
    safeReadDirSync,
    copyDirectorySync,
    removeDirectorySync,
} from "../src/utils/fs";
import { createTempDir, cleanupTempDir, createMockFile } from "./helpers/test-utils";

vi.mock("yaml", () => ({
    parse: vi.fn(),
    stringify: vi.fn(() => "stringified: content"),
}));

const mockYaml = vi.mocked(yaml);

describe("fs utilities", () => {

    let testDir: string;

    beforeEach(() => {
        testDir = createTempDir();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        cleanupTempDir(testDir);
    });

    describe("ensureDirectory", () => {

        it("resolves when fs.ensureDir succeeds", async () => {
            const spy = vi.spyOn(fs, "ensureDir").mockResolvedValue();
            await expect(ensureDirectory("/some/path")).resolves.toBeUndefined();
            expect(spy).toHaveBeenCalledWith("/some/path");
        });

        it("throws when fs.ensureDir fails", async () => {
            const loggerSpy = vi.spyOn(logger, "error").mockImplementation(() => {});
            const spy = vi.spyOn(fs, "ensureDir").mockRejectedValue(new Error("EACCES"));
            await expect(ensureDirectory("/bad")).rejects.toThrow("EACCES");
            expect(spy).toHaveBeenCalledWith("/bad");
            expect(loggerSpy).toHaveBeenCalled();
        });
    });

    describe("copyDirectory", () => {

        it("resolves when fs.copy succeeds", async () => {
            const spy = vi.spyOn(fs, "copy").mockResolvedValue();
            await expect(copyDirectory("/src", "/dest")).resolves.toBeUndefined();
            expect(spy).toHaveBeenCalledWith("/src", "/dest");
        });

        it("throws when fs.copy fails", async () => {
            const loggerSpy = vi.spyOn(logger, "error").mockImplementation(() => {});
            const spy = vi.spyOn(fs, "copy").mockRejectedValue(new Error("ENOENT"));
            await expect(copyDirectory("/src", "/bad")).rejects.toThrow("ENOENT");
            expect(spy).toHaveBeenCalledWith("/src", "/bad");
            expect(loggerSpy).toHaveBeenCalled();
        });
    });

    describe("removeDirectory", () => {

        it("resolves when fs.remove succeeds", async () => {
            const spy = vi.spyOn(fs, "remove").mockResolvedValue();
            await expect(removeDirectory("/dir")).resolves.toBeUndefined();
            expect(spy).toHaveBeenCalledWith("/dir");
        });

        it("throws when fs.remove fails", async () => {
            const loggerSpy = vi.spyOn(logger, "error").mockImplementation(() => {});
            const spy = vi.spyOn(fs, "remove").mockRejectedValue(new Error("EBUSY"));
            await expect(removeDirectory("/locked")).rejects.toThrow("EBUSY");
            expect(spy).toHaveBeenCalledWith("/locked");
            expect(loggerSpy).toHaveBeenCalled();
        });
    });

    describe("readYaml", () => {

        it("returns parsed YAML when file read succeeds", async () => {
            const yamlContent = "key: value\nnested:\n  foo: bar\n";
            const expected = { key: "value", nested: { foo: "bar" } };
            mockYaml.parse.mockReturnValue(expected);
            vi.spyOn(fs, "readFile").mockResolvedValue(yamlContent);

            const result = await readYaml<Record<string, unknown>>("/file.yaml");
            expect(result).toEqual(expected);
            expect(mockYaml.parse).toHaveBeenCalledWith(yamlContent);
        });

        it("throws when file read fails", async () => {
            const loggerSpy = vi.spyOn(logger, "error").mockImplementation(() => {});
            vi.spyOn(fs, "readFile").mockRejectedValue(new Error("ENOENT"));
            await expect(readYaml("/missing.yaml")).rejects.toThrow("ENOENT");
            expect(loggerSpy).toHaveBeenCalled();
        });
    });

    describe("writeYaml", () => {

        it("writes stringified YAML when fs.writeFile succeeds", async () => {
            const data = { name: "test", version: "1.0" };
            mockYaml.stringify.mockReturnValue("name: test\nversion: '1.0'\n");
            const spy = vi.spyOn(fs, "writeFile").mockResolvedValue();

            await writeYaml("/out.yaml", data);
            expect(mockYaml.stringify).toHaveBeenCalledWith(data);
            expect(spy).toHaveBeenCalledWith("/out.yaml", "name: test\nversion: '1.0'\n", "utf8");
        });

        it("throws when fs.writeFile fails", async () => {
            const loggerSpy = vi.spyOn(logger, "error").mockImplementation(() => {});
            mockYaml.stringify.mockReturnValue("data: val\n");
            vi.spyOn(fs, "writeFile").mockRejectedValue(new Error("EACCES"));

            await expect(writeYaml("/readonly.yaml", { data: "val" })).rejects.toThrow("EACCES");
            expect(loggerSpy).toHaveBeenCalled();
        });
    });

    describe("safeExists", () => {

        it("returns true when path exists", async () => {
            vi.spyOn(fs, "pathExists").mockResolvedValue(true);
            await expect(safeExists("/exists")).resolves.toBe(true);
        });

        it("returns false when path does not exist", async () => {
            vi.spyOn(fs, "pathExists").mockResolvedValue(false);
            await expect(safeExists("/missing")).resolves.toBe(false);
        });

        it("returns false when fs.pathExists throws", async () => {
            const loggerSpy = vi.spyOn(logger, "error").mockImplementation(() => {});
            vi.spyOn(fs, "pathExists").mockRejectedValue(new Error("EACCES"));
            await expect(safeExists("/inaccessible")).resolves.toBe(false);
            expect(loggerSpy).toHaveBeenCalled();
        });
    });

    describe("safeReadDir", () => {

        it("returns directory entries when read succeeds", async () => {
            const entries = ["a.txt", "b.txt", "sub"];
            vi.spyOn(fs, "readdir").mockResolvedValue(entries);
            await expect(safeReadDir("/dir")).resolves.toEqual(entries);
        });

        it("returns empty array when read fails", async () => {
            const loggerSpy = vi.spyOn(logger, "error").mockImplementation(() => {});
            vi.spyOn(fs, "readdir").mockRejectedValue(new Error("ENOENT"));
            await expect(safeReadDir("/missing")).resolves.toEqual([]);
            expect(loggerSpy).toHaveBeenCalled();
        });
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
