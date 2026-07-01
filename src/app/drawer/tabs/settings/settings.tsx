import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  Feather,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const SETTINGS = [
  {
    title: "Profile Settings",
    iconLibrary: "Ionicons",
    icon: "person-outline",
    route: "/drawer/tabs/settings/profile-settings",
  },
  {
    title: "Activity Log",
    iconLibrary: "Feather",
    icon: "activity",
    route: "/drawer/tabs/settings/activity-log",
  },
  {
    title: "Device Sessions",
    iconLibrary: "Octicons",
    icon: "devices",
    route: "/drawer/tabs/settings/device-sessions",
  },
  {
    title: "Language",
    iconLibrary: "Ionicons",
    icon: "language",
    route: "/drawer/tabs/settings/language",
  },
  {
    title: "Appearance",
    iconLibrary: "Ionicons",
    icon: "moon-outline",
    route: "/drawer/tabs/settings/appearance",
  },
  {
    title: "Help",
    iconLibrary: "Feather",
    icon: "help-circle",
    route: "/drawer/tabs/settings/help",
  },
  {
    title: "About",
    iconLibrary: "Feather",
    icon: "info",
    route: "/drawer/tabs/settings/about",
  },
  {
    title: "Log Out",
    iconLibrary: "Ionicons",
    icon: "log-out-outline",
    route: "/",
    logout: true,
  },
];

export default function Settings() {
  const router = useRouter();

  const renderIcon = (item: (typeof SETTINGS)[number]) => {
    const color = item.logout ? "#E20000" : "#35408E";

    switch (item.iconLibrary) {
      case "Feather":
        return (
          <Feather
            name={item.icon as keyof typeof Feather.glyphMap}
            size={18}
            color={color}
          />
        );

      case "Octicons":
        return (
          <Octicons
            name={item.icon as keyof typeof Octicons.glyphMap}
            size={18}
            color={color}
          />
        );

      default:
        return (
          <Ionicons
            name={item.icon as keyof typeof Ionicons.glyphMap}
            size={18}
            color={color}
          />
        );
    }
  };

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView style={styles.container}>
        {SETTINGS.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={styles.tabContainer}
            activeOpacity={0.7}
            onPress={() =>
              item.logout
                ? router.replace("/")
                : router.push(item.route as any)
            }
          >
            <ThemedView style={styles.tab}>
              {renderIcon(item)}

              <ThemedText
                style={
                  item.logout
                    ? styles.tabLogout
                    : styles.tabText
                }
              >
                {item.title}
              </ThemedText>
            </ThemedView>

            {!item.logout && (
              <Ionicons
                name="chevron-forward"
                size={18}
                color="#35408E"
                style={styles.tabIcon}
              />
            )}
          </TouchableOpacity>
        ))}
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
    paddingBottom: 90,
  },

  container: {
    paddingVertical: 10
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },

  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  tabText: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 30,
  },

  tabLogout: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 30,
    color: "#E20000",
  },

  tabIcon: {
    paddingRight: 10
  }
});