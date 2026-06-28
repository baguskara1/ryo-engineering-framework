# Good Example

## Small Component

```tsx
function UserCard({ user }: Props) {
  return <h2>{user.name}</h2>;
}
```

Reason

Components should have a single responsibility.

---

# Bad Example

```tsx
function Dashboard() {
  // 500+ lines
}
```

Reason

Large components are difficult to maintain.

---

# Good Example

```tsx
const isLoading = true;
```

Reason

Boolean variables should clearly express intent.

---

# Bad Example

```tsx
const flag = true;
```

Reason

Variable names should be descriptive.