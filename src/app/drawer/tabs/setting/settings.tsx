// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { icon, useResponsive } from "@/styles/responsive";
// import { settingsStyles } from "@/styles/settings/settings-styles";
// import {
//   Feather,
//   Ionicons,
//   Octicons,
// } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import React, { useMemo } from "react";
// import {
//   ScrollView,
//   TouchableOpacity
// } from "react-native";

// const SETTINGS = [
//   {
//     title: "Profile Settings",
//     iconLibrary: "Ionicons",
//     icon: "person-outline",
//     route: "/drawer/tabs/setting/profile-settings",
//   },
//   {
//     title: "Activity Log",
//     iconLibrary: "Feather",
//     icon: "activity",
//     route: "/drawer/tabs/setting/activity-log",
//   },
//   {
//     title: "Device Sessions",
//     iconLibrary: "Octicons",
//     icon: "devices",
//     route: "/drawer/tabs/setting/device-sessions",
//   },
//   {
//     title: "Language",
//     iconLibrary: "Ionicons",
//     icon: "language",
//     route: "/drawer/tabs/setting/language",
//   },
//   {
//     title: "Appearance",
//     iconLibrary: "Ionicons",
//     icon: "moon-outline",
//     route: "/drawer/tabs/setting/appearance",
//   },
//   {
//     title: "Help",
//     iconLibrary: "Feather",
//     icon: "help-circle",
//     route: "/drawer/tabs/setting/help",
//   },
//   {
//     title: "About",
//     iconLibrary: "Feather",
//     icon: "info",
//     route: "/drawer/tabs/setting/about",
//   },
//   {
//     title: "Log Out",
//     iconLibrary: "Ionicons",
//     icon: "log-out-outline",
//     route: "/",
//     logout: true,
//   },
// ];

// export default function Settings() {
//   const router = useRouter();

//   const renderIcon = (item: (typeof SETTINGS)[number]) => {
//     const color = item.logout ? "#E20000" : "#35408E";

//     switch (item.iconLibrary) {
//       case "Feather":
//         return (
//           <Feather
//             name={item.icon as keyof typeof Feather.glyphMap}
//             size={icon(18)}
//             color={color}
//           />
//         );

//       case "Octicons":
//         return (
//           <Octicons
//             name={item.icon as keyof typeof Octicons.glyphMap}
//             size={icon(18)}
//             color={color}
//           />
//         );

//       default:
//         return (
//           <Ionicons
//             name={item.icon as keyof typeof Ionicons.glyphMap}
//             size={icon(18)}
//             color={color}
//           />
//         );
//     }
//   };

//       const r = useResponsive();
            
//       const styles = useMemo(() => settingsStyles(r), [r]);

//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={styles.scrollContent}
//     >
//       <ThemedView style={styles.container}>
//         {SETTINGS.map((item) => (
//           <TouchableOpacity
//             key={item.title}
//             style={styles.tabContainer}
//             activeOpacity={0.7}
//             onPress={() =>
//               item.logout
//                 ? router.replace("/")
//                 : router.push(item.route as any)
//             }
//           >
//             <ThemedView style={styles.tab}>
//               {renderIcon(item)}

//               <ThemedText
//                 style={
//                   item.logout
//                     ? styles.tabLogout
//                     : styles.tabText
//                 }
//               >
//                 {item.title}
//               </ThemedText>
//             </ThemedView>

//             {!item.logout && (
//               <Ionicons
//                 name="chevron-forward"
//                 size={icon(18)}
//                 color="#35408E"
//                 style={styles.tabIcon}
//               />
//             )}
//           </TouchableOpacity>
//         ))}
//       </ThemedView>
//     </ScrollView>
//   );
// }

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormMutation from "@/lib/hooks/useFormMutation";
import { icon, useResponsive } from "@/styles/responsive";
import { settingsStyles } from "@/styles/settings/settings-styles";
import { Feather, Ionicons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

const SETTINGS = [
  { title: "Profile Settings", iconLibrary: "Ionicons", icon: "person-outline", route: "/drawer/tabs/setting/profile-settings" },
  { title: "Activity Log", iconLibrary: "Feather", icon: "activity", route: "/drawer/tabs/setting/activity-log" },
  { title: "Device Sessions", iconLibrary: "Octicons", icon: "devices", route: "/drawer/tabs/setting/device-sessions" },
  { title: "Language", iconLibrary: "Ionicons", icon: "language", route: "/drawer/tabs/setting/language" },
  { title: "Appearance", iconLibrary: "Ionicons", icon: "moon-outline", route: "/drawer/tabs/setting/appearance" },
  { title: "Help", iconLibrary: "Feather", icon: "help-circle", route: "/drawer/tabs/setting/help" },
  { title: "About", iconLibrary: "Feather", icon: "info", route: "/drawer/tabs/setting/about" },
  { title: "Log Out", iconLibrary: "Ionicons", icon: "log-out-outline", route: "/", logout: true },
];

interface ActivityLogPayload {
  type: string;
  description?: string;
  user_id?: string;
}

export default function Settings() {
  const router = useRouter();
  const r = useResponsive();
  const styles = useMemo(() => settingsStyles(r), [r]);
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
    console.log("[LOGOUT] Logging out from Settings...");
    console.log("[LOGOUT] User ID:", user?.user_id);
    console.log("[LOGOUT] Token exists:", Boolean(token));

    try {
      if (token && user?.user_id) {
        await logActivity({
          type: "LOGGED OUT",
          description: "User logged out of the application.",
          user_id: user.user_id,
        });
        console.log("[LOGOUT] Activity log created");
      }
    } catch (error) {
      console.error("[LOGOUT] Failed to create activity log:", error);
    } finally {
      await clearSession();
      console.log("[LOGOUT] Session cleared");
      router.replace("/");
    }
  };

  const renderIcon = (item: (typeof SETTINGS)[number]) => {
    const color = item.logout ? "#E20000" : "#35408E";

    switch (item.iconLibrary) {
      case "Feather":
        return <Feather name={item.icon as keyof typeof Feather.glyphMap} size={icon(18)} color={color} />;
      case "Octicons":
        return <Octicons name={item.icon as keyof typeof Octicons.glyphMap} size={icon(18)} color={color} />;
      default:
        return <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={icon(18)} color={color} />;
    }
  };

  return (
    <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent}>
      <ThemedView style={styles.container}>
        {SETTINGS.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={styles.tabContainer}
            activeOpacity={0.7}
            onPress={() => item.logout ? handleLogout() : router.push(item.route as any)}
          >
            <ThemedView style={styles.tab}>
              {renderIcon(item)}
              <ThemedText style={item.logout ? styles.tabLogout : styles.tabText}>{item.title}</ThemedText>
            </ThemedView>

            {!item.logout && (
              <Ionicons name="chevron-forward" size={icon(18)} color="#35408E" style={styles.tabIcon} />
            )}
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ScrollView>
  );
}
