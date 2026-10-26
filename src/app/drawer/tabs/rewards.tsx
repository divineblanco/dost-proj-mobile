// import BadgeCard from "@/components/cards/badge-card";
// import EarnPointsCard from "@/components/cards/earn-points";
// import Leaderboard from "@/components/cards/leaderboard";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { icon, useResponsive } from "@/styles/responsive";
// import { rewardsPageStyles } from "@/styles/rewards/rewards-styles";
// import { MaterialIcons } from "@expo/vector-icons";
// import React, { useMemo } from "react";
// import {
//   ScrollView
// } from "react-native";

// export default function Rewards() {
//   const r = useResponsive();
//   const styles = useMemo(() => rewardsPageStyles(r), [r]);
  
//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={styles.scrollContent}
//     >
//       <ThemedView style={styles.pageInner}>
//         <ThemedView style={styles.headerContainer}>
//           <ThemedText type="title" style={{ textAlign: "left" }}>
//             Community Rewards
//           </ThemedText>
//         </ThemedView>

//         <ThemedView style={styles.rewardsContainer}>

//           <ThemedView style={styles.card}>
//             <ThemedText style={styles.pointsTitle}>My Community Points</ThemedText>

//             <ThemedView style={styles.horizontalDivider} />

//             <ThemedView style={styles.pointsContent}>
//               <MaterialIcons
//                 name="stars"
//                 size={icon(50)}
//                 color="#f6bd04"
//               />

//               <ThemedView style={styles.pointsColumn}>
//                 <ThemedText style={styles.points}>1,240</ThemedText>
//                 <ThemedText style={styles.totalTxt}>Total Points</ThemedText>
//               </ThemedView>

//               <ThemedView style={styles.verticalDivider} />

//               <ThemedView style={styles.rankColumn}>
//                 <ThemedText style={styles.rank}>Rank</ThemedText>
//                 <ThemedText style={styles.rankNo}>#12</ThemedText>
//                 <ThemedText style={styles.month}>This Month</ThemedText>
//               </ThemedView>
//             </ThemedView>

//             <ThemedView style={styles.progressTrack}>
//               <ThemedView style={styles.progressFill} />
//             </ThemedView>

//             <ThemedView style={styles.levelRow}>
//               <ThemedText style={styles.level}>
//                 760 pts to next level
//               </ThemedText>

//               <ThemedText style={styles.level}>
//                 Level: Advocate
//               </ThemedText>
//             </ThemedView>
//           </ThemedView>

//           <EarnPointsCard/>

//           <BadgeCard returnTo="/drawer/tabs/rewards" />

//           <Leaderboard/>

//         </ThemedView>

        
        

//       </ThemedView>
//     </ScrollView>
//   );
// }

import BadgeCard from "@/components/cards/badge-card";
import EarnPointsCard from "@/components/cards/earn-points";
import Leaderboard from "@/components/cards/leaderboard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormQuery from "@/lib/hooks/useFormQuery";
import {
  Contribution,
  RewardBadge,
  RewardLevel,
  RewardRule,
  extractItems,
  getCurrentLevel,
  getNextLevel,
} from "@/lib/types/rewards";
import { icon, useResponsive } from "@/styles/responsive";
import { rewardsPageStyles } from "@/styles/rewards/rewards-styles";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { ScrollView } from "react-native";

const API_HEADERS = {
  "x-api-key": "testing",
  "x-api-version": "2026-02-26",
};

