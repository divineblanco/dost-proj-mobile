import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { settingsStyles } from "@/styles/settings/settings-styles";
import {
  Feather,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  ScrollView,
  TouchableOpacity
} from "react-native";

const SETTINGS = [
  {
    title: "Profile Settings",
    iconLibrary: "Ionicons",
    icon: "person-outline",
    route: "/drawer/tabs/setting/profile-settings",
  },
  {
    title: "Activity Log",
    iconLibrary: "Feather",
    icon: "activity",
    route: "/drawer/tabs/setting/activity-log",
  },
  {
    title: "Device Sessions",
    iconLibrary: "Octicons",
    icon: "devices",
    route: "/drawer/tabs/setting/device-sessions",
  },
  {
    title: "Language",
    iconLibrary: "Ionicons",
    icon: "language",
    route: "/drawer/tabs/setting/language",
  },
  {
    title: "Appearance",
    iconLibrary: "Ionicons",
    icon: "moon-outline",
    route: "/drawer/tabs/setting/appearance",
  },
  {
    title: "Help",
    iconLibrary: "Feather",
    icon: "help-circle",
    route: "/drawer/tabs/setting/help",
  },
  {
    title: "About",
    iconLibrary: "Feather",
    icon: "info",
    route: "/drawer/tabs/setting/about",
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
            size={icon(18)}
            color={color}
          />
        );

      case "Octicons":
        return (
          <Octicons
            name={item.icon as keyof typeof Octicons.glyphMap}
            size={icon(18)}
            color={color}
          />
        );

      default:
        return (
          <Ionicons
            name={item.icon as keyof typeof Ionicons.glyphMap}
            size={icon(18)}
            color={color}
          />
        );
    }
  };

      const r = useResponsive();
            
      const styles = useMemo(() => settingsStyles(r), [r]);

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
                size={icon(18)}
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