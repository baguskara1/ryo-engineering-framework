"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgrade = upgrade;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("../utils/logger");
const packagePath_1 = require("../utils/packagePath");
const opencodeSetup_1 = require("./opencodeSetup");
function getChangelogForVersion(version) {
    try {
        const changelog = fs_1.default.readFileSync((0, packagePath_1.resolveAsset)("CHANGELOG.md"), "utf8");
        const lines = changelog.split("\n");
        const result = [];
        let inSection = false;
        for (const line of lines) {
            if (line.startsWith(`## ${version}`)) {
                inSection = true;
                continue;
            }
            if (inSection) {
                if (line.startsWith("## "))
                    break;
                const trimmed = line.trim();
                if (trimmed)
                    result.push(trimmed);
            }
        }
        return result.join("\n");
    }
    catch {
        return "";
    }
}
function upgrade() {
    logger_1.logger.info("Checking for updates...");
    const current = (0, packagePath_1.getPackageVersion)();
    let latest;
    try {
        latest = (0, child_process_1.execSync)("npm view ryo-framework version", {
            encoding: "utf-8",
            timeout: 10000,
        })
            .toString()
            .trim();
    }
    catch {
        logger_1.logger.warning("Could not check for updates. Is npm installed?");
        return;
    }
    if (current === latest) {
        logger_1.logger.success(`Already up to date (v${current})`);
        logger_1.logger.blank();
        logger_1.logger.info("Installing OpenCode agents for current version...");
        (0, opencodeSetup_1.opencodeSetup)();
        return;
    }
    logger_1.logger.info(`Current: v${current}`);
    logger_1.logger.info(`Latest:  v${latest}`);
    logger_1.logger.blank();
    logger_1.logger.info("Upgrading...");
    try {
        (0, child_process_1.execSync)("npm install -g ryo-framework@latest", {
            stdio: "inherit",
            timeout: 120000,
        });
        logger_1.logger.success(`Upgraded to v${latest}!`);
        logger_1.logger.blank();
        const changelog = getChangelogForVersion(latest);
        if (changelog) {
            logger_1.logger.info(`Apa yang baru di v${latest}:`);
            logger_1.logger.blank();
            for (const line of changelog.split("\n")) {
                logger_1.logger.plain(`  ${line}`);
            }
            logger_1.logger.blank();
        }
        logger_1.logger.info("Installing OpenCode agents...");
        (0, opencodeSetup_1.opencodeSetup)();
    }
    catch {
        logger_1.logger.error("Upgrade failed. Try manually: npm install -g ryo-framework@latest");
    }
}
//# sourceMappingURL=upgrade.js.map