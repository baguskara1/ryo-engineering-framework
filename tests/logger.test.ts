import { describe, it, expect, vi, afterEach } from "vitest";

import { logger } from "../src/utils/logger";

describe("logger", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("logs info message", () => {

        const spy = vi.spyOn(console, "log").mockImplementation(() => {});

        logger.info("hello");

        expect(spy).toHaveBeenCalledOnce();

    });

    it("logs success message", () => {

        const spy = vi.spyOn(console, "log").mockImplementation(() => {});

        logger.success("hello");

        expect(spy).toHaveBeenCalledOnce();

    });

    it("logs warn message", () => {

        const spy = vi.spyOn(console, "log").mockImplementation(() => {});

        logger.warn("hello");

        expect(spy).toHaveBeenCalledOnce();

    });

    it("logs warning message", () => {

        const spy = vi.spyOn(console, "log").mockImplementation(() => {});

        logger.warning("hello");

        expect(spy).toHaveBeenCalledOnce();

    });

    it("logs error message", () => {

        const spy = vi.spyOn(console, "log").mockImplementation(() => {});

        logger.error("hello");

        expect(spy).toHaveBeenCalledOnce();

    });

});