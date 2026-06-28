import fs from "fs";
import path from "path";

import { logger } from "../utils/logger";
import { loadRegistry } from "../registry/loadRegistry";
import { copyDirectory } from "../utils/copyDirectory";

export function install(skill?: string) {

    // <-- TARUH DI SINI
    console.log("CWD:", process.cwd());

    if (!skill) {
        logger.error("Usage: ryo install <skill>");
        return;
    }

    const found = loadRegistry().find(
        s => s.name === skill
    );

    // <-- TAMBAHKAN DI SINI
    console.log("FOUND:", found);

    if (!found) {
        logger.error("Skill not found in registry.");
        return;
    }

    const source = path.join(
        "official-skills",
        found.category,
        found.name
    );

    // <-- TAMBAHKAN DI SINI
    console.log("SOURCE:", source);
    console.log("EXISTS:", fs.existsSync(source));

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

    copyDirectory(source, target);

    logger.success(
        `Installed ${found.category}/${found.name}`
    );
}