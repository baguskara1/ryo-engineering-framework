import pc from "picocolors";
import { loadSkills } from "../skills/loadSkills";
import { logger } from "../utils/logger";

export function info(skillName?: string) {

    if (!skillName) {
        logger.error("Usage: ryo info <skill>");
        return;
    }

    const skill = loadSkills().find(
        s => s.name === skillName
    );

    if (!skill) {
        logger.error("Skill not found.");
        return;
    }

    logger.blank();
    logger.info(skill.name);
    logger.blank();

    logger.plain(`${pc.bold("Category")}:    ${skill.category}`);
    logger.plain(`${pc.bold("Path")}:        ${skill.path}`);

    if (skill.metadata?.version) {
        logger.plain(`${pc.bold("Version")}:     ${skill.metadata.version}`);
    }

    if (skill.metadata?.description) {
        logger.plain(`${pc.bold("Description")}: ${skill.metadata.description}`);
    }

    logger.blank();
}
