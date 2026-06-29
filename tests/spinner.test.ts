import { describe, it, expect, vi, afterEach } from "vitest";

const { mockSpinner, mockOra } = vi.hoisted(() => {
    const mockSpinner = {
        start: vi.fn().mockReturnThis(),
        succeed: vi.fn(),
        fail: vi.fn(),
    };
    const mockOra = vi.fn(() => mockSpinner);
    return { mockSpinner, mockOra };
});

vi.mock("ora", () => ({
    default: mockOra,
}));

import { withSpinner } from "../src/utils/spinner";

describe("withSpinner", () => {

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("executes function and returns result", () => {
        const result = withSpinner("loading", () => 42);
        expect(result).toBe(42);
    });

    it("calls start and succeed on success", () => {
        withSpinner("test", () => "ok");

        expect(mockOra).toHaveBeenCalledWith("test");
        expect(mockSpinner.start).toHaveBeenCalledOnce();
        expect(mockSpinner.succeed).toHaveBeenCalledOnce();
        expect(mockSpinner.fail).not.toHaveBeenCalled();
    });

    it("throws error and calls fail on failure", () => {
        const error = new Error("boom");

        expect(() => withSpinner("test", () => { throw error; })).toThrow(error);

        expect(mockSpinner.fail).toHaveBeenCalledOnce();
        expect(mockSpinner.succeed).not.toHaveBeenCalled();
    });

});
