import fs from "fs";
import { describe, it, expect, vi, afterEach } from "vitest";

import { loadRegistry, clearRegistryCache } from "../src/registry/loadRegistry";

describe("loadRegistry", () => {

    afterEach(() => {
        vi.restoreAllMocks();
        clearRegistryCache();
    });

    it("returns empty array when registry does not exist", () => {

        vi.spyOn(fs, "existsSync").mockReturnValue(false);

        expect(loadRegistry()).toEqual([]);

    });

    it("loads registry from index.json", () => {

        vi.spyOn(fs, "existsSync").mockReturnValue(true);

        vi.spyOn(fs, "readFileSync").mockReturnValue(
            JSON.stringify({
                skills: [
                    {
                        name: "kubernetes",
                        category: "workflow",
                        version: "1.0.0"
                    },
                    {
                        name: "react",
                        category: "frameworks",
                        version: "2.0.0"
                    }
                ]
            })
        );

        const registry = loadRegistry();

        expect(registry).toEqual([
            {
                name: "kubernetes",
                category: "workflow",
                version: "1.0.0"
            },
            {
                name: "react",
                category: "frameworks",
                version: "2.0.0"
            }
        ]);

    });

});