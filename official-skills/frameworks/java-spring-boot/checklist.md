# Checklist

- [ ] Project generated with Spring Initializr with correct dependencies
- [ ] Controllers follow REST conventions with proper HTTP methods
- [ ] DTOs used for request/response instead of exposing entities
- [ ] Validation annotations on request DTOs (@NotBlank, @Email, etc.)
- [ ] Global exception handler with @ControllerAdvice
- [ ] Spring Security configured for authentication and authorization
- [ ] Application properties externalized per environment
- [ ] Unit tests with JUnit 5 and Mockito
- [ ] Integration tests with @SpringBootTest and TestContainers
- [ ] Actuator endpoints enabled for health checks and metrics
