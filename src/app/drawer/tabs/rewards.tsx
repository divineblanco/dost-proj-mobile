import BadgeCard from "@/components/cards/badge-card";
import EarnPointsCard from "@/components/cards/earn-points";
import Leaderboard from "@/components/cards/leaderboard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet
} from "react-native";

export default function Rewards() {
  
  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView>
        <ThemedView style={styles.headerContainer}>
          <ThemedText type="title" style={{ textAlign: "left" }}>
            Community Rewards
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.rewardsContainer}>

          <ThemedView style={styles.card}>
            <ThemedText style={styles.pointsTitle}>My Community Points</ThemedText>

            <ThemedView style={styles.horizontalDivider} />

            <ThemedView style={styles.pointsContent}>
              <MaterialIcons
                name="stars"
                size={50}
                color="#f6bd04"
              />

              <ThemedView style={styles.pointsColumn}>
                <ThemedText style={styles.points}>1,240</ThemedText>
                <ThemedText style={styles.totalTxt}>Total Points</ThemedText>
              </ThemedView>

              <ThemedView style={styles.verticalDivider} />

              <ThemedView style={styles.rankColumn}>
                <ThemedText style={styles.rank}>Rank</ThemedText>
                <ThemedText style={styles.rankNo}>#12</ThemedText>
                <ThemedText style={styles.month}>This Month</ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.progressTrack}>
              <ThemedView style={styles.progressFill} />
            </ThemedView>

            <ThemedView style={styles.levelRow}>
              <ThemedText style={styles.level}>
                760 pts to next level
              </ThemedText>

              <ThemedText style={styles.level}>
                Level: Advocate
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <EarnPointsCard/>

          <BadgeCard/>

          <Leaderboard/>

        </ThemedView>

        
        

      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
  },
  scrollContent: {
    paddingBottom: 95,
  },

  headerContainer: {
    padding: 10,
  },

  rewardsContainer: {
    padding: 10,
    gap: 10
  },

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#E0E4F0",
    elevation: 2,
    shadowColor: '#1A1F5E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  pointsTitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 20
  },

  horizontalDivider: {
    backgroundColor: "#9C9898",
    padding: 0.5,
    width: "100%",
    marginVertical: 8,
  },

  pointsContent: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  pointsColumn: {
    flexDirection: "column",
    backgroundColor: "transparent",
    gap: 2
  },

  points: {
    fontSize: 19,
    fontWeight: "600",
    lineHeight: 25
  },

  totalTxt: {
    fontSize: 14,
    fontWeight: "500"
  },

  rankColumn: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "transparent",
    gap: 2
  },

  rank:{
    fontSize: 14,
    fontWeight: "400"
  },

  rankNo: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 25
  },

  month: {
    fontSize: 14,
    fontWeight: "500"
  },

  verticalDivider: {
    backgroundColor: "#9C9898",
    padding: 0.5,
    height: "80%",
    marginHorizontal: 40,
  },

  progressTrack: {
    width: "100%",
    height: 15,
    backgroundColor: "#E4E8F0",
    borderRadius: 999,
    overflow: "hidden",
    marginVertical: 12,
  },

  progressFill: {
    width: "62%",
    height: "100%",
    backgroundColor: "#35408E",
    borderRadius: 999,
  },

  levelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },

  level:{
    color: "#777777"
  },
});