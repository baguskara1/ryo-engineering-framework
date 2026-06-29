import { describe, it, expect, afterEach, beforeEach } from "vitest";

import { loadMetadata } from "../src/skills/loadMetadata";
import { createTempDir, cleanupTempDir, createMockFile } from "./helpers/test-utils";

let testDir: string;

describe("loadMetadata", () => {

    beforeEach(() => {
        testDir = createTempDir();
    });

    afterEach(() => {
        cleanupTempDir(testDir);
    });

    it("returns empty object when metadata.yaml does not exist", () => {
        const result = loadMetadata(testDir);
        expect(result).toEqual({});
    });

    it("returns empty object when metadata.yaml is empty", () => {
        createMockFile(testDir, "metadata.yaml", "");
        const result = loadMetadata(testDir);
        expect(result).toEqual({});
    });

    it("parses metadata.yaml content", () => {
        createMockFile(testDir, "metadata.yaml", "name: test-skill\nversion: 1.0.0");
        const result = loadMetadata(testDir) as Record<string, unknown>;
        expect(result.name).toBe("test-skill");
        expect(result.version).toBe("1.0.0");
    });

});
