"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = info;
const picocolors_1 = __importDefault(require("picocolors"));
const loadSkills_1 = require("../skills/loadSkills");
const logger_1 = require("../utils/logger");
function info(skillName) {
    if (!skillName) {
        logger_1.logger.error("Usage: ryo info <skill>");
        return;
    }
    const skill = (0, loadSkills_1.loadSkills)().find(s => s.name === skillName);
    if (!skill) {
        logger_1.logger.error("Skill not found.");
        return;
    }
    logger_1.logger.blank();
    logger_1.logger.info(skill.name);
    logger_1.logger.blank();
    logger_1.logger.plain(`${picocolors_1.default.bold("Category")}:    ${skill.category}`);
    logger_1.logger.plain(`${picocolors_1.default.bold("Path")}:        ${skill.path}`);
    if (skill.metadata?.version) {
        logger_1.logger.plain(`${picocolors_1.default.bold("Version")}:     ${skill.metadata.version}`);
    }
    if (skill.metadata?.description) {
        logger_1.logger.plain(`${picocolors_1.default.bold("Description")}: ${skill.metadata.description}`);
    }
    logger_1.logger.blank();
}
//# sourceMappingURL=info.js.map