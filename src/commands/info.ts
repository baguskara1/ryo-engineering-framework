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

    console.log("");

    logger.info(`📦 ${skill.name}`);

    console.log("");

    console.log(`Category : ${skill.category}`);
    console.log(`Path     : ${skill.path}`);

    if (skill.metadata?.version) {
        console.log(`Version  : ${skill.metadata.version}`);
    }

    if (skill.metadata?.description) {
        console.log(`Description : ${skill.metadata.description}`);
    }

    console.log("");
}