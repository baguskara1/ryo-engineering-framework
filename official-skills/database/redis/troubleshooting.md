# Troubleshooting

## Common Issues

1. Cache stampede when popular keys expire
2. Memory usage growing beyond available RAM
3. Replication lag in master-slave setup
4. Blocking commands causing latency spikes
5. Keyspace notification delivery failures

## Solutions

1. Use distributed locking or probabilistic early recomputation for hot keys
2. Set `maxmemory` policy (allkeys-lru); monitor with `INFO MEMORY`; evict unused keys
3. Check network latency; use `repl-backlog-size` tuning; consider Redis Cluster
4. Prefer non-blocking alternatives; use `B*` commands with short timeouts
5. Ensure `notify-keyspace-events` config includes desired event types
