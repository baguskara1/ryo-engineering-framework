import fs from "fs";
import path from "path";
import os from "os";
import { logger } from "../utils/logger";

const CONFIG_DIR = path.join(os.homedir(), ".ryo");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

interface UserConfig {
  [key: string]: string | boolean | number | undefined;
}

function ensureDir(): void {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
}

function load(): UserConfig {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
    }
  } catch {}
  return {};
}

function save(config: UserConfig): void {
  ensureDir();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2) + "\n");
}

export function configGet(key?: string) {
  const cfg = load();

  if (key) {
    const val = cfg[key];
    if (val === undefined) {
      logger.warning(`Config key "${key}" not set.`);
      return;
    }
    logger.plain(`${key} = ${val}`);
    return;
  }

  const keys = Object.keys(cfg);
  if (keys.length === 0) {
    logger.plain("No config values set.");
    return;
  }

  for (const k of keys) {
    logger.plain(`${k} = ${cfg[k]}`);
  }
}

export function configSet(key: string, value: string) {
  const cfg = load();
  const parsed: string | boolean | number =
    value === "true" ? true : value === "false" ? false : /^-?\d+(\.\d+)?$/.test(value) ? Number(value) : value;

  cfg[key] = parsed;
  save(cfg);
  logger.success(`Set ${key} = ${parsed}`);
}

export function configDelete(key: string) {
  const cfg = load();
  if (!(key in cfg)) {
    logger.warning(`Config key "${key}" not set.`);
    return;
  }
  delete cfg[key];
  save(cfg);
  logger.success(`Removed ${key}`);
}
