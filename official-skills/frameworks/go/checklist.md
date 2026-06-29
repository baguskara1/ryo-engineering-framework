# Checklist

- [ ] Project follows standard Go project layout conventions
- [ ] Packages have clear, single responsibilities
- [ ] Interfaces defined where abstraction is needed
- [ ] Error handling uses wrapping with `fmt.Errorf("context: %w", err)`
- [ ] Tests written with `testing` package and table-driven tests
- [ ] `go vet` and `golangci-lint` run in CI
- [ ] Concurrency uses goroutines + channels or `sync` package correctly
- [ ] Context propagated through call chains for cancellation
- [ ] HTTP server has graceful shutdown handling
- [ ] Module path matches repository URL in `go.mod`
