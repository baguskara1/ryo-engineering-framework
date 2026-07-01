"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.opencodeSetup = opencodeSetup;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const picocolors_1 = __importDefault(require("picocolors"));
const logger_1 = require("../utils/logger");
const spinner_1 = require("../utils/spinner");
const packagePath_1 = require("../utils/packagePath");
const OPENCODE_CONFIG_DIR = path_1.default.join(os_1.default.homedir(), ".config", "opencode");
const OPENCODE_AGENTS_DIR = path_1.default.join(OPENCODE_CONFIG_DIR, "agents");
function opencodeSetup() {
    const sourceAgentsDir = (0, packagePath_1.resolveAsset)(".opencode", "agents");
    const sourceConfigFile = (0, packagePath_1.resolveAsset)("opencode.json");
    if (!fs_1.default.existsSync(sourceAgentsDir)) {
        logger_1.logger.error("OpenCode agents directory not found in package.");
        return;
    }
    if (!fs_1.default.existsSync(sourceConfigFile)) {
        logger_1.logger.error("opencode.json not found in package.");
        return;
    }
    fs_1.default.mkdirSync(OPENCODE_AGENTS_DIR, { recursive: true });
    const agentFiles = fs_1.default.readdirSync(sourceAgentsDir).filter(f => f.endsWith(".md"));
    (0, spinner_1.withSpinner)(`Installing ${agentFiles.length} OpenCode agent(s) to ${OPENCODE_AGENTS_DIR}`, () => {
        for (const file of agentFiles) {
            fs_1.default.copyFileSync(path_1.default.join(sourceAgentsDir, file), path_1.default.join(OPENCODE_AGENTS_DIR, file));
        }
    });
    const destConfigFile = path_1.default.join(OPENCODE_CONFIG_DIR, "opencode.json");
    if (!fs_1.default.existsSync(destConfigFile)) {
        fs_1.default.copyFileSync(sourceConfigFile, destConfigFile);
        logger_1.logger.success(`Created ${picocolors_1.default.dim(destConfigFile)}`);
    }
    else {
        logger_1.logger.info(`Skipped existing ${picocolors_1.default.dim(destConfigFile)} (already exists)`);
    }
    logger_1.logger.blank();
    logger_1.logger.success(`OpenCode agents installed successfully.`);
    logger_1.logger.plain(`  ${picocolors_1.default.dim("Location:")}  ${OPENCODE_AGENTS_DIR}/`);
    logger_1.logger.plain(`  ${picocolors_1.default.dim("Agents:")}    ${agentFiles.map(f => f.replace(/\.md$/, "")).join(", ")}`);
    logger_1.logger.blank();
    logger_1.logger.plain(`  ${picocolors_1.default.dim("Restart OpenCode to use the new agents.")}`);
    logger_1.logger.blank();
}
//# sourceMappingURL=opencodeSetup.js.map