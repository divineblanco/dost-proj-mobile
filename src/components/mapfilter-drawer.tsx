import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Checkbox from "expo-checkbox";
import React from "react";
import {
  Animated,
  StyleSheet
} from "react-native";

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
}: Props) {
  return (
    <Animated.View
      style={[
        styles.drawer,
        { transform: [{ translateX: slideAnim }] },
      ]}
    >
      <ThemedText style={styles.title}>Filters</ThemedText>

      {/* Heatmap */}
      <CheckboxRow
        label="Live Heatmap"
        value={filters.heatmap}
        onChange={(val) =>
          setFilters((p) => ({ ...p, heatmap: val }))
        }
      />

      {/* Testing Centers */}
      <CheckboxRow
        label="Testing Centers"
        value={filters.testingCenters}
        onChange={(val) =>
          setFilters((p) => ({ ...p, testingCenters: val }))
        }
      />

      {/* Support Groups */}
      <CheckboxRow
        label="Support Groups"
        value={filters.supportGroups}
        onChange={(val) =>
          setFilters((p) => ({ ...p, supportGroups: val }))
        }
      />

      {/* Events */}
      <CheckboxRow
        label="Educational Events"
        value={filters.events}
        onChange={(val) =>
          setFilters((p) => ({ ...p, events: val }))
        }
      />

      {/* Treatment */}
      <CheckboxRow
        label="Treatment Facilities"
        value={filters.treatment}
        onChange={(val) =>
          setFilters((p) => ({ ...p, treatment: val }))
        }
      />
    </Animated.View>
  );
}

/* reusable checkbox row */
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
      <ThemedText style={styles.textLabel}>{label}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 260,
    backgroundColor: "#E4E8F0",
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    zIndex: 999,
    gap: 20
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
    color: "#35408E",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    backgroundColor: "transparent"
  },

  textLabel: {
    fontSize: 15,
    fontWeight: 500
  }
});