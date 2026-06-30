"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = version;
const logger_1 = require("../utils/logger");
const packagePath_1 = require("../utils/packagePath");
function version(banner) {
    if (banner)
        banner();
    logger_1.logger.plain(`Version: ${(0, packagePath_1.getPackageVersion)()}`);
    logger_1.logger.blank();
}
//# sourceMappingURL=version.js.map