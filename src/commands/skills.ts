import { loadSkills } from "../skills/loadSkills";
import { logger } from "../utils/logger";

export function skills() {

    logger.blank();

    logger.info("Installed Skills");

    logger.blank();

    for (const skill of loadSkills()) {

        logger.plain(`• ${skill.category}/${skill.name}`);

    }

    logger.blank();

}