# Checklist

- [ ] Tables use InnoDB engine (not MyISAM)
- [ ] Primary keys defined on all tables
- [ ] Indexes created for foreign keys and query WHERE clauses
- [ ] `EXPLAIN` used to verify query execution plans
- [ ] Connection pooling configured (MySQL Router, ProxySQL)
- [ ] Regular backups with `mysqldump` or `mysqlbackup`
- [ ] Binary logging enabled for point-in-time recovery
- [ ] Slow query log enabled and monitored
- [ ] Character set set to `utf8mb4` for full Unicode support
- [ ] Max connections tuned for workload
