import fs from "fs-extra";
import path from "path";
import { logger } from "../utils/logger";
import { processTemplates } from "../utils/processTemplates";
import { isValidName } from "../utils/validators";
import { resolveAsset } from "../utils/packagePath";

const INIT_TEMPLATE_DIR = resolveAsset("templates", "init");

export function init(projectName?: string) {
    const targetDir = projectName ? path.resolve(projectName) : process.cwd();
    const projectNameLabel = projectName || "current directory";

    if (projectName && fs.existsSync(targetDir)) {
        logger.blank();
        logger.error(`Directory "${projectName}" already exists.`);
        logger.blank();
        return;
    }

    if (projectName && !isValidName(projectName)) {
        logger.blank();
        logger.error("Invalid project name. Use lowercase letters, numbers, and hyphens.");
        logger.blank();
        return;
    }

    // Create standard REF structure
    const folders = ["skills", "docs", "templates", "scripts", "specs"];
    for (const folder of folders) {
        fs.ensureDirSync(path.join(targetDir, folder));
    }

    // Copy and process template files
    if (fs.existsSync(INIT_TEMPLATE_DIR)) {
        fs.copySync(INIT_TEMPLATE_DIR, targetDir);
        processTemplates(targetDir, {
            PROJECT_NAME: projectName || "my-ryo-project",
            YEAR: new Date().getFullYear().toString(),
        });
    }

    logger.blank();
    logger.success(`Successfully initialized Ryo Engineering Framework in ${projectNameLabel}`);
    logger.blank();
}
