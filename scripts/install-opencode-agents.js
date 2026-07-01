const fs = require("fs");
const path = require("path");
const os = require("os");

const isGlobal = process.env.npm_config_global === "true";
if (!isGlobal) {
  process.exit(0);
}

const sourceDir = path.resolve(__dirname, "..", ".opencode", "agents");
const sourceConfig = path.resolve(__dirname, "..", "opencode.json");
const targetDir = path.join(os.homedir(), ".config", "opencode", "agents");
const targetConfig = path.join(os.homedir(), ".config", "opencode", "opencode.json");

if (!fs.existsSync(sourceDir)) {
  console.error("[ryo] OpenCode agents directory not found, skipping.");
  process.exit(0);
}

fs.mkdirSync(targetDir, { recursive: true });

const agentFiles = fs.readdirSync(sourceDir).filter(f => f.endsWith(".md"));
for (const file of agentFiles) {
  fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
}

if (fs.existsSync(sourceConfig) && !fs.existsSync(targetConfig)) {
  fs.copyFileSync(sourceConfig, targetConfig);
}

console.log(`[ryo] Installed ${agentFiles.length} OpenCode agent(s) to ${targetDir}`);
