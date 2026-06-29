import { describe, it, expect, vi, afterEach } from "vitest";

import { validate } from "../../src/commands/validate";
import { logger } from "../../src/utils/logger";

describe("validate command", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows validate header", () => {

        const spy = vi.spyOn(logger, "info");

        validate();

        expect(spy).toHaveBeenCalledWith(
            "🔍 Validating Skills..."
        );

    });

});
