"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgrade = upgrade;
const child_process_1 = require("child_process");
const logger_1 = require("../utils/logger");
const packagePath_1 = require("../utils/packagePath");
const opencodeSetup_1 = require("./opencodeSetup");
function upgrade() {
    logger_1.logger.info("Checking for updates...");
    const current = (0, packagePath_1.getPackageVersion)();
    let latest;
    try {
        latest = (0, child_process_1.execSync)("npm view ryo-engineering-framework version", {
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
        (0, child_process_1.execSync)("npm install -g ryo-engineering-framework@latest", {
            stdio: "inherit",
            timeout: 120000,
        });
        logger_1.logger.success(`Upgraded to v${latest}!`);
        logger_1.logger.blank();
        logger_1.logger.info("Installing OpenCode agents...");
        (0, opencodeSetup_1.opencodeSetup)();
    }
    catch {
        logger_1.logger.error("Upgrade failed. Try manually: npm install -g ryo-engineering-framework@latest");
    }
}
//# sourceMappingURL=upgrade.js.map