import { execSync } from "child_process";
import fs from "fs";
import { logger } from "../utils/logger";
import { getPackageVersion, resolveAsset } from "../utils/packagePath";
import { opencodeSetup } from "./opencodeSetup";

function getChangelogForVersion(version: string): string {
  try {
    const changelog = fs.readFileSync(resolveAsset("CHANGELOG.md"), "utf8");
    const lines = changelog.split("\n");
    const result: string[] = [];
    let inSection = false;
    for (const line of lines) {
      if (line.startsWith(`## ${version}`)) {
        inSection = true;
        continue;
      }
      if (inSection) {
        if (line.startsWith("## ")) break;
        const trimmed = line.trim();
        if (trimmed) result.push(trimmed);
      }
    }
    return result.join("\n");
  } catch {
    return "";
  }
}

export function upgrade() {
  logger.info("Checking for updates...");

  const current = getPackageVersion();

  let latest: string;
  try {
    latest = execSync("npm view ryo-framework version", {
      encoding: "utf-8",
      timeout: 10000,
    })
      .toString()
      .trim();
  } catch {
    logger.warning("Could not check for updates. Is npm installed?");
    return;
  }

  if (current === latest) {
    logger.success(`Already up to date (v${current})`);
    logger.blank();
    logger.info("Installing OpenCode agents for current version...");
    opencodeSetup();
    return;
  }

  logger.info(`Current: v${current}`);
  logger.info(`Latest:  v${latest}`);
  logger.blank();
  logger.info("Upgrading...");

  try {
    execSync("npm install -g ryo-framework@latest", {
      stdio: "inherit",
      timeout: 120000,
    });
    logger.success(`Upgraded to v${latest}!`);
    logger.blank();
    const changelog = getChangelogForVersion(latest);
    if (changelog) {
      logger.info(`Apa yang baru di v${latest}:`);
      logger.blank();
      for (const line of changelog.split("\n")) {
        logger.plain(`  ${line}`);
      }
      logger.blank();
    }
    logger.info("Installing OpenCode agents...");
    opencodeSetup();
  } catch {
    logger.error(
      "Upgrade failed. Try manually: npm install -g ryo-framework@latest"
    );
  }
}
