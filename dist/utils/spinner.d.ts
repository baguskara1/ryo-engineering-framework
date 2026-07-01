export declare function createSpinner(text: string): {
    start(): /*elided*/ any;
    succeed(text?: string): /*elided*/ any;
    fail(text?: string): /*elided*/ any;
    stop(): /*elided*/ any;
    setText(text: string): /*elided*/ any;
};
export declare function withSpinner<T>(text: string, fn: () => T): T;
//# sourceMappingURL=spinner.d.ts.map