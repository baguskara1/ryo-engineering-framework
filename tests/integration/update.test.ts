import { describe, it, expect, vi, afterEach } from "vitest";

import { update } from "../../src/commands/update";
import { logger } from "../../src/utils/logger";

describe("update command", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows usage when no skill is provided", () => {
        const spy = vi.spyOn(logger, "error");
        update();
        expect(spy).toHaveBeenCalledWith("Usage: ryo update <skill>");
    });

    it("shows error when skill is not in registry", () => {
        const spy = vi.spyOn(logger, "error");
        update("nonexistent");
        expect(spy).toHaveBeenCalledWith("Skill not found in registry.");
    });
});
