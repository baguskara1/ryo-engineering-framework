import path from "path";
import fs from "fs-extra";

import { logger } from "../utils/logger";
import { loadSkills } from "../skills/loadSkills";
import { copyDirectorySync, safeExistsSync, removeDirectorySync } from "../utils/fs";

export function publish(skill?: string) {

    if (!skill) {
        logger.error("Usage: ryo publish <skill>");
        return;
    }

    const found = loadSkills().find(
        s => s.name === skill
    );

    if (!found) {
        logger.error("Skill not installed.");
        return;
    }

    const distPath = "dist";
    fs.ensureDirSync(distPath);

    const outputPath = path.join(
        distPath,
        found.name
    );

    if (safeExistsSync(outputPath)) {
        removeDirectorySync(outputPath);
    }

    copyDirectorySync(
        found.path,
        outputPath
    );

    logger.success(
        `Package created: ${outputPath}`
    );
}