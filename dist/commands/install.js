"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.install = install;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../utils/logger");
const loadRegistry_1 = require("../registry/loadRegistry");
const spinner_1 = require("../utils/spinner");
const packagePath_1 = require("../utils/packagePath");
function install(skill) {
    if (!skill) {
        logger_1.logger.error("Usage: ryo install <skill>");
        return;
    }
    const found = (0, loadRegistry_1.findInRegistry)(skill);
    if (!found) {
        logger_1.logger.error("Skill not found in registry.");
        return;
    }
    const source = (0, packagePath_1.resolveAsset)("official-skills", found.category, found.name);
    const target = path_1.default.join("skills", found.category, found.name);
    if (!fs_1.default.existsSync(source)) {
        logger_1.logger.error("Official skill not found.");
        return;
    }
    if (fs_1.default.existsSync(target)) {
        logger_1.logger.warning("Skill already installed.");
        return;
    }
    (0, spinner_1.withSpinner)(`Installing ${found.category}/${found.name}...`, () => {
        fs_1.default.cpSync(source, target, { recursive: true });
    });
    logger_1.logger.success(`Installed ${found.category}/${found.name}`);
}
//# sourceMappingURL=install.js.map