# Engineering Writing Guidelines

This document defines the writing standards for every document inside the Ryo Engineering Framework.

The goal is to ensure consistency across all skills, playbooks, templates, and documentation.

---

# Core Principles

Every document should be:

- Clear
- Practical
- Concise
- Engineering-focused
- Easy to scan
- AI-friendly

Avoid unnecessary storytelling or filler.

---

# Writing Style

Use simple English.

Prefer short sentences.

Avoid marketing language.

Avoid buzzwords.

Write as if explaining to another engineer.

---

# Heading Structure

Always use the following hierarchy:

# Title

## Section

### Subsection

Do not skip heading levels.

---

# Lists

Prefer bullet lists.

Good

- Type Safety
- Readability
- Maintainability

Avoid long paragraphs when a list is clearer.

---

# Code Examples

Always provide examples whenever introducing a recommendation.

Good

```ts
interface User {
  id: string
}
```

Bad

No example provided.

---

# Good vs Bad

Whenever possible include:

Good Example

Reason

Bad Example

Reason

AI learns more effectively from comparisons.

---

# Best Practices

Every skill should include a Best Practices section.

Recommendations should be actionable.

Example

- Prefer Server Components.
- Enable strict mode.
- Keep components small.

---

# Anti Patterns

Every skill should document common mistakes.

Focus on mistakes developers frequently make.

Example

- Overusing any
- Deep component nesting
- Large functions

---

# Decision Guide

When multiple approaches exist, include a decision guide.

Example

Need shared state?

↓

Yes

↓

Context or State Library

No

↓

Local State

---

# AI Self Review

Every SKILL.md must end with an AI Self Review checklist.

Example

- [ ] Readable
- [ ] Maintainable
- [ ] Secure
- [ ] Tested
- [ ] Production Ready

---

# File Length

Prefer:

README.md

100–200 lines maximum.

SKILL.md

200–500 lines.

examples.md

Unlimited.

checklist.md

Less than 100 lines.

---

# Naming

Folders

Use kebab-case.

Examples

clean-code

code-review

ui-design

Files

Use consistent names.

README.md

SKILL.md

examples.md

checklist.md

manifest.yaml

---

# Language

Use English.

Avoid mixed languages.

---

# Formatting

Separate major sections with horizontal rules.

Example

---

# Examples

Keep examples minimal.

Show only what is necessary.

Explain why the example is good or bad.

---

# Documentation Goal

Every document should answer three questions:

What is this?

Why should it be used?

How should it be applied?