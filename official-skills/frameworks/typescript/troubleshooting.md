# Troubleshooting

## Common Issues

1. Type errors when integrating with untyped JavaScript libraries
2. Strict null checks causing widespread errors
3. Generic type inference producing unexpected results
4. Module resolution errors with path aliases
5. Slow compilation times in large projects

## Solutions

1. Create declaration files (.d.ts) or use `@types/*` packages
2. Enable strict mode incrementally; use `// @ts-expect-error` sparingly
3. Provide explicit type parameters when inference fails; use `satisfies` keyword
4. Configure `paths` and `baseUrl` in tsconfig.json; use `es-module-specifier` resolution
5. Use project references, `skipLibCheck`, and incremental builds
