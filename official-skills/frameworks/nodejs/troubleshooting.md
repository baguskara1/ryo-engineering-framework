# Troubleshooting

## Common Issues

1. Memory leaks in long-running processes
2. Callback hell leading to unreadable code
3. Unhandled promise rejections crashing the app
4. npm dependency version conflicts
5. Event loop blocking due to CPU-intensive tasks

## Solutions

1. Use heap snapshots and profiling tools; avoid global variables and closures
2. Use async/await instead of callbacks; use Promise.all for concurrency
3. Add `process.on('unhandledRejection', handler)` to catch and log rejections
4. Use `npm ls` to diagnose conflicts; lock versions in package.json
5. Offload CPU work to Worker Threads or child processes
