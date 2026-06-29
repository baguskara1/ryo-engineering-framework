# Checklist

- [ ] Appropriate data structures chosen for use case
- [ ] Key naming convention established (e.g., `resource:id:field`)
- [ ] TTL set on cache keys to prevent memory exhaustion
- [ ] Persistence configured (RDB, AOF, or both) based on durability needs
- [ ] `maxmemory` policy configured for cache-only use cases
- [ ] Connection pooling with proper library (ioredis, redis-py)
- [ ] Sentinel or Cluster set up for high availability
- [ ] Slow log enabled to detect problematic commands
- [ ] Security configuration (password, TLS, rename-command)
- [ ] Monitoring with Redis INFO metrics and Prometheus exporter
