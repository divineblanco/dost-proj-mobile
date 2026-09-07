import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { profileDropdownStyles } from "@/styles/navigation-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import {
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";

type ProfileDropDownProps = {
  onNavigate: () => void;

  position: {
    top: number;
    right: number;
  };
};

export function ProfileDropDown({
  onNavigate,
  position,
}: ProfileDropDownProps) {
  const router = useRouter();
  const r = useResponsive();

  const styles = useMemo(
    () => profileDropdownStyles(r),
    [r]
  );

  const handleNavigation = (route: string) => {
    // Close dropdown
    onNavigate();

    // Navigate
    router.push(route as any);
  };

  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      statusBarTranslucent
      supportedOrientations={[
        "portrait",
        "landscape",
      ]}
    >
      {/* ============================================
          OUTSIDE CLICK
      ============================================ */}

      <Pressable
        style={styles.modalOverlay}
        onPress={onNavigate}
      />

      {/* ============================================
          DROPDOWN
      ============================================ */}

      <View
        style={[
          styles.dropdownMenu,
          {
            position: "absolute",

            // Bottom of profile button
            top: position.top,

            // Align right side with profile button
            right: position.right,
          },
        ]}
      >
        {/* Profile */}
        <TouchableOpacity
          style={styles.dropdown}
          activeOpacity={0.7}
          onPress={() =>
            handleNavigation(
              "/drawer/tabs/profiles/profile"
            )
          }
        >
          <ThemedView style={styles.dropdownItem}>
            <Ionicons
              name="person-outline"
              size={icon(20)}
              color="#35408E"
            />

            <ThemedText
              style={styles.dropdownLabel}
            >
              Profile
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity
          style={styles.dropdown}
          activeOpacity={0.7}
          onPress={() =>
            handleNavigation(
              "/drawer/tabs/notifications"
            )
          }
        >
          <ThemedView style={styles.dropdownItem}>
            <Ionicons
              name="notifications-outline"
              size={icon(20)}
              color="#35408E"
            />

            <ThemedText
              style={styles.dropdownLabel}
            >
              Notifications
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity
          style={styles.dropdown}
          activeOpacity={0.7}
          onPress={() =>
            handleNavigation(
              "/drawer/tabs/setting/settings"
            )
          }
        >
          <ThemedView style={styles.dropdownItem}>
            <Ionicons
              name="settings-outline"
              size={icon(20)}
              color="#35408E"
            />

            <ThemedText
              style={styles.dropdownLabel}
            >
              Settings
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
