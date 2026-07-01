import { exec, execSync } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";
import { getPackageVersion } from "./packagePath";
import { isOffline } from "./offline";

const CACHE_FILE = path.join(os.homedir(), ".ryo", "update-check.json");
const CACHE_DURATION = 1000 * 60 * 60 * 24;

interface CacheData {
  latest: string;
  checkedAt: number;
}

export function readCache(): CacheData | null {
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

function parseVersion(s: string): number[] {
  return s.split(".").map((p) => parseInt(p, 10) || 0);
}

function versionGt(a: string, b: string): boolean {
  const pa = parseVersion(a);
  const pb = parseVersion(b);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const na = pa[i] || 0;
    const nb = pb[i] || 0;
    if (na > nb) return true;
    if (na < nb) return false;
  }
  return false;
}

function checkFromCache(): string | null {
  const cached = readCache();
  if (!cached) return null;
  if (Date.now() - cached.checkedAt >= CACHE_DURATION) return null;
  return versionGt(cached.latest, getPackageVersion()) ? cached.latest : null;
}

function fetchLatest(): string | null {
  if (isOffline()) return null;
  try {
    const latest = execSync("npm view ryo-framework version", {
      encoding: "utf-8",
      timeout: 10000,
    })
      .toString()
      .trim();
    writeCache({ latest, checkedAt: Date.now() });
    return versionGt(latest, getPackageVersion()) ? latest : null;
  } catch {
    return null;
  }
}

export function checkForUpdate(): string | null {
  return checkFromCache() ?? fetchLatest();
}

let _pendingNotif: string | null = null;

export function scheduleAsyncCheck(): void {
  const fromCache = checkFromCache();
  if (fromCache) {
    _pendingNotif = fromCache;
    return;
  }
  setTimeout(() => {
    _pendingNotif = fetchLatest();
  }, 500);
}

export function getPendingNotification(): string | null {
  return _pendingNotif;
}
