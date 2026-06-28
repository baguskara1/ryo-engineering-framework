import { logger } from "../utils/logger";
import { loadRegistry } from "../registry/loadRegistry";

export function registry() {

    logger.info("📦 Official Registry");
    console.log("");

    const skills = loadRegistry();

    if (skills.length === 0) {
        logger.warning("Registry is empty.");
        return;
    }

    for (const skill of skills) {
        console.log(
            `• ${skill.category}/${skill.name} (${skill.version})`
        );
    }

    console.log("");
}