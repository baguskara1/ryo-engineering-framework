import fs from "fs";
import path from "path";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { validate } from "../../src/commands/validate";
import { REQUIRED_FILES } from "../../src/constants/requiredFiles";
import { logger } from "../../src/utils/logger";

const skillsPath = path.join("skills");

describe("validate command", () => {

    beforeEach(() => {

        if (fs.existsSync(skillsPath)) {
            fs.rmSync(skillsPath, {
                recursive: true,
                force: true,
            });
        }

    });

    afterEach(() => {

        if (fs.existsSync(skillsPath)) {
            fs.rmSync(skillsPath, {
                recursive: true,
                force: true,
            });
        }

        vi.restoreAllMocks();

    });

    it("shows validate header", () => {

        const spy = vi.spyOn(logger, "info");

        validate();

        expect(spy).toHaveBeenCalledWith(
            "Validating Skills..."
        );

    });

    it("reports valid and invalid skills", () => {

        const validSkillPath = path.join(
            "skills", "workflow", "kubernetes"
        );
        fs.mkdirSync(validSkillPath, { recursive: true });
        for (const file of REQUIRED_FILES) {
            fs.writeFileSync(
                path.join(validSkillPath, file),
                "content"
            );
        }

        const invalidSkillPath = path.join(
            "skills", "workflow", "react"
        );
        fs.mkdirSync(invalidSkillPath, { recursive: true });
        fs.writeFileSync(
            path.join(invalidSkillPath, "manifest.yaml"),
            "content"
        );

        const successSpy = vi.spyOn(logger, "success");
        const errorSpy = vi.spyOn(logger, "error");
        const plainSpy = vi.spyOn(logger, "plain");

        validate();

        expect(successSpy).toHaveBeenCalledWith(
            expect.stringContaining(validSkillPath)
        );
        expect(errorSpy).toHaveBeenCalledWith(
            expect.stringContaining(invalidSkillPath)
        );

        expect(plainSpy).toHaveBeenCalledWith(
            expect.stringContaining("1 valid")
        );
        expect(plainSpy).toHaveBeenCalledWith(
            expect.stringContaining("1 invalid")
        );

    });

    it("reports missing files for invalid skills", () => {

        const invalidSkillPath = path.join(
            "skills", "frameworks", "react"
        );
        fs.mkdirSync(invalidSkillPath, { recursive: true });
        fs.writeFileSync(
            path.join(invalidSkillPath, "README.md"),
            "readme"
        );

        const plainSpy = vi.spyOn(logger, "plain");

        validate();

        for (const file of REQUIRED_FILES) {
            if (file === "README.md") continue;
            expect(plainSpy).toHaveBeenCalledWith(
                expect.stringContaining(`Missing: ${file}`)
            );
        }

    });

});
