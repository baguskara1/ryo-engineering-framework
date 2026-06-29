# Checklist

- [ ] Dockerfile uses specific base image tags (not `latest`)
- [ ] Multi-stage builds used to minimize final image size
- [ ] `.dockerignore` configured to exclude unnecessary files
- [ ] Containers run as non-root user
- [ ] Health checks defined for production services
- [ ] Compose file uses named volumes for persistent data
- [ ] Secrets managed via Docker secrets or env files (not hardcoded)
- [ ] Image scanned for vulnerabilities before deployment
- [ ] Resource limits set on containers (CPU/memory)
- [ ] Container logs configured with appropriate logging driver
