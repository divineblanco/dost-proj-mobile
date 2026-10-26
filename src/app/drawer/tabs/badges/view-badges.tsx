// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { viewBadgesStyles } from "@/styles/badges-styles";
// import { icon, useResponsive } from "@/styles/responsive";
// import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
// import React, { useMemo } from "react";
// import { ScrollView, View } from "react-native";
// import { BADGES, Badge } from "./badges-data";



// // ── Screen ────────────────────────────────────────────────────────

// export default function Badges() {

//   const r = useResponsive();
          
//     const styles = useMemo(() => viewBadgesStyles(r), [r]);
    
//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={styles.scrollContent}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* Header */}

//       <ThemedView style={styles.header}>
//         <ThemedText style={styles.title}>
//           My Badges
//         </ThemedText>

//         <ThemedText style={styles.subtitle}>
//           Earn badges by contributing to the AdvocAid PH community.
//         </ThemedText>
//       </ThemedView>

//       <View style={styles.accentBar} />

//       {/* Summary */}

//       <ThemedView style={styles.summaryRow}>
//         <ThemedView style={styles.summaryPill}>
//           <Ionicons
//             name="trophy-outline"
//             size={icon(14)}
//             color="#B36B00"
//           />

//           <ThemedText style={styles.summaryTxt}>
//             {BADGES.length} badge{BADGES.length !== 1 ? "s" : ""} earned
//           </ThemedText>
//         </ThemedView>
//       </ThemedView>

//       {/* Earned Badges */}

//       <ThemedView style={styles.sectionCard}>
//         <ThemedView style={styles.sectionHeader}>
//           <ThemedView style={styles.sectionIconBubble}>
//             <Ionicons
//               name="checkmark-circle-outline"
//               size={icon(16)}
//               color="#2E9E3A"
//             />
//           </ThemedView>

//           <ThemedText style={styles.sectionTitle}>
//             Earned Badges
//           </ThemedText>

//           <ThemedView style={styles.countPill}>
//             <ThemedText style={styles.countTxt}>
//               {BADGES.length}
//             </ThemedText>
//           </ThemedView>
//         </ThemedView>

//         <View style={styles.sectionDivider} />

//         {BADGES.map((badge, index) => (
//           <View key={badge.id}>
//             <BadgeRow badge={badge} />

//             {index < BADGES.length - 1 && (
//               <View style={styles.rowDivider} />
//             )}
//           </View>
//         ))}
//       </ThemedView>
//     </ScrollView>
//   );
// }

// // ── Badge row ─────────────────────────────────────────────────────

// function BadgeRow({ badge }: { badge: Badge }) {
//   const r = useResponsive();
          
//     const styles = useMemo(() => viewBadgesStyles(r), [r]);

//   return (
//     <View style={styles.badgeRow}>

//       {/* Icon */}

//       <View
//         style={[
//           styles.badgeIconBubble,
//           {
//             backgroundColor: "#EEF2FF",
//           },
//         ]}
//       >
//         <SimpleLineIcons
//           name="badge"
//           size={icon(22)}
//           color="#35408E"
//         />
//       </View>

//       {/* Text */}

//       <View style={styles.badgeTextCol}>
//         <ThemedText style={styles.badgeTitle}>
//           {badge.title}
//         </ThemedText>

//         <ThemedText style={styles.badgeDesc}>
//           {badge.description}
//         </ThemedText>

//         {/* Earned date */}

//         <View style={styles.earnedDateRow}>
//           <Ionicons
//             name="calendar-outline"
//             size={icon(11)}
//             color="#9BA8C0"
//           />

//           <ThemedText style={styles.earnedDate}>
//             {badge.earnedDate}
//           </ThemedText>
//         </View>
//       </View>

//       {/* Earned indicator */}

//       <View
//         style={[
//           styles.statusDot,
//           {
//             backgroundColor: "#35408E",
//           },
//         ]}
//       >
//         <Ionicons
//           name="checkmark"
//           size={icon(10)}
//           color="#FFFFFF"
//         />
//       </View>
//     </View>
//   );
// }

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormQuery from "@/lib/hooks/useFormQuery";
import { meetsBadgeRequirement } from "@/lib/types/badges";
import { extractItems, RewardBadge } from "@/lib/types/rewards";
import { viewBadgesStyles } from "@/styles/badges-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useEffect, useMemo } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

