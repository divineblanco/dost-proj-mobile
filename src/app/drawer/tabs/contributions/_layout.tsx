import { Stack } from "expo-router";

export default function ContributeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="contribute" />
      <Stack.Screen name="add-contribute" />
      <Stack.Screen name="report-misinfo" />
    </Stack>
  );
}