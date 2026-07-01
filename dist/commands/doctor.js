"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctor = doctor;
const picocolors_1 = __importDefault(require("picocolors"));
const child_process_1 = require("child_process");
const logger_1 = require("../utils/logger");
const fs_1 = require("../utils/fs");
const offline_1 = require("../utils/offline");
function check(label, ok, detail) {
    const badge = ok ? picocolors_1.default.green("✔") : picocolors_1.default.red("✖");
    const msg = ok ? label : detail ? `${label} ${picocolors_1.default.dim(`(${detail})`)}` : `${label} ${picocolors_1.default.dim("(issue)")}`;
    logger_1.logger.plain(`  ${badge}  ${msg}`);
}
function getVersion(cmd) {
    try {
        return (0, child_process_1.execSync)(`${cmd} --version`, { encoding: "utf-8", timeout: 5000 }).toString().trim();
    }
    catch {
        return null;
    }
}
function doctor() {
    logger_1.logger.blank();
    logger_1.logger.info(picocolors_1.default.bold("Ryo Doctor — System Check"));
    logger_1.logger.blank();
    const nodeVer = process.version;
    const nodeMajor = parseInt(process.version.slice(1).split(".")[0], 10);
    check("Node.js", nodeMajor >= 20, `${nodeVer} (minimum: v20)`);
    const npmVer = getVersion("npm");
    check("npm", npmVer !== null, npmVer ? `v${npmVer}` : "not found");
    const offline = (0, offline_1.isOffline)();
    check("Internet", !offline, offline ? "no connection" : "online");
    logger_1.logger.blank();
    logger_1.logger.info(picocolors_1.default.bold("Project Structure"));
    logger_1.logger.blank();
    const dirs = ["skills", "docs", "templates", "scripts", "specs"];
    for (const dir of dirs) {
        check(dir, (0, fs_1.safeExistsSync)(dir));
    }
    const hasConfig = (0, fs_1.safeExistsSync)("ryo.json");
    check("ryo.json", hasConfig, hasConfig ? "found" : "not found");
    const hasPackage = (0, fs_1.safeExistsSync)("package.json");
    check("package.json", hasPackage, hasPackage ? "found" : "not found");
    logger_1.logger.blank();
}
//# sourceMappingURL=doctor.js.map