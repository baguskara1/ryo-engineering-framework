import fs from "fs";

export function replacePlaceholders(
    filePath: string,
    replacements: Record<string, string>
) {
    let content = fs.readFileSync(filePath, "utf8");

    for (const key in replacements) {
    content = content.split(`{{${key}}}`).join(replacements[key]);
    }

    fs.writeFileSync(filePath, content);
}