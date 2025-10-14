// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Redirect, Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider, useAuth } from "./providers/auth";

export const unstable_settings = {
  // Keep tabs as the anchor (default entry)
  anchor: "(tabs)",
};

// Small component that enforces auth before rendering routes.
function AppGate() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // Wait while we restore user from storage
  if (loading) return null;

  const inAuthGroup = pathname.startsWith("/(auth)");
  const isAuthed = !!user;

  // Not signed in → push to Landing (unless we’re already in the auth group)
  if (!isAuthed && !inAuthGroup) {
    return <Redirect href="/(auth)/landing" />;
  }

  // Signed in but currently in auth routes → send to app
  if (isAuthed && inAuthGroup) {
    return <Redirect href="/(tabs)" />;
  }

  // Otherwise, just render current route tree
  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <AuthProvider>
      <ThemeProvider value={theme}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

        {/* Root navigator for the whole app */}
        <Stack
          screenOptions={{
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: "700" },
            animation: "slide_from_right",
          }}
        >
          {/* Tab navigator (Home/Explore) */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Auth flow group */}
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />

          {/* Standalone screens outside tabs */}
          <Stack.Screen name="company-detail" options={{ headerShown: false }} />
          <Stack.Screen name="new-company" options={{ title: "Add Company" }} />
          <Stack.Screen name="settings" options={{ title: "Settings" }} />
          <Stack.Screen name="company" options={{ title: "Company", headerBackTitle: "Back" }} />

          {/* Example modal route (optional) */}
          <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
        </Stack>

        {/* Auth guard (renders redirects when needed) */}
        <AppGate />
      </ThemeProvider>
    </AuthProvider>
  );
}
