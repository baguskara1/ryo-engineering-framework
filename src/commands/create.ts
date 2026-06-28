import fs from "fs";
import path from "path";
import { copyDirectory } from "../utils/copyDirectory";
import { processTemplates } from "../utils/processTemplates";
import { isValidName } from "../utils/validators";
import { logger } from "../utils/logger";

export function create(category?: string, skill?: string) {

    if (!category || !skill) {

        console.log("");
        logger.warning("Usage:");
        console.log("create <category> <skill>");
        console.log("");

        return;
    }

    if (!isValidName(category) || !isValidName(skill)) {

        console.log("");
        logger.error("❌ Invalid name.");
        console.log("Use lowercase letters, numbers, and hyphens only.");
        console.log("");

        return;
    }

    const skillPath = path.join("skills", category, skill);

    if (fs.existsSync(skillPath)) {

        console.log("");
        logger.error("❌ Skill already exists.");
        console.log("");

        return;
    }

    copyDirectory("templates/skill", skillPath);

    processTemplates(skillPath, {
        CATEGORY: category,
        SKILL: skill,
    });

    console.log("");
    logger.success("✅ Skill created successfully!");
    console.log(skillPath);
    console.log("");
}