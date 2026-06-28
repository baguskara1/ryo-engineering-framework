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

        const consoleSpy = vi.spyOn(console, "log");

        info("kubernetes");

        expect(consoleSpy).toHaveBeenCalledWith(
            "📦 kubernetes"
        );

        expect(consoleSpy).toHaveBeenCalledWith(
            "Category : workflow"
        );

        expect(consoleSpy).toHaveBeenCalledWith(
            `Path     : ${installPath}`
        );

    });

});