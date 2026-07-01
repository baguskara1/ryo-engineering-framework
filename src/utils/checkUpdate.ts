import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";
import { getPackageVersion } from "./packagePath";

const CACHE_FILE = path.join(os.homedir(), ".ryo", "update-check.json");
const CACHE_DURATION = 1000 * 60 * 60 * 24;

interface CacheData {
  latest: string;
  checkedAt: number;
}

function readCache(): CacheData | null {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
    }
  } catch {}
  return null;
}

function writeCache(data: CacheData): void {
  try {
    const dir = path.dirname(CACHE_FILE);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data));
  } catch {}
}

export function checkForUpdate(): string | null {
  const current = getPackageVersion();
  const cached = readCache();

  if (cached && Date.now() - cached.checkedAt < CACHE_DURATION) {
    return cached.latest !== current ? cached.latest : null;
  }

  try {
    const latest = execSync("npm view ryo-framework version", {
      encoding: "utf-8",
      timeout: 5000,
    })
      .toString()
      .trim();

    writeCache({ latest, checkedAt: Date.now() });

    return latest !== current ? latest : null;
  } catch {
    return null;
  }
}
