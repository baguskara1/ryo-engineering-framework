# Troubleshooting

## Common Issues

1. Routes not matching expected patterns
2. CORS errors when serving API to frontend
3. Body parser not working for JSON payloads
4. Async error handler not catching promise rejections
5. Memory leaks from unclosed database connections

## Solutions

1. Check route order (more specific routes first); use `router.param` for params
2. Use `cors` middleware with proper origin configuration
3. Ensure `express.json()` middleware is applied before route handlers
4. Wrap async handlers in a catch wrapper or use `express-async-errors`
5. Use connection pooling and close connections on `process.on('SIGTERM')`
