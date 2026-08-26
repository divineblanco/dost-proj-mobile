import BadgeCard from "@/components/cards/badge-card";
import EarnPointsCard from "@/components/cards/earn-points";
import Leaderboard from "@/components/cards/leaderboard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { rewardsPageStyles } from "@/styles/rewards/rewards-styles";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  ScrollView
} from "react-native";

export default function Rewards() {
  const r = useResponsive();
  const styles = useMemo(() => rewardsPageStyles(r), [r]);
  
  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView style={styles.pageInner}>
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
                size={icon(50)}
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

          <BadgeCard returnTo="/drawer/tabs/rewards" />

          <Leaderboard/>

        </ThemedView>

        
        

      </ThemedView>
    </ScrollView>
  );
}