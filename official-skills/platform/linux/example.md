# Examples

## Example 1: Bash Backup Script

```bash
#!/bin/bash
BACKUP_DIR="/backup/$(date +%Y%m%d)"
mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_DIR/home.tar.gz" /home/
rsync -avz "$BACKUP_DIR" user@remote:/backups/
find /backup -type d -mtime +7 -exec rm -rf {} \;
```

## Example 2: systemd Service Unit

```ini
[Unit]
Description=My App Service
After=network.target

[Service]
Type=simple
User=appuser
WorkingDirectory=/opt/app
ExecStart=/usr/bin/node /opt/app/index.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```
