// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { icon, useResponsive } from "@/styles/responsive";
// import { earnPointsStyles } from "@/styles/rewards/rewards-components-styles";
// import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
// import React, { useMemo } from "react";

// const earnPointsData = [
//   {
//     id: 1,
//     icon: <Ionicons name="chatbubble-outline" size={icon(15)} color="#1A1F5E" />,
//     label: "Share an Experience",
//     points: "+10 pts",
//   },
//   {
//     id: 2,
//     icon: <Feather name="alert-triangle" size={icon(15)} color="#1A1F5E" />,
//     label: "Report Misinformation",
//     points: "+15 pts",
//   },
//   {
//     id: 3,
//     icon: <MaterialIcons name="attach-file" size={icon(15)} color="#1A1F5E" />,
//     label: "Attach Image / Link",
//     points: "+20 pts",
//   },
// ];

// export default function EarnPointsCard() {
//   const r = useResponsive();
//   const styles = useMemo(() => earnPointsStyles(r), [r]);

//   return (
//     <ThemedView style={styles.earnCard}>
//       <ThemedText style={styles.title}>
//         How to Earn Points
//       </ThemedText>

//       {earnPointsData.map((item) => (
//         <ThemedView key={item.id} style={styles.rewardItem}>
//           <ThemedView style={styles.leftContent}>
//             {item.icon}
//             <ThemedText style={styles.label}>
//               {item.label}
//             </ThemedText>
//           </ThemedView>

//           <ThemedText style={styles.earnPoints}>
//             {item.points}
//           </ThemedText>
//         </ThemedView>
//       ))}
//     </ThemedView>
//   );
// }

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormQuery from "@/lib/hooks/useFormQuery";
import type { RewardRule } from "@/lib/types/rewards";
import { icon, useResponsive } from "@/styles/responsive";
import { earnPointsStyles } from "@/styles/rewards/rewards-components-styles";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useMemo } from "react";

const RULE_DISPLAY = {
  EXPERIENCE: { label: "Share an Experience" },
  MISINFORMATION: { label: "Report Misinformation" },
  MEDIA: { label: "Attach Image / Link" },
} as const;

function extractRewardRules(value: unknown): RewardRule[] {
  if (Array.isArray(value)) return value as RewardRule[];
  if (!value || typeof value !== "object") return [];

  const obj = value as Record<string, unknown>;

  for (const key of ["data", "items", "nodes", "results", "rules"]) {
    const result = obj[key];

    if (Array.isArray(result)) return result as RewardRule[];

    if (result && typeof result === "object") {
      const nested = extractRewardRules(result);
      if (nested.length) return nested;
    }
  }

  if (Array.isArray(obj.edges)) {
    return obj.edges
      .map((edge) =>
        edge && typeof edge === "object"
          ? (edge as Record<string, unknown>).node
          : null
      )
      .filter(
        (node): node is RewardRule =>
          node !== null &&
          typeof node === "object" &&
          "action_type" in node
      );
  }

  return [];
}

export default function EarnPointsCard() {
  const r = useResponsive();
  const styles = useMemo(() => earnPointsStyles(r), [r]);
    const { token, isLoading: authLoading } = useAuth();

  const { data: response, isLoading, isError } = useFormQuery<unknown>({
    key: ["maintenance", "rewards", "rule"],
    url: "/maintenance/rewards/rule",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-api-key": "testing",
      "x-api-version": "2026-02-26",
    },
  });

  const rules = useMemo(() => extractRewardRules(response), [response]);

  console.log(
    "Reward response:",
    JSON.stringify(response, null, 2)
  );

  console.log(
    "Extracted rules:",
    JSON.stringify(rules, null, 2)
  );

  console.log("Loading:", isLoading);
  console.log("Error:", isError);

  const renderIcon = (actionType: RewardRule["action_type"]) => {
    const props = { size: icon(15), color: "#1A1F5E" };

    switch (actionType) {
      case "EXPERIENCE":
        return <Ionicons name="chatbubble-outline" {...props} />;
      case "MISINFORMATION":
        return <Feather name="alert-triangle" {...props} />;
      case "MEDIA":
        return <MaterialIcons name="attach-file" {...props} />;
      default:
        return null;
    }
  };

  return (
    <ThemedView style={styles.earnCard}>
      <ThemedText style={styles.title}>How to Earn Points</ThemedText>

      {isLoading ? (
        <ThemedText>Loading reward rules...</ThemedText>
      ) : isError ? (
        <ThemedText>Unable to load reward rules.</ThemedText>
      ) : rules.length === 0 ? (
        <ThemedText>No reward rules were found in the API response.</ThemedText>
      ) : (
        rules.map((rule) => {
          const display = RULE_DISPLAY[rule.action_type];
          if (!display) return null;

          return (
            <ThemedView key={rule.reward_point_rule_id} style={styles.rewardItem}>
              <ThemedView style={styles.leftContent}>
                {renderIcon(rule.action_type)}
                <ThemedText style={styles.label}>{display.label}</ThemedText>
              </ThemedView>
              <ThemedText style={styles.earnPoints}>+{rule.points} pts</ThemedText>
            </ThemedView>
          );
        })
      )}
    </ThemedView>
  );
}