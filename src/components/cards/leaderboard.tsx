import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet } from "react-native";
import LeaderboardDropdown from "../dropdown/leaderboard-dropdown";

const leaderboard = [
  {
    rank: 1,
    image: require("@/assets/images/profile.jpg"),
    name: "Maria Dela Cruz",
    points: "2,340 pts",
    medal: (
      <MaterialCommunityIcons
        name="medal"
        size={30}
        color="#FDB71A"
      />
    ),
  },
  {
    rank: 2,
    image: require("@/assets/images/profile.jpg"),
    name: "Juan Dela Cruz",
    points: "1,890 pts",
    medal: (
      <MaterialCommunityIcons
        name="medal"
        size={30}
        color="#D2D4DA"
      />
    ),
  },
  {
    rank: 3,
    image: require("@/assets/images/profile.jpg"),
    name: "Alex Reyes",
    points: "1,560 pts",
    medal: (
      <MaterialCommunityIcons
        name="medal"
        size={30}
        color="#E59661"
      />
    ),
  },
  {
    rank: 12,
    image: require("@/assets/images/profile.jpg"),
    name: "You",
    points: "1,240 pts",
    isCurrentUser: true,
  },
];

export default function Leaderboard() {
  return (
    <ThemedView style={styles.card}>
      {/* Header */}
      <ThemedView style={styles.headerRow}>
        <ThemedText style={styles.title}>
          Leaderboard
        </ThemedText>

        <LeaderboardDropdown/>
      </ThemedView>

      {/* Leaderboard List */}
      {leaderboard.map((user) => (
        <ThemedView
          key={user.rank}
          style={[
            styles.leaderboardRow,
            user.isCurrentUser && styles.currentUserRow,
          ]}
        >
          <ThemedView style={styles.userInfo}>
            <ThemedText style={styles.rank}>
              {user.rank}
            </ThemedText>

            <Image
              source={user.image}
              style={styles.avatar}
            />

            <ThemedText style={styles.userName}>
              {user.name}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.pointsContainer}>
            <ThemedText style={styles.userPoints}>
              {user.points}
            </ThemedText>

            {user.medal}
          </ThemedView>
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

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  filterText: {
    fontSize: 13,
    color: "#6B7280",
  },

  leaderboardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  currentUserRow: {
    backgroundColor: "#E2E6EE",
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "transparent",
  },

  rank: {
    width: 25,
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1F5E",
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 0.5,
    borderColor: "#D1D5DB",
  },

  userName: {
    fontSize: 15,
    fontWeight: "500",
  },

  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "transparent",
  },

  userPoints: {
    fontSize: 14,
    fontWeight: "500",
  },
});