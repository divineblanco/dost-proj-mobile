// import DeleteAccountModal from "@/components/modals/delete-account";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { useAuth } from "@/lib/auth/AuthProvider";
// import useFormQuery from "@/lib/hooks/useFormQuery";
// import { UserByIdInterface } from "@/lib/interface/user/user.interface";
// import { font, icon, useResponsive } from "@/styles/responsive";
// import { settingsStyles } from "@/styles/settings/settings-styles";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { Href, useRouter } from "expo-router";
// import React, { useMemo, useState } from "react";
// import { Image, ScrollView, TouchableOpacity } from "react-native";

// interface ProfileInfoItem {
//   label: string;
//   value: string;
//   icon: keyof typeof Ionicons.glyphMap;
//   path: Href;
// }

// export default function ProfileSettings() {
//   const router = useRouter();
//   const r = useResponsive();
//   const styles = useMemo(() => settingsStyles(r), [r]);
//   const { user, token, isLoading: authLoading } = useAuth();

//   const [profileImage, setProfileImage] = useState(require("@/assets/images/profile.jpg"));
//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const currentUserId = user?.user_id;

//   const { data: userResponse, isLoading: isUserLoading } = useFormQuery<UserByIdInterface>({
//     key: ["users", currentUserId],
//     url: "maintenance/users/",
//     enabled: Boolean(currentUserId && token),
//     headers: {
//       "x-api-key": "testing",
//       "x-api-version": "2026-02-26",
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//   });

//   const userDetails = userResponse?.data?.edges?.find(
//     (edge) => edge.node.user_id === currentUserId
//   )?.node;

//   const firstName = userDetails?.Profile?.first_name || user?.Profile?.first_name || "First Name";
//   const lastName = userDetails?.Profile?.last_name || user?.Profile?.last_name || "Last Name";
//   const email = userDetails?.email || user?.email || "username@email.com";
//   const address = userDetails?.Profile?.location || "No Address Set";

//   const PROFILE_INFO: ProfileInfoItem[] = [
//     {
//       label: "Name",
//       value: `${firstName} ${lastName}`,
//       icon: "person-outline",
//       path: "/drawer/tabs/setting/profile/edit-username",
//     },
//     {
//       label: "Email",
//       value: email,
//       icon: "mail-outline",
//       path: "/drawer/tabs/setting/profile/edit-email",
//     },
//     {
//       label: "Address",
//       value: address,
//       icon: "location-outline",
//       path: "/drawer/tabs/setting/profile/edit-address",
//     },
//   ];

//   // const deleteMutation = useFormMutation({
//   //   key: ["DeleteAccount", currentUserId],
//   //   method: "DELETE",
//   //   url: `maintenance/users/${currentUserId}`,
//   // });

//   const pickImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (!permission.granted) {
//       alert("Permission to access gallery is required.");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ["images"],
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) setProfileImage({ uri: result.assets[0].uri });
//   };

//   // const handleDeleteAccount = () => {
//   //   if (!currentUserId) return;

//   //   deleteMutation.mutate(null, {
//   //     onSuccess: () => {
//   //       setDeleteModalVisible(false);
//   //       router.replace("/auth/login");
//   //     },
//   //     onError: (error) => {
//   //       console.error("[DELETE ACCOUNT] Error:", error);
//   //     },
//   //   });
//   // };

//   const handleDeleteAccount = () => {
//     setDeleteModalVisible(false);
//   }

//   if (authLoading || isUserLoading) {
//     return (
//       <ThemedView style={styles.pageContainer}>
//         <ThemedText>Loading...</ThemedText>
//       </ThemedView>
//     );
//   }

//   return (
//     <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent}>
//       <ThemedView>
//         <ThemedView style={styles.profileContainer}>
//           <ThemedView style={styles.imageShadow}>
//             <Image source={profileImage} style={styles.profileImg} />
//           </ThemedView>

//           <TouchableOpacity onPress={pickImage}>
//             <ThemedText style={styles.edit}>Edit Photo</ThemedText>
//           </TouchableOpacity>
//         </ThemedView>

//         <ThemedView style={styles.infoContainer}>
//           <ThemedView style={styles.profileInfoBG}>
//             {PROFILE_INFO.map((item, index) => (
//               <React.Fragment key={item.label}>
//                 <TouchableOpacity style={styles.infoRow} onPress={() => router.push(item.path)}>
//                   <Ionicons name={item.icon} size={icon(20)} color="#35408E" />

//                   <ThemedView style={styles.infoColumn}>
//                     <ThemedText style={styles.info} numberOfLines={1} ellipsizeMode="tail">
//                       {item.value}
//                     </ThemedText>
//                     <ThemedText style={styles.label}>{item.label}</ThemedText>
//                   </ThemedView>

