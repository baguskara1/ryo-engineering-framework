"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeExistsSync = safeExistsSync;
exports.safeReadDirSync = safeReadDirSync;
exports.copyDirectorySync = copyDirectorySync;
exports.removeDirectorySync = removeDirectorySync;
const fs_extra_1 = __importDefault(require("fs-extra"));
const logger_1 = require("./logger");
// Sync versions for use in synchronous command handlers
function safeExistsSync(path) {
    try {
        return fs_extra_1.default.existsSync(path);
    }
    catch {
        return false;
    }
}
function safeReadDirSync(path) {
    try {
        return fs_extra_1.default.readdirSync(path);
    }
    catch {
        return [];
    }
}
function copyDirectorySync(src, dest) {
    try {
        fs_extra_1.default.copySync(src, dest);
    }
    catch (error) {
        logger_1.logger.error(`Failed to copy directory from ${src} to ${dest}: ${error}`);
        throw error;
    }
}
function removeDirectorySync(path) {
    try {
        fs_extra_1.default.removeSync(path);
    }
    catch (error) {
        logger_1.logger.error(`Failed to remove directory ${path}: ${error}`);
        throw error;
    }
}
//# sourceMappingURL=fs.js.map