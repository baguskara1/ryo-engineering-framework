# Troubleshooting

## Common Issues

1. Component re-rendering too frequently
2. Stale closures in useEffect/event handlers
3. State updates not reflected immediately
4. Missing key prop in lists causing rendering bugs
5. Dependency array warnings in useEffect

## Solutions

1. Use `React.memo`, `useMemo`, `useCallback` to prevent unnecessary re-renders
2. Ensure proper dependency arrays, use `useRef` for mutable values
3. State updates are async; use `useEffect` to react to state changes
4. Always use stable unique keys (not array indices) for list items
5. Include all reactive values in dependency arrays or refactor to avoid the pattern
