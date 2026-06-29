# Troubleshooting

## Common Issues

1. Container exits immediately after start
2. Docker build cache invalidation
3. Permission denied errors when mounting volumes
4. Port conflicts on the host
5. Image size too large

## Solutions

1. Check CMD/ENTRYPOINT syntax and ensure the process runs in the foreground
2. Order Dockerfile instructions from least to most frequently changing layers
3. Use named volumes or ensure proper UID/GID mapping for bind mounts
4. Use `docker ps` to check used ports and remap with `-p` flag
5. Use multi-stage builds and `.dockerignore` to reduce image size
