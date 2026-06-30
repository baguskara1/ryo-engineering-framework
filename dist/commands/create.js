"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableTemplates = getAvailableTemplates;
exports.create = create;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const processTemplates_1 = require("../utils/processTemplates");
const validators_1 = require("../utils/validators");
const logger_1 = require("../utils/logger");
const fs_2 = require("../utils/fs");
const packagePath_1 = require("../utils/packagePath");
const TEMPLATES_DIR = (0, packagePath_1.resolveAsset)("templates");
function getAvailableTemplates() {
    return (0, fs_2.safeReadDirSync)(TEMPLATES_DIR).filter((t) => fs_1.default.statSync(path_1.default.join(TEMPLATES_DIR, t)).isDirectory());
}
function create(category, skill, template) {
    if (!category || !skill) {
        logger_1.logger.blank();
        logger_1.logger.warning("Usage:");
        logger_1.logger.plain("create <category> <skill> [--template <name>]");
        logger_1.logger.blank();
        logger_1.logger.plain("Available templates:");
        const templates = getAvailableTemplates();
        if (templates.length === 0) {
            logger_1.logger.plain("  (none)");
        }
        else {
            for (const t of templates) {
                logger_1.logger.plain(`  - ${t}`);
            }
        }
        logger_1.logger.blank();
        return;
    }
    if (!(0, validators_1.isValidName)(category) || !(0, validators_1.isValidName)(skill)) {
        logger_1.logger.blank();
        logger_1.logger.error("Invalid name.");
        logger_1.logger.plain("Use lowercase letters, numbers, and hyphens only.");
        logger_1.logger.blank();
        return;
    }
    const templateName = template || "skill";
    const templatePath = path_1.default.join(TEMPLATES_DIR, templateName);
    if (!fs_1.default.existsSync(templatePath)) {
        logger_1.logger.blank();
        logger_1.logger.error(`Template "${templateName}" not found.`);
        logger_1.logger.plain(`Available templates: ${getAvailableTemplates().join(", ")}`);
        logger_1.logger.blank();
        return;
    }
    const skillPath = path_1.default.join("skills", category, skill);
    if (fs_1.default.existsSync(skillPath)) {
        logger_1.logger.blank();
        logger_1.logger.error("Skill already exists.");
        logger_1.logger.blank();
        return;
    }
    fs_1.default.cpSync(templatePath, skillPath, { recursive: true });
    (0, processTemplates_1.processTemplates)(skillPath, {
        CATEGORY: category,
        SKILL: skill,
    });
    logger_1.logger.blank();
    logger_1.logger.success("Skill created successfully!");
    logger_1.logger.plain(`Template : ${templateName}`);
    logger_1.logger.plain(`Path     : ${skillPath}`);
    logger_1.logger.blank();
}
//# sourceMappingURL=create.js.map