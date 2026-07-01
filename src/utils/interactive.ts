import readline from "readline";
import pc from "picocolors";
import { commands } from "../commands";
import { logger } from "./logger";
import { showBanner } from "./banner";
import { scheduleAsyncCheck, getPendingNotification } from "./checkUpdate";
import { getPackageVersion } from "./packagePath";

export function startInteractiveMode() {
    showBanner();
    logger.plain("  Type 'help' for commands, or 'exit' to quit.");
    logger.blank();

    scheduleAsyncCheck();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: pc.cyan("ryo > "),
    });

    rl.prompt();

    rl.on("line", async (line) => {
        await maybeShowPendingNotif();
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
        logger.blank();
        rl.prompt();
    });

    setTimeout(maybeShowPendingNotif, 100);

    rl.on("close", () => {
        process.exit(0);
    });

    rl.on("SIGINT", () => {
        rl.close();
    });
}

async function maybeShowPendingNotif() {
    const latest = getPendingNotification();
    if (latest) {
        logger.warning(
            `⚠ Update available: ryo-framework v${latest} (current: v${getPackageVersion()})`
        );
        logger.warning(`  Run "upgrade" to update.`);
        logger.blank();
    }
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
            case "config":
                if (args.length >= 2) {
                    commands["config-set"](args[0], args[1]);
                } else {
                    commands.config(args[0]);
                }
                break;
            case "config-delete":
                commands["config-delete"](args[0]);
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
