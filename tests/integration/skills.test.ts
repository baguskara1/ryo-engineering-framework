import { describe, it, expect, vi, afterEach } from "vitest";

import { skills } from "../../src/commands/skills";
import { logger } from "../../src/utils/logger";

describe("skills command", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows skills header", () => {

        const spy = vi.spyOn(logger, "info");

        skills();

        expect(spy).toHaveBeenCalledWith(
            "📦 Installed Skills"
        );

    });

});
