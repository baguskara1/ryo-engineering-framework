import pc from "picocolors";
import { logger } from "../utils/logger";
import { loadRegistry } from "../registry/loadRegistry";

export function registry() {

    const skills = loadRegistry();

    if (skills.length === 0) {
        logger.warning("Registry is empty.");
        return;
    }

    const grouped = new Map<string, typeof skills>();
    for (const skill of skills) {
        const list = grouped.get(skill.category) ?? [];
        list.push(skill);
        grouped.set(skill.category, list);
    }

    const label = skills.length === 1 ? "1 skill" : `${skills.length} skills`;
    logger.info(`Official Registry (${label})`);
    logger.blank();

    const sortedCategories = [...grouped.keys()].sort();

    for (let ci = 0; ci < sortedCategories.length; ci++) {
        const category = sortedCategories[ci];
        const items = [...grouped.get(category)!].sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        logger.plain(pc.bold(pc.cyan(`${category}/`)));

        for (let i = 0; i < items.length; i++) {
            const skill = items[i];
            const prefix = i === items.length - 1 ? "└── " : "├── ";
            logger.plain(`${prefix}${skill.name} ${pc.dim(`(${skill.version})`)}`);
        }

        if (ci < sortedCategories.length - 1) {
            logger.blank();
        }
    }

    logger.blank();
}