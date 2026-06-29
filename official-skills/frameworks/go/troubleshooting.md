# Troubleshooting

## Common Issues

1. Circular imports between packages
2. Goroutine leaks causing memory growth
3. `go mod` dependency version conflicts
4. Error handling becoming verbose
5. Race conditions in concurrent code

## Solutions

1. Extract shared types into a common package; use interfaces to break cycles
2. Use `context.WithCancel` to signal goroutines to stop; track with `sync.WaitGroup`
3. Use `go mod tidy` and `go mod vendor`; specify `require` directives explicitly
4. Use early returns with error checks; use `errors.Is`/`errors.As` for wrapping
5. Use `go run -race` to detect races; protect shared state with `sync.Mutex` or channels
