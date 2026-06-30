import fs from "fs";
import path from "path";
import {
    describe,
    it,
    expect,
    beforeEach,
    afterEach,
    vi
} from "vitest";

import { info } from "../../src/commands/info";
import { clearSkillsCache } from "../../src/skills/loadSkills";
import { logger } from "../../src/utils/logger";

const installPath = path.join(
    "skills",
    "workflow",
    "kubernetes"
);

describe("info command", () => {

    beforeEach(() => {

        if (fs.existsSync(installPath)) {
            fs.rmSync(installPath, {
                recursive: true,
                force: true
            });
        }

    });

    afterEach(() => {

        if (fs.existsSync(installPath)) {
            fs.rmSync(installPath, {
                recursive: true,
                force: true
            });
        }

        vi.restoreAllMocks();
        clearSkillsCache();

    });

    it("shows usage when no skill is provided", () => {

        const spy = vi.spyOn(logger, "error");

        info();

        expect(spy).toHaveBeenCalledWith(
            "Usage: ryo info <skill>"
        );

    });

    it("shows error when skill is not found", () => {

        const spy = vi.spyOn(logger, "error");

        info("unknown-skill");

        expect(spy).toHaveBeenCalledWith(
            "Skill not found."
        );

    });

    it("shows error when skill is not installed", () => {

        const spy = vi.spyOn(logger, "error");

        info("kubernetes");

        expect(spy).toHaveBeenCalledWith(
            "Skill not found."
        );

    });

it("shows info when skill is installed", () => {

    fs.mkdirSync(installPath, {
        recursive: true
    });

    const infoSpy = vi.spyOn(logger, "info");
    const consoleSpy = vi.spyOn(console, "log");

    info("kubernetes");

    expect(infoSpy).toHaveBeenCalledWith(
        "kubernetes"
    );

    const calls = consoleSpy.mock.calls.map((c) => String(c[0]));
    expect(calls.some((m) => m.includes("workflow"))).toBe(true);
    expect(calls.some((m) => m.includes(installPath))).toBe(true);

});

});