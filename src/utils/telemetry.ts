import fs from "fs";
import path from "path";
import os from "os";

const TELEMETRY_FILE = path.join(os.homedir(), ".ryo", "telemetry.json");

interface TelemetryEvent {
    event: string;
    timestamp: string;
    properties?: Record<string, string>;
}

function isTelemetryEnabled(): boolean {
    try {
        if (!fs.existsSync(TELEMETRY_FILE)) return false;
        const config = JSON.parse(fs.readFileSync(TELEMETRY_FILE, "utf8"));
        return config.enabled === true;
    } catch {
        return false;
    }
}

export function track(event: string, properties?: Record<string, string>): void {
    if (!isTelemetryEnabled()) return;

    try {
        const dir = path.dirname(TELEMETRY_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const data: TelemetryEvent = {
            event,
            timestamp: new Date().toISOString(),
            properties,
        };

        const existing: TelemetryEvent[] = [];
        if (fs.existsSync(TELEMETRY_FILE)) {
            const content = fs.readFileSync(TELEMETRY_FILE, "utf8");
            existing.push(...JSON.parse(content));
        }

        existing.push(data);

        // Keep only last 100 events
        const trimmed = existing.slice(-100);
        fs.writeFileSync(TELEMETRY_FILE, JSON.stringify(trimmed, null, 2));
    } catch {
        // Silently fail - telemetry should never break the CLI
    }
}

export function optIn(): void {
    const dir = path.dirname(TELEMETRY_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(TELEMETRY_FILE, JSON.stringify({ enabled: true }, null, 2));
}

export function optOut(): void {
    const dir = path.dirname(TELEMETRY_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(TELEMETRY_FILE, JSON.stringify({ enabled: false }, null, 2));
}
