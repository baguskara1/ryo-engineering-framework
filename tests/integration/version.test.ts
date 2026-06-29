import { describe, it, expect, vi, afterEach } from "vitest";

import { version } from "../../src/commands/version";
import { logger } from "../../src/utils/logger";

describe("version command", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows version information", () => {

        const spy = vi.spyOn(logger, "info");

        version();

        expect(spy).toHaveBeenCalledWith(
            "🚀 Ryo Engineering Framework"
        );

    });

});
