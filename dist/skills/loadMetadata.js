"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMetadata = loadMetadata;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const yaml_1 = require("yaml");
function loadMetadata(skillPath) {
    const metadataPath = path_1.default.join(skillPath, "metadata.yaml");
    if (!fs_1.default.existsSync(metadataPath)) {
        return {};
    }
    try {
        const content = fs_1.default.readFileSync(metadataPath, "utf8").trim();
        if (content.length === 0) {
            return {};
        }
        return (0, yaml_1.parse)(content) ?? {};
    }
    catch {
        return {};
    }
}
//# sourceMappingURL=loadMetadata.js.map