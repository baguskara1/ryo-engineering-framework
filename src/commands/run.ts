import fs from "fs";
import path from "path";

import { logger } from "../utils/logger";
import { loadSkills } from "../skills/loadSkills";
import { readSkill } from "../utils/readSkill";

export function run(skill?: string) {

    if (!skill) {
        logger.error("Usage: ryo run <skill>");
        return;
    }

    const found = loadSkills().find(
        s => s.name === skill
    );

    if (!found) {
        logger.error("Skill not found.");
        return;
    }

    logger.success(`Found: ${found.category}/${found.name}`);

    const content = readSkill(found.path);

    console.log(content);
}