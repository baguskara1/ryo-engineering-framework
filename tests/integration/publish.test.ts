import { describe, it, expect, vi, afterEach } from "vitest";

import { publish } from "../../src/commands/publish";
import { logger } from "../../src/utils/logger";

describe("publish command", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows usage when no skill is provided", () => {
        const spy = vi.spyOn(logger, "error");
        publish();
        expect(spy).toHaveBeenCalledWith("Usage: ryo publish <skill>");
    });

    it("shows error when skill is not installed", () => {
        const spy = vi.spyOn(logger, "error");
        publish("nonexistent");
        expect(spy).toHaveBeenCalledWith("Skill not installed.");
    });
});
