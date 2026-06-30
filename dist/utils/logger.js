"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.setVerbose = setVerbose;
exports.isVerbose = isVerbose;
const picocolors_1 = __importDefault(require("picocolors"));
let verbose = false;
function setVerbose(v) {
    verbose = v;
}
function isVerbose() {
    return verbose;
}
exports.logger = {
    info(message) {
        console.log(picocolors_1.default.cyan(message));
    },
    success(message) {
        console.log(picocolors_1.default.green(message));
    },
    warning(message) {
        console.log(picocolors_1.default.yellow(message));
    },
    error(message) {
        console.error(picocolors_1.default.red(message));
    },
    plain(message) {
        console.log(message);
    },
    blank() {
        console.log();
    },
    debug(message) {
        if (verbose) {
            console.log(picocolors_1.default.dim(`[debug] ${message}`));
        }
    }
};
//# sourceMappingURL=logger.js.map