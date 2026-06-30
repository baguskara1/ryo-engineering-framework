"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = help;
const picocolors_1 = __importDefault(require("picocolors"));
const logger_1 = require("../utils/logger");
function help() {
    logger_1.logger.blank();
    const groups = [
        {
            title: "Discover",
            commands: [
                { name: "registry", desc: "Browse the official registry" },
                { name: "search <keyword>", desc: "Search the registry for skills" },
                { name: "list", desc: "List installed skills" },
                { name: "skills", desc: "Show installed skills overview" },
                { name: "info <skill>", desc: "Show detailed skill information" },
                { name: "run <skill>", desc: "Show skill content in terminal" },
            ],
        },
        {
            title: "Manage",
            commands: [
                { name: "install <skill>", desc: "Install a skill" },
                { name: "uninstall <skill>", desc: "Uninstall a skill" },
                { name: "update <skill>", desc: "Update an installed skill" },
                { name: "upgrade", desc: "Upgrade ryo framework itself" },
                { name: "create <category> <skill>", desc: "Create a new skill from a template" },
                { name: "publish <skill>", desc: "Package a skill for distribution" },
                { name: "export <skill>", desc: "Export a skill (md/json/yaml)" },
            ],
        },
        {
            title: "System",
            commands: [
                { name: "init", desc: "Initialize a new project" },
                { name: "validate", desc: "Validate skill structure" },
                { name: "doctor", desc: "Check project health" },
                { name: "version", desc: "Show version information" },
                { name: "completion", desc: "Generate shell completion script" },
                { name: "telemetry", desc: "Manage anonymous usage telemetry" },
                { name: "help", desc: "Show this help message" },
            ],
        },
    ];
    for (const group of groups) {
        logger_1.logger.plain(picocolors_1.default.bold(picocolors_1.default.cyan(`  ${group.title}`)));
        const maxLen = Math.max(...group.commands.map((c) => c.name.length));
        for (const cmd of group.commands) {
            logger_1.logger.plain(`    ${cmd.name.padEnd(maxLen + 2)}${cmd.desc}`);
        }
        logger_1.logger.blank();
    }
    logger_1.logger.plain(picocolors_1.default.dim("  Usage: ryo <command> [options]"));
    logger_1.logger.blank();
}
//# sourceMappingURL=help.js.map