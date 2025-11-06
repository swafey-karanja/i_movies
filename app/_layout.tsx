import '../global.css';

import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function Layout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' },
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
