# Examples

## Example 1: Service Definition with Health Check

```typescript
import express from "express";
const app = express();
const PORT = 3000;

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "user-service" });
});

app.get("/api/users/:id", (req, res) => {
  res.json({ id: req.params.id, name: "John Doe" });
});

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
```

## Example 2: Docker Compose for Microservices

```yaml
version: "3.9"
services:
  api-gateway:
    build: ./gateway
    ports:
      - "8080:8080"
    depends_on:
      - user-service
      - order-service
  user-service:
    build: ./users
    ports:
      - "3001:3001"
  order-service:
    build: ./orders
    ports:
      - "3002:3002"
  redis:
    image: redis:7-alpine
```
