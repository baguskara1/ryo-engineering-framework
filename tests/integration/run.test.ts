import { describe, it, expect, vi, afterEach } from "vitest";

import { run } from "../../src/commands/run";
import { loadSkills } from "../../src/skills/loadSkills";
import { readSkill } from "../../src/utils/readSkill";
import { logger } from "../../src/utils/logger";

vi.mock("../../src/skills/loadSkills", () => ({
    loadSkills: vi.fn(() => []),
}));

vi.mock("../../src/utils/readSkill", () => ({
    readSkill: vi.fn(),
}));

describe("run command", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows usage when no skill is provided", () => {

        const spy = vi.spyOn(logger, "error");

        run();

        expect(spy).toHaveBeenCalledWith(
            "Usage: ryo run <skill>"
        );

    });

    it("shows error when skill is not found", () => {

        const spy = vi.spyOn(logger, "error");

        run("nonexistent-skill");

        expect(spy).toHaveBeenCalledWith(
            "Skill not found."
        );

    });

    it("finds and prints skill content", () => {

        vi.mocked(loadSkills).mockReturnValue([
            {
                category: "workflow",
                name: "kubernetes",
                path: "skills/workflow/kubernetes",
                metadata: {},
            },
        ]);
        vi.mocked(readSkill).mockReturnValue("kubernetes skill content");

        const successSpy = vi.spyOn(logger, "success");
        const plainSpy = vi.spyOn(logger, "plain");

        run("kubernetes");

        expect(successSpy).toHaveBeenCalledWith(
            "Found: workflow/kubernetes"
        );
        expect(readSkill).toHaveBeenCalledWith("skills/workflow/kubernetes");
        expect(plainSpy).toHaveBeenCalledWith("kubernetes skill content");

    });

});
