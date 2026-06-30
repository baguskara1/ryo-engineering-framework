
import fs from "fs-extra";
import path from "path";

const SKILLS_DIR = path.join("official-skills");
const REGISTRY_FILE = path.join("registry", "index.json");
const NEW_VERSION = "1.5.0";

async function upgrade() {
  const registry = await fs.readJson(REGISTRY_FILE);
  
  for (const skill of registry.skills) {
    const skillPath = path.join(SKILLS_DIR, skill.category, skill.name);
    if (!fs.existsSync(skillPath)) continue;

    console.log(`Upgrading ${skill.category}/${skill.name} to ${NEW_VERSION}...`);

    // Update manifest.yaml
    const manifestPath = path.join(skillPath, "manifest.yaml");
    if (fs.existsSync(manifestPath)) {
      const manifest = await fs.readFile(manifestPath, "utf8");
      // Basic YAML update
      const updated = manifest.replace(/version: .*/, `version: ${NEW_VERSION}`);
      await fs.writeFile(manifestPath, updated);
    }

    // Update metadata.yaml
    const metaPath = path.join(skillPath, "metadata.yaml");
    if (fs.existsSync(metaPath)) {
        let meta = await fs.readFile(metaPath, "utf8");
        meta = meta.replace(/version: .*/, `version: ${NEW_VERSION}`);
        await fs.writeFile(metaPath, meta);
    }

    // Update VERSION.md
    const versionPath = path.join(skillPath, "VERSION.md");
    if (fs.existsSync(versionPath)) {
        await fs.writeFile(versionPath, `# Version\n\nCurrent Version\n\n${NEW_VERSION}\n\nStatus\n\nPublished\n`);
    }

    // Update index.json entry
    skill.version = NEW_VERSION;
  }

  await fs.writeJson(REGISTRY_FILE, registry, { spaces: 2 });
  console.log("Registry upgrade complete.");
}

upgrade().catch(console.error);
