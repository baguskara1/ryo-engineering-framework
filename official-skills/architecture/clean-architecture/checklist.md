# Checklist

- [ ] Project follows layered structure (entities, use cases, interfaces, infrastructure)
- [ ] Dependencies point inward (inner layers know nothing about outer layers)
- [ ] Interfaces defined by the domain layer, not the infrastructure
- [ ] Use cases contain business logic and orchestrate domain objects
- [ ] External concerns (DB, UI, frameworks) isolated behind interfaces
- [ ] Dependency injection used to wire up components
- [ ] Domain entities have no external dependencies
- [ ] Repository interfaces defined in domain layer
- [ ] Tests can run without infrastructure (in-memory implementations)
- [ ] Architecture decisions documented with ADRs
