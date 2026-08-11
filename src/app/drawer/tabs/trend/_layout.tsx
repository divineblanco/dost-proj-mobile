import { Stack } from "expo-router";

export default function ContributeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="trends" />
      <Stack.Screen name="view-trendspost" />
    </Stack>
  );
}