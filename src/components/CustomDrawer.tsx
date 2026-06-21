import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const pathname = usePathname();

  return (
    <ThemedView style={styles.drawerContainer}>
      {/* HEADER */}
      <ThemedView style={styles.headerContainer}>
        <ThemedView style={styles.logoBG}>
          <Image
            source={require("@/assets/images/splash-icon.png")}
            style={{ width: 50, height: 50, borderRadius: 15 }}
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
          icon="home"
          label="Home"
          route="/drawer/tabs/home"
          pathname={pathname}
          onPress={() => router.push("/drawer/tabs/home")}
        />

        <Item
          icon="map"
          label="Map"
          route="/drawer/tabs/map"
          pathname={pathname}
          onPress={() => router.push("/drawer/tabs/map")}
        />

        <Item
          icon="trending-up"
          label="Trends"
          route="/drawer/tabs/trends"
          pathname={pathname}
          onPress={() => router.push("/drawer/tabs/trends")}
        />

        <Item
          icon="document-text"
          label="Reports"
          route="/drawer/tabs/reports"
          pathname={pathname}
          onPress={() => router.push("/drawer/tabs/reports")}
        />

        <Item
          icon="chatbubble"
          label="Contribute"
          route="/drawer/tabs/contribute"
          pathname={pathname}
          onPress={() => router.push("/drawer/tabs/contribute")}
        />

        <Item
          icon="book"
          label="Learn"
          route="/drawer/tabs/resources"
          pathname={pathname}
          onPress={() => router.push("/drawer/tabs/resources")}
        />

        <Item
          icon="star"
          label="Rewards"
          route="/drawer/tabs/rewards"
          pathname={pathname}
          onPress={() => router.push("/drawer/tabs/rewards")}
        />

        {/* LOG OUT (ALWAYS RED) */}
        <Item
          icon="exit"
          label="Log Out"
          route="/"
          pathname={pathname}
          danger
          onPress={() => router.replace("/")}
        />
      </ThemedView>

      {/* FOOTER */}
      <ThemedView style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => router.push("/drawer/tabs/profile")}>
          <Image
            source={require("@/assets/images/profile.jpg")}
            style={{ width: 50, height: 50, borderRadius: 999 }}
          />
        </TouchableOpacity>

        <ThemedView style={styles.userInfo}>
          <ThemedText style={styles.username}>
            Username
          </ThemedText>

          <ThemedText style={styles.userEmail}>
            username@email.com
          </ThemedText>
        </ThemedView>

        <Ionicons
          name="settings"
          size={25}
          color="white"
          onPress={() => router.push("/drawer/tabs/settings")}
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
  icon: string;
  label: string;
  route: string;
  pathname: string;
  onPress: () => void;
  danger?: boolean;
};

function Item({
  icon,
  label,
  route,
  pathname,
  onPress,
  danger,
}: ItemProps) {
  const isActive =
    pathname === route ||
    pathname.startsWith(route + "/");

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
    isActive && !icon.endsWith("-outline")
      ? icon
      : `${icon}-outline`;

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
            ? (icon as keyof typeof Ionicons.glyphMap)
            : (`${icon}-outline` as keyof typeof Ionicons.glyphMap)
        }
        size={25}
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


const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 70,
    backgroundColor: "#35408E",
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "transparent"
  },

  logoBG: {
    width: 50,
    height: 50,
    borderRadius: 999,
    backgroundColor: "white",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 20,
  },

  line: {
    width: "100%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "white",
    marginVertical: 20,
  },

  tabsContainer: {
    gap: 5,
    backgroundColor: "transparent"
  },

  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },

  activeDrawerItem: {
    backgroundColor: "white",
    borderRadius: 15,
  },

  logoutItem: {
    backgroundColor: "#c91010c6",
    borderRadius: 15
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 28,
    color: "white"
  },

  activeLabel: {
    color: "#35408E",
  },

  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: "auto",
    backgroundColor: "transparent"
  },

  userInfo: {
    flex: 1,
    backgroundColor: "transparent"
  },

  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },

  userEmail: {
    color: "white",
    fontSize: 13,
  },
});