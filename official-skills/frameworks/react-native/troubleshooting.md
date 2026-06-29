# Troubleshooting

## Common Issues

1. Metro bundler not starting or resolving modules
2. Native build failures after dependency installation
3. iOS Pod installation conflicts
4. Performance issues with FlatList rendering
5. Keyboard avoiding view not working properly

## Solutions

1. Clear Metro cache: `npx react-native start --reset-cache`; check import paths
2. Run `cd ios && pod install && cd ..`; clean build: `npx react-native clean-build`
3. Update Podfile, run `pod repo update` then `pod install`
4. Use `getItemLayout`, `windowSize`, and `removeClippedSubviews` props on FlatList
5. Wrap screen in `KeyboardAvoidingView` with `behavior` prop set to `padding`
