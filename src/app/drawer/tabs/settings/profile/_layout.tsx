import { Stack } from "expo-router";

export default function ProfSettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="edit-username" />
      <Stack.Screen name="edit-email" />
      <Stack.Screen name="edit-address" />

    </Stack>
  );
}