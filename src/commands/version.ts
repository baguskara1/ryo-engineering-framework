import { logger } from "../utils/logger";

export function version(banner?: () => void) {
    if (banner) banner();
    logger.plain("Version: 1.0.0");
    logger.blank();
}