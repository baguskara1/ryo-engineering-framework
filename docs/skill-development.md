# Skill Development Guide

## Overview

Skills are the core building blocks of RYO. Each skill provides structured knowledge, prompts, and checklists for a specific technology or practice.

## Skill Structure

```
skill-name/
  metadata.yaml       # Skill metadata and tags
  manifest.yaml       # Skill manifest
  README.md           # Skill documentation
  SKILL.md            # Skill definition
  VERSION.md          # Version information
  CHANGELOG.md        # Change log
  troubleshooting.md  # Common issues
  references.md       # Reference links
  checklist.md        # Quality checklist
  examples.md         # Usage examples
  prompts/
    system.md         # System prompt
    generate.md       # Code generation prompt
    review.md         # Code review prompt
```

## Creating a Skill

1. Use `ryo create <category> <skill-name>` to scaffold a new skill.
2. Edit metadata.yaml with your skill information.
3. Write the system prompt in prompts/system.md.
4. Add examples in examples.md.
5. Validate with `ryo validate`.

## Best Practices

- Keep prompts focused and actionable.
- Include real-world examples.
- Maintain up-to-date checklists.
- Version your skills properly.
- Test with `ryo validate` before publishing.
