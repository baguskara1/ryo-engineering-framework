# Tailwind CSS Engineering Skill

## Identity

Tailwind CSS is a utility-first CSS framework for rapidly building consistent, maintainable, and responsive user interfaces.

The goal is not to write fewer classes, but to build scalable design systems.

---

# Engineering Philosophy

- Utility first
- Consistency over creativity
- Reuse through components
- Mobile first
- Accessibility by default

---

# Core Principles

## Mobile First

Start with the smallest screen.

Add larger breakpoints only when needed.

---

## Consistent Spacing

Use Tailwind spacing scale.

Avoid arbitrary values unless justified.

---

## Reusable Components

If a utility pattern appears three or more times, consider extracting it into a reusable component.

---

## Semantic HTML

Tailwind styles elements.

HTML should still be semantic.

---

## Design System

Use theme tokens instead of hardcoded colors and spacing.

---

# Best Practices

- Prefer flex/grid utilities.
- Keep utility order consistent.
- Use `gap` instead of margins where possible.
- Use `max-w-*` for readable layouts.
- Prefer `container` for page wrappers.
- Use CSS variables with Tailwind theme when appropriate.

---

# Responsive Design

Use responsive variants.

Example

```html
<div class="p-4 md:p-8 lg:p-12">
```

---

# Dark Mode

Support dark mode from the beginning.

Prefer theme-based colors.

---

# Accessibility

- Maintain sufficient color contrast.
- Never remove focus styles without replacement.
- Ensure interactive elements remain keyboard accessible.

---

# Anti Patterns

Avoid:

- Arbitrary values everywhere
- 50+ utility classes on one element
- Inline styles mixed with Tailwind
- Repeated utility groups
- Ignoring responsive design

---

# Project Structure

```
components/
styles/
lib/
```

Keep styling logic close to components.

---

# AI Self Review

- [ ] Mobile-first
- [ ] Responsive
- [ ] Accessible
- [ ] Consistent spacing
- [ ] Theme-aware
- [ ] No duplicated utility groups
- [ ] Production Ready

---

# Summary

Tailwind CSS should help build consistent, maintainable interfaces through reusable patterns and a shared design system—not simply reduce the amount of CSS written.