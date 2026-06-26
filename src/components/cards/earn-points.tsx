import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";

const earnPointsData = [
  {
    id: 1,
    icon: <Ionicons name="chatbubble-outline" size={15} color="#1A1F5E" />,
    label: "Share an Experience",
    points: "+10 pts",
  },
  {
    id: 2,
    icon: <Feather name="alert-triangle" size={15} color="#1A1F5E" />,
    label: "Report Misinformation",
    points: "+15 pts",
  },
  {
    id: 3,
    icon: <Feather name="camera" size={15} color="#1A1F5E" />,
    label: "Upload Media",
    points: "+20 pts",
  },
  {
    id: 4,
    icon: <Ionicons name="location-outline" size={15} color="#1A1F5E" />,
    label: "Add Resource Location",
    points: "+25 pts",
  },
];

export default function EarnPointsCard() {
  return (
    <ThemedView style={styles.card}>
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

          <ThemedText style={styles.points}>
            {item.points}
          </ThemedText>
        </ThemedView>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#E0E4F0",
    elevation: 2,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    gap: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 5,
  },

  rewardItem: {
    backgroundColor: "#E2E6EE",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "transparent",
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
  },

  points: {
    fontSize: 14,
    fontWeight: "700",
    color: "#35408E",
  },
});