# Checklist

- [ ] Pydantic models used for request/response validation
- [ ] Dependency injection for reusable logic (auth, DB sessions)
- [ ] Async endpoints preferred for I/O-bound operations
- [ ] Proper HTTP status codes returned for all responses
- [ ] CORS middleware configured for allowed origins
- [ ] Environment-specific configuration with Pydantic Settings
- [ ] Automated tests with TestClient (httpx)
- [ ] API documentation groups tags for clear organization
- [ ] Rate limiting implemented for public endpoints
- [ ] Database migrations managed with Alembic
