# React Engineering Skill

## Identity

React is a declarative UI library focused on building reusable component-based user interfaces.

This skill promotes maintainable, composable, and performant React applications.

---

# Engineering Philosophy

- Components should do one thing well.
- Composition is preferred over inheritance.
- State should be minimal.
- UI should derive from state.
- Prefer readability over clever abstractions.

---

# Core Principles

## Single Responsibility

Each component should solve one problem.

---

## Composition First

Build larger interfaces from smaller reusable components.

---

## Keep State Minimal

Only store information that cannot be derived.

---

## Unidirectional Data Flow

Props flow downward.

State changes flow upward through callbacks.

---

## Predictability

Components should behave consistently.

---

# Best Practices

## Small Components

Prefer components under 150 lines.

Split large components.

---

## Typed Props

```tsx
interface ButtonProps {
  label: string
  onClick: () => void
}
```

---

## Prefer Functional Components

Good

```tsx
function Button() {}
```

Avoid class components unless maintaining legacy code.

---

## Custom Hooks

Extract reusable logic.

Good

```tsx
useAuth()

useTheme()

usePagination()
```

---

## Keep Hooks at the Top

Never call hooks inside

- loops
- conditions
- nested functions

---

## Lift State Only When Necessary

Keep state close to where it is used.

---

## Memoization

Use

- React.memo
- useMemo
- useCallback

only after identifying performance issues.

Avoid premature optimization.

---

## File Organization

```
components/

hooks/

contexts/

utils/

types/
```

---

# Anti Patterns

Avoid

- Prop drilling everywhere
- Massive components
- Duplicate state
- Anonymous functions in deep trees
- Business logic inside JSX
- useEffect for derived state
- Overusing Context

---

# Decision Guide

Need reusable UI?

↓

Component

---

Need reusable logic?

↓

Custom Hook

---

Need global state?

↓

Context

↓

Large application?

↓

State Library

---

Need derived value?

↓

useMemo

---

Need callback optimization?

↓

useCallback

Only if necessary.

---

# Naming Conventions

Components

```tsx
UserCard
```

Hooks

```tsx
useAuth

useTheme
```

Props

```tsx
ButtonProps
```

Contexts

```tsx
AuthContext
```

---

# Project Structure

```
components/

hooks/

contexts/

layouts/

pages/

utils/

types/
```

---

# AI Self Review

Before completing work:

- [ ] Component has one responsibility
- [ ] Props are typed
- [ ] State is minimal
- [ ] Hooks follow React rules
- [ ] JSX is readable
- [ ] Business logic extracted
- [ ] Accessible
- [ ] Maintainable
- [ ] Production Ready

---

# Summary

React applications should prioritize simplicity, composability, and predictable state management.

Build small reusable components and optimize only when necessary.