import { describe, it, expect, afterEach, beforeEach } from "vitest";

import { readSkill } from "../src/utils/readSkill";
import { createTempDir, cleanupTempDir, createMockFile } from "./helpers/test-utils";

let testDir: string;

describe("readSkill", () => {

    beforeEach(() => {
        testDir = createTempDir();
    });

    afterEach(() => {
        cleanupTempDir(testDir);
    });

    it("returns empty string when no skill files exist", () => {
        const result = readSkill(testDir);
        expect(result).toBe("");
    });

    it("reads README.md content", () => {
        createMockFile(testDir, "README.md", "# Test Skill");
        const result = readSkill(testDir);
        expect(result).toContain("# Test Skill");
        expect(result).toContain("README.md");
    });

    it("reads multiple skill files", () => {
        createMockFile(testDir, "README.md", "readme content");
        createMockFile(testDir, "SKILL.md", "skill content");
        const result = readSkill(testDir);
        expect(result).toContain("readme content");
        expect(result).toContain("skill content");
    });

});
