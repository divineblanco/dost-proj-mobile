import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      value={
        colorScheme === "dark"
          ? DarkTheme
          : DefaultTheme
      }
    >
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="auth" />
          <Stack.Screen
            name="drawer"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </QueryClientProvider>
    </ThemeProvider>
  );
}