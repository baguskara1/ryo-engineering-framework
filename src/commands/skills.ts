import pc from "picocolors";
import { loadSkills } from "../skills/loadSkills";
import { logger } from "../utils/logger";

export function skills() {
    const all = loadSkills();

    if (all.length === 0) {
        logger.warning("No skills installed.");
        return;
    }

    logger.blank();
    logger.info(`Installed Skills (${all.length} total)`);
    logger.blank();

    const sorted = [...all].sort((a, b) => {
        if (a.category !== b.category) return a.category.localeCompare(b.category);
        return a.name.localeCompare(b.name);
    });

    const categoryWidth = Math.max(...sorted.map((s) => s.category.length), 8);
    const nameWidth = Math.max(...sorted.map((s) => s.name.length), 5);

    const header = `  ${"Category".padEnd(categoryWidth)}  ${"Skill".padEnd(nameWidth)}`;
    const sep = `  ${"─".repeat(categoryWidth)}  ${"─".repeat(nameWidth)}`;

    logger.plain(pc.bold(pc.dim(header)));
    logger.plain(pc.dim(sep));

    let lastCategory = "";
    for (const skill of sorted) {
        const cat = skill.category === lastCategory ? "" : skill.category;
        logger.plain(
            `  ${pc.cyan(cat.padEnd(categoryWidth))}  ${skill.name.padEnd(nameWidth)}`
        );
        lastCategory = skill.category;
    }

    logger.blank();
}
