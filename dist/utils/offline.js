"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOffline = isOffline;
exports.clearOfflineCache = clearOfflineCache;
const child_process_1 = require("child_process");
const os_1 = __importDefault(require("os"));
let _cached = null;
function isOffline() {
    if (_cached !== null)
        return _cached;
    try {
        const platform = os_1.default.platform();
        if (platform === "win32") {
            (0, child_process_1.execSync)("powershell -Command \"Test-NetConnection registry.npmjs.org -Port 443 -TimeoutSeconds 2\"", {
                timeout: 4000,
                stdio: "pipe",
            });
        }
        else {
            (0, child_process_1.execSync)("curl -s --connect-timeout 3 -o /dev/null https://registry.npmjs.org/", {
                timeout: 5000,
                stdio: "pipe",
            });
        }
        _cached = false;
        return false;
    }
    catch {
        _cached = true;
        return true;
    }
}
function clearOfflineCache() {
    _cached = null;
}
//# sourceMappingURL=offline.js.map