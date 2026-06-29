# Troubleshooting

## Common Issues

1. Slow queries under high concurrency
2. Deadlock errors in InnoDB transactions
3. Table size growing too large
4. Replication slave falling behind
5. `max_connections` limit reached

## Solutions

1. Use `EXPLAIN` to analyze queries; add composite indexes; optimize JOINs
2. Keep transactions short; use consistent lock ordering; retry on deadlock
3. Use partitioning, archiving old data, and optimizing tables with `OPTIMIZE TABLE`
4. Check slave threads; increase `slave_parallel_workers`; use row-based replication
5. Increase `max_connections`; implement connection pooling; review long-running queries
