import fs from "fs";
import path from "path";

import { logger } from "../utils/logger";
import { loadSkills } from "../skills/loadSkills";
import { readSkill } from "../utils/readSkill";

export function exportSkill(skill?: string) {

    if (!skill) {
        logger.error("Usage: ryo export <skill>");
        return;
    }

    const found = loadSkills().find(
        s => s.name === skill
    );

    if (!found) {
        logger.error("Skill not found.");
        return;
    }

    const output = readSkill(found.path);

    const exportDir = "exports";

    if (!fs.existsSync(exportDir)) {
        fs.mkdirSync(exportDir);
    }

    const outputFile = path.join(
        exportDir,
        `${found.name}.md`
    );

    fs.writeFileSync(outputFile, output);

    logger.success(`Exported to ${outputFile}`);
}