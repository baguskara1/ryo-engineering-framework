const fs = require("fs");
const path = require("path");
const os = require("os");

const isGlobal = process.env.npm_config_global === "true";
if (!isGlobal) {
  process.exit(0);
}

const home = os.homedir();
const sourceDir = path.resolve(__dirname, "..", ".opencode", "agents");
const sourceConfig = path.resolve(__dirname, "..", "opencode.json");

const configDir = path.join(home, ".config", "opencode");
const agentDirs = [
  path.join(configDir, "agent"),
  path.join(configDir, "agents"),
];
const targetConfig = path.join(configDir, "opencode.json");

if (!fs.existsSync(sourceDir)) {
  console.error("[ryo] OpenCode agents directory not found, skipping.");
  process.exit(0);
}

// Copy agent .md files to both agent/ and agents/
const agentFiles = fs.readdirSync(sourceDir).filter(f => f.endsWith(".md"));
for (const dir of agentDirs) {
  fs.mkdirSync(dir, { recursive: true });
  for (const file of agentFiles) {
    fs.copyFileSync(path.join(sourceDir, file), path.join(dir, file));
  }
}

// Merge agent definitions into opencode.json (always, even if exists)
if (fs.existsSync(sourceConfig)) {
  const ourConfig = JSON.parse(fs.readFileSync(sourceConfig, "utf8"));
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
}

console.log(`[ryo] Installed ${agentFiles.length} OpenCode agent(s) to ${configDir}`);
