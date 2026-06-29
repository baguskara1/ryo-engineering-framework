# Examples

## Example 1: App Router Server Component

```typescript
// app/users/page.tsx
async function getUsers() {
  const res = await fetch("https://api.example.com/users");
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();
  return (
    <ul>
      {users.map((user: { id: number; name: string }) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Example 2: API Route Handler

```typescript
// app/api/users/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const users = [{ id: 1, name: "Alice" }];
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ created: body }, { status: 201 });
}
```
