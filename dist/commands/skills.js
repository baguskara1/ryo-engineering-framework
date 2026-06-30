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
    logger_1.logger.blank();
    logger_1.logger.info(`Installed Skills (${all.length} total)`);
    logger_1.logger.blank();
    const sorted = [...all].sort((a, b) => {
        if (a.category !== b.category)
            return a.category.localeCompare(b.category);
        return a.name.localeCompare(b.name);
    });
    const categoryWidth = Math.max(...sorted.map((s) => s.category.length), 8);
    const nameWidth = Math.max(...sorted.map((s) => s.name.length), 5);
    const header = `  ${"Category".padEnd(categoryWidth)}  ${"Skill".padEnd(nameWidth)}`;
    const sep = `  ${"─".repeat(categoryWidth)}  ${"─".repeat(nameWidth)}`;
    logger_1.logger.plain(picocolors_1.default.bold(picocolors_1.default.dim(header)));
    logger_1.logger.plain(picocolors_1.default.dim(sep));
    let lastCategory = "";
    for (const skill of sorted) {
        const cat = skill.category === lastCategory ? "" : skill.category;
        logger_1.logger.plain(`  ${picocolors_1.default.cyan(cat.padEnd(categoryWidth))}  ${skill.name.padEnd(nameWidth)}`);
        lastCategory = skill.category;
    }
    logger_1.logger.blank();
}
//# sourceMappingURL=skills.js.map