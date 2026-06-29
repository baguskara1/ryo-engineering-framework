# Troubleshooting

## Common Issues

1. Single point of failure in architecture
2. Database becoming bottleneck under read load
3. Cache invalidation causing stale data
4. Network latency between microservices
5. Inconsistent data across shards

## Solutions

1. Add redundancy (multiple instances, multi-AZ); use load balancer with health checks
2. Add read replicas, implement caching (Redis/CDN), denormalize for read-heavy workloads
3. Use TTL-based expiration, write-through cache, or pub/sub invalidation
4. Co-locate related services; use async communication (queues); consider service mesh
5. Use distributed transactions sparingly; prefer eventual consistency with idempotency
