import { describe, it, expect, vi, afterEach } from "vitest";

import { registry } from "../../src/commands/registry";
import { loadRegistry } from "../../src/registry/loadRegistry";
import { logger } from "../../src/utils/logger";

vi.mock("../../src/registry/loadRegistry", () => ({
    loadRegistry: vi.fn(() => []),
}));

describe("registry command", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows registry header", () => {

        const spy = vi.spyOn(logger, "info");

        registry();

        expect(spy).toHaveBeenCalledWith(
            "Official Registry"
        );

    });

    it("shows warning when registry is empty", () => {

        vi.mocked(loadRegistry).mockReturnValue([]);

        const spy = vi.spyOn(logger, "warning");

        registry();

        expect(spy).toHaveBeenCalledWith(
            "Registry is empty."
        );

    });

    it("lists skills when registry has entries", () => {

        vi.mocked(loadRegistry).mockReturnValue([
            { name: "kubernetes", category: "workflow", version: "1.0.0" },
            { name: "react", category: "frameworks", version: "2.0.0" },
        ]);

        const spy = vi.spyOn(logger, "plain");

        registry();

        expect(spy).toHaveBeenCalledWith("• workflow/kubernetes (1.0.0)");
        expect(spy).toHaveBeenCalledWith("• frameworks/react (2.0.0)");

    });

});
