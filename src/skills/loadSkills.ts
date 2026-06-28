import fs from "fs";
import path from "path";
import { loadMetadata } from "./loadMetadata";

export interface SkillMetadata {
    name?: string;
    version?: string;
    description?: string;
    author?: string;
    tags?: string[];
}

export interface Skill {
    category: string;
    name: string;
    path: string;
    metadata: SkillMetadata;
}

export function loadSkills(): Skill[] {

    const root = "skills";
    const result: Skill[] = [];

    if (!fs.existsSync(root)) {
        return result;
    }

    const categories = fs.readdirSync(root);

    for (const category of categories) {

        // Skip folder internal seperti _template
        if (category.startsWith("_")) {
            continue;
        }

        const categoryPath = path.join(root, category);

        if (!fs.statSync(categoryPath).isDirectory()) {
            continue;
        }

        const skills = fs.readdirSync(categoryPath);

        for (const skill of skills) {

            const skillPath = path.join(categoryPath, skill);

            // Skip jika bukan folder
            if (!fs.statSync(skillPath).isDirectory()) {
                continue;
            }

            result.push({
                category,
                name: skill,
                path: skillPath,
                metadata: loadMetadata(skillPath) as SkillMetadata,
            });
        }
    }

    return result;
}