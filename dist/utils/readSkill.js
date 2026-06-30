"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSkill = readSkill;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function readSkill(root) {
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
        const fullPath = path_1.default.join(root, file);
        if (!fs_1.default.existsSync(fullPath)) {
            continue;
        }
        output += `\n========== ${file} ==========\n\n`;
        output += fs_1.default.readFileSync(fullPath, "utf8");
        output += "\n";
    }
    return output;
}
//# sourceMappingURL=readSkill.js.map