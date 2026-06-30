import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

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
    <ThemedView style={styles.card}>

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
                <Feather name={item.icon as any} size={18} color={item.iconColor} />
              </ThemedView>

              <ThemedView style={styles.textCol}>
                <ThemedText style={styles.surveyTitle}>{item.title}</ThemedText>
                <ThemedText style={styles.surveyDesc}>{item.desc}</ThemedText>
              </ThemedView>

              <ThemedView style={styles.chevronBtn}>
                <Ionicons name="chevron-forward" size={14} color="#9BA8C0" />
              </ThemedView>
            </TouchableOpacity>

            {index < surveys.length - 1 && <ThemedView style={styles.rowDivider} />}
          </ThemedView>
        ))}
      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    padding: 16,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    backgroundColor: "transparent",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20
  },

  divider: {
    height: 1,
    backgroundColor: "#F0F2F8",
    marginBottom: 12,
  },

  desc: {
    fontSize: 11,
    color: "#6B7280",
    lineHeight: 15,
    marginBottom: 14,
  },

  list: {
    backgroundColor: "transparent",
  },

  surveyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },

  iconBubble: {
    width: 42,
    height: 42,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  textCol: {
    flex: 1,
    gap: 2,
    backgroundColor: "transparent",
  },

  surveyTitle: {
    fontSize: 14,
    fontWeight: "700",
  },

  surveyDesc: {
    fontSize: 11,
    color: "#6B7280",
    lineHeight: 16,
  },

  chevronBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#F8F9FD",
    borderWidth: 1,
    borderColor: "#E8EAF0",
    justifyContent: "center",
    alignItems: "center",
  },

  rowDivider: {
    height: 1,
    backgroundColor: "#F0F2F8",
  },
});