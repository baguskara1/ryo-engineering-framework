"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replacePlaceholders = replacePlaceholders;
const fs_1 = __importDefault(require("fs"));
function replacePlaceholders(filePath, replacements) {
    let content = fs_1.default.readFileSync(filePath, "utf8");
    for (const key in replacements) {
        content = content.split(`{{${key}}}`).join(replacements[key]);
    }
    fs_1.default.writeFileSync(filePath, content);
}
//# sourceMappingURL=replacePlaceholders.js.map