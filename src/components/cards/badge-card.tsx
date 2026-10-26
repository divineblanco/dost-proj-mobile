// import { BADGES } from "@/app/drawer/tabs/badges/badges-data";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { icon, useResponsive } from "@/styles/responsive";
// import { badgeCardStyles } from "@/styles/rewards/rewards-components-styles";
// import { SimpleLineIcons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React, { useMemo } from "react";
// import { TouchableOpacity } from "react-native";

// type BadgeCardProps = {
//   returnTo: string;
// };

// export default function BadgeCard({ returnTo }: BadgeCardProps) {
//   const r = useResponsive();
//   const styles = useMemo(() => badgeCardStyles(r), [r]);

//   return (
//     <ThemedView style={styles.badgeCard}>
//       <ThemedView style={styles.sectionRow}>
//         <ThemedText style={styles.sectionTitle}>
//           My Badges
//         </ThemedText>

//         <TouchableOpacity
//           onPress={() =>
//             router.push({
//               pathname: "/drawer/tabs/badges/view-badges",
//               params: {
//                 returnTo,
//               },
//             })
//           }
//         >
//           <ThemedText style={styles.view}>
//             View All
//           </ThemedText>
//         </TouchableOpacity>
//       </ThemedView>

//       <ThemedView style={styles.badgesContainer}>
//         {BADGES.map((badge) => (
//           <ThemedView
//             key={badge.id}
//             style={styles.badgeItem}
//           >
//             <ThemedView style={styles.badgeIconContainer}>
//               <SimpleLineIcons
//                 name="badge"
//                 size={icon(28)}
//                 color="#35408E"
//               />
//             </ThemedView>

//             <ThemedText style={styles.badgeLabel}>
//               {badge.title}
//             </ThemedText>
//           </ThemedView>
//         ))}
//       </ThemedView>
//     </ThemedView>
//   );
// }

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { RewardBadge } from "@/lib/types/rewards";
import { font, icon, useResponsive } from "@/styles/responsive";
import { badgeCardStyles } from "@/styles/rewards/rewards-components-styles";
import { SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";

export type BadgeCardProps = {
  returnTo: string;
  badges: RewardBadge[];
  approvedContributions: number;
  approvedMisinformation: number;
  approvedMedia: number;
  totalPoints: number;
};

export default function BadgeCard({
  returnTo, badges, approvedContributions, approvedMisinformation, approvedMedia, totalPoints,
}: BadgeCardProps) {
  const r = useResponsive();
  const styles = useMemo(() => badgeCardStyles(r), [r]);

  const meetsRequirement = (badge: RewardBadge): boolean => {
    switch (badge.requirement_type) {
      case "APPROVED_CONTRIBUTIONS": return approvedContributions >= badge.requirement_value;
      case "APPROVED_MISINFORMATION": return approvedMisinformation >= badge.requirement_value;
      case "APPROVED_MEDIA": return approvedMedia >= badge.requirement_value;
      case "TOTAL_POINTS": return totalPoints >= badge.requirement_value;
      default: return false;
    }
  };

  const sortedBadges = useMemo(
    () => [...badges].filter((badge) => badge != null).sort((a, b) => a.requirement_value - b.requirement_value),
    [badges]
  );

  const earnedCount = sortedBadges.filter(meetsRequirement).length;

  return (
    <ThemedView style={styles.badgeCard}>
      <ThemedView style={styles.sectionRow}>
        <ThemedText style={styles.sectionTitle}>My Badges</ThemedText>
        <TouchableOpacity onPress={() => router.push({
          pathname: "/drawer/tabs/badges/view-badges",
          params: { returnTo },
        })}>
          <ThemedText style={styles.view}>View All</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* <ThemedText style={{ marginBottom: verticalScale(12) }}>
        {earnedCount} of {sortedBadges.length} badges earned
      </ThemedText> */}

      {sortedBadges.length === 0 ? (
        <ThemedText>No active badge definitions found.</ThemedText>
      ) : (
        <ThemedView style={styles.badgesContainer}>
          {sortedBadges.slice(0, 3).map((badge) => {
            const earned = meetsRequirement(badge);

            return (
              <ThemedView key={badge.badge_id} style={styles.badgeItem}>
                <ThemedView style={styles.badgeIconContainer}>
                  <SimpleLineIcons name="badge" size={icon(28)} color={earned ? "#1F9254" : "#9BA8C0"} />
                </ThemedView>

                <ThemedText style={styles.badgeLabel}>{badge.name}</ThemedText>
                <ThemedText style={{
                  fontSize: font(11),
                  color: earned ? "#1F9254" : "#9BA8C0",
                  textAlign: "center",
                }}>
                  {earned ? "Earned" : "In progress"}
                </ThemedText>
              </ThemedView>
            );
          })}
        </ThemedView>
      )}
    </ThemedView>
  );
}