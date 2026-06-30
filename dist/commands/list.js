"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
const path_1 = __importDefault(require("path"));
const picocolors_1 = __importDefault(require("picocolors"));
const logger_1 = require("../utils/logger");
const fs_1 = require("../utils/fs");
function list() {
    const skillsDir = path_1.default.join("skills");
    if (!(0, fs_1.safeExistsSync)(skillsDir)) {
        logger_1.logger.warning("No skills installed.");
        return;
    }
    const categories = (0, fs_1.safeReadDirSync)(skillsDir);
    if (categories.length === 0) {
        logger_1.logger.warning("No skills installed.");
        return;
    }
    logger_1.logger.blank();
    logger_1.logger.info(`Installed skills (${categories.length} ${categories.length === 1 ? "category" : "categories"})`);
    logger_1.logger.blank();
    for (const category of categories) {
        const skills = (0, fs_1.safeReadDirSync)(path_1.default.join(skillsDir, category));
        logger_1.logger.plain(picocolors_1.default.bold(picocolors_1.default.cyan(`${category}/`)));
        for (let i = 0; i < skills.length; i++) {
            const prefix = i === skills.length - 1 ? "  └── " : "  ├── ";
            logger_1.logger.plain(`${prefix}${skills[i]}`);
        }
        logger_1.logger.blank();
    }
}
//# sourceMappingURL=list.js.map