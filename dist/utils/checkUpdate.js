"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCache = readCache;
exports.checkForUpdate = checkForUpdate;
exports.scheduleAsyncCheck = scheduleAsyncCheck;
exports.getPendingNotification = getPendingNotification;
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
function parseVersion(s) {
    return s.split(".").map((p) => parseInt(p, 10) || 0);
}
function versionGt(a, b) {
    const pa = parseVersion(a);
    const pb = parseVersion(b);
    const len = Math.max(pa.length, pb.length);
    for (let i = 0; i < len; i++) {
        const na = pa[i] || 0;
        const nb = pb[i] || 0;
        if (na > nb)
            return true;
        if (na < nb)
            return false;
    }
    return false;
}
function checkFromCache() {
    const cached = readCache();
    if (!cached)
        return null;
    if (Date.now() - cached.checkedAt >= CACHE_DURATION)
        return null;
    return versionGt(cached.latest, (0, packagePath_1.getPackageVersion)()) ? cached.latest : null;
}
function fetchLatest() {
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
        return versionGt(latest, (0, packagePath_1.getPackageVersion)()) ? latest : null;
    }
    catch {
        return null;
    }
}
function checkForUpdate() {
    return checkFromCache() ?? fetchLatest();
}
let _pendingNotif = null;
function scheduleAsyncCheck() {
    const fromCache = checkFromCache();
    if (fromCache) {
        _pendingNotif = fromCache;
        return;
    }
    setTimeout(() => {
        _pendingNotif = fetchLatest();
    }, 500);
}
function getPendingNotification() {
    return _pendingNotif;
}
//# sourceMappingURL=checkUpdate.js.map