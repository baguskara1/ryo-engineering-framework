import pc from "picocolors";
import { logger } from "../utils/logger";

export function init() {
    logger.blank();
    logger.info("Ryo Init");
    logger.blank();
    logger.plain(pc.dim("  Project initialization is coming soon."));
    logger.blank();
}
