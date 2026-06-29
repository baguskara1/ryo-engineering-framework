import ora from "ora";

export function withSpinner<T>(message: string, fn: () => T): T {
    const spinner = ora(message).start();
    try {
        const result = fn();
        spinner.succeed();
        return result;
    } catch (error) {
        spinner.fail();
        throw error;
    }
}
