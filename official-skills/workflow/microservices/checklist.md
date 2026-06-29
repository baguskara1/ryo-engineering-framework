# Checklist

- [ ] Services loosely coupled with well-defined APIs
- [ ] Each service has its own data store (database per service)
- [ ] API gateway used for routing, auth, and rate limiting
- [ ] Service discovery implemented for dynamic endpoints
- [ ] Inter-service communication uses retries with circuit breakers
- [ ] Distributed tracing implemented for observability
- [ ] Each service independently deployable and scalable
- [ ] Health check endpoints implemented for all services
- [ ] Event-driven communication used for async workflows
- [ ] Containerization and orchestration (Docker + Kubernetes)
