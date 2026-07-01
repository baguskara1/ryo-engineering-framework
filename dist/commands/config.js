"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configGet = configGet;
exports.configSet = configSet;
exports.configDelete = configDelete;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const logger_1 = require("../utils/logger");
const CONFIG_DIR = path_1.default.join(os_1.default.homedir(), ".ryo");
const CONFIG_FILE = path_1.default.join(CONFIG_DIR, "config.json");
function ensureDir() {
    fs_1.default.mkdirSync(CONFIG_DIR, { recursive: true });
}
function load() {
    try {
        if (fs_1.default.existsSync(CONFIG_FILE)) {
            return JSON.parse(fs_1.default.readFileSync(CONFIG_FILE, "utf8"));
        }
    }
    catch { }
    return {};
}
function save(config) {
    ensureDir();
    fs_1.default.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2) + "\n");
}
function configGet(key) {
    const cfg = load();
    if (key) {
        const val = cfg[key];
        if (val === undefined) {
            logger_1.logger.warning(`Config key "${key}" not set.`);
            return;
        }
        logger_1.logger.plain(`${key} = ${val}`);
        return;
    }
    const keys = Object.keys(cfg);
    if (keys.length === 0) {
        logger_1.logger.plain("No config values set.");
        return;
    }
    for (const k of keys) {
        logger_1.logger.plain(`${k} = ${cfg[k]}`);
    }
}
function configSet(key, value) {
    const cfg = load();
    const parsed = value === "true" ? true : value === "false" ? false : /^-?\d+(\.\d+)?$/.test(value) ? Number(value) : value;
    cfg[key] = parsed;
    save(cfg);
    logger_1.logger.success(`Set ${key} = ${parsed}`);
}
function configDelete(key) {
    const cfg = load();
    if (!(key in cfg)) {
        logger_1.logger.warning(`Config key "${key}" not set.`);
        return;
    }
    delete cfg[key];
    save(cfg);
    logger_1.logger.success(`Removed ${key}`);
}
//# sourceMappingURL=config.js.map