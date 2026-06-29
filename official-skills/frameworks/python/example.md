# Examples

## Example 1: Async HTTP Client

```python
import asyncio
import httpx
from typing import list

async def fetch_users() -> list[dict]:
    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.example.com/users")
        response.raise_for_status()
        return response.json()

async def main() -> None:
    users = await fetch_users()
    print(users)

asyncio.run(main())
```

## Example 2: Pydantic Model

```python
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    id: int
    name: str
    email: EmailStr
    is_active: bool = True

user = User(id=1, name="Alice", email="alice@example.com")
print(user.model_dump())
```
