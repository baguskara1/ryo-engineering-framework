"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../utils/logger");
const processTemplates_1 = require("../utils/processTemplates");
const validators_1 = require("../utils/validators");
const packagePath_1 = require("../utils/packagePath");
const INIT_TEMPLATE_DIR = (0, packagePath_1.resolveAsset)("templates", "init");
function init(projectName) {
    const targetDir = projectName ? path_1.default.resolve(projectName) : process.cwd();
    const projectNameLabel = projectName || "current directory";
    if (projectName && fs_extra_1.default.existsSync(targetDir)) {
        logger_1.logger.blank();
        logger_1.logger.error(`Directory "${projectName}" already exists.`);
        logger_1.logger.blank();
        return;
    }
    if (projectName && !(0, validators_1.isValidName)(projectName)) {
        logger_1.logger.blank();
        logger_1.logger.error("Invalid project name. Use lowercase letters, numbers, and hyphens.");
        logger_1.logger.blank();
        return;
    }
    // Create standard REF structure
    const folders = ["skills", "docs", "templates", "scripts", "specs"];
    for (const folder of folders) {
        fs_extra_1.default.ensureDirSync(path_1.default.join(targetDir, folder));
    }
    // Copy and process template files
    if (fs_extra_1.default.existsSync(INIT_TEMPLATE_DIR)) {
        fs_extra_1.default.copySync(INIT_TEMPLATE_DIR, targetDir);
        (0, processTemplates_1.processTemplates)(targetDir, {
            PROJECT_NAME: projectName || "my-ryo-project",
            YEAR: new Date().getFullYear().toString(),
        });
    }
    logger_1.logger.blank();
    logger_1.logger.success(`Successfully initialized Ryo Engineering Framework in ${projectNameLabel}`);
    logger_1.logger.blank();
}
//# sourceMappingURL=init.js.map