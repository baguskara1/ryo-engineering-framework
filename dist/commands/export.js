"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportSkill = exportSkill;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const logger_1 = require("../utils/logger");
const loadSkills_1 = require("../skills/loadSkills");
const readSkill_1 = require("../utils/readSkill");
const yaml_1 = require("yaml");
function buildJsonOutput(skillPath) {
    const files = [
        "README.md", "SKILL.md", "checklist.md",
        "decision-tree.md", "references.md", "troubleshooting.md"
    ];
    const data = {};
    for (const file of files) {
        const fullPath = path_1.default.join(skillPath, file);
        if (fs_extra_1.default.existsSync(fullPath)) {
            data[file] = fs_extra_1.default.readFileSync(fullPath, "utf8");
        }
    }
    return JSON.stringify(data, null, 2);
}
function buildYamlOutput(skillPath) {
    const files = [
        "README.md", "SKILL.md", "checklist.md",
        "decision-tree.md", "references.md", "troubleshooting.md"
    ];
    const data = {};
    for (const file of files) {
        const fullPath = path_1.default.join(skillPath, file);
        if (fs_extra_1.default.existsSync(fullPath)) {
            data[file] = fs_extra_1.default.readFileSync(fullPath, "utf8");
        }
    }
    return (0, yaml_1.stringify)(data);
}
function exportSkill(skill, format) {
    if (!skill) {
        logger_1.logger.error("Usage: ryo export <skill> [--format md|json|yaml]");
        return;
    }
    const found = (0, loadSkills_1.loadSkills)().find(s => s.name === skill);
    if (!found) {
        logger_1.logger.error("Skill not found.");
        return;
    }
    const fmt = format || "md";
    let output;
    let extension;
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
            output = (0, readSkill_1.readSkill)(found.path);
            extension = "md";
    }
    const exportDir = "exports";
    fs_extra_1.default.ensureDirSync(exportDir);
    const outputFile = path_1.default.join(exportDir, `${found.name}.${extension}`);
    fs_extra_1.default.writeFileSync(outputFile, output);
    logger_1.logger.success(`Exported to ${outputFile}`);
}
//# sourceMappingURL=export.js.map