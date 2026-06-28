# Good Example

```ts
function calculateTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price, 0)
}
```

Reason:

The function has one clear responsibility and a descriptive name.

---

# Bad Example

```ts
function calc(a: any) {
  // many unrelated operations...
}
```

Reason:

The name is unclear, the parameter is untyped, and the function mixes responsibilities.