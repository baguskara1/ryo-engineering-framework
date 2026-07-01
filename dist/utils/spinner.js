"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSpinner = createSpinner;
exports.withSpinner = withSpinner;
const ora_1 = __importDefault(require("ora"));
const picocolors_1 = __importDefault(require("picocolors"));
function createSpinner(text) {
    const spin = (0, ora_1.default)({
        text: picocolors_1.default.dim(text),
        spinner: "dots",
        color: "cyan",
    });
    return {
        start() {
            spin.start();
            return this;
        },
        succeed(text) {
            spin.succeed(text ? picocolors_1.default.green(text) : undefined);
            return this;
        },
        fail(text) {
            spin.fail(text ? picocolors_1.default.red(text) : undefined);
            return this;
        },
        stop() {
            spin.stop();
            return this;
        },
        setText(text) {
            spin.text = picocolors_1.default.dim(text);
            return this;
        },
    };
}
function withSpinner(text, fn) {
    const spin = (0, ora_1.default)({
        text: picocolors_1.default.dim(text),
        spinner: "dots",
        color: "cyan",
    });
    spin.start();
    try {
        const result = fn();
        spin.succeed();
        return result;
    }
    catch (e) {
        spin.fail();
        throw e;
    }
}
//# sourceMappingURL=spinner.js.map