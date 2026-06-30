# Ryo Engineering Framework

![Version](https://img.shields.io/badge/version-2.1.1-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)

Build production-ready software with AI using real engineering principles.

Ryo Engineering Framework (REF) is an open-source engineering framework that provides reusable skills, playbooks, templates, and standards for AI coding assistants.

Rather than relying on prompts alone, REF enables consistent, maintainable, and production-ready software engineering workflows.

---

## Features

- Reusable Engineering Skills
- AI-ready Knowledge Base
- Engineering Standards
- Playbooks
- Checklists
- Templates
- Security Best Practices
- Testing Guidelines
- CLI for Skill Management

---

## CLI Commands

| Command       | Description                              |
|---------------|------------------------------------------|
| `ryo help`    | Show available commands                  |
| `ryo version` | Show version information                 |
| `ryo doctor`  | Check project structure                  |
| `ryo list`    | List installed skills                    |
| `ryo validate`| Validate skill structure                 |
| `ryo create`  | Create a new skill                       |
| `ryo init`    | Initialize a new project                 |
| `ryo skills`  | Show installed skills                    |
| `ryo search`  | Search registry for skills               |
| `ryo info`    | Show skill information                   |
| `ryo registry`| Browse the official registry             |
| `ryo install` | Install a skill from registry            |
| `ryo update`  | Update an installed skill                |
| `ryo upgrade` | Upgrade the ryo framework itself         |
| `ryo uninstall`| Uninstall a skill                       |
| `ryo publish` | Package a skill for distribution         |
| `ryo export`  | Export a skill as markdown               |
| `ryo run`     | Show skill content in terminal           |
| `ryo completion`| Generate shell completion script       |
| `ryo telemetry`| Manage anonymous usage telemetry        |

## Usage Examples

```bash
# Help & version
ryo help
ryo version

# Inspect
ryo doctor
ryo list
ryo validate

# Search & discover
ryo search react
ryo info docker
ryo registry

# Create & manage
ryo create workflow my-skill
ryo install kubernetes
ryo update kubernetes
ryo upgrade
ryo uninstall kubernetes

# Package & export
ryo publish kubernetes
ryo export kubernetes
```

---

## Installation

```bash
git clone https://github.com/baguskara1/ryo-engineering-framework.git
cd ryo-engineering-framework
npm install
npm run build
npm link
```

Then verify:

```bash
ryo help
```

---

## Repository Structure

```text
src/              # Source code
  commands/       # CLI command implementations
  registry/       # Registry service
  skills/         # Skill loader
  utils/          # Shared utilities
tests/            # Test files
  integration/    # CLI integration tests
docs/             # Documentation
official-skills/  # Official skill packages (31+ skills)
playbooks/        # Engineering playbooks
registry/         # Skill registry index
skills/           # Installed skills
templates/        # Skill templates
```

---

## Supported AI Coding Assistants

- OpenCode
- Claude Code
- Cursor
- Codex CLI
- Cline
- Roo Code

---

## Contributing

Contributions are welcome. Please read:

- CONTRIBUTING.md
- docs/writing-guidelines.md
- docs/review-checklist.md

before opening a Pull Request.

---

## License

MIT License.
