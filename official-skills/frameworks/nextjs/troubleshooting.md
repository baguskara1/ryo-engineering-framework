# Troubleshooting

## Common Issues

1. Static generation not reflecting dynamic data
2. Client/server component mismatch errors
3. Image optimization failing for external URLs
4. API routes not accessible in production
5. Build time too long for static pages

## Solutions

1. Use `revalidate` or `dynamic` export to control regeneration behavior
2. Ensure "use client" directive is added for interactive components; import server components directly
3. Configure `remotePatterns` in `next.config.js` for external image sources
4. Verify API routes are in `app/api/` directory; check middleware is not blocking
5. Use Incremental Static Regeneration (ISR) or switch to server-side rendering
