"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTemplates = processTemplates;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const replacePlaceholders_1 = require("./replacePlaceholders");
function processTemplates(directory, replacements) {
    const entries = fs_1.default.readdirSync(directory, {
        withFileTypes: true,
    });
    for (const entry of entries) {
        const fullPath = path_1.default.join(directory, entry.name);
        if (entry.isDirectory()) {
            processTemplates(fullPath, replacements);
        }
        else {
            (0, replacePlaceholders_1.replacePlaceholders)(fullPath, replacements);
        }
    }
}
//# sourceMappingURL=processTemplates.js.map