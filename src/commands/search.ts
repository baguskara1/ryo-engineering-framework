import { loadRegistry } from "../registry/loadRegistry";
import { logger } from "../utils/logger";

export function search(keyword?: string) {

    if (!keyword) {
        logger.error("Usage: ryo search <keyword>");
        return;
    }

    const results = loadRegistry().filter(skill =>
        skill.name.toLowerCase().includes(keyword.toLowerCase()) ||
        skill.category.toLowerCase().includes(keyword.toLowerCase())
    );

    if (results.length === 0) {
        logger.warning("No matching skills found.");
        return;
    }

    console.log("");

    console.log(`Found ${results.length} skill(s):`);

    for (const skill of results) {
        console.log(
            `${skill.category}/${skill.name}`
        );
    }

    console.log("");
}