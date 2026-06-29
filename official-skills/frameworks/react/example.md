# Examples

## Example 1: Custom Hook with TypeScript

```typescript
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  return { users, loading };
}
```

## Example 2: Component with Memoization

```tsx
import React, { memo } from "react";

interface Props {
  name: string;
  onClick: () => void;
}

export const UserCard = memo(({ name, onClick }: Props) => {
  return (
    <div className="card" onClick={onClick}>
      <h3>{name}</h3>
    </div>
  );
});
```
