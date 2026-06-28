import fs from "fs";
import path from "path";
import { copyDirectory } from "../utils/copyDirectory";

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

    copyDirectory("templates/skill", skillPath);

    console.log("");
    console.log("✅ Skill created successfully!");
    console.log("");
    console.log(skillPath);
    console.log("");
}