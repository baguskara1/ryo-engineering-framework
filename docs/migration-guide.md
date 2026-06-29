# Migration Guide

## Migrating from v0.x to v1.0.0

### CLI Changes

- The `ryo` CLI is now the primary interface.
- All commands are accessed via `ryo <command>`.
- Telemetry is opt-in only.

### Skill Format

- Skills now follow a standardized structure with metadata.yaml and manifest.yaml.
- Each skill includes prompts/, checklists/, and troubleshooting guides.
- The registry format has been updated with version tracking.

### Configuration

- Configuration is stored in `ryo.json` in your project root.
- Legacy configuration files should be migrated to the new format.
- Run `ryo doctor` to validate your project structure.

### Breaking Changes

- Removed emoji characters from CLI output.
- Skill templates now use lowercase-kebab-case naming.
- Registry index format updated to structured JSON.

## Steps

1. Update to the latest version: `npm install -g ryo-engineering-framework`
2. Run `ryo doctor` to check your project health.
3. Update any custom skills to match the new format.
4. Verify with `ryo validate`.
