import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { badgeCardStyles } from "@/styles/rewards/rewards-components-styles";
import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";

const badges = [
  {
    id: 1,
    title: "First Contribution",
  },
  {
    id: 2,
    title: "Resource Sharer",
  },
  {
    id: 3,
    title: "Knowledge Helper",
  },
];

export default function BadgeCard() {
  const r = useResponsive();
    const styles = useMemo(() => badgeCardStyles(r), [r]);
    
  return (
    <ThemedView style={styles.badgeCard}>
      <ThemedView style={styles.sectionRow}>
        <ThemedText style={styles.sectionTitle}>
          My Badges
        </ThemedText>

        <TouchableOpacity>
          <ThemedText style={styles.view}>
            View All
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.badgesContainer}>
        {badges.map((badge) => (
          <ThemedView
            key={badge.id}
            style={styles.badgeItem}
          >
            <ThemedView style={styles.badgeIconContainer}>
              <SimpleLineIcons
                name="badge"
                size={icon(28)}
                color="#35408E"
              />
            </ThemedView>

            <ThemedText style={styles.badgeLabel}>
              {badge.title}
            </ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedView>
  );
}