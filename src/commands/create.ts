import fs from "fs";
import path from "path";

export function create(category?: string, skill?: string) {

    if (!category || !skill) {

        console.log("");
        console.log("Usage:");
        console.log("create <category> <skill>");
        console.log("");

        return;
    }

    const validName = /^[a-z0-9-]+$/;

if (!validName.test(category) || !validName.test(skill)) {

    console.log("");
    console.log("❌ Invalid name.");
    console.log("Use lowercase letters, numbers, and hyphens only.");
    console.log("");

    return;
}

    const skillPath = path.join("skills", category, skill);

    if (fs.existsSync(skillPath)) {

        console.log("");
        console.log("❌ Skill already exists.");
        console.log("");

        return;
    }
fs.mkdirSync(skillPath, { recursive: true });

const files = [
    "CHANGELOG.md",
    "checklist.md",
    "decision-tree.md",
    "examples.md",
    "manifest.yaml",
    "metadata.yaml",
    "README.md",
    "references.md",
    "SKILL.md",
    "troubleshooting.md",
    "VERSION.md",
];

for (const file of files) {
    fs.writeFileSync(path.join(skillPath, file), "");
}

const promptsPath = path.join(skillPath, "prompts");

fs.mkdirSync(promptsPath);

fs.writeFileSync(path.join(promptsPath, "generate.md"), "");
fs.writeFileSync(path.join(promptsPath, "review.md"), "");
fs.writeFileSync(path.join(promptsPath, "system.md"), "");

console.log("");
console.log("✅ Skill created successfully!");
console.log("");
console.log(skillPath);
console.log("");
}