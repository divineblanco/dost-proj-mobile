import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

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
  return (
    <ThemedView style={styles.card}>
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
                size={28}
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
  },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingVertical: 5,
    marginBottom: 10,
    lineHeight: 20
  },

  view: {
    fontSize: 12,
    fontWeight: "600",
  },

  badgesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },

  badgeItem: {
    flex: 1,
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginHorizontal: 4,
  },

  badgeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  badgeLabel: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 16,
  },
});