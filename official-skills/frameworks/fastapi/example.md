# Examples

## Example 1: FastAPI CRUD Endpoints

```python
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

items_db: dict[int, Item] = {}

@app.post("/items/", status_code=201)
async def create_item(item: Item) -> Item:
    item_id = len(items_db) + 1
    items_db[item_id] = item
    return item

@app.get("/items/{item_id}")
async def get_item(item_id: int) -> Item:
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    return items_db[item_id]
```

## Example 2: Dependency Injection

```python
from fastapi import Depends, FastAPI, Header, HTTPException

async def verify_token(x_token: str = Header(...)):
    if x_token != "secret-token":
        raise HTTPException(status_code=401, detail="Invalid token")
    return x_token

@app.get("/secure-data")
async def secure_data(token: str = Depends(verify_token)):
    return {"data": "sensitive", "token": token}
```
