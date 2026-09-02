import { AuthProvider } from "@/lib/auth/AuthProvider";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="otp" />
        </Stack>
    </AuthProvider>
  );
}