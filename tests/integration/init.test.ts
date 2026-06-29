import { describe, it, expect, vi, afterEach } from "vitest";

import { init } from "../../src/commands/init";
import { logger } from "../../src/utils/logger";

describe("init command", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows init message", () => {

        const spy = vi.spyOn(logger, "info");

        init();

        expect(spy).toHaveBeenCalledWith(
            "🚀 Ryo Init"
        );

    });

});
