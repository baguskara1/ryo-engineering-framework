"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.track = track;
exports.optIn = optIn;
exports.optOut = optOut;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const TELEMETRY_DIR = path_1.default.join(os_1.default.homedir(), ".ryo");
const TELEMETRY_CONFIG = path_1.default.join(TELEMETRY_DIR, "telemetry.json");
const TELEMETRY_EVENTS = path_1.default.join(TELEMETRY_DIR, "telemetry-events.json");
function ensureDir() {
    if (!fs_1.default.existsSync(TELEMETRY_DIR)) {
        fs_1.default.mkdirSync(TELEMETRY_DIR, { recursive: true });
    }
}
function isTelemetryEnabled() {
    try {
        if (!fs_1.default.existsSync(TELEMETRY_CONFIG))
            return false;
        const config = JSON.parse(fs_1.default.readFileSync(TELEMETRY_CONFIG, "utf8"));
        return config.enabled === true;
    }
    catch {
        return false;
    }
}
function track(event, properties) {
    if (!isTelemetryEnabled())
        return;
    try {
        ensureDir();
        const data = {
            event,
            timestamp: new Date().toISOString(),
            properties,
        };
        const existing = [];
        if (fs_1.default.existsSync(TELEMETRY_EVENTS)) {
            const content = fs_1.default.readFileSync(TELEMETRY_EVENTS, "utf8");
            const parsed = JSON.parse(content);
            if (Array.isArray(parsed)) {
                existing.push(...parsed);
            }
        }
        existing.push(data);
        const trimmed = existing.slice(-100);
        fs_1.default.writeFileSync(TELEMETRY_EVENTS, JSON.stringify(trimmed, null, 2));
    }
    catch {
        // Silently fail - telemetry should never break the CLI
    }
}
function optIn() {
    ensureDir();
    fs_1.default.writeFileSync(TELEMETRY_CONFIG, JSON.stringify({ enabled: true }, null, 2));
}
function optOut() {
    ensureDir();
    fs_1.default.writeFileSync(TELEMETRY_CONFIG, JSON.stringify({ enabled: false }, null, 2));
}
//# sourceMappingURL=telemetry.js.map