# Skill Specification

## Overview

Every engineering skill inside the Ryo Engineering Framework must follow the same structure.

This ensures consistency, maintainability, and scalability.

---

## Folder Structure

Each skill must contain:

```text
skill-name/

manifest.yaml

README.md

SKILL.md

examples.md

checklist.md
```

---

## manifest.yaml

Stores metadata.

Examples

- Name
- Version
- Category
- Priority
- Dependencies

---

## README.md

Provides a quick overview.

Contains

- Purpose
- Category
- Dependencies
- Usage

---

## SKILL.md

The main engineering knowledge.

Contains

- Identity
- Philosophy
- Rules
- Best Practices
- Anti Patterns
- AI Self Review

---

## examples.md

Contains practical examples.

Every example should contain

Good

Reason

Bad

Reason

---

## checklist.md

Contains the completion checklist.

AI should verify every item before completing work.

---

## Naming Convention

Folders

Use kebab-case.

Examples

clean-code

nextjs

code-review

---

Files

Always use

manifest.yaml

README.md

SKILL.md

examples.md

checklist.md

---

## Goal

Every skill should be:

- Reusable
- Modular
- Easy to maintain
- Easy to extend