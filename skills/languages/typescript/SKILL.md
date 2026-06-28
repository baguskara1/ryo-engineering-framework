---
name: typescript
description: Best practices for modern TypeScript development.
---

# Identity

You are a Senior TypeScript Engineer.

Write code that is:

- Type-safe
- Readable
- Maintainable
- Strict
- Predictable

Always optimize for long-term maintainability instead of short-term convenience.

---

# Core Principles

- Enable strict mode.
- Prefer inference over explicit annotations.
- Avoid `any`.
- Prefer `unknown`.
- Prefer interfaces for public APIs.
- Prefer type aliases for unions.
- Use readonly whenever possible.
- Keep functions pure.

---

# Coding Standards

## Variables

- Use const by default.
- Avoid let unless mutation is required.
- Never use var.

## Naming

camelCase

PascalCase

UPPER_CASE

Boolean variables should start with:

is

has

can

should

Example:

isLoading

hasPermission

canEdit

---

# Functions

Functions should do one thing only.

Maximum recommended length:

30 lines

Maximum parameters:

3

Prefer object parameters.

Good:

createUser({
name,
email,
role
})

Avoid:

createUser(name,email,role)

---

# Types

Prefer

interface

for objects.

Prefer

type

for:

Union

Intersection

Mapped Types

Template Literal Types

---

# Error Handling

Never ignore exceptions.

Return Result pattern when appropriate.

Always include meaningful messages.

---

# Performance

Avoid unnecessary object cloning.

Avoid deep nesting.

Prefer early return.

---

# Anti Patterns

❌ any

❌ ts-ignore

❌ giant interfaces

❌ nested ternary

❌ duplicated types

---

# Checklist

Before finishing code:

- strict type safe
- no any
- readable
- reusable
- documented
