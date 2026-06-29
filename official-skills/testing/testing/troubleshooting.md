# Troubleshooting

## Common Issues

1. Flaky tests that fail intermittently
2. Slow test suites discouraging frequent runs
3. Mocking too many dependencies causing fragile tests
4. Tests passing locally but failing in CI
5. Coverage gaps despite high percentage

## Solutions

1. Isolate test order dependencies; fix race conditions; add retries for async flakiness
2. Run unit tests in parallel; categorize tests (unit/integration/e2e) with separate CI jobs
3. Use integration tests over heavy mocking; test public API, not implementation details
4. Check environment differences (timezone, locale, DB state); use Docker for consistency
5. Focus on meaningful coverage (critical paths, edge cases); not just line coverage number
