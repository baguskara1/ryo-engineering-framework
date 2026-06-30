import readline from "readline";
import pc from "picocolors";
import { commands } from "../commands";
import { logger } from "./logger";
import { showBanner } from "./banner";

function enterAlternateBuffer() {
    process.stdout.write("\x1b[?1049h");
    process.stdout.write("\x1b[2J\x1b[H");
}

function exitAlternateBuffer() {
    process.stdout.write("\x1b[?1049l");
}

function waitForAnyKey(): Promise<void> {
    return new Promise<void>((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question(pc.dim("  Press Enter to continue..."), () => {
            rl.close();
            resolve();
        });
    });
}

export function startInteractiveMode() {
    enterAlternateBuffer();

    showBanner();
    logger.plain("  Type 'help' for commands, or 'exit' to quit.");
    logger.blank();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: pc.cyan("ryo > "),
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

        exitAlternateBuffer();
        await executeCommand(input);
        logger.blank();
        await waitForAnyKey();
        enterAlternateBuffer();
        rl.prompt();
    });

    rl.on("close", () => {
        exitAlternateBuffer();
        process.exit(0);
    });

    rl.on("SIGINT", () => {
        rl.close();
    });
}

async function executeCommand(input: string) {
    const [cmd, ...args] = input.split(" ");

    try {
        switch (cmd) {
            case "help":
                commands.help();
                break;
            case "version":
                commands.version();
                break;
            case "doctor":
                commands.doctor();
                break;
            case "list":
                commands.list();
                break;
            case "validate":
                commands.validate();
                break;
            case "skills":
                commands.skills();
                break;
            case "registry":
                commands.registry();
                break;
            case "init":
                commands.init();
                break;
            case "create":
                commands.create(args[0], args[1]);
                break;
            case "search":
                commands.search(args[0]);
                break;
            case "info":
                commands.info(args[0]);
                break;
            case "install":
                commands.install(args[0]);
                break;
            case "uninstall":
                commands.uninstall(args[0]);
                break;
            case "update":
                commands.update(args[0]);
                break;
            case "upgrade":
                commands.upgrade();
                break;
            case "publish":
                commands.publish(args[0]);
                break;
            case "export":
        // @ts-expect-error
        commands.export(args[0], args[1]);
                break;
            case "run":
                commands.run(args[0]);
                break;
            default:
                logger.error(`Unknown command: ${cmd}. Type 'help' for available commands.`);
        }
    } catch (e) {
        logger.error(`Error: ${e}`);
    }
}
