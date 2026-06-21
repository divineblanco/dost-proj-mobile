import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import React from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

export type FilterState = {
  heatmap: boolean;
  testingCenters: boolean;
  supportGroups: boolean;
  events: boolean;
  treatment: boolean;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  slideAnim: Animated.Value;
};

export default function MapFilterDrawer({
  visible,
  filters,
  setFilters,
  slideAnim,
  onClose,
}: Props) {
  // ✅ FULLY HIDDEN WHEN CLOSED
  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.drawer,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      {/* HEADER */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Filters</ThemedText>

        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Ionicons name="close" size={20} color="#35408E" />
        </TouchableOpacity>
      </ThemedView>

      <ThemedText style={styles.subtitle}>
        Customize what appears on the map
      </ThemedText>

      {/* Map Layers */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Map Layers</ThemedText>

        <CheckboxRow
          label="Live Heatmap"
          value={filters.heatmap}
          onChange={(val) =>
            setFilters((p) => ({ ...p, heatmap: val }))
          }
        />

      </ThemedView>

      {/* Community */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Community</ThemedText>

        <CheckboxRow
          label="Support Groups"
          value={filters.supportGroups}
          onChange={(val) =>
            setFilters((p) => ({ ...p, supportGroups: val }))
          }
        />

        <CheckboxRow
          label="Educational Events"
          value={filters.events}
          onChange={(val) =>
            setFilters((p) => ({ ...p, events: val }))
          }
        />
      </ThemedView>

      {/* Healthcare */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Healthcare</ThemedText>

        <CheckboxRow
          label="Treatment Facilities"
          value={filters.treatment}
          onChange={(val) =>
            setFilters((p) => ({ ...p, treatment: val }))
          }
        />

        <CheckboxRow
          label="Testing Centers"
          value={filters.testingCenters}
          onChange={(val) =>
            setFilters((p) => ({ ...p, testingCenters: val }))
          }
        />
      </ThemedView>
    </Animated.View>
  );
}

/* checkbox row */
function CheckboxRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <ThemedView style={styles.row}>
      <Checkbox value={value} onValueChange={onChange} />
      <ThemedText style={styles.label}>{label}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,

    padding: 18,
    paddingBottom: 28,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,

    elevation: 12,
    zIndex: 999,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1F5E",
    paddingVertical: 5
  },

  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 14,
  },

  closeBtn: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#EEF1FA",
  },

  section: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F0F2F8",
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#35408E",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },

  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#35408E",
  },
});