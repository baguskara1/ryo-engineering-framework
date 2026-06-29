# Troubleshooting

## Common Issues

1. N+1 query problem causing performance issues
2. Deeply nested queries consuming too many resources
3. Mutations not returning expected data
4. Subscription connection dropping frequently
5. Schema stitching conflicts in federated architecture

## Solutions

1. Use DataLoader to batch and cache database requests per request context
2. Implement query depth limiting and complexity analysis to prevent abuse
3. Ensure mutation resolvers return the proper GraphQL type; use `return` correctly
4. Configure WebSocket keep-alive; use reliable transport (WebSocket/SSE)
5. Use Apollo Federation or proper schema composition; avoid type conflicts
