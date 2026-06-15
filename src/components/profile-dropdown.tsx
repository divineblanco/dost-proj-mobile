import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";


export function ProfileDropDown() {

    const router = useRouter();

  return (
    <ThemedView
        style={styles.dropdownMenu}>

        <TouchableOpacity onPress={() => router.push("/drawer/tabs/home")} style={styles.dropdown}>
        <ThemedView style={styles.dropdownItem}>
            <Ionicons name="person-outline" size={20} color="#35408E"/>
            <ThemedText style={styles.dropdownLabel}>Profile</ThemedText>
        </ThemedView>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/drawer/tabs/home")} style={styles.dropdown}>
        <ThemedView style={styles.dropdownItem}>
            <Ionicons name="notifications-outline" size={20} color="#35408E"/>
            <ThemedText style={styles.dropdownLabel}>Notifications</ThemedText>
        </ThemedView>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/drawer/tabs/home")} style={styles.dropdown}>
        <ThemedView style={styles.dropdownItem}>
            <Ionicons name="settings-outline" size={20} color="#35408E"/>
            <ThemedText style={styles.dropdownLabel}>Settings</ThemedText>
        </ThemedView>
        </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({

  dropdownMenu: {
        position: "absolute",
        top: 40,
        right: 0,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        elevation: 5,
        width: 160,
        zIndex: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        shadowColor: '#000',
        maxHeight: 200,
    },
    dropdownItem: {
        flexDirection: "row",
        gap: 5
    },
    dropdownLabel: {
        fontSize: 13,
        fontWeight: "600",
        paddingVertical: 2
    },
    dropdown: {
        padding: 5,
    },


});
