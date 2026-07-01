"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForUpdate = checkForUpdate;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const packagePath_1 = require("./packagePath");
const offline_1 = require("./offline");
const CACHE_FILE = path_1.default.join(os_1.default.homedir(), ".ryo", "update-check.json");
const CACHE_DURATION = 1000 * 60 * 60 * 24;
function readCache() {
    try {
        if (fs_1.default.existsSync(CACHE_FILE)) {
            return JSON.parse(fs_1.default.readFileSync(CACHE_FILE, "utf8"));
        }
    }
    catch { }
    return null;
}
function writeCache(data) {
    try {
        const dir = path_1.default.dirname(CACHE_FILE);
        fs_1.default.mkdirSync(dir, { recursive: true });
        fs_1.default.writeFileSync(CACHE_FILE, JSON.stringify(data));
    }
    catch { }
}
function versionGt(a, b) {
    const pa = a.split(".").map(Number);
    const pb = b.split(".").map(Number);
    for (let i = 0; i < 3; i++) {
        if ((pa[i] || 0) > (pb[i] || 0))
            return true;
        if ((pa[i] || 0) < (pb[i] || 0))
            return false;
    }
    return false;
}
function checkForUpdate() {
    const current = (0, packagePath_1.getPackageVersion)();
    const cached = readCache();
    if (cached && Date.now() - cached.checkedAt < CACHE_DURATION) {
        return versionGt(cached.latest, current) ? cached.latest : null;
    }
    if ((0, offline_1.isOffline)())
        return null;
    try {
        const latest = (0, child_process_1.execSync)("npm view ryo-framework version", {
            encoding: "utf-8",
            timeout: 10000,
        })
            .toString()
            .trim();
        writeCache({ latest, checkedAt: Date.now() });
        return versionGt(latest, current) ? latest : null;
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=checkUpdate.js.map