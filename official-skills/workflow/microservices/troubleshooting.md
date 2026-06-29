# Troubleshooting

## Common Issues

1. Service-to-service communication failures
2. Distributed transaction consistency problems
3. Service discovery delays causing routing errors
4. Circuit breaker tripping under load
5. Debugging complexity across multiple services

## Solutions

1. Implement retries with exponential backoff, use health checks and timeouts
2. Use saga pattern or event-driven eventual consistency instead of distributed transactions
3. Increase health check frequency, use client-side load balancing with caching
4. Tune circuit breaker thresholds, implement bulkheads to isolate failures
5. Use distributed tracing (Jaeger/Zipkin), centralized logging, and correlation IDs