export default function Badges() {
  const r = useResponsive();
  const styles = useMemo(() => viewBadgesStyles(r), [r]);
  const { token } = useAuth();

  const headers = useMemo(() => ({
    "x-api-key": "testing",
    "x-api-version": "2026-02-26",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }), [token]);

  const { data, isLoading, isError, error } = useFormQuery<unknown>({
    key: ["reward-badges", token],
    url: "/maintenance/rewards/badge",
    enabled: Boolean(token),
    headers,
  });

  const badges = useMemo(
    () => extractItems<RewardBadge>(data)
      .filter((badge) => badge && badge.is_active !== false)
      .sort((a, b) => a.requirement_value - b.requirement_value),
    [data],
  );

  // Replace these values with actual user progress when available.
  const progress = {
    approvedContributions: 0,
    approvedMisinformation: 0,
    approvedMedia: 0,
    totalPoints: 0,
  };

  const earnedBadges = badges.filter((badge) =>
    meetsBadgeRequirement(badge, progress)
  );
  const inProgressBadges = badges.filter((badge) =>
    !meetsBadgeRequirement(badge, progress)
  );

  useEffect(() => {
    if (isError) console.error("Failed to fetch badges:", error);
  }, [isError, error]);

  const renderBadge = (
    badge: RewardBadge,
    earned: boolean,
    index: number,
    count: number,
  ) => (
    <React.Fragment key={badge.badge_id}>
      <View style={styles.badgeRow}>
        <View style={[
          styles.badgeIconBubble,
          { backgroundColor: earned ? "#E7F6EC" : "#F0F2F7" },
        ]}>
          <SimpleLineIcons
            name="badge"
            size={icon(26)}
            color={earned ? "#1F9254" : "#9BA8C0"}
          />
        </View>

        <View style={styles.badgeTextCol}>
          <ThemedText style={styles.badgeTitle}>{badge.name}</ThemedText>
          <ThemedText style={styles.badgeDesc}>
            {badge.description || "Keep contributing to unlock this badge."}
          </ThemedText>
          <ThemedText style={[
            styles.badgeStatus,
            { color: earned ? "#1F9254" : "#9BA8C0" },
          ]}>
            {earned
              ? "Earned"
              : `In progress · ${badge.requirement_value} ${badge.requirement_type.replace(/_/g, " ").toLowerCase()}`}
          </ThemedText>
        </View>

        {earned && (
          <Ionicons
            name="checkmark-circle"
            size={icon(22)}
            color="#1F9254"
          />
        )}
      </View>

      {index < count - 1 && <View style={styles.rowDivider} />}
    </React.Fragment>
  );

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>My Badges</ThemedText>
        <ThemedText style={styles.subtitle}>
          Earn badges by contributing to the AdvocAid PH community.
        </ThemedText>
      </ThemedView>

      <View style={styles.accentBar} />

      {isLoading ? (
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator color="#35408E" />
          <ThemedText style={styles.loadingText}>Loading badges...</ThemedText>
        </ThemedView>
      ) : isError ? (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText>Unable to load badges. Please try again.</ThemedText>
        </ThemedView>
      ) : (
        <>
          <ThemedView style={styles.summaryRow}>
            <ThemedView style={styles.summaryPill}>
              <Ionicons name="trophy-outline" size={icon(14)} color="#B36B00" />
              <ThemedText style={styles.summaryTxt}>
                {earnedBadges.length} of {badges.length} badges earned
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.sectionCard}>
            <ThemedView style={styles.sectionHeader}>
              <ThemedView style={styles.sectionIconBubble}>
                <Ionicons name="checkmark-circle-outline" size={icon(16)} color="#2E9E3A" />
              </ThemedView>
              <ThemedText style={styles.sectionTitle}>Earned Badges</ThemedText>
              <ThemedView style={styles.countPill}>
                <ThemedText style={styles.countTxt}>{earnedBadges.length}</ThemedText>
              </ThemedView>
            </ThemedView>

            <View style={styles.sectionDivider} />

            {earnedBadges.length === 0 ? (
              <ThemedView style={styles.emptyContainer}>
                <ThemedText>No earned badges to display yet.</ThemedText>
              </ThemedView>
            ) : (
              <ThemedView style={styles.badgeList}>
                {earnedBadges.map((badge, index) =>
                  renderBadge(badge, true, index, earnedBadges.length)
                )}
              </ThemedView>
            )}

            <View style={styles.sectionDivider} />

            <ThemedView style={styles.progressSection}>
              <ThemedText style={styles.sectionTitle}>Badge Progress</ThemedText>
              {inProgressBadges.length === 0 ? (
                <ThemedText style={styles.loadingText}>
                  All badges have been earned!
                </ThemedText>
              ) : (
                inProgressBadges.map((badge, index) =>
                  renderBadge(badge, false, index, inProgressBadges.length)
                )
              )}
            </ThemedView>
          </ThemedView>
        </>
      )}
    </ScrollView>
  );
}