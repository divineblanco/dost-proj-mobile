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
import { icon, scale, useResponsive, verticalScale } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface ActivityLogPayload {
  type: string;
  description?: string;
  user_id?: string;
}

type ItemProps = {
  icons: string;
  label: string;
  route: string;
  pathname: string;
  onPress: () => void;
  danger?: boolean;
};

function Item({
  icons,
  label,
  route,
  pathname,
  onPress,
  danger,
}: ItemProps) {
  const r = useResponsive();
  const styles = useMemo(() => drawerStyles(r), [r]);
  const isActive = pathname === route || pathname.startsWith(`${route}/`);

  if (danger) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.drawerItem, styles.logoutItem]}
        activeOpacity={0.8}
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
      activeOpacity={0.8}
    >
      <Ionicons
        name={
          (isActive
            ? icons
            : `${icons}-outline`) as keyof typeof Ionicons.glyphMap
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

// Partner logos are declared outside CustomDrawer to prevent remounting.
function PartnerLogos() {
  const logos = [
    {
      key: "nu",
      source: require("@/assets/images/NU_shield.png"),
      circular: true,
    },
    {
      key: "dost",
      source: require("@/assets/images/dost-logo-2.png"),
      circular: false,
    },
    {
      key: "pchrd",
      source: require("@/assets/images/dost-pchrd-2.png"),
      circular: false,
    },
  ];

  const bubbleSize = scale(42);

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: scale(8),
        paddingHorizontal: scale(4),
        paddingTop: scale(12),
        paddingBottom: scale(10),
        flexShrink: 0,
        backgroundColor: "transparent",
      }}
    >
      {logos.map((logo) => (
        <View
          key={logo.key}
          style={{
            width: bubbleSize,
            height: bubbleSize,
            borderRadius: logo.circular ? bubbleSize / 2 : scale(9),
            backgroundColor: "rgba(255,255,255,0.12)",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Image
            source={logo.source}
            style={{
              width: "80%",
              height: "80%",
            }}
            resizeMode="contain"
            fadeDuration={0}
          />
        </View>
      ))}
    </View>
  );
}

export default function CustomDrawer(
  _props: DrawerContentComponentProps
) {
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
    (edge) => edge.node.user_id === currentUserId
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
    try {
      if (token && currentUserId) {
        await logActivity({
          type: "LOGGED OUT",
          description: "User logged out of the application.",
          user_id: currentUserId,
        });
      }
    } catch (error) {
      console.error("[LOGOUT] Failed to create activity log:", error);
    } finally {
      await clearSession();
      router.replace("/");
    }
  };

  const renderAvatar = () => {
    if (isUserLoading) {
      return (
        <View
          style={[
            styles.profile,
            styles.avatarCenter,
            { backgroundColor: "#E5E7EB" },
          ]}
        >
          <ActivityIndicator size="small" color="#35408E" />
        </View>
      );
    }

    if (profileImageUrl) {
      return (
        <Image
          source={{ uri: profileImageUrl }}
          style={styles.profile}
          resizeMode="cover"
          onError={(event) =>
            console.error(
              "[DRAWER] Avatar failed to load:",
              event.nativeEvent
            )
          }
        />
      );
    }

    return (
      <ThemedView style={styles.profilePlaceholder}>
        <Ionicons name="person" size={icon(35)} color="#9A9A9A" />
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.drawerContainer}>
      {/* Drawer header */}
      <ThemedView style={styles.headerContainer}>
        <ThemedView style={styles.logoBG}>
          <Image
            source={require("@/assets/images/splash-icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </ThemedView>
        <ThemedText style={styles.headerTitle}>
          AdvocAid PH
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.line} />

      {/* Navigation items */}
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
          onPress={() =>
            router.push("/drawer/tabs/contributions/contribute")
          }
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

      {/* Bottom section: user information followed by partner logos */}
      <View
        style={{
          marginTop: verticalScale(35),
          width: "100%",
          flexShrink: 0,
          backgroundColor: "transparent",
        }}
      >
        <View style={styles.bottomDivider} />

        {/* User information row */}
        <ThemedView
          style={[
            styles.bottomContainer,
            {
              marginTop: 0,
              flexShrink: 0,
              minHeight: scale(60),
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => router.push("/drawer/tabs/profiles/profile")}
            activeOpacity={0.8}
          >
            {renderAvatar()}
          </TouchableOpacity>

          <ThemedView style={styles.userInfo}>
            <ThemedText style={styles.username} numberOfLines={1}>
              {firstName}
            </ThemedText>
            <ThemedText style={styles.userEmail} numberOfLines={1}>
              {role}
            </ThemedText>
          </ThemedView>

          <TouchableOpacity
            onPress={() => router.push("/drawer/tabs/setting/settings")}
            activeOpacity={0.7}
            style={styles.iconBtn}
          >
            <Ionicons
              name="settings-outline"
              size={22}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/drawer/tabs/notifications")}
            activeOpacity={0.7}
            style={styles.iconBtn}
          >
            <Ionicons
              name="notifications-outline"
              size={22}
              color="white"
            />
          </TouchableOpacity>
        </ThemedView>

        {/* Four partner logos beneath user information */}
        <PartnerLogos />
      </View>
    </ThemedView>
  );
}
