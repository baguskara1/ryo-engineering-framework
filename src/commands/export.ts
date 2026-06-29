import path from "path";
import fs from "fs-extra";

import { logger } from "../utils/logger";
import { loadSkills } from "../skills/loadSkills";
import { readSkill } from "../utils/readSkill";
import { stringify } from "yaml";

type ExportFormat = "md" | "json" | "yaml";

function buildJsonOutput(skillPath: string): string {
    const files = [
        "README.md", "SKILL.md", "checklist.md",
        "decision-tree.md", "references.md", "troubleshooting.md"
    ];

    const data: Record<string, string> = {};

    for (const file of files) {
        const fullPath = path.join(skillPath, file);
        if (fs.existsSync(fullPath)) {
            data[file] = fs.readFileSync(fullPath, "utf8");
        }
    }

    return JSON.stringify(data, null, 2);
}

function buildYamlOutput(skillPath: string): string {
    const files = [
        "README.md", "SKILL.md", "checklist.md",
        "decision-tree.md", "references.md", "troubleshooting.md"
    ];

    const data: Record<string, string> = {};

    for (const file of files) {
        const fullPath = path.join(skillPath, file);
        if (fs.existsSync(fullPath)) {
            data[file] = fs.readFileSync(fullPath, "utf8");
        }
    }

    return stringify(data);
}

export function exportSkill(skill?: string, format?: ExportFormat) {

    if (!skill) {
        logger.error("Usage: ryo export <skill> [--format md|json|yaml]");
        return;
    }

    const found = loadSkills().find(
        s => s.name === skill
    );

    if (!found) {
        logger.error("Skill not found.");
        return;
    }

    const fmt = format || "md";
    let output: string;
    let extension: string;

    switch (fmt) {
        case "json":
            output = buildJsonOutput(found.path);
            extension = "json";
            break;
        case "yaml":
            output = buildYamlOutput(found.path);
            extension = "yaml";
            break;
        default:
            output = readSkill(found.path);
            extension = "md";
    }

    const exportDir = "exports";
    fs.ensureDirSync(exportDir);

    const outputFile = path.join(
        exportDir,
        `${found.name}.${extension}`
    );

    fs.writeFileSync(outputFile, output);

    logger.success(`Exported to ${outputFile}`);
}