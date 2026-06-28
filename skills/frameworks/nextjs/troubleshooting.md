# Common Problems

## Hydration Error

Possible Causes

- Browser API used in Server Component
- Different server/client output

Solution

- Move browser logic to Client Component
- Use useEffect when accessing window/document

---

## Dynamic Route Not Found

Possible Causes

- Incorrect folder structure

Solution

- Verify App Router conventions

---

## Slow Page

Possible Causes

- Large Client Component
- Unoptimized images

Solution

- Prefer Server Components
- Use next/image