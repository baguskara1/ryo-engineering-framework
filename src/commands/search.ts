import { searchInRegistry } from "../registry/loadRegistry";
import { logger } from "../utils/logger";

export function search(keyword?: string) {

    if (!keyword) {
        logger.error("Usage: ryo search <keyword>");
        return;
    }

    const results = searchInRegistry(keyword);

    if (results.length === 0) {
        logger.warning("No matching skills found.");
        return;
    }

    logger.blank();

    logger.plain(`Found ${results.length} skill(s):`);

    for (const skill of results) {
        logger.plain(
            `${skill.category}/${skill.name}`
        );
    }

    logger.blank();
}