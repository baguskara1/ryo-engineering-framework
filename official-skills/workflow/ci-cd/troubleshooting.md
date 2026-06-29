# Troubleshooting

## Common Issues

1. Pipeline fails due to flaky tests
2. Secrets not available in pipeline environment
3. Build artifact too large causing timeouts
4. Deployment step fails due to environment drift
5. Cache invalidation causing stale dependencies

## Solutions

1. Retry failed tests, use `--flaky-attempts` or isolate flaky tests with pytest markers
2. Verify secret names match pipeline configuration and check scope permissions
3. Split build into stages, exclude unnecessary files, use caching
4. Use infrastructure-as-code and immutable deployment strategies
5. Use cache keys based on lockfile checksums and clear cache manually when needed
