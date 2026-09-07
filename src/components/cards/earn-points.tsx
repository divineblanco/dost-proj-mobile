import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { earnPointsStyles } from "@/styles/rewards/rewards-components-styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";

const earnPointsData = [
  {
    id: 1,
    icon: <Ionicons name="chatbubble-outline" size={icon(15)} color="#1A1F5E" />,
    label: "Share an Experience",
    points: "+10 pts",
  },
  {
    id: 2,
    icon: <Feather name="alert-triangle" size={icon(15)} color="#1A1F5E" />,
    label: "Report Misinformation",
    points: "+15 pts",
  },
  {
    id: 3,
    icon: <Feather name="camera" size={icon(15)} color="#1A1F5E" />,
    label: "Upload Media",
    points: "+20 pts",
  },
];

export default function EarnPointsCard() {
  const r = useResponsive();
  const styles = useMemo(() => earnPointsStyles(r), [r]);

  return (
    <ThemedView style={styles.earnCard}>
      <ThemedText style={styles.title}>
        How to Earn Points
      </ThemedText>

      {earnPointsData.map((item) => (
        <ThemedView key={item.id} style={styles.rewardItem}>
          <ThemedView style={styles.leftContent}>
            {item.icon}
            <ThemedText style={styles.label}>
              {item.label}
            </ThemedText>
          </ThemedView>

          <ThemedText style={styles.earnPoints}>
            {item.points}
          </ThemedText>
        </ThemedView>
      ))}
    </ThemedView>
  );
}