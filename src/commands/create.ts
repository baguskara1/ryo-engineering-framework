import fs from "fs";
import path from "path";
import { copyDirectory } from "../utils/copyDirectory";
import { processTemplates } from "../utils/processTemplates";
import { isValidName } from "../utils/validators";

export function create(category?: string, skill?: string) {
    if (!category || !skill) {
        console.log("");
        console.log("Usage:");
        console.log("create <category> <skill>");
        console.log("");

        return;
    }

   if (!isValidName(category) || !isValidName(skill))
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

    copyDirectory("templates/skill", skillPath);

    processTemplates(skillPath, {
    CATEGORY: category,
    SKILL: skill,
});

    console.log("");
    console.log("✅ Skill created successfully!");
    console.log("");
    console.log(skillPath);
    console.log("");
}