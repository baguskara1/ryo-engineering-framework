# Troubleshooting

## Common Issues

1. NuGet package version conflicts
2. EF Core migration errors after model changes
3. JSON serialization circular reference errors
4. CORS policy not allowing frontend requests
5. ASP.NET Core environment not loading correct config

## Solutions

1. Use `dotnet list package --vulnerable` and check transitive dependencies
2. Revert and re-create migration: `dotnet ef migrations remove` then `dotnet ef migrations add`
3. Configure `ReferenceHandler.IgnoreCycles` in JSON serializer options
4. Add `WithOrigins()` with specific frontend URL in `Program.cs` CORS config
5. Check `ASPNETCORE_ENVIRONMENT` variable; verify `appsettings.{env}.json` exists
