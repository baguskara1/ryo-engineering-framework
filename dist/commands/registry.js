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
    const label = skills.length === 1 ? "1 skill" : `${skills.length} skills`;
    logger_1.logger.blank();
    logger_1.logger.info(`Official Registry (${label})`);
    logger_1.logger.blank();
    const sorted = [...skills].sort((a, b) => {
        if (a.category !== b.category)
            return a.category.localeCompare(b.category);
        return a.name.localeCompare(b.name);
    });
    const categoryWidth = Math.max(...sorted.map((s) => s.category.length), 8);
    const nameWidth = Math.max(...sorted.map((s) => s.name.length), 5);
    const verWidth = 7;
    const header = `  ${"Category".padEnd(categoryWidth)}  ${"Skill".padEnd(nameWidth)}  ${"Version".padEnd(verWidth)}`;
    const sep = `  ${"─".repeat(categoryWidth)}  ${"─".repeat(nameWidth)}  ${"─".repeat(verWidth)}`;
    logger_1.logger.plain(picocolors_1.default.bold(picocolors_1.default.dim(header)));
    logger_1.logger.plain(picocolors_1.default.dim(sep));
    let lastCategory = "";
    for (const skill of sorted) {
        const cat = skill.category === lastCategory ? "" : skill.category;
        logger_1.logger.plain(`  ${picocolors_1.default.cyan(cat.padEnd(categoryWidth))}  ${skill.name.padEnd(nameWidth)}  ${picocolors_1.default.dim(skill.version.padEnd(verWidth))}`);
        lastCategory = skill.category;
    }
    logger_1.logger.blank();
}
//# sourceMappingURL=registry.js.map