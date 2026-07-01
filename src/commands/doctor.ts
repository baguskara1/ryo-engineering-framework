import pc from "picocolors";
import { execSync } from "child_process";
import { logger } from "../utils/logger";
import { safeExistsSync } from "../utils/fs";
import { isOffline } from "../utils/offline";

function check(label: string, ok: boolean, detail?: string) {
  const badge = ok ? pc.green("✔") : pc.red("✖");
  const msg = ok ? label : detail ? `${label} ${pc.dim(`(${detail})`)}` : `${label} ${pc.dim("(issue)")}`;
  logger.plain(`  ${badge}  ${msg}`);
}

function getVersion(cmd: string): string | null {
  try {
    return execSync(`${cmd} --version`, { encoding: "utf-8", timeout: 5000 }).toString().trim();
  } catch {
    return null;
  }
}

export function doctor() {
  logger.blank();
  logger.info(pc.bold("Ryo Doctor — System Check"));
  logger.blank();

  const nodeVer = process.version;
  const nodeMajor = parseInt(process.version.slice(1).split(".")[0], 10);
  check("Node.js", nodeMajor >= 20, `${nodeVer} (minimum: v20)`);

  const npmVer = getVersion("npm");
  check("npm", npmVer !== null, npmVer ? `v${npmVer}` : "not found");

  const offline = isOffline();
  check("Internet", !offline, offline ? "no connection" : "online");

  logger.blank();
  logger.info(pc.bold("Project Structure"));
  logger.blank();

  const dirs = ["skills", "docs", "templates", "scripts", "specs"];
  for (const dir of dirs) {
    check(dir, safeExistsSync(dir));
  }

  const hasConfig = safeExistsSync("ryo.json");
  check("ryo.json", hasConfig, hasConfig ? "found" : "not found");

  const hasPackage = safeExistsSync("package.json");
  check("package.json", hasPackage, hasPackage ? "found" : "not found");

  logger.blank();
}
