import * as SecureStore from "expo-secure-store";

export async function getStorageItem(key: string): Promise<string | null> {
  return SecureStore.getItemAsync(key);
}

export async function setStorageItem(
  key: string,
  value: string,
): Promise<void> {
  await SecureStore.setItemAsync(key, value);
}

export async function removeStorageItem(key: string): Promise<void> {
  await SecureStore.deleteItemAsync(key);
}
