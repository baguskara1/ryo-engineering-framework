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

        expect(consoleSpy).toHaveBeenCalledWith(
            "Found 1 skill(s):"
        );

        expect(consoleSpy).toHaveBeenCalledWith(
            "workflow/kubernetes"
        );

    });

    it("finds skills by category", () => {

        const consoleSpy = vi.spyOn(console, "log");

        search("workflow");

        expect(consoleSpy).toHaveBeenCalledWith(
            "workflow/kubernetes"
        );

    });

});