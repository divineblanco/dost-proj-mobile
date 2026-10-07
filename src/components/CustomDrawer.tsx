// import { useAuth } from "@/lib/auth/AuthProvider";
// import useFormMutation from "@/lib/hooks/useFormMutation";
// import useFormQuery from "@/lib/hooks/useFormQuery";
// import { UserByIdInterface } from "@/lib/interface/user/user.interface";
// import { drawerStyles } from "@/styles/navigation-styles";
// import { useResponsive } from "@/styles/responsive";
// import { Ionicons } from "@expo/vector-icons";
// import { DrawerContentComponentProps } from "@react-navigation/drawer";
// import { router, usePathname } from "expo-router";
// import { useMemo } from "react";
// import { Image, TouchableOpacity } from "react-native";
// import { ThemedText } from "./themed-text";
// import { ThemedView } from "./themed-view";

// interface ActivityLogPayload {
//   type: string;
//   description?: string;
//   user_id?: string;
// }

// export default function CustomDrawer(props: DrawerContentComponentProps) {
//   const pathname = usePathname();
//   const r = useResponsive();
//   const styles = useMemo(() => drawerStyles(r), [r]);
//   const { user, token, clearSession } = useAuth();
//   const currentUserId = String();

//   const { data: userResponse } = useFormQuery<UserByIdInterface>({
//     key: ["drawer-user", currentUserId],
//     url: `maintenance/users/`,
//     enabled: Boolean(user?.user_id && token),
//     headers: {
//       "x-api-key": "testing",
//       "x-api-version": "2026-02-26",
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//   });

//   const userDetails = userResponse?.data?.edges?.find(
//     (edge) => edge.node.user_id === user?.user_id
//   )?.node;

//   const firstName = userDetails?.Profile?.first_name || "First Name";
//   const role = userDetails?.role?.name || "General Public";

//   const { mutateAsync: logActivity } =
//     useFormMutation<ActivityLogPayload, unknown>({
//       key: ["activity-log", "logout"],
//       url: "maintenance/activity-logs",
//       method: "POST",
//       headers: {
//         "x-api-key": "testing",
//         "x-api-version": "2026-02-26",
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//     });

//   const handleLogout = async () => {
//     console.log("[LOGOUT] Logging out from Drawer...");
//     console.log("[LOGOUT] User ID:", user?.user_id);
//     console.log("[LOGOUT] Token exists:", Boolean(token));

//     try {
//       if (token && user?.user_id) {
//         await logActivity({
//           type: "LOGGED OUT",
//           description: "User logged out of the application.",
//           user_id: user.user_id,
//         });
//         console.log("[LOGOUT] Activity log created");
//       }
//     } catch (error) {
//       console.error("[LOGOUT] Failed to create activity log:", error);
//     } finally {
//       await clearSession();
//       console.log("[LOGOUT] Session cleared");
//       router.replace("/");
//     }
//   };

//   return (
//     <ThemedView style={styles.drawerContainer}>
//       <ThemedView style={styles.headerContainer}>
//         <ThemedView style={styles.logoBG}>
//           <Image
//             source={require("@/assets/images/splash-icon.png")}
//             style={styles.logo}
//           />
//         </ThemedView>

//         <ThemedText style={styles.headerTitle}>AdvocAid PH</ThemedText>
//       </ThemedView>

//       <ThemedView style={styles.line} />

//       <ThemedView style={styles.tabsContainer}>
//         <Item
//           icons="home"
//           label="Home"
//           route="/drawer/tabs/home"
//           pathname={pathname}
//           onPress={() => router.push("/drawer/tabs/home")}
//         />

//         <Item
//           icons="map"
//           label="Map"
//           route="/drawer/tabs/map"
//           pathname={pathname}
//           onPress={() => router.push("/drawer/tabs/map")}
//         />

//         <Item
//           icons="trending-up"
//           label="Trends"
//           route="/drawer/tabs/trend/trends"
//           pathname={pathname}
//           onPress={() => router.push("/drawer/tabs/trend/trends")}
//         />

//         <Item
//           icons="document-text"
//           label="Reports"
//           route="/drawer/tabs/reports"
//           pathname={pathname}
//           onPress={() => router.push("/drawer/tabs/reports")}
//         />

//         <Item
//           icons="chatbubble"
//           label="Contribute"
//           route="/drawer/tabs/contributions/contribute"
//           pathname={pathname}
//           onPress={() =>
//             router.push("/drawer/tabs/contributions/contribute")
//           }
//         />

//         <Item
//           icons="book"
//           label="Learn"
//           route="/drawer/tabs/learn/resources"
//           pathname={pathname}
//           onPress={() => router.push("/drawer/tabs/learn/resources")}
//         />

