"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = update;
const path_1 = __importDefault(require("path"));
const logger_1 = require("../utils/logger");
const loadRegistry_1 = require("../registry/loadRegistry");
const fs_1 = require("../utils/fs");
const packagePath_1 = require("../utils/packagePath");
function update(skill) {
    if (!skill) {
        logger_1.logger.error("Usage: ryo update <skill>");
        return;
    }
    const found = (0, loadRegistry_1.findInRegistry)(skill);
    if (!found) {
        logger_1.logger.error("Skill not found in registry.");
        return;
    }
    const source = (0, packagePath_1.resolveAsset)("official-skills", found.category, found.name);
    const target = path_1.default.join("skills", found.category, found.name);
    if (!(0, fs_1.safeExistsSync)(source)) {
        logger_1.logger.error("Official skill not found.");
        return;
    }
    if ((0, fs_1.safeExistsSync)(target)) {
        (0, fs_1.removeDirectorySync)(target);
    }
    (0, fs_1.copyDirectorySync)(source, target);
    logger_1.logger.success(`Updated ${found.category}/${found.name}`);
}
//# sourceMappingURL=update.js.map