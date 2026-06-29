import fs from "fs";
import path from "path";
import { processTemplates } from "../utils/processTemplates";
import { isValidName } from "../utils/validators";
import { logger } from "../utils/logger";
import { safeReadDirSync } from "../utils/fs";

export function getAvailableTemplates(): string[] {
    return safeReadDirSync("templates").filter((t) =>
        fs.statSync(path.join("templates", t)).isDirectory()
    );
}

export function create(category?: string, skill?: string, template?: string) {

    if (!category || !skill) {
        logger.blank();
        logger.warning("Usage:");
        logger.plain("create <category> <skill> [--template <name>]");
        logger.blank();
        logger.plain("Available templates:");

        const templates = getAvailableTemplates();
        if (templates.length === 0) {
            logger.plain("  (none)");
        } else {
            for (const t of templates) {
                logger.plain(`  - ${t}`);
            }
        }

        logger.blank();

        return;
    }

    if (!isValidName(category) || !isValidName(skill)) {
        logger.blank();
        logger.error("Invalid name.");
        logger.plain("Use lowercase letters, numbers, and hyphens only.");
        logger.blank();

        return;
    }

    const templateName = template || "skill";
    const templatePath = path.join("templates", templateName);

    if (!fs.existsSync(templatePath)) {
        logger.blank();
        logger.error(`Template "${templateName}" not found.`);
        logger.plain(`Available templates: ${getAvailableTemplates().join(", ")}`);
        logger.blank();

        return;
    }

    const skillPath = path.join("skills", category, skill);

    if (fs.existsSync(skillPath)) {
        logger.blank();
        logger.error("Skill already exists.");
        logger.blank();

        return;
    }

    fs.cpSync(templatePath, skillPath, { recursive: true });

    processTemplates(skillPath, {
        CATEGORY: category,
        SKILL: skill,
    });

    logger.blank();
    logger.success("Skill created successfully!");
    logger.plain(`Template : ${templateName}`);
    logger.plain(`Path     : ${skillPath}`);
    logger.blank();
}