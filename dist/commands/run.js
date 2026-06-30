"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const logger_1 = require("../utils/logger");
const loadSkills_1 = require("../skills/loadSkills");
const readSkill_1 = require("../utils/readSkill");
function run(skill) {
    if (!skill) {
        logger_1.logger.error("Usage: ryo run <skill>");
        return;
    }
    const found = (0, loadSkills_1.loadSkills)().find(s => s.name === skill);
    if (!found) {
        logger_1.logger.error("Skill not found.");
        return;
    }
    logger_1.logger.success(`Found: ${found.category}/${found.name}`);
    const content = (0, readSkill_1.readSkill)(found.path);
    logger_1.logger.plain(content);
}
//# sourceMappingURL=run.js.map