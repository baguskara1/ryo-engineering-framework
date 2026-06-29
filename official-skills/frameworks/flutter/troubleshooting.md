# Troubleshooting

## Common Issues

1. Hot reload not reflecting UI changes
2. Platform-specific code failing on the wrong platform
3. State not persisting after navigation
4. Build failures due to outdated dependencies
5. Scroll performance issues with complex layouts

## Solutions

1. Use hot restart for stateful changes; ensure widgets are not `const` blocked
2. Check platform conditionals with `Platform.isIOS` / `Platform.isAndroid`
3. Lift state to a parent widget or use state management solution (Riverpod/BLoC)
4. Run `flutter pub upgrade --major-versions` and fix breaking changes
5. Use `ListView.builder` for long lists; profile with DevTools
