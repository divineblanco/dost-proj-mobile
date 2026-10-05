// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { icon, useResponsive } from "@/styles/responsive";
// import { settingsStyles } from "@/styles/settings/settings-styles";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { Href, useRouter } from "expo-router";
// import React, { useMemo, useState } from "react";
// import {
//   Image,
//   ScrollView,
//   TouchableOpacity
// } from "react-native";

// const PROFILE_INFO: {
//   label: string;
//   value: string;
//   icon: keyof typeof Ionicons.glyphMap;
//   path: Href;
// }[] = [
//   {
//     label: "Name",
//     value: "User's Name",
//     icon: "person-outline",
//     path: "/drawer/tabs/setting/profile/edit-username",
//   },
//   {
//     label: "Email",
//     value: "username@email.com",
//     icon: "mail-outline",
//     path: "/drawer/tabs/setting/profile/edit-email",
//   },
//   {
//     label: "Address",
//     value: "Lot 4 Block 2, Mahogany St., Brgy. Real, Calamba City, Laguna",
//     icon: "location-outline",
//     path: "/drawer/tabs/setting/profile/edit-address",
//   },
// ];

// export default function ProfileSettings() {

//   const router = useRouter();

//   const [profileImage, setProfileImage] = useState(
//     require("@/assets/images/profile.jpg")
//   );

//   const pickImage = async () => {
//   const permission =
//     await ImagePicker.requestMediaLibraryPermissionsAsync();

//   if (!permission.granted) {
//     alert("Permission to access gallery is required.");
//     return;
//   }

//   const result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ["images"],
//     allowsEditing: true,
//     aspect: [1, 1],
//     quality: 1,
//   });

//   if (!result.canceled) {
//     setProfileImage({
//       uri: result.assets[0].uri,
//     });
//   }
//   };

//       const r = useResponsive();
            
//       const styles = useMemo(() => settingsStyles(r), [r]);

  
//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={styles.scrollContent}
//     >
//       <ThemedView>
//         {/* Profile Picture */}
//         <ThemedView style={styles.profileContainer}>
//           <ThemedView style={styles.imageShadow}>
//             <Image
//               source={profileImage}
//               style={styles.profileImg}
//             />
//           </ThemedView>

//           <TouchableOpacity onPress={pickImage}>
//             <ThemedText style={styles.edit}>
//               Edit Photo
//             </ThemedText>
//           </TouchableOpacity>
//         </ThemedView>

//         {/* Profile Information */}
//         <ThemedView style={styles.infoContainer}>
//           <ThemedView style={styles.profileInfoBG}>
//             {PROFILE_INFO.map((item, index) => (
//               <React.Fragment key={item.label}>
//                 <TouchableOpacity style={styles.infoRow} onPress={() => router.push(item.path)}>
//                   <Ionicons
//                     name={item.icon as keyof typeof Ionicons.glyphMap}
//                     size={icon(20)}
//                     color="#35408E"
//                   />

//                   <ThemedView style={styles.infoColumn}>
//                     <ThemedText 
//                       style={styles.info} 
//                       numberOfLines={1}
//                       ellipsizeMode="tail">
//                       {item.value}
//                     </ThemedText>

//                     <ThemedText style={styles.label}>
//                       {item.label}
//                     </ThemedText>
//                   </ThemedView>

//                   <Ionicons name="chevron-forward" size={icon(20)} color="#35408E"/>
//                 </TouchableOpacity>

//                 {index !== PROFILE_INFO.length - 1 && (
//                   <ThemedView style={styles.line} />
//                 )}
//               </React.Fragment>
//             ))}
//           </ThemedView>
//         </ThemedView>
//       </ThemedView>
//     </ScrollView>
//   );
// }
import DeleteAccountModal from "@/components/modals/delete-account";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormQuery from "@/lib/hooks/useFormQuery";
import { UserByIdInterface } from "@/lib/interface/user/user.interface";
import { font, icon, useResponsive } from "@/styles/responsive";
import { settingsStyles } from "@/styles/settings/settings-styles";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Href, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";

interface ProfileInfoItem {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  path: Href;
}

export default function ProfileSettings() {
  const router = useRouter();
  const r = useResponsive();
  const styles = useMemo(() => settingsStyles(r), [r]);
  const { user, token, isLoading: authLoading } = useAuth();

  const [profileImage, setProfileImage] = useState(require("@/assets/images/profile.jpg"));
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const currentUserId = user?.user_id;

  const { data: userResponse, isLoading: isUserLoading } = useFormQuery<UserByIdInterface>({
    key: ["users", currentUserId],
    url: "maintenance/users/",
    enabled: Boolean(currentUserId && token),
    headers: {
      "x-api-key": "testing",
      "x-api-version": "2026-02-26",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const userDetails = userResponse?.data?.edges?.find(
    (edge) => edge.node.user_id === currentUserId
  )?.node;

  const firstName = userDetails?.Profile?.first_name || user?.Profile?.first_name || "First Name";
  const lastName = userDetails?.Profile?.last_name || user?.Profile?.last_name || "Last Name";
  const email = userDetails?.email || user?.email || "username@email.com";
  const address = userDetails?.Profile?.location || "No Address Set";

  const PROFILE_INFO: ProfileInfoItem[] = [
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

  // const deleteMutation = useFormMutation({
  //   key: ["DeleteAccount", currentUserId],
  //   method: "DELETE",
  //   url: `maintenance/users/${currentUserId}`,
  // });

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

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

    if (!result.canceled) setProfileImage({ uri: result.assets[0].uri });
  };

  // const handleDeleteAccount = () => {
  //   if (!currentUserId) return;

  //   deleteMutation.mutate(null, {
  //     onSuccess: () => {
  //       setDeleteModalVisible(false);
  //       router.replace("/auth/login");
  //     },
  //     onError: (error) => {
  //       console.error("[DELETE ACCOUNT] Error:", error);
  //     },
  //   });
  // };

  const handleDeleteAccount = () => {
    setDeleteModalVisible(false);
  }

  if (authLoading || isUserLoading) {
    return (
      <ThemedView style={styles.pageContainer}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent}>
      <ThemedView>
        <ThemedView style={styles.profileContainer}>
          <ThemedView style={styles.imageShadow}>
            <Image source={profileImage} style={styles.profileImg} />
          </ThemedView>

          <TouchableOpacity onPress={pickImage}>
            <ThemedText style={styles.edit}>Edit Photo</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.infoContainer}>
          <ThemedView style={styles.profileInfoBG}>
            {PROFILE_INFO.map((item, index) => (
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

                {index !== PROFILE_INFO.length - 1 && <ThemedView style={styles.line} />}
              </React.Fragment>
            ))}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.infoContainer}>
          <ThemedView style={[styles.profileInfoBG, {backgroundColor: "#E20000"}]}>
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
          // loading={deleteMutation.isPending}
          onCancel={() => setDeleteModalVisible(false)}
          onConfirm={handleDeleteAccount}
        />
      </ThemedView>
    </ScrollView>
  );
}
