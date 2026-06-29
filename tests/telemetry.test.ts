import fs from "fs";
import os from "os";
import path from "path";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { optIn, optOut, track } from "../src/utils/telemetry";

const telemetryDir = path.join(os.homedir(), ".ryo");
const configFile = path.join(telemetryDir, "telemetry.json");
const eventsFile = path.join(telemetryDir, "telemetry-events.json");

function cleanDir() {
    if (fs.existsSync(telemetryDir)) {
        fs.rmSync(telemetryDir, { recursive: true, force: true });
    }
}

function cleanEvents() {
    if (fs.existsSync(eventsFile)) {
        fs.rmSync(eventsFile, { force: true });
    }
}

describe("telemetry", () => {
    beforeEach(() => {
        if (fs.existsSync(configFile)) {
            fs.rmSync(configFile, { force: true });
        }
        cleanEvents();
    });

    afterEach(() => {
        if (fs.existsSync(configFile)) {
            fs.rmSync(configFile, { force: true });
        }
        cleanEvents();
    });

    it("optIn creates dir and file when .ryo does not exist", () => {
        cleanDir();
        expect(fs.existsSync(telemetryDir)).toBe(false);
        optIn();
        expect(fs.existsSync(telemetryDir)).toBe(true);
        expect(fs.existsSync(configFile)).toBe(true);
        const content = JSON.parse(fs.readFileSync(configFile, "utf8"));
        expect(content.enabled).toBe(true);
    });

    it("optOut creates dir and file when .ryo does not exist", () => {
        cleanDir();
        expect(fs.existsSync(telemetryDir)).toBe(false);
        optOut();
        expect(fs.existsSync(telemetryDir)).toBe(true);
        expect(fs.existsSync(configFile)).toBe(true);
        const content = JSON.parse(fs.readFileSync(configFile, "utf8"));
        expect(content.enabled).toBe(false);
    });

    it("optIn creates telemetry file with enabled: true", () => {
        optIn();
        expect(fs.existsSync(configFile)).toBe(true);
        const content = JSON.parse(fs.readFileSync(configFile, "utf8"));
        expect(content.enabled).toBe(true);
    });

    it("optOut creates telemetry file with enabled: false", () => {
        optOut();
        expect(fs.existsSync(configFile)).toBe(true);
        const content = JSON.parse(fs.readFileSync(configFile, "utf8"));
        expect(content.enabled).toBe(false);
    });

    it("optIn overwrites existing optOut", () => {
        optOut();
        optIn();
        const content = JSON.parse(fs.readFileSync(configFile, "utf8"));
        expect(content.enabled).toBe(true);
    });

    it("track does nothing when no telemetry config", () => {
        track("test-event");
        expect(fs.existsSync(configFile)).toBe(false);
        expect(fs.existsSync(eventsFile)).toBe(false);
    });

    it("track records events when telemetry is enabled", () => {
        optIn();
        track("test-event", { key: "value" });
        expect(fs.existsSync(eventsFile)).toBe(true);
        const content = JSON.parse(fs.readFileSync(eventsFile, "utf8"));
        expect(Array.isArray(content)).toBe(true);
        expect(content.length).toBe(1);
        expect(content[0].event).toBe("test-event");
        expect(content[0].properties).toEqual({ key: "value" });
    });

    it("track appends to existing events", () => {
        optIn();
        track("event-1");
        track("event-2");
        const content = JSON.parse(fs.readFileSync(eventsFile, "utf8"));
        expect(content.length).toBe(2);
        expect(content[0].event).toBe("event-1");
        expect(content[1].event).toBe("event-2");
    });

    it("track trims to 100 events", () => {
        optIn();
        for (let i = 0; i < 101; i++) {
            track(`e${i}`);
        }
        const content = JSON.parse(fs.readFileSync(eventsFile, "utf8"));
        expect(content.length).toBe(100);
        expect(content[0].event).toBe("e1");
        expect(content[99].event).toBe("e100");
    });

    it("isTelemetryEnabled returns false on invalid JSON", () => {
        fs.mkdirSync(telemetryDir, { recursive: true });
        fs.writeFileSync(configFile, "not valid json", "utf8");
        track("should-be-silent");
        expect(fs.existsSync(configFile)).toBe(true);
        expect(fs.existsSync(eventsFile)).toBe(false);
    });

    it("track handles events file with non-array content", () => {
        optIn();
        fs.writeFileSync(eventsFile, '"string"', "utf8");
        track("after-string");
        const content = JSON.parse(fs.readFileSync(eventsFile, "utf8"));
        expect(Array.isArray(content)).toBe(true);
        expect(content.length).toBe(1);
        expect(content[0].event).toBe("after-string");
    });
});
