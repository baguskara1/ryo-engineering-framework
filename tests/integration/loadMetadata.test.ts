import fs from "fs";
import { describe, it, expect, vi, afterEach } from "vitest";

import { loadMetadata } from "../../src/skills/loadMetadata";

vi.mock("yaml", () => ({
    parse: vi.fn(() => {
        throw new Error("parse error");
    }),
}));

describe("loadMetadata", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns empty object when readFileSync fails", () => {
        vi.spyOn(fs, "existsSync").mockReturnValue(true);
        vi.spyOn(fs, "readFileSync").mockImplementation(() => {
            throw new Error("EACCES");
        });

        const result = loadMetadata("/some/path");

        expect(result).toEqual({});
    });

    it("returns empty object when yaml parsing fails", () => {
        vi.spyOn(fs, "existsSync").mockReturnValue(true);
        vi.spyOn(fs, "readFileSync").mockReturnValue("name: test");

        const result = loadMetadata("/some/path");

        expect(result).toEqual({});
    });

});
