import { logger } from "../utils/logger";
import { safeExistsSync } from "../utils/fs";

function checkDirectory(path: string) {
    if (safeExistsSync(path)) {
        logger.success(`✅ ${path}`);
    } else {
        logger.error(`❌ ${path} (missing)`);
    }
}

export function doctor() {

    logger.blank();
    logger.info("🔍 Running Ryo Doctor...");
    logger.blank();

    checkDirectory("skills");
    checkDirectory("docs");
    checkDirectory("templates");
    checkDirectory("scripts");
    checkDirectory("specs");

    logger.blank();
}