//         <Item
//           icons="star"
//           label="Rewards"
//           route="/drawer/tabs/rewards"
//           pathname={pathname}
//           onPress={() => router.push("/drawer/tabs/rewards")}
//         />

//         <Item
//           icons="exit"
//           label="Log Out"
//           route="/"
//           pathname={pathname}
//           danger
//           onPress={handleLogout}
//         />
//       </ThemedView>

//       <ThemedView style={styles.bottomContainer}>
//         <TouchableOpacity
//           onPress={() => router.push("/drawer/tabs/profiles/profile")}
//         >
//           <Image
//             source={require("@/assets/images/profile.jpg")}
//             style={styles.profile}
//           />
//         </TouchableOpacity>

//         <ThemedView style={styles.userInfo}>
//           <ThemedText style={styles.username}>
//             {firstName}
//           </ThemedText>

//           <ThemedText style={styles.userEmail}>
//             {role}
//           </ThemedText>
//         </ThemedView>

//         <Ionicons
//           name="settings"
//           size={25}
//           color="white"
//           onPress={() =>
//             router.push("/drawer/tabs/setting/settings")
//           }
//         />

//         <Ionicons
//           name="notifications"
//           size={25}
//           color="white"
//           onPress={() =>
//             router.push("/drawer/tabs/notifications")
//           }
//         />
//       </ThemedView>
//     </ThemedView>
//   );
// }

// type ItemProps = {
//   icons: string;
//   label: string;
//   route: string;
//   pathname: string;
//   onPress: () => void;
//   danger?: boolean;
// };

// function Item({
//   icons,
//   label,
//   route,
//   pathname,
//   onPress,
//   danger,
// }: ItemProps) {
//   const isActive =
//     pathname === route || pathname.startsWith(route + "/");

//   const r = useResponsive();
//   const styles = useMemo(() => drawerStyles(r), [r]);

//   if (danger) {
//     return (
//       <TouchableOpacity
//         onPress={onPress}
//         style={[
//           styles.drawerItem,
//           styles.logoutItem,
//         ]}
//       >
//         <Ionicons
//           name="log-out-outline"
//           size={25}
//           color="white"
//         />

//         <ThemedText
//           style={[
//             styles.label,
//             { color: "white" },
//           ]}
//         >
//           {label}
//         </ThemedText>
//       </TouchableOpacity>
//     );
//   }

//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={[
//         styles.drawerItem,
//         isActive && styles.activeDrawerItem,
//       ]}
//     >
//       <Ionicons
//         name={
//           (isActive
//             ? icons
//             : `${icons}-outline`) as keyof typeof Ionicons.glyphMap
//         }
//         size={25}
//         color={isActive ? "#35408E" : "white"}
//       />

//       <ThemedText
//         style={[
//           styles.label,
//           isActive && styles.activeLabel,
//         ]}
//       >
//         {label}
//       </ThemedText>
//     </TouchableOpacity>
//   );
// }


