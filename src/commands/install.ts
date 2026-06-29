import fs from "fs";
import path from "path";

import { logger } from "../utils/logger";
import { findInRegistry } from "../registry/loadRegistry";
import { withSpinner } from "../utils/spinner";

export function install(skill?: string) {

    if (!skill) {
        logger.error("Usage: ryo install <skill>");
        return;
    }

    const found = findInRegistry(skill);

    if (!found) {
        logger.error("Skill not found in registry.");
        return;
    }

    const source = path.join(
        "official-skills",
        found.category,
        found.name
    );

    const target = path.join(
        "skills",
        found.category,
        found.name
    );

    if (!fs.existsSync(source)) {
        logger.error("Official skill not found.");
        return;
    }

    if (fs.existsSync(target)) {
        logger.warning("Skill already installed.");
        return;
    }

    withSpinner(`Installing ${found.category}/${found.name}...`, () => {
        fs.cpSync(source, target, { recursive: true });
    });

    logger.success(
        `Installed ${found.category}/${found.name}`
    );
}