//                   <Ionicons name="chevron-forward" size={icon(20)} color="#35408E" />
//                 </TouchableOpacity>

//                 {index !== PROFILE_INFO.length - 1 && <ThemedView style={styles.line} />}
//               </React.Fragment>
//             ))}
//           </ThemedView>
//         </ThemedView>

//         <ThemedView style={styles.infoContainer}>
//           <ThemedView style={[styles.profileInfoBG, {backgroundColor: "#E20000"}]}>
//             <TouchableOpacity style={styles.infoRow} onPress={() => setDeleteModalVisible(true)}>
//               <Ionicons name="trash-outline" size={icon(20)} color="white" />

//               <ThemedText style={[styles.info, { color: "white", lineHeight: font(18) }]}>
//                   Delete Account
//               </ThemedText>
//             </TouchableOpacity>
//           </ThemedView>
//         </ThemedView>

//         <DeleteAccountModal
//           visible={deleteModalVisible}
//           // loading={deleteMutation.isPending}
//           onCancel={() => setDeleteModalVisible(false)}
//           onConfirm={handleDeleteAccount}
//         />
//       </ThemedView>
//     </ScrollView>
//   );
// }

import DeleteAccountModal from "@/components/modals/delete-account";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormMutation from "@/lib/hooks/useFormMutation";
import useFormQuery from "@/lib/hooks/useFormQuery";
import { UserByIdInterface } from "@/lib/interface/user/user.interface";
import { font, icon, useResponsive } from "@/styles/responsive";
import { settingsStyles } from "@/styles/settings/settings-styles";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Href, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, TouchableOpacity } from "react-native";

interface ProfileInfoItem {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  path: Href;
}

interface ActivityLogPayload {
  type: string;
  description: string;
  user_id: string;
}

