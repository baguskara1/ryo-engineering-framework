import { logger } from "../utils/logger";

export function help() {

    logger.blank();

    logger.info("🚀 Ryo Engineering Framework");

    logger.blank();
    logger.plain("Commands");
    logger.blank();

    logger.plain("  version");
    logger.plain("  doctor");
    logger.plain("  list");
    logger.plain("  validate");
    logger.plain("  create");
    logger.plain("  init");
    logger.plain("  help");

    logger.blank();
}