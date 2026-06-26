import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const filters = [
  "This Week",
  "This Month",
  "This Year",
];

export default function LeaderboardDropdown() {
  const [selectedFilter, setSelectedFilter] = useState("This Month");
  const [showFilter, setShowFilter] = useState(false);

  return (
    <ThemedView style={styles.filterContainer}>
      <TouchableOpacity
        style={styles.filterRow}
        onPress={() => setShowFilter(!showFilter)}
      >
        <ThemedText style={styles.filterText}>
          {selectedFilter}
        </ThemedText>

        <Ionicons
          name={showFilter ? "chevron-up" : "chevron-down"}
          size={15}
          color="#1A1F5E"
        />
      </TouchableOpacity>

      {showFilter && (
        <ThemedView style={styles.dropdown}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.dropdownItem,
                selectedFilter === filter &&
                  styles.activeDropdownItem,
              ]}
              onPress={() => {
                setSelectedFilter(filter);
                setShowFilter(false);
              }}
            >
              <ThemedText
                style={[
                  styles.dropdownText,
                  selectedFilter === filter &&
                    styles.activeDropdownText,
                ]}
              >
                {filter}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    position: "relative",
    backgroundColor: "transparent",
  },

  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#F5F7FB",
  },

  filterText: {
    fontSize: 13,
    color: "#1A1F5E",
    fontWeight: "500",
  },

  dropdown: {
    position: "absolute",
    top: 36,
    right: 0,
    width: 110,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E4F0",
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    zIndex: 100,
  },

  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  activeDropdownItem: {
    backgroundColor: "#EEF2FF",
  },

  dropdownText: {
    fontSize: 13,
    color: "#374151",
  },

  activeDropdownText: {
    color: "#35408E",
    fontWeight: "600",
  },
});