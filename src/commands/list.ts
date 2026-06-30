import path from "path";
import pc from "picocolors";

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

    logger.blank();
    logger.info(`Installed skills (${categories.length} ${categories.length === 1 ? "category" : "categories"})`);
    logger.blank();

    for (const category of categories) {
        const skills = safeReadDirSync(path.join(skillsDir, category));
        logger.plain(pc.bold(pc.cyan(`${category}/`)));

        for (let i = 0; i < skills.length; i++) {
            const prefix = i === skills.length - 1 ? "  └── " : "  ├── ";
            logger.plain(`${prefix}${skills[i]}`);
        }

        logger.blank();
    }
}
