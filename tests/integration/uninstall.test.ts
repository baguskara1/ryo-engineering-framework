import fs from "fs";
import path from "path";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { uninstall } from "../../src/commands/uninstall";
import { logger } from "../../src/utils/logger";

const targetPath = path.join(
    "skills",
    "workflow",
    "kubernetes"
);

describe("uninstall command", () => {

    beforeEach(() => {

        fs.mkdirSync(targetPath, {
            recursive: true
        });

    });

    afterEach(() => {

        if (fs.existsSync(targetPath)) {
            fs.rmSync(targetPath, {
                recursive: true,
                force: true
            });
        }

    });

    it("removes installed skill", () => {

        uninstall("kubernetes");

        expect(
            fs.existsSync(targetPath)
        ).toBe(false);

    });

    it("shows usage when no skill is provided", () => {

        const spy = vi.spyOn(logger, "error");

        uninstall();

        expect(spy).toHaveBeenCalledWith(
            "Usage: ryo uninstall <skill>"
        );

        spy.mockRestore();

    });

    it("shows error when skill is not in registry", () => {

        const spy = vi.spyOn(logger, "error");

        uninstall("unknown-skill");

        expect(spy).toHaveBeenCalledWith(
            "Skill not found in registry."
        );

        spy.mockRestore();

    });

    it("shows warning when skill is not installed", () => {

        fs.rmSync(targetPath, {
            recursive: true,
            force: true
        });

        const spy = vi.spyOn(logger, "warning");

        uninstall("kubernetes");

        expect(spy).toHaveBeenCalledWith(
            "Skill is not installed."
        );

        spy.mockRestore();

    });

});