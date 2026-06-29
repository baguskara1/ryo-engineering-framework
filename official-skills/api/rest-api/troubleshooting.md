# Troubleshooting

## Common Issues

1. Incorrect HTTP status codes returned
2. CORS errors from browser-based clients
3. Rate limiting too aggressive or too lenient
4. API versioning causing breaking changes
5. Pagination not working as expected

## Solutions

1. Use 200 for success, 201 for created, 400 for validation, 401 for auth, 404 for not found
2. Configure CORS with specific allowed origins; handle preflight OPTIONS requests
3. Set rate limits based on expected traffic; use token bucket or sliding window algorithm
4. Use URL prefix versioning (`/v1/`) or header-based; maintain backward compatibility
5. Use cursor-based pagination for consistency; document page/size limits in response
