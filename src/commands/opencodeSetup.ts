import fs from "fs";
import path from "path";
import os from "os";
import pc from "picocolors";
import { logger } from "../utils/logger";
import { withSpinner } from "../utils/spinner";
import { resolveAsset } from "../utils/packagePath";

const OPENCODE_CONFIG_DIR = path.join(os.homedir(), ".config", "opencode");
const OPENCODE_AGENTS_DIR = path.join(OPENCODE_CONFIG_DIR, "agents");

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

  fs.mkdirSync(OPENCODE_AGENTS_DIR, { recursive: true });

  const agentFiles = fs.readdirSync(sourceAgentsDir).filter(f => f.endsWith(".md"));

  withSpinner(`Installing ${agentFiles.length} OpenCode agent(s) to ${OPENCODE_AGENTS_DIR}`, () => {
    for (const file of agentFiles) {
      fs.copyFileSync(path.join(sourceAgentsDir, file), path.join(OPENCODE_AGENTS_DIR, file));
    }
  });

  const destConfigFile = path.join(OPENCODE_CONFIG_DIR, "opencode.json");
  if (!fs.existsSync(destConfigFile)) {
    fs.copyFileSync(sourceConfigFile, destConfigFile);
    logger.success(`Created ${pc.dim(destConfigFile)}`);
  } else {
    logger.info(`Skipped existing ${pc.dim(destConfigFile)} (already exists)`);
  }

  logger.blank();
  logger.success(`OpenCode agents installed successfully.`);
  logger.plain(`  ${pc.dim("Location:")}  ${OPENCODE_AGENTS_DIR}/`);
  logger.plain(`  ${pc.dim("Agents:")}    ${agentFiles.map(f => f.replace(/\.md$/, "")).join(", ")}`);
  logger.blank();
  logger.plain(`  ${pc.dim("Restart OpenCode to use the new agents.")}`);
  logger.blank();
}
