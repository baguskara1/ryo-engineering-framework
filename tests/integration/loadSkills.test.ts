import fs from "fs";
import { describe, it, expect, vi, afterEach } from "vitest";

import { loadSkills, clearSkillsCache } from "../../src/skills/loadSkills";
import { loadMetadata } from "../../src/skills/loadMetadata";

vi.mock("../../src/skills/loadMetadata");

describe("loadSkills", () => {

    afterEach(() => {
        vi.restoreAllMocks();
        clearSkillsCache();
    });

    it("returns empty array when skills directory does not exist", () => {
        vi.spyOn(fs, "existsSync").mockReturnValue(false);

        const result = loadSkills();

        expect(result).toEqual([]);
    });

    it("skips categories starting with underscore", () => {
        vi.spyOn(fs, "existsSync").mockReturnValue(true);
        const readdirSync = vi.spyOn(fs, "readdirSync");
        readdirSync
            .mockReturnValueOnce(["_template", "workflow"])
            .mockReturnValueOnce(["kubernetes"]);
        const statSync = vi.spyOn(fs, "statSync");
        statSync.mockReturnValue({ isDirectory: () => true } as unknown as fs.Stats);
        vi.mocked(loadMetadata).mockReturnValue({});

        const result = loadSkills();

        expect(result).toHaveLength(1);
        expect(result[0].category).toBe("workflow");
        expect(result[0].name).toBe("kubernetes");
    });

    it("skips non-directory entries in categories", () => {
        vi.spyOn(fs, "existsSync").mockReturnValue(true);
        const readdirSync = vi.spyOn(fs, "readdirSync");
        readdirSync.mockReturnValueOnce(["file.txt"]);
        const statSync = vi.spyOn(fs, "statSync");
        statSync.mockReturnValue({ isDirectory: () => false } as unknown as fs.Stats);

        const result = loadSkills();

        expect(result).toEqual([]);
    });

    it("skips non-directory entries in skills", () => {
        vi.spyOn(fs, "existsSync").mockReturnValue(true);
        const readdirSync = vi.spyOn(fs, "readdirSync");
        readdirSync
            .mockReturnValueOnce(["workflow"])
            .mockReturnValueOnce(["file.md"]);
        const statSync = vi.spyOn(fs, "statSync");
        statSync
            .mockReturnValueOnce({ isDirectory: () => true } as unknown as fs.Stats)
            .mockReturnValueOnce({ isDirectory: () => false } as unknown as fs.Stats);

        const result = loadSkills();

        expect(result).toEqual([]);
    });

    it("loads skills from valid categories", () => {
        vi.spyOn(fs, "existsSync").mockReturnValue(true);
        const readdirSync = vi.spyOn(fs, "readdirSync");
        readdirSync
            .mockReturnValueOnce(["workflow"])
            .mockReturnValueOnce(["kubernetes"]);
        const statSync = vi.spyOn(fs, "statSync");
        statSync.mockReturnValue({ isDirectory: () => true } as unknown as fs.Stats);
        vi.mocked(loadMetadata).mockReturnValue({ name: "kubernetes" });

        const result = loadSkills();

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({
            category: "workflow",
            name: "kubernetes",
            path: "skills/workflow/kubernetes",
            metadata: { name: "kubernetes" },
        });
    });

});
