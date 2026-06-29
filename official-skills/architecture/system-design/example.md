# Examples

## Example 1: URL Shortener Design

```
Functional: create short URL, redirect to original
Non-functional: high availability, low latency, 10M URLs/month

Components:
- Web server (load balanced)
- Redis cache for hot URLs
- PostgreSQL for persistent storage
- Base62 encoding for short codes

Flow:
Client -> Load Balancer -> Web Server -> Check Redis Cache
  -> Cache miss -> Query PostgreSQL -> Store in Redis -> Return
```

## Example 2: Caching Strategy

```typescript
// Cache-aside pattern
async function getUser(id: string): Promise<User> {
  const cacheKey = `user:${id}`;
  let user = await cache.get(cacheKey);
  if (!user) {
    user = await db.findUser(id);
    await cache.setex(cacheKey, 3600, user);
  }
  return user;
}
```
