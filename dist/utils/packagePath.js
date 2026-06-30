"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveAsset = resolveAsset;
exports.getPackageVersion = getPackageVersion;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getPackageRoot() {
    return path_1.default.resolve(__dirname, "..", "..");
}
function resolveAsset(...segments) {
    return path_1.default.join(getPackageRoot(), ...segments);
}
let cachedVersion = null;
function getPackageVersion() {
    if (cachedVersion)
        return cachedVersion;
    const pkgPath = path_1.default.join(getPackageRoot(), "package.json");
    const pkg = JSON.parse(fs_1.default.readFileSync(pkgPath, "utf8"));
    cachedVersion = String(pkg.version ?? "0.0.0");
    return cachedVersion;
}
//# sourceMappingURL=packagePath.js.map