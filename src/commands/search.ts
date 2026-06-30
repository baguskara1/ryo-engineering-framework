import pc from "picocolors";
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
    logger.info(`${results.length} skill(s) matching "${keyword}"`);

    for (const skill of results) {
        logger.plain(`  • ${pc.cyan(skill.category)}/${pc.bold(skill.name)} ${pc.dim(`v${skill.version}`)}`);
    }

    logger.blank();
}
