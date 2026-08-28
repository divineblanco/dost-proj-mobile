import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { profileDropdownStyles } from "@/styles/navigation-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native";

type ProfileDropDownProps = {
  onNavigate: () => void;
};

export function ProfileDropDown({
  onNavigate,
}: ProfileDropDownProps) {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    onNavigate(); // close dropdown
    router.push(route as any);
  };

  const r = useResponsive();
        
  const styles = useMemo(() => profileDropdownStyles(r), [r]);

  return (
    <ThemedView style={styles.dropdownMenu}>
      <TouchableOpacity
        onPress={() => handleNavigation("/drawer/tabs/profiles/profile")}
        style={styles.dropdown}
      >
        <ThemedView style={styles.dropdownItem}>
          <Ionicons name="person-outline" size={icon(20)} color="#35408E" />
          <ThemedText style={styles.dropdownLabel}>
            Profile
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigation("/drawer/tabs/notifications")}
        style={styles.dropdown}
      >
        <ThemedView style={styles.dropdownItem}>
          <Ionicons
            name="notifications-outline"
            size={icon(20)}
            color="#35408E"
          />
          <ThemedText style={styles.dropdownLabel}>
            Notifications
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigation("/drawer/tabs/setting/settings")}
        style={styles.dropdown}
      >
        <ThemedView style={styles.dropdownItem}>
          <Ionicons name="settings-outline" size={icon(20)} color="#35408E" />
          <ThemedText style={styles.dropdownLabel}>
            Settings
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>
    </ThemedView>
  );
}