import { useAuth } from "@/lib/auth/AuthProvider";
import useFormMutation from "@/lib/hooks/useFormMutation";
import useFormQuery from "@/lib/hooks/useFormQuery";
import { UserByIdInterface } from "@/lib/interface/user/user.interface";
import { drawerStyles } from "@/styles/navigation-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import React, { useMemo } from "react";
import { ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface ActivityLogPayload {
  type: string;
  description?: string;
  user_id?: string;
}

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const pathname = usePathname();
  const r = useResponsive();
  const styles = useMemo(() => drawerStyles(r), [r]);
  const { user, token, clearSession } = useAuth();
  const currentUserId = user?.user_id;

  const { data: userResponse, isLoading: isUserLoading } =
    useFormQuery<UserByIdInterface>({
      key: ["drawer-user", currentUserId],
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
    (edge) => edge.node.user_id === currentUserId,
  )?.node;

  const firstName =
    userDetails?.Profile?.first_name ||
    user?.Profile?.first_name ||
    "First Name";

  const role =
    userDetails?.role?.name ||
    user?.Role?.name ||
    "General Public";

  const profileImageUrl =
    userDetails?.Profile?.image_url ||
    user?.Profile?.image_url ||
    null;

  console.log("[DRAWER] Current user ID:", currentUserId);
  console.log("[DRAWER] User details:", userDetails);
  console.log("[DRAWER] Profile:", userDetails?.Profile);
  console.log("[DRAWER] Avatar URL:", profileImageUrl);

  const { mutateAsync: logActivity } =
    useFormMutation<ActivityLogPayload, unknown>({
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
    console.log("[LOGOUT] Logging out from Drawer...");
    console.log("[LOGOUT] User ID:", currentUserId);
    console.log("[LOGOUT] Token exists:", Boolean(token));

    try {
      if (token && currentUserId) {
        await logActivity({
          type: "LOGGED OUT",
          description: "User logged out of the application.",
          user_id: currentUserId,
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

  return (
    <ThemedView style={styles.drawerContainer}>
      <ThemedView style={styles.headerContainer}>
        <ThemedView style={styles.logoBG}>
          <Image
            source={require("@/assets/images/splash-icon.png")}
            style={styles.logo}
          />
        </ThemedView>
        <ThemedText style={styles.headerTitle}>AdvocAid PH</ThemedText>
      </ThemedView>

      <ThemedView style={styles.line} />

      <ThemedView style={styles.tabsContainer}>
        <Item
          icons="home"
          label="Home"
          route="/drawer/tabs/home"
          pathname={pathname}
          onPress={() => router.push("/drawer/tabs/home")}
        />
        <Item
          icons="map"
          label="Map"
          route="/drawer/tabs/map"
          pathname={pathname}
          onPress={() => router.push("/drawer/tabs/map")}
        />
        <Item
          icons="trending-up"
          label="Trends"
          route="/drawer/tabs/trend/trends"
          pathname={pathname}
          onPress={() => router.push("/drawer/tabs/trend/trends")}
        />
        <Item
          icons="document-text"
          label="Reports"
          route="/drawer/tabs/reports"
          pathname={pathname}
          onPress={() => router.push("/drawer/tabs/reports")}
        />
        <Item
          icons="chatbubble"
          label="Contribute"
          route="/drawer/tabs/contributions/contribute"
          pathname={pathname}
          onPress={() => router.push("/drawer/tabs/contributions/contribute")}
        />
        <Item
          icons="book"
          label="Learn"
          route="/drawer/tabs/learn/resources"
          pathname={pathname}
          onPress={() => router.push("/drawer/tabs/learn/resources")}
        />
        <Item
          icons="star"
          label="Rewards"
          route="/drawer/tabs/rewards"
          pathname={pathname}
          onPress={() => router.push("/drawer/tabs/rewards")}
        />
        <Item
          icons="exit"
          label="Log Out"
          route="/"
          pathname={pathname}
          danger
          onPress={handleLogout}
        />
      </ThemedView>

      <ThemedView style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => router.push("/drawer/tabs/profiles/profile")}
          activeOpacity={0.8}
        >
          {isUserLoading ? (
            <ThemedView
              style={{
                width: styles.profile.width,
                height: styles.profile.height,
                borderRadius: Number(styles.profile.width) / 2,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#E5E7EB",
              }}
            >
              <ActivityIndicator size="small" color="#35408E" />
            </ThemedView>
          ) : profileImageUrl ? (
            <Image
              source={{ uri: profileImageUrl }}
              style={styles.profile}
              resizeMode="cover"
              onLoad={() =>
                console.log("[DRAWER] Avatar loaded:", profileImageUrl)
              }
              onError={(event) =>
                console.error(
                  "[DRAWER] Avatar failed to load:",
                  event.nativeEvent,
                )
              }
            />
          ) : (
            <ThemedView style={styles.profilePlaceholder}>
              <Ionicons name="person" size={icon(45)} color="#9A9A9A" />
            </ThemedView>
          )}
        </TouchableOpacity>

        <ThemedView style={styles.userInfo}>
          <ThemedText style={styles.username} numberOfLines={1}>
            {firstName}
          </ThemedText>
          <ThemedText style={styles.userEmail} numberOfLines={1}>
            {role}
          </ThemedText>
        </ThemedView>

        <Ionicons
          name="settings"
          size={25}
          color="white"
          onPress={() => router.push("/drawer/tabs/setting/settings")}
        />

        <Ionicons
          name="notifications"
          size={25}
          color="white"
          onPress={() => router.push("/drawer/tabs/notifications")}
        />
      </ThemedView>
    </ThemedView>
  );
}

type ItemProps = {
  icons: string;
  label: string;
  route: string;
  pathname: string;
  onPress: () => void;
  danger?: boolean;
};

function Item({ icons, label, route, pathname, onPress, danger }: ItemProps) {
  const r = useResponsive();
  const styles = useMemo(() => drawerStyles(r), [r]);
  const isActive = pathname === route || pathname.startsWith(`${route}/`);

  if (danger) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.drawerItem, styles.logoutItem]}
      >
        <Ionicons name="log-out-outline" size={25} color="white" />
        <ThemedText style={[styles.label, { color: "white" }]}>
          {label}
        </ThemedText>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.drawerItem, isActive && styles.activeDrawerItem]}
    >
      <Ionicons
        name={
          (isActive ? icons : `${icons}-outline`) as keyof typeof Ionicons.glyphMap
        }
        size={25}
        color={isActive ? "#35408E" : "white"}
      />
      <ThemedText style={[styles.label, isActive && styles.activeLabel]}>
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
}

