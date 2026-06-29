# Troubleshooting

## Common Issues

1. Bean definition conflicts causing application startup failure
2. Hibernate lazy initialization exceptions in serialization
3. Circular dependency injection errors
4. Security filter chain configuration issues
5. Database connection pool exhaustion

## Solutions

1. Use `@Primary` or `@Qualifier` to disambiguate beans; check component scanning
2. Use `@JsonIgnore` or DTOs to avoid serializing lazy proxies; enable `spring.jpa.open-in-view=false`
3. Refactor to use setter injection or `@Lazy` annotation for one direction
4. Debug with `logging.level.org.springframework.security=DEBUG`; check filter ordering
5. Tune `spring.datasource.hikari.*` properties; use connection pooling monitoring
