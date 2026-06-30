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

    it("shows registry header with count when skills exist", () => {

        vi.mocked(loadRegistry).mockReturnValue([
            { name: "react", category: "frameworks", version: "2.0.0" },
        ]);

        const spy = vi.spyOn(logger, "info");

        registry();

        expect(spy).toHaveBeenCalledWith(
            "Official Registry (1 skill)"
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

    it("lists skills grouped by category in tree format", () => {

        vi.mocked(loadRegistry).mockReturnValue([
            { name: "kubernetes", category: "workflow", version: "1.0.0" },
            { name: "react", category: "frameworks", version: "2.0.0" },
        ]);

        const spy = vi.spyOn(logger, "plain");

        registry();

        const messages = spy.mock.calls.map((c) => String(c[0]));

        expect(messages.some((m) => m.includes("frameworks/"))).toBe(true);
        expect(messages.some((m) => m.includes("workflow/"))).toBe(true);
        expect(messages.some((m) => m.includes("react"))).toBe(true);
        expect(messages.some((m) => m.includes("kubernetes"))).toBe(true);
        expect(messages.some((m) => m.includes("└──"))).toBe(true);

    });

});
