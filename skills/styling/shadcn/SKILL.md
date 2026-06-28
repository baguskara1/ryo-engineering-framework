# shadcn/ui Engineering Skill

## Identity

shadcn/ui provides reusable, accessible UI components built on Radix UI and Tailwind CSS.

The goal is to create a consistent design system while keeping full control over component code.

---

# Engineering Philosophy

- Composition over customization
- Accessibility by default
- Reuse before creating new components
- Keep components simple
- Build a scalable design system

---

# Core Principles

## Reuse Existing Components

Prefer extending existing shadcn/ui components rather than creating new ones from scratch.

---

## Accessibility

Leverage Radix UI primitives to ensure keyboard navigation, focus management, and ARIA support.

---

## Variants

Use `cva` (Class Variance Authority) for component variants.

Avoid duplicating Tailwind class combinations.

---

## Component Composition

Compose small components together instead of creating large monolithic components.

---

# Best Practices

- Use `Button`, `Input`, `Dialog`, `Sheet`, and other built-in primitives whenever appropriate.
- Keep component APIs consistent.
- Place custom wrappers inside `components/ui`.
- Keep styling close to the component.

---

# Anti Patterns

Avoid:

- Editing generated components without reason
- Copy-pasting similar components
- Hardcoding colors
- Ignoring accessibility
- Mixing multiple design systems

---

# Folder Structure

```
components/
└── ui/

lib/

hooks/
```

---

# AI Self Review

- [ ] Accessible
- [ ] Variant-based
- [ ] Responsive
- [ ] Reusable
- [ ] Theme-aware
- [ ] Type-safe
- [ ] Maintainable
- [ ] Production Ready

---

# Summary

Use shadcn/ui as the foundation of a reusable design system. Favor composition, accessibility, and consistent APIs over one-off UI implementations.