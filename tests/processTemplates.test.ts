import fs from "fs";
import path from "path";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { processTemplates } from "../src/utils/processTemplates";

const testDir = path.join(__dirname, "..", ".test-tmp-process");

describe("processTemplates", () => {
    beforeEach(() => {
        fs.mkdirSync(testDir, { recursive: true });
    });

    afterEach(() => {
        if (fs.existsSync(testDir)) {
            fs.rmSync(testDir, { recursive: true, force: true });
        }
    });

    it("replaces {{VAR}} placeholders in files", () => {
        const testFile = path.join(testDir, "test.txt");
        fs.writeFileSync(testFile, "Hello {{NAME}} from {{ORG}}!", "utf8");

        processTemplates(testDir, { NAME: "World", ORG: "Ryo" });

        const content = fs.readFileSync(testFile, "utf8");
        expect(content).toBe("Hello World from Ryo!");
    });

    it("processes nested directories recursively", () => {
        const subDir = path.join(testDir, "sub");
        fs.mkdirSync(subDir, { recursive: true });
        fs.writeFileSync(path.join(subDir, "nested.txt"), "{{VALUE}}", "utf8");

        processTemplates(testDir, { VALUE: "processed" });

        const content = fs.readFileSync(path.join(subDir, "nested.txt"), "utf8");
        expect(content).toBe("processed");
    });

    it("handles files without placeholders", () => {
        const testFile = path.join(testDir, "test.txt");
        fs.writeFileSync(testFile, "No placeholders here", "utf8");

        processTemplates(testDir, { NAME: "World" });

        const content = fs.readFileSync(testFile, "utf8");
        expect(content).toBe("No placeholders here");
    });

    it("does nothing when directory has no text files", () => {
        processTemplates(testDir, { NAME: "World" });
        expect(fs.readdirSync(testDir)).toEqual([]);
    });
});
