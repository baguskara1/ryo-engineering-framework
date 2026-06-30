"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = publish;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const logger_1 = require("../utils/logger");
const loadSkills_1 = require("../skills/loadSkills");
const fs_1 = require("../utils/fs");
function publish(skill) {
    if (!skill) {
        logger_1.logger.error("Usage: ryo publish <skill>");
        return;
    }
    const found = (0, loadSkills_1.loadSkills)().find(s => s.name === skill);
    if (!found) {
        logger_1.logger.error("Skill not installed.");
        return;
    }
    const distPath = "dist";
    fs_extra_1.default.ensureDirSync(distPath);
    const outputPath = path_1.default.join(distPath, found.name);
    if ((0, fs_1.safeExistsSync)(outputPath)) {
        (0, fs_1.removeDirectorySync)(outputPath);
    }
    (0, fs_1.copyDirectorySync)(found.path, outputPath);
    logger_1.logger.success(`Package created: ${outputPath}`);
}
//# sourceMappingURL=publish.js.map