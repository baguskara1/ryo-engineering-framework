import fs from "fs";
import path from "path";
import os from "os";

const TELEMETRY_DIR = path.join(os.homedir(), ".ryo");
const TELEMETRY_CONFIG = path.join(TELEMETRY_DIR, "telemetry.json");
const TELEMETRY_EVENTS = path.join(TELEMETRY_DIR, "telemetry-events.json");

interface TelemetryEvent {
    event: string;
    timestamp: string;
    properties?: Record<string, string>;
}

function ensureDir(): void {
    if (!fs.existsSync(TELEMETRY_DIR)) {
        fs.mkdirSync(TELEMETRY_DIR, { recursive: true });
    }
}

function isTelemetryEnabled(): boolean {
    try {
        if (!fs.existsSync(TELEMETRY_CONFIG)) return false;
        const config = JSON.parse(fs.readFileSync(TELEMETRY_CONFIG, "utf8"));
        return config.enabled === true;
    } catch {
        return false;
    }
}

export function track(event: string, properties?: Record<string, string>): void {
    if (!isTelemetryEnabled()) return;

    try {
        ensureDir();

        const data: TelemetryEvent = {
            event,
            timestamp: new Date().toISOString(),
            properties,
        };

        const existing: TelemetryEvent[] = [];
        if (fs.existsSync(TELEMETRY_EVENTS)) {
            const content = fs.readFileSync(TELEMETRY_EVENTS, "utf8");
            const parsed = JSON.parse(content);
            if (Array.isArray(parsed)) {
                existing.push(...parsed);
            }
        }

        existing.push(data);

        const trimmed = existing.slice(-100);
        fs.writeFileSync(TELEMETRY_EVENTS, JSON.stringify(trimmed, null, 2));
    } catch {
        // Silently fail - telemetry should never break the CLI
    }
}

export function optIn(): void {
    ensureDir();
    fs.writeFileSync(TELEMETRY_CONFIG, JSON.stringify({ enabled: true }, null, 2));
}

export function optOut(): void {
    ensureDir();
    fs.writeFileSync(TELEMETRY_CONFIG, JSON.stringify({ enabled: false }, null, 2));
}
