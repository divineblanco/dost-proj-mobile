import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { settingsStyles } from "@/styles/settings/settings-styles";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Href, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";

const PROFILE_INFO: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  path: Href;
}[] = [
  {
    label: "Name",
    value: "User's Name",
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
    value: "Lot 4 Block 2, Mahogany St., Brgy. Real, Calamba City, Laguna",
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

      const r = useResponsive();
            
      const styles = useMemo(() => settingsStyles(r), [r]);

  
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
                    size={icon(20)}
                    color="#35408E"
                  />

                  <ThemedView style={styles.infoColumn}>
                    <ThemedText 
                      style={styles.info} 
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item.value}
                    </ThemedText>

                    <ThemedText style={styles.label}>
                      {item.label}
                    </ThemedText>
                  </ThemedView>

                  <Ionicons name="chevron-forward" size={icon(20)} color="#35408E"/>
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