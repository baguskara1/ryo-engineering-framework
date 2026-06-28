import fs from "fs";
import path from "path";

export function readSkill(root: string): string {

    const files = [
        "README.md",
        "SKILL.md",
        "checklist.md",
        "decision-tree.md",
        "references.md",
        "troubleshooting.md",
    ];

    let output = "";

    for (const file of files) {

        const fullPath = path.join(root, file);

        if (!fs.existsSync(fullPath)) {
            continue;
        }

        output += `\n========== ${file} ==========\n\n`;

        output += fs.readFileSync(fullPath, "utf8");

        output += "\n";
    }

    return output;
}