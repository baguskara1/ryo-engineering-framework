import fs from "fs";
import path from "path";
import os from "os";
import pc from "picocolors";
import { logger } from "../utils/logger";
import { withSpinner } from "../utils/spinner";
import { resolveAsset } from "../utils/packagePath";

const home = os.homedir();
const OPENCODE_CONFIG_DIR = path.join(home, ".config", "opencode");
const OPENCODE_AGENT_DIRS = [
  path.join(OPENCODE_CONFIG_DIR, "agent"),
  path.join(OPENCODE_CONFIG_DIR, "agents"),
];

export function opencodeSetup() {
  const sourceAgentsDir = resolveAsset(".opencode", "agents");
  const sourceConfigFile = resolveAsset("opencode.json");

  if (!fs.existsSync(sourceAgentsDir)) {
    logger.error("OpenCode agents directory not found in package.");
    return;
  }

  if (!fs.existsSync(sourceConfigFile)) {
    logger.error("opencode.json not found in package.");
    return;
  }

  const agentFiles = fs.readdirSync(sourceAgentsDir).filter(f => f.endsWith(".md"));

  for (const dir of OPENCODE_AGENT_DIRS) {
    withSpinner(`Installing agents to ${path.relative(home, dir)}`, () => {
      fs.mkdirSync(dir, { recursive: true });
      for (const file of agentFiles) {
        fs.copyFileSync(path.join(sourceAgentsDir, file), path.join(dir, file));
      }
    });
  }

  // Merge agent definitions into global opencode.json
  const targetConfig = path.join(OPENCODE_CONFIG_DIR, "opencode.json");
  const ourConfig = JSON.parse(fs.readFileSync(sourceConfigFile, "utf8"));
  const existingConfig = fs.existsSync(targetConfig)
    ? JSON.parse(fs.readFileSync(targetConfig, "utf8"))
    : {};

  const merged = { ...existingConfig };
  if (ourConfig.agent) {
    merged.agent = { ...(merged.agent || {}), ...ourConfig.agent };
  }
  if (!merged.$schema && ourConfig.$schema) {
    merged.$schema = ourConfig.$schema;
  }

  fs.writeFileSync(targetConfig, JSON.stringify(merged, null, 2) + "\n");
  logger.info(`Merged agents into ${pc.dim(targetConfig)}`);

  logger.blank();
  logger.success(`OpenCode agents installed successfully.`);
  logger.plain(`  ${pc.dim("Location:")}  ${OPENCODE_CONFIG_DIR}/`);
  logger.plain(`  ${pc.dim("Agents:")}    ${agentFiles.map(f => f.replace(/\.md$/, "")).join(", ")}`);
  logger.blank();
  logger.plain(`  ${pc.dim("Restart OpenCode to use the new agents.")}`);
  logger.blank();
}
