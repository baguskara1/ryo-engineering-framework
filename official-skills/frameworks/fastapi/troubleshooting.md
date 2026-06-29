# Troubleshooting

## Common Issues

1. Pydantic validation errors not returning user-friendly messages
2. CORS errors when frontend calls the API
3. Async database sessions causing connection pool depletion
4. Dependency injection not resolving correctly
5. Slow response times for synchronous endpoints

## Solutions

1. Custom exception handlers with `@app.exception_handler(RequestValidationError)`
2. Add CORSMiddleware with proper `allow_origins` configuration
3. Use `async` database drivers (asyncpg) and manage session lifecycle with dependencies
4. Verify dependency functions are callables; use `Depends()` correctly
5. Use `async def` for I/O-bound endpoints; run CPU-bound tasks in thread pool
