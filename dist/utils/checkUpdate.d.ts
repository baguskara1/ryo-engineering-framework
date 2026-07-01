interface CacheData {
    latest: string;
    checkedAt: number;
}
export declare function readCache(): CacheData | null;
export declare function checkForUpdate(): string | null;
export declare function scheduleAsyncCheck(): void;
export declare function getPendingNotification(): string | null;
export {};
//# sourceMappingURL=checkUpdate.d.ts.map