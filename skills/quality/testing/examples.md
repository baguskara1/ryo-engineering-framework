# Good Example

```ts
it("calculates total price", () => {
  expect(calculateTotal(items)).toBe(100)
})
```

Reason:

The test name clearly describes the expected behavior.

---

# Bad Example

```ts
it("test", () => {})
```

Reason:

The test name provides no useful information.