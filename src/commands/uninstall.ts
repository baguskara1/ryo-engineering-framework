import fs from "fs";
import path from "path";

import { logger } from "../utils/logger";
import { loadRegistry } from "../registry/loadRegistry";

export function uninstall(skill?: string) {

    if (!skill) {
        logger.error("Usage: ryo uninstall <skill>");
        return;
    }

    const found = loadRegistry().find(
        s => s.name === skill
    );

    if (!found) {
        logger.error("Skill not found in registry.");
        return;
    }

    const target = path.join(
        "skills",
        found.category,
        found.name
    );

    if (!fs.existsSync(target)) {
        logger.warning("Skill is not installed.");
        return;
    }

    fs.rmSync(target, {
        recursive: true,
        force: true
    });

    logger.success(
        `Removed ${found.category}/${found.name}`
    );

}