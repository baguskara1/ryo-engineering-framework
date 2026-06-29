import { describe, it, expect, vi, afterEach } from "vitest";

import { registry } from "../../src/commands/registry";
import { logger } from "../../src/utils/logger";

describe("registry command", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows registry header", () => {

        const spy = vi.spyOn(logger, "info");

        registry();

        expect(spy).toHaveBeenCalledWith(
            "📦 Official Registry"
        );

    });

});
