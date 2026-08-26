import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { viewBadgesStyles } from "@/styles/badges-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { BADGES, Badge } from "./badges-data";



// ── Screen ────────────────────────────────────────────────────────

export default function Badges() {

  const r = useResponsive();
          
    const styles = useMemo(() => viewBadgesStyles(r), [r]);
    
  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}

      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>
          My Badges
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Earn badges by contributing to the AdvocAid PH community.
        </ThemedText>
      </ThemedView>

      <View style={styles.accentBar} />

      {/* Summary */}

      <ThemedView style={styles.summaryRow}>
        <ThemedView style={styles.summaryPill}>
          <Ionicons
            name="trophy-outline"
            size={icon(14)}
            color="#B36B00"
          />

          <ThemedText style={styles.summaryTxt}>
            {BADGES.length} badge{BADGES.length !== 1 ? "s" : ""} earned
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Earned Badges */}

      <ThemedView style={styles.sectionCard}>
        <ThemedView style={styles.sectionHeader}>
          <ThemedView style={styles.sectionIconBubble}>
            <Ionicons
              name="checkmark-circle-outline"
              size={icon(16)}
              color="#2E9E3A"
            />
          </ThemedView>

          <ThemedText style={styles.sectionTitle}>
            Earned Badges
          </ThemedText>

          <ThemedView style={styles.countPill}>
            <ThemedText style={styles.countTxt}>
              {BADGES.length}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <View style={styles.sectionDivider} />

        {BADGES.map((badge, index) => (
          <View key={badge.id}>
            <BadgeRow badge={badge} />

            {index < BADGES.length - 1 && (
              <View style={styles.rowDivider} />
            )}
          </View>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

// ── Badge row ─────────────────────────────────────────────────────

function BadgeRow({ badge }: { badge: Badge }) {
  const r = useResponsive();
          
    const styles = useMemo(() => viewBadgesStyles(r), [r]);

  return (
    <View style={styles.badgeRow}>

      {/* Icon */}

      <View
        style={[
          styles.badgeIconBubble,
          {
            backgroundColor: "#EEF2FF",
          },
        ]}
      >
        <SimpleLineIcons
          name="badge"
          size={icon(22)}
          color="#35408E"
        />
      </View>

      {/* Text */}

      <View style={styles.badgeTextCol}>
        <ThemedText style={styles.badgeTitle}>
          {badge.title}
        </ThemedText>

        <ThemedText style={styles.badgeDesc}>
          {badge.description}
        </ThemedText>

        {/* Earned date */}

        <View style={styles.earnedDateRow}>
          <Ionicons
            name="calendar-outline"
            size={icon(11)}
            color="#9BA8C0"
          />

          <ThemedText style={styles.earnedDate}>
            {badge.earnedDate}
          </ThemedText>
        </View>
      </View>

      {/* Earned indicator */}

      <View
        style={[
          styles.statusDot,
          {
            backgroundColor: "#35408E",
          },
        ]}
      >
        <Ionicons
          name="checkmark"
          size={icon(10)}
          color="#FFFFFF"
        />
      </View>
    </View>
  );
}