import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { execa } from "execa";
import fs from "fs";
import path from "path";

const category = "testing";
const skill = "demo-skill";
const skillPath = path.join("skills", category, skill);

describe("CLI Create", () => {

    beforeEach(() => {
        fs.rmSync(skillPath, {
            recursive: true,
            force: true,
        });
    });

    afterEach(() => {
        fs.rmSync(skillPath, {
            recursive: true,
            force: true,
        });
    });

    it("creates a new skill", async () => {

        await execa("node", [
            "dist/index.js",
            "create",
            category,
            skill,
        ]);

        expect(fs.existsSync(skillPath)).toBe(true);

        expect(
            fs.existsSync(path.join(skillPath, "README.md"))
        ).toBe(true);

        expect(
            fs.existsSync(path.join(skillPath, "manifest.yaml"))
        ).toBe(true);

        expect(
            fs.existsSync(path.join(skillPath, "metadata.yaml"))
        ).toBe(true);

        expect(
            fs.existsSync(path.join(skillPath, "prompts"))
        ).toBe(true);

    });

});