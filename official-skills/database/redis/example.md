# Examples

## Example 1: Caching with TTL

```typescript
import Redis from "ioredis";

const redis = new Redis();

async function getUser(id: number) {
  const cacheKey = `user:${id}`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const user = { id, name: "Alice" }; // fetched from DB
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
  return user;
}
```

## Example 2: Pub/Sub Messaging

```typescript
const publisher = new Redis();
const subscriber = new Redis();

subscriber.subscribe("notifications", (err, count) => {
  console.log(`Subscribed to ${count} channels`);
});

subscriber.on("message", (channel, message) => {
  console.log(`Received: ${message} on ${channel}`);
});

// Publish a message
publisher.publish("notifications", JSON.stringify({ event: "user.signup" }));
```
