# Examples

## Example 1: Domain Entity

```typescript
// domain/entities/user.ts
export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string
  ) {}

  updateEmail(newEmail: string): User {
    if (!newEmail.includes("@")) throw new Error("Invalid email");
    return new User(this.id, this.name, newEmail);
  }
}
```

## Example 2: Use Case with Repository Interface

```typescript
// domain/repositories/user-repository.ts
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

// application/use-cases/get-user.ts
export class GetUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }
}
```
