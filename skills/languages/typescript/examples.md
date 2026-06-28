# Good Example

## Strong Types

```ts
interface User {
  id: string;
  name: string;
}
```

Reason

Use explicit interfaces to improve readability and maintainability.

---

# Bad Example

```ts
const user: any = {}
```

Reason

Avoid `any` whenever possible because it removes TypeScript safety.

---

# Good Example

```ts
type Status = "pending" | "success" | "failed";
```

Reason

Use union types instead of arbitrary strings.

---

# Bad Example

```ts
const status: string = "pending";
```

Reason

Generic string types allow invalid values.

---

# Good Example

```ts
interface Product {
  id: string
  name: string
}

function getProduct(id: string): Product {
  ...
}
```

Reason

Clear contract and explicit return type.

---

# Bad Example

```ts
function getProduct(id: any): any {
  ...
}
```

Reason

Removes all type safety.