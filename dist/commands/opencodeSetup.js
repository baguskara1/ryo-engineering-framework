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
const home = os_1.default.homedir();
const OPENCODE_CONFIG_DIR = path_1.default.join(home, ".config", "opencode");
const OPENCODE_AGENT_DIRS = [
    path_1.default.join(OPENCODE_CONFIG_DIR, "agent"),
    path_1.default.join(OPENCODE_CONFIG_DIR, "agents"),
];
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
    const agentFiles = fs_1.default.readdirSync(sourceAgentsDir).filter(f => f.endsWith(".md"));
    for (const dir of OPENCODE_AGENT_DIRS) {
        (0, spinner_1.withSpinner)(`Installing agents to ${path_1.default.relative(home, dir)}`, () => {
            fs_1.default.mkdirSync(dir, { recursive: true });
            for (const file of agentFiles) {
                fs_1.default.copyFileSync(path_1.default.join(sourceAgentsDir, file), path_1.default.join(dir, file));
            }
        });
    }
    // Merge agent definitions into global opencode.json
    const targetConfig = path_1.default.join(OPENCODE_CONFIG_DIR, "opencode.json");
    const ourConfig = JSON.parse(fs_1.default.readFileSync(sourceConfigFile, "utf8"));
    const existingConfig = fs_1.default.existsSync(targetConfig)
        ? JSON.parse(fs_1.default.readFileSync(targetConfig, "utf8"))
        : {};
    const merged = { ...existingConfig };
    if (ourConfig.agent) {
        merged.agent = { ...(merged.agent || {}), ...ourConfig.agent };
    }
    if (!merged.$schema && ourConfig.$schema) {
        merged.$schema = ourConfig.$schema;
    }
    fs_1.default.writeFileSync(targetConfig, JSON.stringify(merged, null, 2) + "\n");
    logger_1.logger.info(`Merged agents into ${picocolors_1.default.dim(targetConfig)}`);
    logger_1.logger.blank();
    logger_1.logger.success(`OpenCode agents installed successfully.`);
    logger_1.logger.plain(`  ${picocolors_1.default.dim("Location:")}  ${OPENCODE_CONFIG_DIR}/`);
    logger_1.logger.plain(`  ${picocolors_1.default.dim("Agents:")}    ${agentFiles.map(f => f.replace(/\.md$/, "")).join(", ")}`);
    logger_1.logger.blank();
    logger_1.logger.plain(`  ${picocolors_1.default.dim("Restart OpenCode to use the new agents.")}`);
    logger_1.logger.blank();
}
//# sourceMappingURL=opencodeSetup.js.map