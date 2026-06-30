"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistryPath = getRegistryPath;
exports.loadRegistry = loadRegistry;
exports.findInRegistry = findInRegistry;
exports.searchInRegistry = searchInRegistry;
exports.clearRegistryCache = clearRegistryCache;
const fs_1 = __importDefault(require("fs"));
const packagePath_1 = require("../utils/packagePath");
let cache = null;
function getRegistryPath() {
    return (0, packagePath_1.resolveAsset)("registry", "index.json");
}
function loadRegistry() {
    if (cache)
        return cache;
    const registryPath = getRegistryPath();
    if (!fs_1.default.existsSync(registryPath)) {
        cache = [];
        return cache;
    }
    try {
        const content = fs_1.default.readFileSync(registryPath, "utf8");
        const registry = JSON.parse(content);
        cache = registry.skills;
        return cache;
    }
    catch {
        cache = [];
        return cache;
    }
}
function findInRegistry(name) {
    return loadRegistry().find(s => s.name === name);
}
function searchInRegistry(keyword) {
    const kw = keyword.toLowerCase();
    return loadRegistry().filter(s => s.name.toLowerCase().includes(kw) ||
        s.category.toLowerCase().includes(kw));
}
function clearRegistryCache() {
    cache = null;
}
//# sourceMappingURL=loadRegistry.js.map