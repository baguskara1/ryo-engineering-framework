import pc from "picocolors";

export function showBanner(): void {
    console.log(pc.bold(pc.magenta("RYO")));
    console.log(pc.dim("v1.0.0"));
    console.log();
}
