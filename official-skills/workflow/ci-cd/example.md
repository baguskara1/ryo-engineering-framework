# Examples

## Example 1: GitHub Actions CI Pipeline

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

## Example 2: Multi-Environment Deployment

```yaml
deploy-staging:
  runs-on: ubuntu-latest
  needs: [test]
  environment: staging
  steps:
    - run: echo "Deploying to staging..."
    # actual deployment steps

deploy-production:
  runs-on: ubuntu-latest
  needs: [deploy-staging]
  environment: production
  steps:
    - run: echo "Deploying to production..."
```
