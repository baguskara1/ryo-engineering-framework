"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skills = skills;
const picocolors_1 = __importDefault(require("picocolors"));
const loadSkills_1 = require("../skills/loadSkills");
const logger_1 = require("../utils/logger");
function skills() {
    const all = (0, loadSkills_1.loadSkills)();
    if (all.length === 0) {
        logger_1.logger.warning("No skills installed.");
        return;
    }
    const grouped = new Map();
    for (const skill of all) {
        const list = grouped.get(skill.category) ?? [];
        list.push(skill);
        grouped.set(skill.category, list);
    }
    logger_1.logger.blank();
    logger_1.logger.info(`Installed Skills (${all.length} total)`);
    logger_1.logger.blank();
    const sortedCategories = [...grouped.keys()].sort();
    for (let ci = 0; ci < sortedCategories.length; ci++) {
        const category = sortedCategories[ci];
        const items = [...grouped.get(category)].sort((a, b) => a.name.localeCompare(b.name));
        logger_1.logger.plain(picocolors_1.default.bold(picocolors_1.default.cyan(`${category}/`)));
        for (let i = 0; i < items.length; i++) {
            const skill = items[i];
            const prefix = i === items.length - 1 ? "  └── " : "  ├── ";
            logger_1.logger.plain(`${prefix}${skill.name}`);
        }
        if (ci < sortedCategories.length - 1) {
            logger_1.logger.blank();
        }
    }
    logger_1.logger.blank();
}
//# sourceMappingURL=skills.js.map