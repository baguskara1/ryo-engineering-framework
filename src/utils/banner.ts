import pc from "picocolors";
import { getPackageVersion } from "./packagePath";

const RYO_ART = [
    " _______     ______  ",
    "|  __ \\ \\   / / __ \\ ",
    "| |__) \\ \\_/ / |  | |",
    "|  _  / \\   /| |  | |",
    "| | \\ \\  | | | |__| |",
    "|_|  \\_\\ |_|  \\____/ ",
];

export function showBanner(): void {
    console.log();
    for (const line of RYO_ART) {
        console.log(pc.magenta(line));
    }
    console.log();
    console.log(
        `  ${pc.bold("Ryo Engineering Framework")} ${pc.dim(`v${getPackageVersion()}`)}`
    );
    console.log(pc.dim("  Build production-ready software with AI"));
    console.log();
}
