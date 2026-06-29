import path from "path";

import { REQUIRED_FILES } from "../constants/requiredFiles";
import { logger } from "../utils/logger";
import { safeExistsSync, safeReadDirSync } from "../utils/fs";

export function validate() {

    logger.blank();
    logger.info("🔍 Validating Skills...");
    logger.blank();

    const categories = safeReadDirSync("skills");

    let valid = 0;
    let invalid = 0;

    for (const category of categories) {

        const categoryPath = path.join("skills", category);

        const skills = safeReadDirSync(categoryPath);

        for (const skill of skills) {

            const skillPath = path.join(categoryPath, skill);

            let ok = true;

            for (const file of REQUIRED_FILES) {

                const fullPath = path.join(skillPath, file);

                if (!safeExistsSync(fullPath)) {
                    ok = false;
                }
            }

            if (ok) {
                logger.success(`✅ ${skillPath}`);
                valid++;
            } else {

                logger.error(`❌ ${skillPath}`);

                for (const file of REQUIRED_FILES) {

                    const fullPath = path.join(skillPath, file);

                    if (!safeExistsSync(fullPath)) {
                        logger.plain(`   └── Missing: ${file}`);
                    }
                }

                invalid++;
            }
        }
    }

    logger.blank();
    logger.plain("----------------------------");
    logger.plain(`Valid   : ${valid}`);
    logger.plain(`Invalid : ${invalid}`);
    logger.plain("----------------------------");
    logger.blank();
}