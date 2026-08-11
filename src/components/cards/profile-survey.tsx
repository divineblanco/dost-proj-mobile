import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { profileStyles as styles } from "@/styles/profile-styles";
import { icon } from "@/styles/responsive";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

const surveys = [
  {
    id: 1,
    title: "Feedback Survey Form",
    desc: "Share your overall experience with AdvocAid PH.",
    icon: "message-square",
    iconColor: "#3781C1",
    iconBg: "#E8F3FD",
  },
  {
    id: 2,
    title: "Application Usability Survey",
    desc: "Help us improve the app's design and features.",
    icon: "smartphone",
    iconColor: "#2E9E3A",
    iconBg: "#EAFBE7",
  },
];

export function SurveyCard() {
  return (
    <ThemedView style={styles.surveyCard}>

      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.sectionTitle}>Surveys</ThemedText>
      </ThemedView>

      <ThemedView style={styles.divider} />

      {/* Description */}
      <ThemedText style={styles.desc}>
        Take a moment to answer our surveys at your convenience. Your feedback helps us improve
        the platform and better serve the community.
      </ThemedText>

      {/* Survey items */}
      <ThemedView style={styles.list}>
        {surveys.map((item, index) => (
          <ThemedView key={item.id}>
            <TouchableOpacity style={styles.surveyRow} activeOpacity={0.75}>
              <ThemedView style={[styles.iconBubble, { backgroundColor: item.iconBg }]}>
                <Feather name={item.icon as any} size={icon(18)} color={item.iconColor} />
              </ThemedView>

              <ThemedView style={styles.textCol}>
                <ThemedText style={styles.surveyTitle}>{item.title}</ThemedText>
                <ThemedText style={styles.surveyDesc}>{item.desc}</ThemedText>
              </ThemedView>

              <ThemedView style={styles.chevronBtn}>
                <Ionicons name="chevron-forward" size={icon(14)} color="#9BA8C0" />
              </ThemedView>
            </TouchableOpacity>

            {index < surveys.length - 1 && <ThemedView style={styles.rowDivider} />}
          </ThemedView>
        ))}
      </ThemedView>

    </ThemedView>
  );
}