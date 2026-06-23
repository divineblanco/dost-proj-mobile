import { Stack } from "expo-router";

export default function ContributeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="resources" />
      <Stack.Screen name="resources-details" />
    </Stack>
  );
}