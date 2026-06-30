"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSpinner = withSpinner;
const ora_1 = __importDefault(require("ora"));
function withSpinner(message, fn) {
    const spinner = (0, ora_1.default)(message).start();
    try {
        const result = fn();
        spinner.succeed();
        return result;
    }
    catch (error) {
        spinner.fail();
        throw error;
    }
}
//# sourceMappingURL=spinner.js.map