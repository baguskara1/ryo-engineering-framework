"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctor = doctor;
const picocolors_1 = __importDefault(require("picocolors"));
const logger_1 = require("../utils/logger");
const fs_1 = require("../utils/fs");
function checkDirectory(path) {
    const exists = (0, fs_1.safeExistsSync)(path);
    const badge = exists ? picocolors_1.default.green("✔") : picocolors_1.default.red("✖");
    const label = exists ? path : `${path} ${picocolors_1.default.dim("(missing)")}`;
    logger_1.logger.plain(`  ${badge}  ${label}`);
}
function doctor() {
    logger_1.logger.blank();
    logger_1.logger.info("Running Ryo Doctor...");
    logger_1.logger.blank();
    checkDirectory("skills");
    checkDirectory("docs");
    checkDirectory("templates");
    checkDirectory("scripts");
    checkDirectory("specs");
    logger_1.logger.blank();
}
//# sourceMappingURL=doctor.js.map