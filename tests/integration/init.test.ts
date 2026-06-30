import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";

const testProjectDir = "test-ryo-project";
const currentTestDir = path.resolve(process.cwd(), testProjectDir);
const currentDirTestDir = path.resolve(process.cwd(), "test-ryo-current-dir");

const cleanup = () => {
    fs.removeSync(currentTestDir);
    fs.removeSync(currentDirTestDir);
};

describe("CLI Init", () => {
    beforeEach(() => {
        cleanup();
    });

    afterEach(() => {
        cleanup();
    });

    it("initializes a new project in a specified directory", async () => {
        const { stdout } = await execa("node", [
            "dist/index.js",
            "init",
            testProjectDir,
        ]);

        expect(stdout).toContain("Successfully initialized Ryo Engineering Framework");
        expect(fs.existsSync(currentTestDir)).toBe(true);
        expect(fs.existsSync(path.join(currentTestDir, "skills"))).toBe(true);
        expect(fs.existsSync(path.join(currentTestDir, "docs"))).toBe(true);
        expect(fs.existsSync(path.join(currentTestDir, "templates"))).toBe(true);
        expect(fs.existsSync(path.join(currentTestDir, "scripts"))).toBe(true);
        expect(fs.existsSync(path.join(currentTestDir, "specs"))).toBe(true);
        expect(fs.existsSync(path.join(currentTestDir, "README.md"))).toBe(true);
        expect(fs.existsSync(path.join(currentTestDir, ".gitignore"))).toBe(true);
        expect(fs.existsSync(path.join(currentTestDir, "ryo.json"))).toBe(true);

        const readmeContent = fs.readFileSync(path.join(currentTestDir, "README.md"), "utf8");
        expect(readmeContent).toContain(`# ${testProjectDir}`);

        const ryoJsonContent = fs.readFileSync(path.join(currentTestDir, "ryo.json"), "utf8");
        expect(ryoJsonContent).toContain(`"projectName": "${testProjectDir}"`);
    }, 20000);

    it("initializes a new project in the current directory if no name is specified", async () => {
        fs.ensureDirSync(currentDirTestDir);
        const { stdout } = await execa("node", [
            path.resolve(process.cwd(), "dist/index.js"),
            "init",
        ], { cwd: currentDirTestDir });

        expect(stdout).toContain("Successfully initialized Ryo Engineering Framework");
        expect(fs.existsSync(path.join(currentDirTestDir, "skills"))).toBe(true);
        expect(fs.existsSync(path.join(currentDirTestDir, "docs"))).toBe(true);
        expect(fs.existsSync(path.join(currentDirTestDir, "README.md"))).toBe(true);
        expect(fs.existsSync(path.join(currentDirTestDir, "ryo.json"))).toBe(true);

        const readmeContent = fs.readFileSync(path.join(currentDirTestDir, "README.md"), "utf8");
        expect(readmeContent).toContain(`# my-ryo-project`);

        const ryoJsonContent = fs.readFileSync(path.join(currentDirTestDir, "ryo.json"), "utf8");
        expect(ryoJsonContent).toContain(`"projectName": "my-ryo-project"`);
    }, 20000);

    it("fails if the target directory already exists", async () => {
        fs.ensureDirSync(currentTestDir);
        fs.writeFileSync(path.join(currentTestDir, "existing-file.txt"), "dummy");

        const { stderr } = await execa("node", [
            "dist/index.js",
            "init",
            testProjectDir,
        ], { reject: false });

        expect(stderr).toContain(`Directory "${testProjectDir}" already exists.`);
        expect(fs.existsSync(path.join(currentTestDir, "skills"))).toBe(false);
    }, 20000);

    it("fails with an invalid project name", async () => {
        const { stderr } = await execa("node", [
            "dist/index.js",
            "init",
            "Invalid Name",
        ], { reject: false });

        expect(stderr).toContain("Invalid project name. Use lowercase letters, numbers, and hyphens.");
        expect(fs.existsSync(path.join(process.cwd(), "Invalid Name"))).toBe(false);
    }, 20000);
});
