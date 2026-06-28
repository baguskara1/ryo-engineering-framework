import fs from "fs";
import path from "path";

import { logger } from "../utils/logger";

export function list(): void {

    const skillsDir = path.join("skills");

    if (!fs.existsSync(skillsDir)) {
        logger.warning("No skills installed.");
        return;
    }

    const categories = fs
        .readdirSync(skillsDir)
        .filter(category =>
            fs.statSync(path.join(skillsDir, category)).isDirectory()
        );

    if (categories.length === 0) {
        logger.warning("No skills installed.");
        return;
    }

    logger.info("Installed skills:");

    for (const category of categories) {

        console.log(`${category}/`);

        const skills = fs
            .readdirSync(path.join(skillsDir, category))
            .filter(skill =>
                fs.statSync(
                    path.join(skillsDir, category, skill)
                ).isDirectory()
            );

        for (const skill of skills) {
            console.log(`  - ${skill}`);
        }
    }

}