import pc from "picocolors";
import { logger } from "../utils/logger";
import { safeExistsSync } from "../utils/fs";

function checkDirectory(path: string) {
    const exists = safeExistsSync(path);
    const badge = exists ? pc.green("✔") : pc.red("✖");
    const label = exists ? path : `${path} ${pc.dim("(missing)")}`;
    logger.plain(`  ${badge}  ${label}`);
}

export function doctor() {

    logger.blank();
    logger.info("Running Ryo Doctor...");
    logger.blank();

    checkDirectory("skills");
    checkDirectory("docs");
    checkDirectory("templates");
    checkDirectory("scripts");
    checkDirectory("specs");

    logger.blank();
}
