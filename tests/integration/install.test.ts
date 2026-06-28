import fs from "fs";
import path from "path";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { install } from "../../src/commands/install";
import { logger } from "../../src/utils/logger";

const targetPath = path.join(
    "skills",
    "workflow",
    "kubernetes"
);

describe("install command", () => {

    beforeEach(() => {

        if (fs.existsSync(targetPath)) {
            fs.rmSync(targetPath, {
                recursive: true,
                force: true
            });
        }

    });

    afterEach(() => {

        if (fs.existsSync(targetPath)) {
            fs.rmSync(targetPath, {
                recursive: true,
                force: true
            });
        }

    });

    it("installs kubernetes skill", () => {

        install("kubernetes");

        expect(
            fs.existsSync(targetPath)
        ).toBe(true);

    });

    it("shows usage when no skill is provided", () => {

        const spy = vi.spyOn(logger, "error");

        install();

        expect(spy).toHaveBeenCalledWith(
            "Usage: ryo install <skill>"
        );

        spy.mockRestore();

    });

    it("shows error when skill is not in registry", () => {

        const spy = vi.spyOn(logger, "error");

        install("unknown-skill");

        expect(spy).toHaveBeenCalledWith(
            "Skill not found in registry."
        );

        spy.mockRestore();

    });

    it("does not install twice", () => {

        fs.mkdirSync(targetPath, {
            recursive: true
        });

        const spy = vi.spyOn(logger, "warning");

        install("kubernetes");

        expect(spy).toHaveBeenCalledWith(
            "Skill already installed."
        );

        spy.mockRestore();

    });

 it("shows error when official skill does not exist", () => {

    const existsSpy = vi.spyOn(fs, "existsSync");

    existsSpy.mockImplementation((file) => {

        if (
            file.toString().includes(
                "official-skills"
            )
        ) {
            return false;
        }

        return true;

    });

    const spy = vi.spyOn(logger, "error");

    install("kubernetes");

    expect(spy).toHaveBeenCalledWith(
        "Official skill not found."
    );

    existsSpy.mockRestore();
    spy.mockRestore();

});

});