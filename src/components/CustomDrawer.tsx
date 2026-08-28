import { drawerStyles } from "@/styles/navigation-styles";
import { useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import { useMemo } from "react";
import { Image, TouchableOpacity } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const pathname = usePathname();
    const r = useResponsive();
  
    const styles = useMemo(
        () => drawerStyles(r),[r]);

  return (
    <ThemedView style={styles.drawerContainer}>
      {/* HEADER */}
      <ThemedView style={styles.headerContainer}>
        <ThemedView style={styles.logoBG}>
          <Image
            source={require("@/assets/images/splash-icon.png")}
            style={styles.logo}
          />
        </ThemedView>

        <ThemedText style={styles.headerTitle}>
          AdvocAid PH
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.line} />

      {/* NAVIGATION */}
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

        {/* LOG OUT (ALWAYS RED) */}
        <Item
          icons="exit"
          label="Log Out"
          route="/"
          pathname={pathname}
          danger
          onPress={() => router.replace("/")}
        />
      </ThemedView>

      {/* FOOTER */}
      <ThemedView style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => router.push("/drawer/tabs/profiles/profile")}>
          <Image
            source={require("@/assets/images/profile.jpg")}
            style={styles.profile}
          />
        </TouchableOpacity>

        <ThemedView style={styles.userInfo}>
          <ThemedText style={styles.username}>
            First Name
          </ThemedText>

          <ThemedText style={styles.userEmail}>
            username@email.com
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

/* ================= ITEM ================= */

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
  const isActive =
    pathname === route ||
    pathname.startsWith(route + "/");

  const r = useResponsive();

  const styles = useMemo(
      () => drawerStyles(r),[r]);

  // Logout stays red
  if (danger) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.drawerItem, styles.logoutItem]}
      >
        <Ionicons
          name="log-out-outline"
          size={25}
          color="white"
        />

        <ThemedText style={[styles.label, { color: "white" }]}>
          {label}
        </ThemedText>
      </TouchableOpacity>
    );
  }

  const activeIcon =
    isActive && !icons.endsWith("-outline")
      ? icons
      : `${icons}-outline`;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.drawerItem,
        isActive && styles.activeDrawerItem,
      ]}
    >
      <Ionicons
        name={
          isActive
            ? (icons as keyof typeof Ionicons.glyphMap)
            : (`${icons}-outline` as keyof typeof Ionicons.glyphMap)
        }
        size={(25)}
        color={isActive ? "#35408E" : "white"}
      />

      <ThemedText
        style={[
          styles.label,
          isActive && styles.activeLabel,
        ]}
      >
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
}