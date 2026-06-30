#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const commander_1 = require("commander");
const logger_1 = require("./utils/logger");
const banner_1 = require("./utils/banner");
const interactive_1 = require("./utils/interactive");
const commands_1 = require("./commands");
const config_1 = require("./utils/config");
const telemetry_1 = require("./utils/telemetry");
const packagePath_1 = require("./utils/packagePath");
// Check for --verbose flag in raw argv before commander parses
const config = (0, config_1.loadConfig)();
const hasVerboseFlag = process.argv.includes("--verbose");
(0, logger_1.setVerbose)(hasVerboseFlag || config.verbose === true);
const program = new commander_1.Command();
program
    .name("ryo")
    .description("Ryo Engineering Framework - Build production-ready software with AI")
    .version((0, packagePath_1.getPackageVersion)())
    .option("--verbose", "Enable verbose output");
program
    .command("help")
    .description("Show available commands")
    .action(() => {
    (0, banner_1.showBanner)();
    commands_1.commands.help();
});
program
    .command("version")
    .description("Show version information")
    .action(() => commands_1.commands.version(banner_1.showBanner));
program
    .command("doctor")
    .description("Check project structure")
    .action(() => commands_1.commands.doctor());
program
    .command("list")
    .description("List installed skills")
    .action(() => commands_1.commands.list());
program
    .command("validate")
    .description("Validate skill structure")
    .action(() => commands_1.commands.validate());
program
    .command("skills")
    .description("Show installed skills")
    .action(() => commands_1.commands.skills());
program
    .command("registry")
    .description("Browse the official registry")
    .action(() => commands_1.commands.registry());
program
    .command("init [projectName]")
    .description("Initialize a new project")
    .action((projectName) => commands_1.commands.init(projectName));
program
    .command("create <category> <skill>")
    .description("Create a new skill")
    .option("-t, --template <name>", "Template to use (default: skill)")
    .action((category, skill, opts) => commands_1.commands.create(category, skill, opts.template));
program
    .command("search <keyword>")
    .description("Search registry for skills")
    .action((keyword) => commands_1.commands.search(keyword));
program
    .command("info <skill>")
    .description("Show skill information")
    .action((skill) => commands_1.commands.info(skill));
program
    .command("install <skill>")
    .description("Install a skill from registry")
    .action((skill) => commands_1.commands.install(skill));
program
    .command("uninstall <skill>")
    .description("Uninstall a skill")
    .action((skill) => commands_1.commands.uninstall(skill));
program
    .command("update <skill>")
    .description("Update an installed skill")
    .action((skill) => commands_1.commands.update(skill));
program
    .command("upgrade")
    .description("Upgrade the ryo framework itself")
    .action(() => commands_1.commands.upgrade());
program
    .command("publish <skill>")
    .description("Package a skill for distribution")
    .action((skill) => commands_1.commands.publish(skill));
program
    .command("export <skill>")
    .description("Export a skill")
    .option("-f, --format <type>", "Output format: md, json, yaml (default: md)")
    .action((skill, opts) => commands_1.commands.export(skill, opts.format));
program
    .command("run <skill>")
    .description("Show skill content in terminal")
    .action((skill) => commands_1.commands.run(skill));
program
    .command("completion")
    .description("Generate shell completion script")
    .action(() => {
    logger_1.logger.plain(`# ryo shell completion
# Source this file in your shell:
#   source <(ryo completion)

_ryo_completions() {
    local cur prev words cword
    _init_completion || return

    COMPREPLY=( $(compgen -W "$(ryo --help | grep '^  [a-z]' | awk '{print $1}')" -- "$cur") )
}

complete -F _ryo_completions ryo`);
});
program
    .command("telemetry")
    .description("Manage anonymous usage telemetry")
    .option("--status", "Show current telemetry status")
    .option("--opt-in", "Opt in to telemetry")
    .option("--opt-out", "Opt out of telemetry")
    .action((opts) => {
    if (opts.optIn) {
        (0, telemetry_1.optIn)();
        logger_1.logger.success("Telemetry enabled. Thank you for helping improve Ryo!");
        return;
    }
    if (opts.optOut) {
        (0, telemetry_1.optOut)();
        logger_1.logger.success("Telemetry disabled. No data will be collected.");
        return;
    }
    const telemetryFile = path_1.default.join(os_1.default.homedir(), ".ryo", "telemetry.json");
    const enabled = fs_1.default.existsSync(telemetryFile)
        ? JSON.parse(fs_1.default.readFileSync(telemetryFile, "utf8")).enabled === true
        : false;
    logger_1.logger.plain(`Telemetry: ${enabled ? "enabled" : "disabled"}`);
    logger_1.logger.blank();
    logger_1.logger.plain("Usage:");
    logger_1.logger.plain("  ryo telemetry --opt-in   Enable anonymous telemetry");
    logger_1.logger.plain("  ryo telemetry --opt-out  Disable telemetry");
});
program
    .action(() => {
    (0, interactive_1.startInteractiveMode)();
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map