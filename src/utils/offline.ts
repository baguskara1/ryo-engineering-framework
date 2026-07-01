import { execSync } from "child_process";
import os from "os";

let _cached: boolean | null = null;

export function isOffline(): boolean {
  if (_cached !== null) return _cached;

  try {
    const platform = os.platform();
    if (platform === "win32") {
      execSync("powershell -Command \"Test-NetConnection registry.npmjs.org -Port 443 -TimeoutSeconds 2\"", {
        timeout: 4000,
        stdio: "pipe",
      });
    } else {
      execSync("curl -s --connect-timeout 3 -o /dev/null https://registry.npmjs.org/", {
        timeout: 5000,
        stdio: "pipe",
      });
    }
    _cached = false;
    return false;
  } catch {
    _cached = true;
    return true;
  }
}

export function clearOfflineCache(): void {
  _cached = null;
}
