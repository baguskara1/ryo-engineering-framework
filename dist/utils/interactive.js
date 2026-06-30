"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startInteractiveMode = startInteractiveMode;
const readline_1 = __importDefault(require("readline"));
const picocolors_1 = __importDefault(require("picocolors"));
const commands_1 = require("../commands");
const logger_1 = require("./logger");
const banner_1 = require("./banner");
function startInteractiveMode() {
    // Switch to alternate screen buffer
    process.stdout.write("\x1b[?1049h");
    process.stdout.write("\x1b[2J\x1b[H");
    (0, banner_1.showBanner)();
    logger_1.logger.plain("  Type 'help' for commands, or 'exit' to quit.");
    logger_1.logger.blank();
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: picocolors_1.default.cyan("ryo > "),
    });
    rl.prompt();
    rl.on("line", async (line) => {
        const input = line.trim();
        if (!input) {
            rl.prompt();
            return;
        }
        if (input === "exit" || input === "quit") {
            rl.close();
            return;
        }
        await executeCommand(input);
        logger_1.logger.blank();
        rl.prompt();
    });
    rl.on("close", () => {
        // Exit alternate screen buffer
        process.stdout.write("\x1b[?1049l");
        process.exit(0);
    });
    // Handle Ctrl+C (SIGINT)
    rl.on("SIGINT", () => {
        rl.close();
    });
}
async function executeCommand(input) {
    const [cmd, ...args] = input.split(" ");
    try {
        switch (cmd) {
            case "help":
                commands_1.commands.help();
                break;
            case "version":
                commands_1.commands.version();
                break;
            case "doctor":
                commands_1.commands.doctor();
                break;
            case "list":
                commands_1.commands.list();
                break;
            case "validate":
                commands_1.commands.validate();
                break;
            case "skills":
                commands_1.commands.skills();
                break;
            case "registry":
                commands_1.commands.registry();
                break;
            case "init":
                commands_1.commands.init();
                break;
            case "create":
                commands_1.commands.create(args[0], args[1]);
                break;
            case "search":
                commands_1.commands.search(args[0]);
                break;
            case "info":
                commands_1.commands.info(args[0]);
                break;
            case "install":
                commands_1.commands.install(args[0]);
                break;
            case "uninstall":
                commands_1.commands.uninstall(args[0]);
                break;
            case "update":
                commands_1.commands.update(args[0]);
                break;
            case "upgrade":
                commands_1.commands.upgrade();
                break;
            case "publish":
                commands_1.commands.publish(args[0]);
                break;
            case "export":
                // @ts-expect-error
                commands_1.commands.export(args[0], args[1]);
                break;
            case "run":
                commands_1.commands.run(args[0]);
                break;
            default:
                logger_1.logger.error(`Unknown command: ${cmd}. Type 'help' for available commands.`);
        }
    }
    catch (e) {
        logger_1.logger.error(`Error: ${e}`);
    }
}
//# sourceMappingURL=interactive.js.map