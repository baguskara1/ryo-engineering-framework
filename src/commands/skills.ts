import { loadSkills } from "../skills/loadSkills";
import { logger } from "../utils/logger";

export function skills() {

    console.log("");

    logger.info("📦 Installed Skills");

    console.log("");

    for (const skill of loadSkills()) {

        console.log(`• ${skill.category}/${skill.name}`);

    }

    console.log("");

}