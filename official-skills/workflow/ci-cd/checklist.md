# Checklist

- [ ] Lint and format checks run on every commit
- [ ] Unit tests executed in CI pipeline
- [ ] Integration/end-to-end tests run on staging environment
- [ ] Build artifacts versioned and stored in artifact registry
- [ ] Secrets managed via CI/CD variables (not hardcoded)
- [ ] Pipeline includes security scanning (SAST, dependency scan)
- [ ] Deployment uses blue-green or canary strategy for zero downtime
- [ ] Rollback procedure defined and tested
- [ ] Cache configured to speed up dependency installation
- [ ] Pipeline triggers configured (push, PR, tags)
