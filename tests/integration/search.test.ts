import {
    describe,
    it,
    expect,
    vi,
    afterEach
} from "vitest";

import { search } from "../../src/commands/search";
import { logger } from "../../src/utils/logger";

describe("search command", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows usage when no keyword is provided", () => {

        const spy = vi.spyOn(logger, "error");

        search();

        expect(spy).toHaveBeenCalledWith(
            "Usage: ryo search <keyword>"
        );

    });

    it("shows warning when nothing is found", () => {

        const spy = vi.spyOn(logger, "warning");

        search("unknown-skill");

        expect(spy).toHaveBeenCalledWith(
            "No matching skills found."
        );

    });

    it("finds kubernetes skill", () => {

        const consoleSpy = vi.spyOn(console, "log");

        search("kubernetes");

        const calls = consoleSpy.mock.calls.map((c) => String(c[0]));
        expect(calls.some((m) => m.includes('matching "kubernetes"'))).toBe(true);
        expect(calls.some((m) => m.includes("workflow/kubernetes"))).toBe(true);

    });

    it("finds skills by category", () => {

        const consoleSpy = vi.spyOn(console, "log");

        search("workflow");

        const calls = consoleSpy.mock.calls.map((c) => String(c[0]));
        expect(calls.some((m) => m.includes("workflow/kubernetes"))).toBe(true);

    });

});