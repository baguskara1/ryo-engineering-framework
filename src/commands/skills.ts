import pc from "picocolors";
import { loadSkills } from "../skills/loadSkills";
import { logger } from "../utils/logger";

export function skills() {

    const all = loadSkills();

    if (all.length === 0) {
        logger.warning("No skills installed.");
        return;
    }

    const grouped = new Map<string, typeof all>();
    for (const skill of all) {
        const list = grouped.get(skill.category) ?? [];
        list.push(skill);
        grouped.set(skill.category, list);
    }

    logger.blank();
    logger.info(`Installed Skills (${all.length} total)`);
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
            const prefix = i === items.length - 1 ? "  └── " : "  ├── ";
            logger.plain(`${prefix}${skill.name}`);
        }

        if (ci < sortedCategories.length - 1) {
            logger.blank();
        }
    }

    logger.blank();
}
