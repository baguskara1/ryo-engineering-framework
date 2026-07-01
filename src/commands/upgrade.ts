import { execSync } from "child_process";
import { logger } from "../utils/logger";
import { getPackageVersion } from "../utils/packagePath";
import { opencodeSetup } from "./opencodeSetup";

export function upgrade() {
  logger.info("Checking for updates...");

  const current = getPackageVersion();

  let latest: string;
  try {
    latest = execSync("npm view ryo-engineering-framework version", {
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
    execSync("npm install -g ryo-engineering-framework@latest", {
      stdio: "inherit",
      timeout: 120000,
    });
    logger.success(`Upgraded to v${latest}!`);
    logger.blank();
    logger.info("Installing OpenCode agents...");
    opencodeSetup();
  } catch {
    logger.error(
      "Upgrade failed. Try manually: npm install -g ryo-engineering-framework@latest"
    );
  }
}
