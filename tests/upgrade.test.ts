import { describe, it, expect, vi, beforeEach } from "vitest";
import { upgrade } from "../src/commands/upgrade";

vi.mock("child_process", () => ({
    execSync: vi.fn(),
}));

vi.mock("../src/utils/packagePath", () => ({
    getPackageVersion: vi.fn(() => "2.0.3"),
}));

import { execSync } from "child_process";
import { logger } from "../src/utils/logger";

describe("upgrade command", () => {

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("shows success when already up to date", () => {

        vi.mocked(execSync).mockReturnValue("2.0.3\n");

        const spy = vi.spyOn(logger, "success");

        upgrade();

        expect(spy).toHaveBeenCalledWith(
            expect.stringContaining("Already up to date")
        );

    });

    it("shows warning when npm check fails", () => {

        vi.mocked(execSync).mockImplementation(() => {
            throw new Error("npm not found");
        });

        const spy = vi.spyOn(logger, "warning");

        upgrade();

        expect(spy).toHaveBeenCalledWith(
            expect.stringContaining("Could not check for updates")
        );

    });

    it("shows upgrade failed message on error", () => {

        vi.mocked(execSync)
            .mockReturnValueOnce("3.0.0\n")
            .mockImplementationOnce(() => {
                throw new Error("install failed");
            });

        const spy = vi.spyOn(logger, "error");

        upgrade();

        expect(spy).toHaveBeenCalledWith(
            expect.stringContaining("Upgrade failed")
        );

    });

});
