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

    it("shows warning when no skills installed", () => {

        const spy = vi.spyOn(logger, "warning");

        skills();

        expect(spy).toHaveBeenCalledWith(
            "No skills installed."
        );

    });

    it("lists installed skills in tree format", () => {

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

        const calls = spy.mock.calls.map((c) => String(c[0]));
        expect(calls.some((m) => m.includes("workflow"))).toBe(true);
        expect(calls.some((m) => m.includes("kubernetes"))).toBe(true);

    });

});
