import { logger } from "../utils/logger";
import { getPackageVersion } from "../utils/packagePath";

export function version(banner?: () => void) {
    if (banner) banner();
    logger.plain(`Version: ${getPackageVersion()}`);
    logger.blank();
}