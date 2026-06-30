"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = search;
const picocolors_1 = __importDefault(require("picocolors"));
const loadRegistry_1 = require("../registry/loadRegistry");
const logger_1 = require("../utils/logger");
function search(keyword) {
    if (!keyword) {
        logger_1.logger.error("Usage: ryo search <keyword>");
        return;
    }
    const results = (0, loadRegistry_1.searchInRegistry)(keyword);
    if (results.length === 0) {
        logger_1.logger.warning("No matching skills found.");
        return;
    }
    logger_1.logger.blank();
    logger_1.logger.info(`${results.length} skill(s) matching "${keyword}"`);
    for (const skill of results) {
        logger_1.logger.plain(`  • ${picocolors_1.default.cyan(skill.category)}/${picocolors_1.default.bold(skill.name)} ${picocolors_1.default.dim(`v${skill.version}`)}`);
    }
    logger_1.logger.blank();
}
//# sourceMappingURL=search.js.map