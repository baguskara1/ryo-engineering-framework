export interface RegistrySkill {
    name: string;
    category: string;
    version: string;
}
export declare function getRegistryPath(): string;
export declare function loadRegistry(): RegistrySkill[];
export declare function findInRegistry(name: string): RegistrySkill | undefined;
export declare function searchInRegistry(keyword: string): RegistrySkill[];
export declare function clearRegistryCache(): void;
//# sourceMappingURL=loadRegistry.d.ts.map