# Examples

## Example 1: Generic Utility Type

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

type User = { id: number; name: string };

async function fetchUser(id: number): Promise<ApiResponse<User>> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

## Example 2: Discriminated Union

```typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}
```
