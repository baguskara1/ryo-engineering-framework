#!/usr/bin/env node

import fs from "fs";
import path from "path";
import os from "os";
import { Command } from "commander";
import { logger, setVerbose } from "./utils/logger";
import { showBanner } from "./utils/banner";
import { commands } from "./commands";
import { loadConfig } from "./utils/config";
import { optIn, optOut } from "./utils/telemetry";
import { getPackageVersion } from "./utils/packagePath";

// Check for --verbose flag in raw argv before commander parses
const config = loadConfig();
const hasVerboseFlag = process.argv.includes("--verbose");
setVerbose(hasVerboseFlag || config.verbose === true);

const program = new Command();

program
    .name("ryo")
    .description("Ryo Engineering Framework - Build production-ready software with AI")
    .version(getPackageVersion())
    .option("--verbose", "Enable verbose output");

program
    .command("help")
    .description("Show available commands")
    .action(() => {
        showBanner();
        commands.help();
    });

program
    .command("version")
    .description("Show version information")
    .action(() => commands.version(showBanner));

program
    .command("doctor")
    .description("Check project structure")
    .action(() => commands.doctor());

program
    .command("list")
    .description("List installed skills")
    .action(() => commands.list());

program
    .command("validate")
    .description("Validate skill structure")
    .action(() => commands.validate());

program
    .command("skills")
    .description("Show installed skills")
    .action(() => commands.skills());

program
    .command("registry")
    .description("Browse the official registry")
    .action(() => commands.registry());

program
    .command("init")
    .description("Initialize a new project")
    .action(() => commands.init());

program
    .command("create <category> <skill>")
    .description("Create a new skill")
    .option("-t, --template <name>", "Template to use (default: skill)")
    .action((category, skill, opts) => commands.create(category, skill, opts.template));

program
    .command("search <keyword>")
    .description("Search registry for skills")
    .action((keyword) => commands.search(keyword));

program
    .command("info <skill>")
    .description("Show skill information")
    .action((skill) => commands.info(skill));

program
    .command("install <skill>")
    .description("Install a skill from registry")
    .action((skill) => commands.install(skill));

program
    .command("uninstall <skill>")
    .description("Uninstall a skill")
    .action((skill) => commands.uninstall(skill));

program
    .command("update <skill>")
    .description("Update an installed skill")
    .action((skill) => commands.update(skill));

program
    .command("upgrade")
    .description("Upgrade the ryo framework itself")
    .action(() => commands.upgrade());

program
    .command("publish <skill>")
    .description("Package a skill for distribution")
    .action((skill) => commands.publish(skill));

program
    .command("export <skill>")
    .description("Export a skill")
    .option("-f, --format <type>", "Output format: md, json, yaml (default: md)")
    .action((skill, opts) => commands.export(skill, opts.format));

program
    .command("run <skill>")
    .description("Show skill content in terminal")
    .action((skill) => commands.run(skill));

program
    .command("completion")
    .description("Generate shell completion script")
    .action(() => {
        logger.plain(`# ryo shell completion
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
            optIn();
            logger.success("Telemetry enabled. Thank you for helping improve Ryo!");
            return;
        }

        if (opts.optOut) {
            optOut();
            logger.success("Telemetry disabled. No data will be collected.");
            return;
        }

        const telemetryFile = path.join(os.homedir(), ".ryo", "telemetry.json");
        const enabled = fs.existsSync(telemetryFile)
            ? JSON.parse(fs.readFileSync(telemetryFile, "utf8")).enabled === true
            : false;

        logger.plain(`Telemetry: ${enabled ? "enabled" : "disabled"}`);
        logger.blank();
        logger.plain("Usage:");
        logger.plain("  ryo telemetry --opt-in   Enable anonymous telemetry");
        logger.plain("  ryo telemetry --opt-out  Disable telemetry");
    });

program
    .action(() => {
        showBanner();
        program.help();
    });

program.parse(process.argv);
