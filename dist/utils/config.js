"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = loadConfig;
exports.getConfig = getConfig;
exports.clearConfigCache = clearConfigCache;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let cachedConfig = null;
function findConfigPath() {
    let current = process.cwd();
    const root = path_1.default.parse(current).root;
    let depth = 0;
    const MAX_DEPTH = 20;
    while (current !== root && depth < MAX_DEPTH) {
        const configPath = path_1.default.join(current, "ryo.json");
        if (fs_1.default.existsSync(configPath)) {
            return configPath;
        }
        current = path_1.default.dirname(current);
        depth++;
    }
    return null;
}
function loadConfig() {
    if (cachedConfig)
        return cachedConfig;
    const configPath = findConfigPath();
    if (!configPath) {
        cachedConfig = {};
        return cachedConfig;
    }
    try {
        const content = fs_1.default.readFileSync(configPath, "utf8");
        cachedConfig = JSON.parse(content);
        return cachedConfig;
    }
    catch {
        cachedConfig = {};
        return cachedConfig;
    }
}
function getConfig() {
    return cachedConfig || loadConfig();
}
function clearConfigCache() {
    cachedConfig = null;
}
//# sourceMappingURL=config.js.map