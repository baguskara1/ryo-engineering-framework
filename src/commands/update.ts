import fs from "fs";
import path from "path";

import { logger } from "../utils/logger";
import { loadRegistry } from "../registry/loadRegistry";
import { copyDirectory } from "../utils/copyDirectory";

export function update(skill?: string) {

    if (!skill) {
        logger.error("Usage: ryo update <skill>");
        return;
    }

    const found = loadRegistry().find(
        s => s.name === skill
    );

    if (!found) {
        logger.error("Skill not found in registry.");
        return;
    }

    const source = path.join(
        "official-skills",
        found.category,
        found.name
    );

    const target = path.join(
        "skills",
        found.category,
        found.name
    );

    if (!fs.existsSync(source)) {
        logger.error("Official skill not found.");
        return;
    }

    if (fs.existsSync(target)) {
        fs.rmSync(target, {
            recursive: true,
            force: true
        });
    }

    copyDirectory(source, target);

    logger.success(
        `Updated ${found.category}/${found.name}`
    );
}