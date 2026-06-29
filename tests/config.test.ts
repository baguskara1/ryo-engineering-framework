import fs from "fs";
import path from "path";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { loadConfig, clearConfigCache, getConfig } from "../src/utils/config";

const testDir = path.join(__dirname, "..", ".test-tmp-config");

describe("config", () => {
    beforeEach(() => {
        clearConfigCache();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        clearConfigCache();
        if (fs.existsSync(testDir)) {
            fs.rmSync(testDir, { recursive: true, force: true });
        }
    });

    function createConfig(content: string) {
        fs.mkdirSync(testDir, { recursive: true });
        fs.writeFileSync(path.join(testDir, "ryo.json"), content, "utf8");
        vi.spyOn(process, "cwd").mockReturnValue(testDir);
    }

    it("returns empty config when no ryo.json exists", () => {
        vi.spyOn(process, "cwd").mockReturnValue("/tmp");
        const config = loadConfig();
        expect(config).toEqual({});
    });

    it("loads config from ryo.json", () => {
        createConfig(JSON.stringify({ verbose: true }));
        const config = loadConfig();
        expect(config).toEqual({ verbose: true });
    });

    it("returns empty config on invalid JSON", () => {
        createConfig("invalid json");
        const config = loadConfig();
        expect(config).toEqual({});
    });

    it("caches config after first load", () => {
        createConfig(JSON.stringify({ verbose: true }));
        const config1 = loadConfig();
        const config2 = loadConfig();
        expect(config1).toEqual({ verbose: true });
        expect(config2).toEqual({ verbose: true });
    });

    it("getConfig returns same as loadConfig", () => {
        createConfig(JSON.stringify({ verbose: false }));
        const config = getConfig();
        expect(config).toEqual({ verbose: false });
    });
});
