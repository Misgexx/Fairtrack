import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  // Keep tabs as the anchor (default entry)
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={theme}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: '700' },
          animation: 'slide_from_right',
        }}
      >
        {/* Tab navigator (Home/Explore). Header hidden so we can design our own top bar on Home */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Standalone screens outside tabs */}
        <Stack.Screen
          name="company"
          options={{
            title: 'Company',
            headerBackTitle: 'Back',
          }}
        />

        {/* Example modal route (you can remove if unused) */}
        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal', title: 'Modal' }}
        />
      </Stack>
    </ThemeProvider>
  );
}
