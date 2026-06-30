"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registry = registry;
const picocolors_1 = __importDefault(require("picocolors"));
const logger_1 = require("../utils/logger");
const loadRegistry_1 = require("../registry/loadRegistry");
function registry() {
    const skills = (0, loadRegistry_1.loadRegistry)();
    if (skills.length === 0) {
        logger_1.logger.warning("Registry is empty.");
        return;
    }
    const grouped = new Map();
    for (const skill of skills) {
        const list = grouped.get(skill.category) ?? [];
        list.push(skill);
        grouped.set(skill.category, list);
    }
    const label = skills.length === 1 ? "1 skill" : `${skills.length} skills`;
    logger_1.logger.info(`Official Registry (${label})`);
    logger_1.logger.blank();
    const sortedCategories = [...grouped.keys()].sort();
    for (let ci = 0; ci < sortedCategories.length; ci++) {
        const category = sortedCategories[ci];
        const items = [...grouped.get(category)].sort((a, b) => a.name.localeCompare(b.name));
        logger_1.logger.plain(picocolors_1.default.bold(picocolors_1.default.cyan(`${category}/`)));
        for (let i = 0; i < items.length; i++) {
            const skill = items[i];
            const prefix = i === items.length - 1 ? "└── " : "├── ";
            logger_1.logger.plain(`${prefix}${skill.name} ${picocolors_1.default.dim(`(${skill.version})`)}`);
        }
        if (ci < sortedCategories.length - 1) {
            logger_1.logger.blank();
        }
    }
    logger_1.logger.blank();
}
//# sourceMappingURL=registry.js.map