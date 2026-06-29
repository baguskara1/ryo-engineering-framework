import { logger } from "../utils/logger";

export function version() {
    logger.blank();
    logger.info("🚀 Ryo Engineering Framework");
    logger.plain("Version: 1.0.0");
    logger.blank();
}