import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Href, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const PROFILE_INFO: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  path: Href;
}[] = [
  {
    label: "Username",
    value: "Username",
    icon: "person-outline",
    path: "/drawer/tabs/setting/profile/edit-username",
  },
  {
    label: "Email",
    value: "username@email.com",
    icon: "mail-outline",
    path: "/drawer/tabs/setting/profile/edit-email",
  },
  {
    label: "Address",
    value: "Calamba, Laguna",
    icon: "location-outline",
    path: "/drawer/tabs/setting/profile/edit-address",
  },
];

export default function ProfileSettings() {

  const router = useRouter();

  const [profileImage, setProfileImage] = useState(
    require("@/assets/images/profile.jpg")
  );

  const pickImage = async () => {
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    alert("Permission to access gallery is required.");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    setProfileImage({
      uri: result.assets[0].uri,
    });
  }
  };

  
  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView>
        {/* Profile Picture */}
        <ThemedView style={styles.profileContainer}>
          <ThemedView style={styles.imageShadow}>
            <Image
              source={profileImage}
              style={styles.profileImg}
            />
          </ThemedView>

          <TouchableOpacity onPress={pickImage}>
            <ThemedText style={styles.edit}>
              Edit Photo
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Profile Information */}
        <ThemedView style={styles.infoContainer}>
          <ThemedView style={styles.profileInfoBG}>
            {PROFILE_INFO.map((item, index) => (
              <React.Fragment key={item.label}>
                <TouchableOpacity style={styles.infoRow} onPress={() => router.push(item.path)}>
                  <Ionicons
                    name={item.icon as keyof typeof Ionicons.glyphMap}
                    size={20}
                    color="#35408E"
                  />

                  <ThemedView style={styles.infoColumn}>
                    <ThemedText style={styles.info}>
                      {item.value}
                    </ThemedText>

                    <ThemedText style={styles.label}>
                      {item.label}
                    </ThemedText>
                  </ThemedView>

                  <Ionicons name="chevron-forward" size={20} color="#35408E"/>
                </TouchableOpacity>

                {index !== PROFILE_INFO.length - 1 && (
                  <ThemedView style={styles.line} />
                )}
              </React.Fragment>
            ))}
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
  },

  scrollContent: {
    paddingBottom: 95,
  },

  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    padding: 20,
  },

  profileImg: {
    width: 150,
    height: 150,
    borderRadius: 999,
  },

  imageShadow: {
    elevation: 3,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    borderRadius: 999,
  },

  edit: {
    textDecorationLine: "underline",
    fontWeight: "400",
  },

  infoContainer: {
    padding: 15,
  },

  profileInfoBG: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E0E4F0",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: "transparent",
  },

  infoColumn: {
    flex: 1,
    backgroundColor: "transparent",
  },

  info: {
    fontSize: 15,
    fontWeight: "800",
  },

  label: {
    fontSize: 14,
    fontWeight: "300",
    color: "#868686",
    marginTop: 2,
  },

  line: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 15,
  },
});