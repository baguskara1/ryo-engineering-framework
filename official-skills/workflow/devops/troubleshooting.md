# Troubleshooting

## Common Issues

1. Infrastructure state drift between environments
2. Monitoring alerts too noisy with false positives
3. Terraform state lock conflicts in team environments
4. Configuration management idempotency issues
5. Secrets leaked in infrastructure code repositories

## Solutions

1. Use Terraform plan before apply, implement drift detection in CI/CD
2. Tune alert thresholds, use alert aggregation and silencing rules
3. Use remote state locking (S3+DynamoDB, Terraform Cloud)
4. Test playbooks/modules in CI, ensure idempotent resource definitions
5. Use secret scanning tools (git-secrets, trufflehog), never commit secrets
