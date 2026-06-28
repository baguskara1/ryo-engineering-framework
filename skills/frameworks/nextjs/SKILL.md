# Next.js Engineering Skill

## Identity

Next.js is a React framework for building production-ready full-stack web applications.

This skill emphasizes scalability, performance, maintainability, and modern React architecture using the App Router.

---

# Engineering Philosophy

- Prefer Server Components by default.
- Minimize JavaScript sent to the browser.
- Fetch data as close to the server as possible.
- Build secure applications by default.
- Optimize before adding complexity.

---

# Core Principles

## Server First

Use Server Components unless client-side interactivity is required.

---

## Minimal Client JavaScript

Every Client Component increases bundle size.

Keep them small and isolated.

---

## Colocation

Keep components, styles, and logic close to where they are used.

---

## Progressive Enhancement

Pages should work without unnecessary client-side JavaScript.

---

## Performance by Default

Leverage built-in optimizations before introducing third-party libraries.

---

# Rendering Strategy

## Server Components

Use for:

- Static content
- Data fetching
- Layouts
- SEO
- Authentication checks

---

## Client Components

Use only when:

- useState
- useEffect
- Browser APIs
- Event handlers
- Animations

---

# Data Fetching

Prefer:

```ts
async function Page() {
  const data = await fetch(...)
}
```

Avoid fetching data inside useEffect unless the data truly depends on the client.

---

# Server Actions

Use Server Actions for:

- Form submissions
- CRUD operations
- Mutations

Avoid unnecessary API routes for internal mutations.

---

# Route Handlers

Use Route Handlers when:

- Building public APIs
- Webhooks
- Third-party integrations

---

# Metadata

Always use the Metadata API.

Good

```ts
export const metadata = {
  title: "Dashboard",
}
```

Avoid manipulating document.title manually.

---

# Image Optimization

Always prefer:

```tsx
<Image />
```

instead of

```html
<img>
```

---

# Font Optimization

Use:

```ts
next/font
```

instead of external font CDNs.

---

# Navigation

Prefer:

```tsx
<Link />
```

instead of

```tsx
<a>
```

for internal navigation.

---

# Folder Structure

```
app/
components/
lib/
hooks/
types/
styles/
```

---

# Performance

Optimize using:

- Server Components
- Streaming
- Suspense
- Image Optimization
- Font Optimization
- Dynamic Imports

Avoid premature optimization.

---

# Caching

Understand:

- Static Rendering
- Dynamic Rendering
- Revalidation
- Cache Tags

Choose the simplest strategy that satisfies requirements.

---

# Error Handling

Provide:

- error.tsx
- loading.tsx
- not-found.tsx

for a better user experience.

---

# Security

- Never expose secrets to the client.
- Validate all inputs.
- Sanitize user-generated content.
- Use HTTPS in production.
- Store secrets in environment variables.

---

# Accessibility

Always:

- Use semantic HTML.
- Provide alt text.
- Ensure keyboard navigation.
- Label form fields correctly.

---

# SEO

Use:

- Metadata API
- Open Graph
- Canonical URLs
- Structured Data when appropriate

---

# Anti Patterns

Avoid:

- Large Client Components
- Fetching everything on the client
- Unnecessary API Routes
- Deep prop drilling
- Browser APIs in Server Components
- Blocking rendering with slow requests
- Hardcoded secrets

---

# Decision Guide

Need browser interaction?

↓

YES

↓

Client Component

↓

NO

↓

Server Component

---

Need mutation?

↓

Server Action

---

Need public API?

↓

Route Handler

---

Need authentication?

↓

Middleware + Server Components

---

Need loading state?

↓

loading.tsx

---

Need error UI?

↓

error.tsx

---

# Naming Conventions

Pages

```
page.tsx
```

Layouts

```
layout.tsx
```

Loading

```
loading.tsx
```

Error

```
error.tsx
```

Not Found

```
not-found.tsx
```

---

# AI Self Review

Before completing work:

- [ ] Server Components used by default
- [ ] Client Components minimized
- [ ] Metadata configured
- [ ] Images optimized
- [ ] Fonts optimized
- [ ] Accessible
- [ ] Secure
- [ ] Type safe
- [ ] Production Ready
- [ ] Maintainable

---

# Summary

Build server-first applications.

Prefer simplicity, leverage the framework's built-in features, and only move logic to the client when truly necessary.