import { describe, it, expect, vi, afterEach } from "vitest";

import { run } from "../../src/commands/run";
import { logger } from "../../src/utils/logger";

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

});
