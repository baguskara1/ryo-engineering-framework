export interface RyoConfig {
    registryUrl?: string;
    skillsDir?: string;
    verbose?: boolean;
}
export declare function loadConfig(): RyoConfig;
export declare function getConfig(): RyoConfig;
export declare function clearConfigCache(): void;
//# sourceMappingURL=config.d.ts.map