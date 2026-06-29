# Checklist

- [ ] .NET SDK version specified in `global.json`
- [ ] Controllers use attribute routing with `[ApiController]`
- [ ] Services registered in DI container with appropriate lifetime
- [ ] EF Core context configured with connection string from config
- [ ] Migrations generated for model changes
- [ ] Logging configured with structured logging (Serilog)
- [ ] Health checks endpoint exposed
- [ ] Swagger/OpenAPI configured for API documentation
- [ ] Unit tests with xUnit and Moq/FakeItEasy
- [ ] `appsettings.json` environment-based configuration
