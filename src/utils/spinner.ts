import ora from "ora";
import pc from "picocolors";

export function createSpinner(text: string) {
  const spin = ora({
    text: pc.dim(text),
    spinner: "dots",
    color: "cyan",
  });

  return {
    start() {
      spin.start();
      return this;
    },
    succeed(text?: string) {
      spin.succeed(text ? pc.green(text) : undefined);
      return this;
    },
    fail(text?: string) {
      spin.fail(text ? pc.red(text) : undefined);
      return this;
    },
    stop() {
      spin.stop();
      return this;
    },
    setText(text: string) {
      spin.text = pc.dim(text);
      return this;
    },
  };
}

export function withSpinner<T>(text: string, fn: () => T): T {
  const spin = ora({
    text: pc.dim(text),
    spinner: "dots",
    color: "cyan",
  });

  spin.start();

  try {
    const result = fn();
    spin.succeed();
    return result;
  } catch (e) {
    spin.fail();
    throw e;
  }
}
