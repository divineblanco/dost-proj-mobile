import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormQuery from "@/lib/hooks/useFormQuery";
import { SurveyResponse } from "@/lib/interface/survey-management/survey.interface";
import { SURVEY_URL } from "@/lib/services/api";
import { profileStyles } from "@/styles/profile/profile-styles";
import { icon, useResponsive } from "@/styles/responsive";
import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  Linking,
  TouchableOpacity,
  View,
} from "react-native";

export function SurveyCard() {
  const r = useResponsive();

  const { token, isLoading: authLoading } = useAuth();

  const styles = useMemo(
    () => profileStyles(r),
    [r]
  );

  const {
    data,
    isLoading,
  } = useFormQuery<SurveyResponse>({
    key: ["Survey"],
    url: "maintenance/survey",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-api-key": "testing",
      "x-api-version": "2026-02-26",
    },
    params: {
      limit: 10,
      orderBy: "created_at",
      sortBy: "desc",
      startCursor: "",
      endCursor: "",
    },
  });

  console.log("RESULT: ", data);

  const surveys = data?.data?.edges ?? [];

  return (
    <ThemedView style={styles.surveyCard}>

      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.sectionTitle}>
          Surveys
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.divider} />

      {/* Description */}
      <ThemedText style={styles.desc}>
        Take a moment to answer our surveys at your convenience.
        Your feedback helps us improve the platform and better
        serve the community.
      </ThemedText>

      {/* Survey items */}
      <ThemedView style={styles.list}>
        {surveys.map((
            {
              node: {
                title,
                description,
                survey_id,
                slug,
              },
            },
            index
          ) => (
            <View key={survey_id}>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `${SURVEY_URL}/survey/${slug}`
                  )
                }
                style={styles.surveyRow}
                activeOpacity={0.75}
              >
                {/* Icon */}
                <ThemedView style={[ styles.iconBubble, { backgroundColor: "#E8F3FD",},]}>
                  <MaterialCommunityIcons name="file-document-edit-outline"size={icon(18)} color="#3781C1"/>
                </ThemedView>

                {/* Text */}
                <ThemedView style={styles.textCol}>
                  <ThemedText style={styles.surveyTitle}>{title}</ThemedText>
                  <ThemedText style={styles.surveyDesc}>{description}</ThemedText>
                </ThemedView>

                {/* Arrow */}
                <ThemedView style={styles.chevronBtn}>
                  <Ionicons
                    name="chevron-forward"
                    size={icon(14)}
                    color="#9BA8C0"
                  />
                </ThemedView>
              </TouchableOpacity>

              {/* Divider */}
              {index < surveys.length - 1 && (
                <ThemedView style={styles.rowDivider} />
              )}
            </View>
          )
        )}
      </ThemedView>

    </ThemedView>
  );
}