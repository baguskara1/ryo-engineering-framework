import { describe, it, expect, vi, afterEach } from "vitest";

import { help } from "../../src/commands/help";
import { logger } from "../../src/utils/logger";

describe("help command", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows help text", () => {

        const spy = vi.spyOn(logger, "plain");

        help();

        const calls = spy.mock.calls.map((c) => String(c[0]));
        expect(calls.some((m) => m.includes("Discover"))).toBe(true);
        expect(calls.some((m) => m.includes("Manage"))).toBe(true);
        expect(calls.some((m) => m.includes("System"))).toBe(true);
        expect(calls.some((m) => m.includes("registry"))).toBe(true);
        expect(calls.some((m) => m.includes("upgrade"))).toBe(true);

    });

});
