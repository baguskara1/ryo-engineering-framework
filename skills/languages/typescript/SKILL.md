# TypeScript Engineering Skill

## Identity

TypeScript is the default language for modern JavaScript applications.

The goal of this skill is not simply to make code compile, but to produce software that is maintainable, type-safe, readable, and scalable.

Always prioritize long-term maintainability over short-term convenience.

---

# Engineering Philosophy

- Types are documentation.
- Eliminate bugs through the type system.
- Prefer explicit intent over clever code.
- Optimize for maintainability.
- Avoid unnecessary complexity.

---

# Core Principles

## Type Safety First

Use the type system to prevent runtime errors whenever possible.

---

## Readability

Types should improve code readability rather than making it harder to understand.

---

## Maintainability

Write code that future developers can understand quickly.

---

## Simplicity

Choose the simplest type that accurately models the problem.

---

# Best Practices

## Use Strict Mode

Always enable strict mode.

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

---

## Prefer Interfaces for Object Contracts

```ts
interface User {
  id: string
  name: string
}
```

---

## Use Type Aliases for Unions

```ts
type Status =
  | "pending"
  | "success"
  | "failed"
```

---

## Avoid any

Bad

```ts
const user: any = {}
```

Good

```ts
const user: User = {}
```

---

## Prefer Unknown over Any

```ts
function parse(data: unknown) {}
```

---

## Use Enums Sparingly

Prefer literal unions.

Good

```ts
type Role =
  | "admin"
  | "user"
```

Avoid

```ts
enum Role {
  Admin,
  User
}
```

unless interoperability requires enums.

---

## Prefer Composition

Small reusable types are better than huge interfaces.

---

## Keep Types Close

Define types close to where they are used unless shared.

---

## Avoid Duplicate Types

Create one source of truth.

---

# Anti Patterns

Avoid

- any
- Large interfaces
- Deep inheritance
- Magic strings
- Duplicate types
- Overusing enums
- Overusing assertions
- Ignoring compiler errors

---

# Decision Guide

Need an object contract?

↓

Use Interface

---

Need union?

↓

Use Type Alias

---

Need unknown input?

↓

Use Unknown

---

Need casting?

↓

Validate first

↓

Cast later

---

Need reusable model?

↓

Extract shared type

---

# Naming Conventions

Interfaces

```ts
interface User
```

Types

```ts
type ApiResponse
```

Generic

```ts
T

TData

TError
```

Booleans

```ts
isLoading

hasPermission

canEdit
```

---

# Project Structure

```
types/
    api.ts
    auth.ts
    user.ts

lib/

components/

hooks/
```

Keep shared types inside the `types/` directory.

---

# AI Self Review

Before finishing, verify:

- [ ] No unnecessary any
- [ ] Strict typing enabled
- [ ] Readable names
- [ ] Types are reusable
- [ ] No duplicate models
- [ ] Unknown preferred over any
- [ ] Production ready
- [ ] Maintainable
- [ ] Easy to extend

---

# Summary

TypeScript should reduce bugs, improve readability, and increase confidence during development.

The goal is not simply to satisfy the compiler, but to create maintainable software that scales.