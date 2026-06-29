import { describe, it, expect, vi, afterEach } from "vitest";

import { exportSkill } from "../../src/commands/export";
import { logger } from "../../src/utils/logger";

describe("export command", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows usage when no skill is provided", () => {
        const spy = vi.spyOn(logger, "error");
        exportSkill();
        expect(spy).toHaveBeenCalledWith(
            "Usage: ryo export <skill> [--format md|json|yaml]"
        );
    });

    it("shows error when skill is not found", () => {
        const spy = vi.spyOn(logger, "error");
        exportSkill("nonexistent");
        expect(spy).toHaveBeenCalledWith("Skill not found.");
    });
});
