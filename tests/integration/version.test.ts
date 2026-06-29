import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "fs";
import path from "path";

import { version } from "../../src/commands/version";
import { logger } from "../../src/utils/logger";

function getExpectedVersion(): string {
    const pkg = JSON.parse(
        fs.readFileSync(path.join(__dirname, "..", "..", "package.json"), "utf8")
    );
    return pkg.version;
}

describe("version command", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows version information", () => {

        const spy = vi.spyOn(logger, "plain");

        version();

        expect(spy).toHaveBeenCalledWith(
            `Version: ${getExpectedVersion()}`
        );

    });

});
