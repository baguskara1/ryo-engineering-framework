import path from "path";

import { logger } from "../utils/logger";
import { findInRegistry } from "../registry/loadRegistry";
import { copyDirectorySync, safeExistsSync, removeDirectorySync } from "../utils/fs";
import { resolveAsset } from "../utils/packagePath";

export function update(skill?: string) {

    if (!skill) {
        logger.error("Usage: ryo update <skill>");
        return;
    }

    const found = findInRegistry(skill);

    if (!found) {
        logger.error("Skill not found in registry.");
        return;
    }

    const source = resolveAsset(
        "official-skills",
        found.category,
        found.name
    );

    const target = path.join(
        "skills",
        found.category,
        found.name
    );

    if (!safeExistsSync(source)) {
        logger.error("Official skill not found.");
        return;
    }

    if (safeExistsSync(target)) {
        removeDirectorySync(target);
    }

    copyDirectorySync(source, target);

    logger.success(
        `Updated ${found.category}/${found.name}`
    );
}