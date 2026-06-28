import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export function loadMetadata(skillPath: string) {

    const metadataPath = path.join(skillPath, "metadata.yaml");

    if (!fs.existsSync(metadataPath)) {
        return {};
    }

    try {

        const content = fs.readFileSync(metadataPath, "utf8").trim();

        if (content.length === 0) {
            return {};
        }

        return yaml.load(content) ?? {};

    } catch {

        return {};

    }

}