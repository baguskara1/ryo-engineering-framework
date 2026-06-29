import pc from "picocolors";
import { getPackageVersion } from "./packagePath";

export function showBanner(): void {
    console.log(pc.bold(pc.magenta("RYO")));
    console.log(pc.dim(`v${getPackageVersion()}`));
    console.log();
}
