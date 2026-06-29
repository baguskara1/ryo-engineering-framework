# Troubleshooting

## Common Issues

1. Disk space full causing service failures
2. Process consuming 100% CPU
3. Network connectivity issues
4. Permission denied errors despite correct ownership
5. Out of memory (OOM) killer terminating processes

## Solutions

1. Use `df -h` and `du -sh /* | sort -rh` to find large files; clean logs and temp files
2. Use `top` or `htop` to find process; use `perf` or `strace` to diagnose
3. Check `ping`, `traceroute`, `ss -tlnp`, and firewall rules with `iptables -L`
4. Check ACLs with `getfacl`; SELinux context with `ls -Z`; verify with `audit2why`
5. Check `dmesg | grep -i oom`; adjust `vm.overcommit_memory` or add swap
