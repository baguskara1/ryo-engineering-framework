import pc from "picocolors";
import { logger } from "../utils/logger";
import { loadRegistry } from "../registry/loadRegistry";

export function registry() {
    const skills = loadRegistry();

    if (skills.length === 0) {
        logger.warning("Registry is empty.");
        return;
    }

    const label = skills.length === 1 ? "1 skill" : `${skills.length} skills`;
    logger.blank();
    logger.info(`Official Registry (${label})`);
    logger.blank();

    const sorted = [...skills].sort((a, b) => {
        if (a.category !== b.category) return a.category.localeCompare(b.category);
        return a.name.localeCompare(b.name);
    });

    const categoryWidth = Math.max(...sorted.map((s) => s.category.length), 8);
    const nameWidth = Math.max(...sorted.map((s) => s.name.length), 5);
    const verWidth = 7;

    const header = `  ${"Category".padEnd(categoryWidth)}  ${"Skill".padEnd(nameWidth)}  ${"Version".padEnd(verWidth)}`;
    const sep = `  ${"─".repeat(categoryWidth)}  ${"─".repeat(nameWidth)}  ${"─".repeat(verWidth)}`;

    logger.plain(pc.bold(pc.dim(header)));
    logger.plain(pc.dim(sep));

    let lastCategory = "";
    for (const skill of sorted) {
        const cat = skill.category === lastCategory ? "" : skill.category;
        logger.plain(
            `  ${pc.cyan(cat.padEnd(categoryWidth))}  ${skill.name.padEnd(nameWidth)}  ${pc.dim(skill.version.padEnd(verWidth))}`
        );
        lastCategory = skill.category;
    }

    logger.blank();
}
