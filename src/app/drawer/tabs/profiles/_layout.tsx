import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" />
      <Stack.Screen name="view-resources" />
      <Stack.Screen name="view-discussions" />
    </Stack>
  );
}