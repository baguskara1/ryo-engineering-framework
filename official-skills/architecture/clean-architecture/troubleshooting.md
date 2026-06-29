# Troubleshooting

## Common Issues

1. Business logic leaking into infrastructure layer
2. Too many abstraction layers causing complexity
3. Dependency injection configuration errors
4. Use cases becoming too large or coupled
5. Testing requires heavy mocking

## Solutions

1. Enforce strict layer dependencies; infrastructure code should only implement interfaces
2. Start with fewer layers (entities, use cases, infrastructure) and expand only when needed
3. Use a DI container; register interfaces with their implementations in composition root
4. Split large use cases; each use case should have a single responsibility
5. Write integration tests against repositories; unit test use cases with mock interfaces
