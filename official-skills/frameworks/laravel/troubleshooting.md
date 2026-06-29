# Troubleshooting

## Common Issues

1. 419 POST error (CSRF token mismatch)
2. Mass assignment exceptions when creating models
3. Queue jobs failing without clear error
4. Route caching breaking dynamic routes
5. Memory exhaustion on large collections

## Solutions

1. Include `@csrf` in Blade forms or set `X-CSRF-TOKEN` header for AJAX
2. Add fields to `$fillable` property in model or use `Model::unguard()`
3. Check `php artisan queue:failed` logs; validate job serialization
4. Clear route cache with `php artisan route:clear` after route changes
5. Use chunking (`Model::chunk()`) or lazy collections for large datasets
