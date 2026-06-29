import { describe, it, expect, vi, afterEach } from "vitest";

import { doctor } from "../../src/commands/doctor";
import { logger } from "../../src/utils/logger";

describe("doctor command", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows doctor header", () => {

        const spy = vi.spyOn(logger, "info");

        doctor();

        expect(spy).toHaveBeenCalledWith(
            "🔍 Running Ryo Doctor..."
        );

    });

});
