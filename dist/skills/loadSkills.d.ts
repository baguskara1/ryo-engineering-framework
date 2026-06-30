export interface SkillMetadata {
    name?: string;
    version?: string;
    description?: string;
    author?: string;
    tags?: string[];
}
export interface Skill {
    category: string;
    name: string;
    path: string;
    metadata: SkillMetadata;
}
export declare function loadSkills(): Skill[];
export declare function clearSkillsCache(): void;
//# sourceMappingURL=loadSkills.d.ts.map