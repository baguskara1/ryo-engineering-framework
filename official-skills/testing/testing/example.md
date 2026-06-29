# Examples

## Example 1: Unit Test with Jest

```typescript
import { calculateDiscount } from "./pricing";

describe("calculateDiscount", () => {
  it("applies 10% discount for orders over $100", () => {
    const result = calculateDiscount(150);
    expect(result).toBe(135);
  });

  it("returns full price for orders under $100", () => {
    const result = calculateDiscount(50);
    expect(result).toBe(50);
  });
});
```

## Example 2: Integration Test with pytest

```python
import pytest
from httpx import AsyncClient
from app import app

@pytest.mark.asyncio
async def test_create_user():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post("/users", json={"name": "Alice"})
        assert response.status_code == 201
        assert response.json()["name"] == "Alice"
```
