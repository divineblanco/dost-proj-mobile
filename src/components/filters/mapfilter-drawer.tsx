import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { mapFilterDrawerStyles } from "@/styles/map-styles";
import { useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import React, { useMemo } from "react";
import { Animated, TouchableOpacity } from "react-native";

export type FilterState = {
  heatmap: boolean;
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
  if (!visible) return null;

  const r = useResponsive();
  const styles = useMemo(() => mapFilterDrawerStyles(r), [r]);

  return (
    <Animated.View
      style={[styles.drawer, { transform: [{ translateY: slideAnim }] }]}
    >
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Filters</ThemedText>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Ionicons name="close" size={20} color="#35408E" />
        </TouchableOpacity>
      </ThemedView>

      <ThemedText style={styles.subtitle}>
        Customize what appears on the map
      </ThemedText>

      {/* Options */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Map Layers</ThemedText>

        <CheckboxRow
          label="Live Heatmap"
          value={filters.heatmap}
          onChange={(val) => setFilters((p) => ({ ...p, heatmap: val }))}
        />

        <CheckboxRow
          label="Treatment Hubs"
          value={filters.treatment}
          onChange={(val) => setFilters((p) => ({ ...p, treatment: val }))}
        />
      </ThemedView>
    </Animated.View>
  );
}

function CheckboxRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
}) {
  const r = useResponsive();
  const styles = useMemo(() => mapFilterDrawerStyles(r), [r]);

  return (
    <ThemedView style={styles.row}>
      <Checkbox value={value} onValueChange={onChange} color={value ? "#35408E" : undefined} />
      <ThemedText style={styles.label}>{label}</ThemedText>
    </ThemedView>
  );
}