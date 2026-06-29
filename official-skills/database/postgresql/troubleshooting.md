# Troubleshooting

## Common Issues

1. Slow queries due to missing indexes
2. Connection pool exhaustion under load
3. Deadlocks in concurrent transactions
4. Replication lag in streaming replication
5. Vacuum not keeping up with table bloat

## Solutions

1. Use `EXPLAIN ANALYZE` to identify slow queries; add appropriate indexes
2. Increase `max_connections` or use PgBouncer connection pooling
3. Enforce consistent lock ordering in transactions; use `nowait` or `skip locked`
4. Monitor `pg_stat_replication`; increase `wal_keep_size` or configure replication slots
5. Tune autovacuum parameters; schedule manual VACUUM during off-peak hours
