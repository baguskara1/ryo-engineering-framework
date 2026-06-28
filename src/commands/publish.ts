import fs from "fs";
import path from "path";

import { logger } from "../utils/logger";
import { loadSkills } from "../skills/loadSkills";
import { copyDirectory } from "../utils/copyDirectory";

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

    // Buat folder dist jika belum ada
    const distPath = "dist";

    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath);
    }

    // Folder tujuan package
    const outputPath = path.join(
        distPath,
        found.name
    );

    // Hapus jika sudah ada
    if (fs.existsSync(outputPath)) {
        fs.rmSync(outputPath, {
            recursive: true,
            force: true
        });
    }

    // Copy seluruh isi skill
    copyDirectory(
        found.path,
        outputPath
    );

    logger.success(
        `Package created: ${outputPath}`
    );
}