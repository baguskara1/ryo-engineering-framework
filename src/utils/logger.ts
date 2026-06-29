import pc from "picocolors";

let verbose = false;

export function setVerbose(v: boolean): void {
    verbose = v;
}

export function isVerbose(): boolean {
    return verbose;
}

export const logger = {
    info(message: string) {
        console.log(pc.cyan(message));
    },

    success(message: string) {
        console.log(pc.green(message));
    },

    warning(message: string) {
        console.log(pc.yellow(message));
    },

    error(message: string) {
        console.error(pc.red(message));
    },

    plain(message: string) {
        console.log(message);
    },

    blank() {
        console.log();
    },

    debug(message: string) {
        if (verbose) {
            console.log(pc.dim(`[debug] ${message}`));
        }
    }
};