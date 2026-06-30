import { logger } from "../utils/logger";

export function help() {
    logger.blank();
    logger.info("Ryo Engineering Framework");
    logger.blank();

    const commands: { name: string; desc: string }[] = [
        { name: "init", desc: "Initialize a new project" },
        { name: "create <category> <skill>", desc: "Create a new skill from a template" },
        { name: "install <skill>", desc: "Install a skill from the registry" },
        { name: "uninstall <skill>", desc: "Uninstall a skill" },
        { name: "update <skill>", desc: "Update an installed skill" },
        { name: "upgrade", desc: "Upgrade ryo framework itself" },
        { name: "list", desc: "List installed skills" },
        { name: "info <skill>", desc: "Show detailed skill information" },
        { name: "search <keyword>", desc: "Search the registry for skills" },
        { name: "run <skill>", desc: "Show skill content in terminal" },
        { name: "export <skill>", desc: "Export a skill (md/json/yaml)" },
        { name: "publish <skill>", desc: "Package a skill for distribution" },
        { name: "validate", desc: "Validate skill structure" },
        { name: "doctor", desc: "Check project health" },
        { name: "registry", desc: "Browse the official registry" },
        { name: "skills", desc: "Show installed skills overview" },
        { name: "version", desc: "Show version information" },
        { name: "completion", desc: "Generate shell completion script" },
        { name: "telemetry", desc: "Manage anonymous usage telemetry" },
        { name: "help", desc: "Show this help message" },
    ];

    logger.plain("Commands:");
    logger.blank();

    const maxLen = Math.max(...commands.map((c) => c.name.length));

    for (const cmd of commands) {
        logger.plain(`  ${cmd.name.padEnd(maxLen)}  ${cmd.desc}`);
    }

    logger.blank();
    logger.plain("Usage: ryo <command> [options]");
    logger.blank();
}