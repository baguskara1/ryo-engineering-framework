import fs from "fs";
import path from "path";
import { replacePlaceholders } from "./replacePlaceholders";

export function processTemplates(
    directory: string,
    replacements: Record<string, string>
) {
    const entries = fs.readdirSync(directory, {
        withFileTypes: true,
    });

    for (const entry of entries) {

        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            processTemplates(fullPath, replacements);
        } else {
            replacePlaceholders(fullPath, replacements);
        }
    }
}