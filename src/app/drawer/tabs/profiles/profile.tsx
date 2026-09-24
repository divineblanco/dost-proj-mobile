// import BadgeCard from "@/components/cards/badge-card";
// import ResourcesDownload from "@/components/cards/downloaded-resources";
// import MyDiscussions from "@/components/cards/my-discussions";
// import { SurveyCard } from "@/components/cards/profile-survey";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { useAuth } from '@/lib/auth/AuthProvider';
// import { profileStyles } from "@/styles/profile/profile-styles";
// import { icon, useResponsive } from "@/styles/responsive";
// import { Feather, Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React, { useMemo } from "react";
// import {
//   Image,
//   ScrollView,
//   TouchableOpacity
// } from "react-native";

// export default function Profile() {

//   const r = useResponsive();
        
//   const styles = useMemo(() => profileStyles(r), [r]);

//   const { clearSession } = useAuth();

// // const handleLogout = async () => {
// //   console.log("[LOGOUT] Logging out...");

// //   await clearSession();

// //   console.log("[LOGOUT] Session cleared");
// //   console.log("[LOGOUT] Navigating to login...");

// //   router.replace("/auth/login");
// // };

// const handleLogout = async () => {
//   console.log("[LOGOUT] Logging out...");

//   await clearSession();

//   console.log("[LOGOUT] Session cleared");
// };



  
//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={styles.scrollContent}
//     >
//       <ThemedView>
//         <ThemedView style={styles.headerContainer}>
//           <TouchableOpacity onPress={() => router.push("/drawer/tabs/setting/settings")}>
//             <Feather
//             name="settings"
//             size={icon(20)}
//             color="#35408E"
//             style={styles.settings}
//           />
//           </TouchableOpacity>

//           <ThemedView style={styles.profileContainer}>
            
//             <ThemedView style={{alignItems: "center"}}>
//               <ThemedView style={styles.imageShadow}>
//                <Image
//                 source={require("@/assets/images/profile.jpg")}
//                 style={styles.profileImg}
//               />
//               </ThemedView>
//               <ThemedView style={styles.levelBadge}>
//                   <ThemedText style={styles.levelText}>
//                     Advocate
//                   </ThemedText>
//                 </ThemedView>
//             </ThemedView>

//             <ThemedView style={styles.profileInfo}>
//               <ThemedView style={styles.nameRow}>
//                 <ThemedText style={styles.userName}>
//                   First Name
//                 </ThemedText>
//               </ThemedView>

//               {/* Fix this when Organization is the Role, show the name of Org "(Name of Org)" */}
//               <ThemedText style={styles.role}>
//                 General Public
//               </ThemedText>

//               <ThemedView style={styles.infoRow}>
//                 <Ionicons
//                   name="location-outline"
//                   size={icon(15)}
//                   color="#6a6a6dd6"
//                 />
//                 <ThemedText style={styles.infoText}>
//                   Calamba, Laguna
//                 </ThemedText>
//               </ThemedView>

//               <ThemedView style={styles.infoRow}>
//                 <Ionicons
//                   name="calendar-clear-outline"
//                   size={icon(15)}
//                   color="#6a6a6dd6"
//                 />
//                 <ThemedText style={styles.infoText}>
//                   Member since May 25, 2026
//                 </ThemedText>
//               </ThemedView>
//             </ThemedView>
//           </ThemedView>
//         </ThemedView>


//         <ThemedView style={styles.moreContainer}>
//           <BadgeCard returnTo="/drawer/tabs/profiles/profile" />
//           <ResourcesDownload/>
//           <MyDiscussions/>
//           <SurveyCard/>

//           <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//             <Ionicons name="exit-outline" size={icon(25)} color="white"/>
//             <ThemedText style={styles.logoutTxt}>Log Out</ThemedText>
//           </TouchableOpacity>
//         </ThemedView>

//       </ThemedView>
//     </ScrollView>
//   );
// }

import BadgeCard from "@/components/cards/badge-card";
import ResourcesDownload from "@/components/cards/downloaded-resources";
import MyDiscussions from "@/components/cards/my-discussions";
import { SurveyCard } from "@/components/cards/profile-survey";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormMutation from "@/lib/hooks/useFormMutation";
import { profileStyles } from "@/styles/profile/profile-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";

interface ActivityLogPayload {
  type: string;
  description?: string;
  user_id?: string;
}

export default function Profile() {
  const r = useResponsive();
  const styles = useMemo(() => profileStyles(r), [r]);
  const { user, token, clearSession } = useAuth();

  const { mutateAsync: logActivity } = useFormMutation<ActivityLogPayload, unknown>({
    key: ["activity-log", "logout"],
    url: "maintenance/activity-logs",
    method: "POST",
    headers: {
      "x-api-key": "testing",
      "x-api-version": "2026-02-26",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const handleLogout = async () => {
    console.log("[LOGOUT] Logging out...");
    console.log("[LOGOUT] Current user:", JSON.stringify(user, null, 2));
    console.log("[LOGOUT] Token exists:", Boolean(token));

    try {
      await logActivity({
        type: "LOGGED OUT",
        description: "User logged out of the application.",
        user_id: user?.user_id,
      });

      console.log("[LOGOUT] Activity log created");
    } catch (error) {
      console.error("[LOGOUT] Failed to create activity log:", error);
    }

    await clearSession();
    console.log("[LOGOUT] Session cleared");
  };

  return (
    <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent}>
      <ThemedView>
        <ThemedView style={styles.headerContainer}>
          <TouchableOpacity onPress={() => router.push("/drawer/tabs/setting/settings")}>
            <Feather name="settings" size={icon(20)} color="#35408E" style={styles.settings} />
          </TouchableOpacity>

          <ThemedView style={styles.profileContainer}>
            <ThemedView style={{ alignItems: "center" }}>
              <ThemedView style={styles.imageShadow}>
                <Image source={require("@/assets/images/profile.jpg")} style={styles.profileImg} />
              </ThemedView>
              <ThemedView style={styles.levelBadge}>
                <ThemedText style={styles.levelText}>Advocate</ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.profileInfo}>
              <ThemedView style={styles.nameRow}>
                <ThemedText style={styles.userName}>
                  {user?.Profile?.first_name || "First Name"}
                </ThemedText>
              </ThemedView>

              <ThemedText style={styles.role}>
                {user?.Role?.name || "General Public"}
              </ThemedText>

              <ThemedView style={styles.infoRow}>
                <Ionicons name="location-outline" size={icon(15)} color="#6a6a6dd6" />
                <ThemedText style={styles.infoText}>Calamba, Laguna</ThemedText>
              </ThemedView>

              <ThemedView style={styles.infoRow}>
                <Ionicons name="calendar-clear-outline" size={icon(15)} color="#6a6a6dd6" />
                <ThemedText style={styles.infoText}>Member since May 25, 2026</ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.moreContainer}>
          <BadgeCard returnTo="/drawer/tabs/profiles/profile" />
          <ResourcesDownload />
          <MyDiscussions />
          <SurveyCard />

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="exit-outline" size={icon(25)} color="white" />
            <ThemedText style={styles.logoutTxt}>Log Out</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}