export default function Rewards() {
  const { token, user, isLoading: authLoading } = useAuth();
  const r = useResponsive();
  const styles = useMemo(() => rewardsPageStyles(r), [r]);
  const userId = String(user?.user_id ?? "").trim();
  const enabled = Boolean(token && userId);

  const headers = useMemo(
    () => ({ ...API_HEADERS, Authorization: token ? `Bearer ${token}` : undefined }),
    [token]
  );

  const { data: levelsResponse, isLoading: levelsLoading } = useFormQuery({
    key: ["reward-levels"], url: "maintenance/rewards", headers, enabled: Boolean(token),
  });

  const { data: rulesResponse, isLoading: rulesLoading } = useFormQuery({
    key: ["reward-point-rules"], url: "maintenance/rewards/rule", headers, enabled: Boolean(token),
  });

  const { data: badgesResponse, isLoading: badgesLoading } = useFormQuery({
    key: ["reward-badges"], url: "maintenance/rewards/badge", headers, enabled: Boolean(token),
  });

  const { data: contributionsResponse, isLoading: contributionsLoading } = useFormQuery({
    key: ["my-contributions", userId],
    url: "maintenance/contribution",
    headers,
    enabled,
    params: { limit: 100, orderBy: "created_at", sortBy: "desc", user_id: userId },
  });

  const levels = useMemo(() => extractItems<RewardLevel>(levelsResponse), [levelsResponse]);
  const rules = useMemo(() => extractItems<RewardRule>(rulesResponse), [rulesResponse]);
  const badges = useMemo(() => extractItems<RewardBadge>(badgesResponse), [badgesResponse]);
  const contributions = useMemo(
    () => extractItems<Contribution>(contributionsResponse).filter((item) => !item.is_deleted),
    [contributionsResponse]
  );

  const approvedContributions = contributions.filter(
    (item) => item.status === "APPROVED" && item.classification !== "MISINFORMATION"
  );
  const approvedMisinformation = contributions.filter(
    (item) => item.status === "APPROVED" && item.classification === "MISINFORMATION"
  );
  const approvedMedia = contributions.filter(
    (item) => item.status === "APPROVED" && Boolean(item.image_url || item.source_url)
  );

  // Estimate only; confirm the backend's award rules before treating this as the official balance.
  const rewardEstimate = useMemo(() => {
    const activeRules = rules.filter((rule) => rule.is_active);
    const getPoints = (actionType: string) =>
      activeRules.find((rule) => rule.action_type === actionType)?.points ?? 0;

    return (
      approvedContributions.length * getPoints("EXPERIENCE") +
      approvedMisinformation.length * getPoints("MISINFORMATION") +
      approvedMedia.length * getPoints("MEDIA")
    );
  }, [rules, approvedContributions.length, approvedMisinformation.length, approvedMedia.length]);

  const currentLevel = getCurrentLevel(rewardEstimate, levels);
  const nextLevel = getNextLevel(rewardEstimate, levels);

  const progress = nextLevel
    ? Math.min(100, Math.max(0,
        ((rewardEstimate - (currentLevel?.min_points ?? 0)) /
          Math.max(1, nextLevel.min_points - (currentLevel?.min_points ?? 0))) * 100
      ))
    : 100;

  const loading = authLoading || levelsLoading || rulesLoading || badgesLoading || contributionsLoading;

  console.log(token);
  
  return (
    <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent}>
      <ThemedView style={styles.pageInner}>
        <ThemedView style={styles.headerContainer}>
          <ThemedText type="title" style={{ textAlign: "left" }}>Community Rewards</ThemedText>
        </ThemedView>

        <ThemedView style={styles.rewardsContainer}>
          <ThemedView style={styles.card}>
            <ThemedText style={styles.pointsTitle}>My Community Points</ThemedText>
            <ThemedView style={styles.horizontalDivider} />

            {loading ? (
              <ThemedText>Loading your rewards...</ThemedText>
            ) : (
              <>
                <ThemedView style={styles.pointsContent}>
                  <MaterialIcons name="stars" size={icon(50)} color="#f6bd04" />

                  <ThemedView style={styles.pointsColumn}>
                    <ThemedText style={styles.points}>{rewardEstimate.toLocaleString()}</ThemedText>
                    <ThemedText style={styles.totalTxt}>Total Points</ThemedText>
                  </ThemedView>

                  <ThemedView style={styles.verticalDivider} />

                  <ThemedView style={styles.rankColumn}>
                    <ThemedText style={styles.rank}>Rank</ThemedText>
                    <ThemedText style={styles.rankNo}>#0</ThemedText>
                    <ThemedText style={styles.month}>This Month</ThemedText>
                  </ThemedView>
                </ThemedView>

                <ThemedView style={styles.progressTrack}>
                  <ThemedView style={[styles.progressFill, { width: `${progress}%` }]} />
                </ThemedView>

                <ThemedView style={styles.levelRow}>
                  <ThemedText style={styles.level}>
                    {nextLevel
                      ? `${Math.max(0, nextLevel.min_points - rewardEstimate).toLocaleString()} pts to next level`
                      : "Highest level reached"}
                  </ThemedText>
                  <ThemedText style={styles.level}>{currentLevel?.name ?? "Newcomer"}</ThemedText>
                </ThemedView>
              </>
            )}
          </ThemedView>

          <EarnPointsCard />
          <BadgeCard
            returnTo="/drawer/tabs/rewards"
            badges={badges}
            approvedContributions={approvedContributions.length}
            approvedMisinformation={approvedMisinformation.length}
            approvedMedia={approvedMedia.length}
            totalPoints={rewardEstimate}
          />
          <Leaderboard />
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}