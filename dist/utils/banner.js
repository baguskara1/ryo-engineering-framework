"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showBanner = showBanner;
const picocolors_1 = __importDefault(require("picocolors"));
const packagePath_1 = require("./packagePath");
const RYO_ART = [
    " _______     ______  ",
    "|  __ \\ \\   / / __ \\ ",
    "| |__) \\ \\_/ / |  | |",
    "|  _  / \\   /| |  | |",
    "| | \\ \\  | | | |__| |",
    "|_|  \\_\\ |_|  \\____/ ",
];
function showBanner() {
    console.log();
    for (const line of RYO_ART) {
        console.log(picocolors_1.default.magenta(line));
    }
    console.log();
    console.log(`  ${picocolors_1.default.bold("Ryo Engineering Framework")} ${picocolors_1.default.dim(`v${(0, packagePath_1.getPackageVersion)()}`)}`);
    console.log(picocolors_1.default.dim("  Build production-ready software with AI"));
    console.log();
}
//# sourceMappingURL=banner.js.map