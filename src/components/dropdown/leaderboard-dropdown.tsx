import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { leaderboardDropdownStyles } from "@/styles/rewards/rewards-components-styles";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";

const filters = [
  "This Week",
  "This Month",
  "This Year",
];

export default function LeaderboardDropdown() {
  const [selectedFilter, setSelectedFilter] = useState("This Month");
  const [showFilter, setShowFilter] = useState(false);

  const r = useResponsive();
  const styles = useMemo(() => leaderboardDropdownStyles(r), [r]);

  const triggerRef = useRef<View>(null);
  const [triggerHeight, setTriggerHeight] = useState(0);

  const [dropdownWidth, setDropdownWidth] = useState(0);

  return (
    <ThemedView style={styles.filterContainer}>
      <TouchableOpacity
        ref={triggerRef}
        style={styles.LfilterRow}
        onPress={() => {
          if (showFilter) {
            setShowFilter(false);
            return;
          }

          triggerRef.current?.measure((x, y, width, height) => {
            setDropdownWidth(width);
            setTriggerHeight(height);
            setShowFilter(true);
          });
        }}
      >
        <ThemedText style={styles.LfilterText}>
          {selectedFilter}
        </ThemedText>

        <Ionicons
          name={showFilter ? "chevron-up" : "chevron-down"}
          size={icon(15)}
          color="#1A1F5E"
        />
      </TouchableOpacity>

      {showFilter && (
        <ThemedView style={[
          styles.dropdown,
          {
            width: dropdownWidth,
            top: triggerHeight + 4,
          },
        ]}>
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