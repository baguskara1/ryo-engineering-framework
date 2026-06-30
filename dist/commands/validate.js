"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const path_1 = __importDefault(require("path"));
const picocolors_1 = __importDefault(require("picocolors"));
const requiredFiles_1 = require("../constants/requiredFiles");
const logger_1 = require("../utils/logger");
const fs_1 = require("../utils/fs");
function validate() {
    logger_1.logger.blank();
    logger_1.logger.info("Validating Skills...");
    logger_1.logger.blank();
    const categories = (0, fs_1.safeReadDirSync)("skills");
    let valid = 0;
    let invalid = 0;
    for (const category of categories) {
        const categoryPath = path_1.default.join("skills", category);
        const skills = (0, fs_1.safeReadDirSync)(categoryPath);
        for (const skill of skills) {
            const skillPath = path_1.default.join(categoryPath, skill);
            let ok = true;
            for (const file of requiredFiles_1.REQUIRED_FILES) {
                const fullPath = path_1.default.join(skillPath, file);
                if (!(0, fs_1.safeExistsSync)(fullPath)) {
                    ok = false;
                }
            }
            if (ok) {
                logger_1.logger.success(`  ✔  ${skillPath}`);
                valid++;
            }
            else {
                logger_1.logger.error(`  ✖  ${skillPath}`);
                for (const file of requiredFiles_1.REQUIRED_FILES) {
                    const fullPath = path_1.default.join(skillPath, file);
                    if (!(0, fs_1.safeExistsSync)(fullPath)) {
                        logger_1.logger.plain(`       └── Missing: ${file}`);
                    }
                }
                invalid++;
            }
        }
    }
    logger_1.logger.blank();
    logger_1.logger.plain(picocolors_1.default.dim("  ───────────────────────────"));
    logger_1.logger.plain(`  ${picocolors_1.default.green(`✔ ${valid} valid`)}  ${invalid > 0 ? picocolors_1.default.red(`✖ ${invalid} invalid`) : picocolors_1.default.green(`✖ ${invalid} invalid`)}`);
    logger_1.logger.plain(picocolors_1.default.dim("  ───────────────────────────"));
    logger_1.logger.blank();
}
//# sourceMappingURL=validate.js.map