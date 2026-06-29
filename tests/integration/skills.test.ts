import { describe, it, expect, vi, afterEach } from "vitest";

import { skills } from "../../src/commands/skills";
import { loadSkills } from "../../src/skills/loadSkills";
import { logger } from "../../src/utils/logger";

vi.mock("../../src/skills/loadSkills", () => ({
    loadSkills: vi.fn(() => []),
}));

describe("skills command", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows skills header", () => {

        const spy = vi.spyOn(logger, "info");

        skills();

        expect(spy).toHaveBeenCalledWith(
            "Installed Skills"
        );

    });

    it("lists installed skills", () => {

        vi.mocked(loadSkills).mockReturnValue([
            {
                category: "workflow",
                name: "kubernetes",
                path: "skills/workflow/kubernetes",
                metadata: {},
            },
        ]);

        const spy = vi.spyOn(logger, "plain");

        skills();

        expect(spy).toHaveBeenCalledWith("• workflow/kubernetes");

    });

});