export default function ProfileSettings() {
  const router = useRouter();
  const responsive = useResponsive();
  const styles = useMemo(() => settingsStyles(responsive), [responsive]);
  const { user, token, isLoading: authLoading } = useAuth();
  const currentUserId = user?.user_id;

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const {
    data: userResponse,
    isLoading: isUserLoading,
    refetch: refetchUser,
  } = useFormQuery<UserByIdInterface>({
    key: ["users", currentUserId],
    url: "maintenance/users/",
    enabled: Boolean(currentUserId && token),
    headers: {
      "x-api-key": "testing",
      "x-api-version": "2026-02-26",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const userDetails = userResponse?.data?.edges?.find(
    (edge) => edge.node.user_id === currentUserId
  )?.node;

  useEffect(() => {
    setProfileImage(userDetails?.Profile?.image_url || null);
  }, [userDetails?.Profile?.image_url]);

  const firstName = userDetails?.Profile?.first_name || user?.Profile?.first_name || "First Name";
  const lastName = userDetails?.Profile?.last_name || user?.Profile?.last_name || "Last Name";
  const email = userDetails?.email || user?.email || "username@email.com";
  const address = userDetails?.Profile?.location || "No Address Set";

  const profileInfo: ProfileInfoItem[] = [
    {
      label: "Name",
      value: `${firstName} ${lastName}`,
      icon: "person-outline",
      path: "/drawer/tabs/setting/profile/edit-username",
    },
    {
      label: "Email",
      value: email,
      icon: "mail-outline",
      path: "/drawer/tabs/setting/profile/edit-email",
    },
    {
      label: "Address",
      value: address,
      icon: "location-outline",
      path: "/drawer/tabs/setting/profile/edit-address",
    },
  ];

  const {
    mutateAsync: uploadAvatar,
    isPending: isUploadingAvatar,
  } = useFormMutation<FormData, unknown>({
    key: ["user-avatar", currentUserId],
    url: `maintenance/users/${currentUserId}/avatar`,
    method: "PATCH",
    headers: {
      "x-api-key": "testing",
      "x-api-version": "2026-02-26",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const {
    mutateAsync: createActivityLog,
    isPending: isLoggingActivity,
  } = useFormMutation<ActivityLogPayload, unknown>({
    key: ["ActivityLog", "UpdateProfilePicture", currentUserId],
    method: "POST",
    url: "maintenance/activity-logs",
    params: {},
    headers: {
      "x-api-key": "testing",
      "x-api-version": "2026-02-26",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const pickImage = async () => {
    try {
      if (!currentUserId || !token) {
        Alert.alert("Not authenticated", "You must be logged in to update your profile picture.");
        return;
      }

      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission Required", "Permission to access your photos is required.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled || !result.assets?.[0]?.uri) return;

      const asset = result.assets[0];
      const fileName = asset.fileName || `avatar-${Date.now()}.jpg`;
      const mimeType = asset.mimeType || "image/jpeg";

      setProfileImage(asset.uri);

      const formData = new FormData();
      formData.append(
        "image_url",
        { uri: asset.uri, name: fileName, type: mimeType } as any
      );

      try {
        const response = await uploadAvatar(formData);

        const responseImageUrl =
          (response as any)?.image_url ||
          (response as any)?.data?.image_url ||
          (response as any)?.data?.data?.image_url;

        if (responseImageUrl) setProfileImage(responseImageUrl);

        const refreshed = await refetchUser();
        const refreshedUser = refreshed.data?.data?.edges?.find(
          (edge) => edge.node.user_id === currentUserId
        )?.node;

        const savedImage = refreshedUser?.Profile?.image_url;
        if (savedImage) setProfileImage(savedImage);

        try {
          await createActivityLog({
            type: "UPDATED PROFILE PICTURE",
            description: "User updated their profile picture.",
            user_id: currentUserId,
          });
        } catch (activityError: any) {
          console.error(
            "[AVATAR] ACTIVITY LOG FAILED:",
            activityError?.response?.data ?? activityError
          );
        }

        Alert.alert("Success", "Your profile picture has been updated.");
      } catch (error: any) {
        console.error("[AVATAR] UPLOAD FAILED:", error?.response?.data || error);

        setProfileImage(userDetails?.Profile?.image_url || null);

        const serverMessage =
          error?.response?.data?.data?.message ||
          error?.response?.data?.message ||
          error?.response?.data?.error;

        Alert.alert(
          "Upload Failed",
          serverMessage || "Unable to update your profile picture. Please try again."
        );
      }
    } catch (error) {
      console.error("[AVATAR] IMAGE PICKER FAILED:", error);
      setProfileImage(userDetails?.Profile?.image_url || null);
      Alert.alert("Error", "Unable to update your profile picture. Please try again.");
    }
  };

  const handleDeleteAccount = () => setDeleteModalVisible(false);
  const isBusy = isUploadingAvatar || isLoggingActivity;

  if (authLoading || isUserLoading) {
    return (
      <ThemedView style={styles.pageContainer}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView>
        <ThemedView style={styles.profileContainer}>
          <TouchableOpacity onPress={pickImage} disabled={isBusy} activeOpacity={0.8}>
            <ThemedView style={styles.imageShadow}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImg} />
              ) : (
                <ThemedView style={styles.profilePlaceholder}>
                  <Ionicons name="person" size={icon(45)} color="#9A9A9A" />
                </ThemedView>
              )}

              <ThemedView style={styles.editImageButton}>
                {isBusy ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Ionicons name="camera-outline" size={icon(17)} color="white" />
                )}
              </ThemedView>
            </ThemedView>
          </TouchableOpacity>

          <TouchableOpacity onPress={pickImage} disabled={isBusy}>
            <ThemedText style={styles.edit}>
              {isUploadingAvatar
                ? "Uploading..."
                : isLoggingActivity
                  ? "Recording..."
                  : profileImage
                    ? "Edit Photo"
                    : "Add Photo"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.infoContainer}>
          <ThemedView style={styles.profileInfoBG}>
            {profileInfo.map((item, index) => (
              <React.Fragment key={item.label}>
                <TouchableOpacity style={styles.infoRow} onPress={() => router.push(item.path)}>
                  <Ionicons name={item.icon} size={icon(20)} color="#35408E" />

                  <ThemedView style={styles.infoColumn}>
                    <ThemedText style={styles.info} numberOfLines={1} ellipsizeMode="tail">
                      {item.value}
                    </ThemedText>
                    <ThemedText style={styles.label}>{item.label}</ThemedText>
                  </ThemedView>

                  <Ionicons name="chevron-forward" size={icon(20)} color="#35408E" />
                </TouchableOpacity>

                {index < profileInfo.length - 1 && <ThemedView style={styles.line} />}
              </React.Fragment>
            ))}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.infoContainer}>
          <ThemedView style={[styles.profileInfoBG, { backgroundColor: "#E20000" }]}>
            <TouchableOpacity style={styles.infoRow} onPress={() => setDeleteModalVisible(true)}>
              <Ionicons name="trash-outline" size={icon(20)} color="white" />
              <ThemedText style={[styles.info, { color: "white", lineHeight: font(18) }]}>
                Delete Account
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        <DeleteAccountModal
          visible={deleteModalVisible}
          onCancel={() => setDeleteModalVisible(false)}
          onConfirm={handleDeleteAccount}
        />
      </ThemedView>
    </ScrollView>
  );
}
