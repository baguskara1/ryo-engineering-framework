import ora, { type Color } from "ora";

export function withSpinner<T>(message: string, fn: () => T, color?: Color): T {
    const spinner = ora({ text: message, color: color ?? "cyan" }).start();
    try {
        const result = fn();
        spinner.succeed();
        return result;
    } catch (error) {
        spinner.fail();
        throw error;
    }
}
