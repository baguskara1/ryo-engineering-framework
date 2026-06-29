import fs from "fs";
import path from "path";
import { parse } from "yaml";

export function loadMetadata(skillPath: string): Record<string, unknown> {

    const metadataPath = path.join(skillPath, "metadata.yaml");

    if (!fs.existsSync(metadataPath)) {
        return {};
    }

    try {

        const content = fs.readFileSync(metadataPath, "utf8").trim();

        if (content.length === 0) {
            return {};
        }

        return parse(content) ?? {};

    } catch {

        return {};

    }

}