import AsyncStorage from "@react-native-async-storage/async-storage";
import { File } from "expo-file-system";

const DOWNLOADED_RESOURCES_KEY = "@advocaid_downloaded_resources";

export type DownloadedResource = {
  id: string;
  title: string;
  description: string;
  label: string;
  materialType: string;
  category: "Reports" | "Educational Materials";
  content?: string;
  fileUri: string;
  downloadedAt: string;
  userId: string;
};

const getUserKey = (userId: string) =>
  `${DOWNLOADED_RESOURCES_KEY}_${userId}`;

export async function getDownloadedResources(
  userId: string
): Promise<DownloadedResource[]> {
  try {
    if (!userId) return [];

    const stored =
      await AsyncStorage.getItem(getUserKey(userId));

    if (!stored) return [];

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed)
      ? parsed.filter(
          item =>
            String(item.userId) === String(userId)
        )
      : [];
  } catch (error) {
    console.error(
      "[DOWNLOADED RESOURCES] Failed to load:",
      error
    );
    return [];
  }
}

export async function saveDownloadedResource(
  resource: DownloadedResource
): Promise<void> {
  try {
    if (!resource.userId) {
      throw new Error("userId is required.");
    }

    const existing =
      await getDownloadedResources(resource.userId);

    const filtered = existing.filter(
      item => item.id !== resource.id
    );

    await AsyncStorage.setItem(
      getUserKey(resource.userId),
      JSON.stringify([resource, ...filtered])
    );
  } catch (error) {
    console.error(
      "[DOWNLOADED RESOURCES] Failed to save:",
      error
    );
    throw error;
  }
}

export async function removeDownloadedResource(
  userId: string,
  resourceId: string
): Promise<void> {
  try {
    if (!userId) return;

    const existing = await getDownloadedResources(userId);

    const resource = existing.find(
      item => item.id === resourceId
    );

    if (resource?.fileUri) {
      try {
        const file = new File(resource.fileUri);

        if (file.exists) {
          file.delete();
        }
      } catch (fileError) {
        console.error(
          "[DOWNLOADED RESOURCES] Failed to delete file:",
          fileError
        );
      }
    }

    const updated = existing.filter(
      item => item.id !== resourceId
    );

    await AsyncStorage.setItem(
      `${DOWNLOADED_RESOURCES_KEY}_${userId}`,
      JSON.stringify(updated)
    );
  } catch (error) {
    console.error(
      "[DOWNLOADED RESOURCES] Failed to remove:",
      error
    );
    throw error;
  }
}

