# Checklist

- [ ] Primary keys defined on all tables
- [ ] Foreign keys with indexes for join performance
- [ ] Indexes created for frequently queried columns
- [ ] `EXPLAIN ANALYZE` used to verify query plans
- [ ] Connection pooling configured for production
- [ ] Regular backups configured and tested
- [ ] Autovacuum enabled and tuned
- [ ] Read replicas used for read scaling
- [ ] Migrations version-controlled (Flyway, Liquibase)
- [ ] Row-level security considered for multi-tenant data
