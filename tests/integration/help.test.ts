import { describe, it, expect, vi, afterEach } from "vitest";

import { help } from "../../src/commands/help";
import { logger } from "../../src/utils/logger";

describe("help command", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows help text", () => {

        const spy = vi.spyOn(logger, "info");

        help();

        expect(spy).toHaveBeenCalledWith(
            "🚀 Ryo Engineering Framework"
        );

    });

});
