# Examples

## Example 1: React Native Component

```tsx
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

interface Item {
  id: string;
  title: string;
}

const DATA: Item[] = [{ id: "1", title: "First Item" }];

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  item: { padding: 10, fontSize: 18 },
});
```

## Example 2: React Navigation Stack

```tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```
