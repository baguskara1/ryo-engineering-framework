"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSkills = loadSkills;
exports.clearSkillsCache = clearSkillsCache;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const loadMetadata_1 = require("./loadMetadata");
let cache = null;
function loadSkills() {
    if (cache)
        return cache;
    const root = "skills";
    const result = [];
    if (!fs_1.default.existsSync(root)) {
        cache = result;
        return result;
    }
    const categories = fs_1.default.readdirSync(root);
    for (const category of categories) {
        // Skip folder internal seperti _template
        if (category.startsWith("_")) {
            continue;
        }
        const categoryPath = path_1.default.join(root, category);
        if (!fs_1.default.statSync(categoryPath).isDirectory()) {
            continue;
        }
        const skills = fs_1.default.readdirSync(categoryPath);
        for (const skill of skills) {
            const skillPath = path_1.default.join(categoryPath, skill);
            // Skip jika bukan folder
            if (!fs_1.default.statSync(skillPath).isDirectory()) {
                continue;
            }
            result.push({
                category,
                name: skill,
                path: skillPath,
                metadata: (0, loadMetadata_1.loadMetadata)(skillPath),
            });
        }
    }
    cache = result;
    return result;
}
function clearSkillsCache() {
    cache = null;
}
//# sourceMappingURL=loadSkills.js.map