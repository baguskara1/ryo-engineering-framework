"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uninstall = uninstall;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../utils/logger");
const loadRegistry_1 = require("../registry/loadRegistry");
function uninstall(skill) {
    if (!skill) {
        logger_1.logger.error("Usage: ryo uninstall <skill>");
        return;
    }
    const found = (0, loadRegistry_1.findInRegistry)(skill);
    if (!found) {
        logger_1.logger.error("Skill not found in registry.");
        return;
    }
    const target = path_1.default.join("skills", found.category, found.name);
    if (!fs_1.default.existsSync(target)) {
        logger_1.logger.warning("Skill is not installed.");
        return;
    }
    fs_1.default.rmSync(target, {
        recursive: true,
        force: true
    });
    logger_1.logger.success(`Removed ${found.category}/${found.name}`);
}
//# sourceMappingURL=uninstall.js.map