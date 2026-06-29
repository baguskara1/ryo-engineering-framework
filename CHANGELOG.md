# Changelog

## [2.0.2] - 2026-06-29

### Fixed

- Version command no longer uses hardcoded string; reads from `package.json` automatically
- Banner now shows correct package version instead of hardcoded `v1.0.0`
- Commander version also reads from `package.json` dynamically

## [2.0.1] - 2026-06-29

### Fixed

- Package now includes all runtime assets (`official-skills/`, `registry/`, `templates/`) in npm publish
- All asset paths now resolve from package install directory instead of CWD
- Telemetry now uses separate files for config and events

## [2.0.0] - 2026-06-29

### Added

- 54 official skill packages across backend, frontend, database, devops, testing, architecture, and AI categories
- CLI with 19 commands: init, create, install, uninstall, update, list, info, search, run, export, publish, validate, doctor, registry, skills, version, completion, telemetry, help
- Pink RYO startup banner with version display
- Interactive spinner for long-running operations
- Skills caching for faster repeated access
- 104 unit and integration tests with 87% coverage
- Comprehensive documentation: FAQ, migration guide, skill development guide
- GitHub CI workflow, issue templates, and PR template
- Registry with skill search and discovery
- Production Readiness Report

### Changed

- CLI output cleaned: emojis removed, consistent colored formatting via logger utility
- Help command redesigned with all commands and descriptions
- Config traversal limited to 20 levels for performance
- All source code uses strict TypeScript without `any` types
- Telemetry now uses separate files for config (`telemetry.json`) and events (`telemetry-events.json`)
- `src/utils/` achieved 100% statement coverage
- Cleaned 7 unused async exports from `fs.ts`
- Removed duplicate `isVerbose()` from `config.ts`
- Removed `.swp`, `eslint`, `uninstall` stray files from repo
- Removed `scripts/create-skill-v1.sh` legacy duplicate
- Removed empty directories: `checklists/`, `assets/`, `skills/workflow/`, `playbooks/`

### Fixed

- Console.log in completion command replaced with logger utility
- Empty LICENSE file detected for cleanup
- Telemetry `track()` type error when called after `optIn()`

## [1.0.0-alpha.2]

### Added

- Engineering writing guidelines
- Skill template
- TypeScript v2
- Professional README
