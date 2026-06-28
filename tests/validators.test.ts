import { describe, expect, it } from "vitest";
import { isValidName } from "../src/utils/validators";

describe("validators", () => {

    it("accept lowercase", () => {

        expect(isValidName("react")).toBe(true);

    });

    it("accept hyphen", () => {

        expect(isValidName("clean-code")).toBe(true);

    });

    it("reject uppercase", () => {

        expect(isValidName("React")).toBe(false);

    });

    it("reject spaces", () => {

        expect(isValidName("my skill")).toBe(false);

    });

});