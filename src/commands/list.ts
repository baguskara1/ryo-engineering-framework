import path from "path";

import { logger } from "../utils/logger";
import { safeExistsSync, safeReadDirSync } from "../utils/fs";

export function list(): void {

    const skillsDir = path.join("skills");

    if (!safeExistsSync(skillsDir)) {
        logger.warning("No skills installed.");
        return;
    }

    const categories = safeReadDirSync(skillsDir);

    if (categories.length === 0) {
        logger.warning("No skills installed.");
        return;
    }

    logger.info("Installed skills:");

    for (const category of categories) {

        logger.plain(`${category}/`);

        const skills = safeReadDirSync(path.join(skillsDir, category));

        for (const skill of skills) {
            logger.plain(`  - ${skill}`);
        }
    }

}