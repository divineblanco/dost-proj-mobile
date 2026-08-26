import { BADGES } from "@/app/drawer/tabs/badges/badges-data";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { badgeCardStyles } from "@/styles/rewards/rewards-components-styles";
import { SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";

type BadgeCardProps = {
  returnTo: string;
};

export default function BadgeCard({ returnTo }: BadgeCardProps) {
  const r = useResponsive();
  const styles = useMemo(() => badgeCardStyles(r), [r]);

  return (
    <ThemedView style={styles.badgeCard}>
      <ThemedView style={styles.sectionRow}>
        <ThemedText style={styles.sectionTitle}>
          My Badges
        </ThemedText>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/drawer/tabs/badges/view-badges",
              params: {
                returnTo,
              },
            })
          }
        >
          <ThemedText style={styles.view}>
            View All
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.badgesContainer}>
        {BADGES.map((badge) => (
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
