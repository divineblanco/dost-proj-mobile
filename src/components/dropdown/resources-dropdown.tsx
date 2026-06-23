import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type Resources = {
  label: string;
  icon: keyof typeof Feather.glyphMap;
};

type ResourcesDropdownProps = {
  selectedResources: string;
  setSelectectedResources: (value: string) => void;
};

const resources: Resources[] = [
  { label: "All Categories", icon: "layers" },
  { label: "Prevention", icon: "shield" },
  { label: "Testing", icon: "check" },
  { label: "Treatment", icon: "file-text" },
  { label: "Support", icon: "heart" },
  { label: "Awareness", icon: "user" },
  { label: "Research", icon: "book" },
];

export default function ResourcesDropdown({
  selectedResources,
  setSelectectedResources,
}: ResourcesDropdownProps) {
  const [open, setOpen] = useState(false);

  const selectedItem =
    resources.find((c) => c.label === selectedResources) || null;

  return (
    <ThemedView style={styles.container}>
      {/* BUTTON */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setOpen(!open)}
      >
        <ThemedView style={styles.dropdownContent}>
          {/* LEFT SIDE (ICON + TEXT) */}
          <View style={styles.leftContent}>
            {selectedItem && (
              <Feather
                name={selectedItem.icon}
                size={18}
                color="#35408E"
              />
            )}

            <ThemedText style={styles.dropdownText}>
              {selectedResources || "Select Resources"}
            </ThemedText>
          </View>

          {/* ARROW */}
          <Ionicons
            name={open ? "chevron-up-outline" : "chevron-down-outline"}
            size={16}
            color="#35408E"
          />
        </ThemedView>
      </TouchableOpacity>

      {/* DROPDOWN LIST */}
      {open && (
        <ThemedView style={styles.dropdownMenu}>
          <ScrollView nestedScrollEnabled style={{ maxHeight: 250 }}>
            {resources.map((item) => {
              const isActive = selectedResources === item.label;

              return (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.dropdownItem,
                    isActive && styles.activeItem,
                  ]}
                  onPress={() => {
                    setSelectectedResources(item.label);
                    setOpen(false);
                  }}
                >
                  <Feather
                    name={item.icon}
                    size={18}
                    color={isActive ? "white" : "#35408E"}
                  />

                  <ThemedText
                    style={[
                      styles.itemText,
                      isActive && styles.activeText,
                    ]}
                  >
                    {item.label}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "transparent",
    zIndex: 100,
  },

  dropdownButton: {
    backgroundColor: "#E4E8F0",
    padding: 15,
    borderRadius: 10,
  },

  dropdownContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent"
  },

  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  dropdownText: {
    fontSize: 13,
    color: "#35408E",
  },

  dropdownMenu: {
    backgroundColor: "#E4E8F0",
    borderRadius: 12,
    marginTop: 0,
    position: "absolute",
    top: 55,
    width: "100%",
    elevation: 5,
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D3D7E0",
  },

  itemText: {
    fontSize: 13,
    color: "#35408E",
  },

  activeItem: {
    backgroundColor: "#35408E",
    borderRadius: 10,
  },

  activeText: {
    color: "white",
    fontWeight: "bold",
  },
});