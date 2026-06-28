import { loadSkills } from "../skills/loadSkills";
import { logger } from "../utils/logger";

export function search(keyword?: string) {

    if (!keyword) {

        logger.error("Usage: ryo search <keyword>");
        return;

    }

    const q = keyword.toLowerCase();

    const results = loadSkills().filter(skill =>
        skill.name.toLowerCase().includes(q) ||
        skill.category.toLowerCase().includes(q)
    );

    console.log("");

    logger.info("🔎 Search Results");

    console.log("");

    if (results.length === 0) {

        logger.warning("No skills found.");

        console.log("");

        return;
    }

    for (const skill of results) {

        console.log(`• ${skill.category}/${skill.name}`);

    }

    console.log("");
}