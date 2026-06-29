import fs from "fs";
import path from "path";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { list } from "../../src/commands/list";
import { logger } from "../../src/utils/logger";

const skillsPath = path.join("skills");

describe("list command", () => {

    beforeEach(() => {

        if (fs.existsSync(skillsPath)) {
            fs.rmSync(skillsPath, {
                recursive: true,
                force: true
            });
        }

    });

    afterEach(() => {

        if (fs.existsSync(skillsPath)) {
            fs.rmSync(skillsPath, {
                recursive: true,
                force: true
            });
        }

        vi.restoreAllMocks();

    });

    it("shows warning when no skills are installed", () => {

        const spy = vi.spyOn(logger, "warning");

        list();

        expect(spy).toHaveBeenCalledWith(
            "No skills installed."
        );

    });

    it("shows warning when skills directory is empty", () => {

        fs.mkdirSync(skillsPath, { recursive: true });

        const spy = vi.spyOn(logger, "warning");

        list();

        expect(spy).toHaveBeenCalledWith(
            "No skills installed."
        );

    });

    it("lists installed skills", () => {

        fs.mkdirSync(
            path.join(
                "skills",
                "workflow",
                "kubernetes"
            ),
            { recursive: true }
        );

        const infoSpy = vi.spyOn(logger, "info");
        const consoleSpy = vi.spyOn(console, "log");

        list();

        expect(infoSpy).toHaveBeenCalledWith(
            "Installed skills:"
        );

        expect(consoleSpy).toHaveBeenCalledWith(
            "workflow/"
        );

        expect(consoleSpy).toHaveBeenCalledWith(
            "  - kubernetes"
        );

    });

});