import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { leaderboardStyles } from "@/styles/rewards/rewards-components-styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Image } from "react-native";
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
        size={icon(30)}
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
        size={icon(30)}
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
        size={icon(30)}
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
  const r = useResponsive();
  const styles = useMemo(() => leaderboardStyles(r), [r]);

  return (
    <ThemedView style={styles.leaderCard}>
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
            <ThemedText style={styles.leaderRank}>
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