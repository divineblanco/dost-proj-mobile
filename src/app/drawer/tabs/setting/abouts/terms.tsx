import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const sections = [
  {
    number: "1",
    heading: "Acceptance of Terms",
    body: "By creating an account, accessing, or using AdvocAid PH, you acknowledge that you have read, understood, and agreed to these Terms and Conditions. If you do not agree with any part of these terms, you may discontinue use of the application.",
  },
  {
    number: "2",
    heading: "Purpose of the Application",
    body: "AdvocAid PH is an informational and awareness-based platform designed to provide users with access to HIV-related educational resources, health insights, geospatial information, and community support features. The application is intended for research, educational, and public health awareness purposes only.",
  },
  {
    number: "3",
    heading: "User Responsibilities",
    subsections: [
      {
        label: "Users agree to:",
        body:
          "• Provide accurate and truthful information when creating an account.\n\n" +
          "• Use the application only for lawful purposes.\n\n" +
          "• Respect other users and avoid posting harmful, offensive, discriminatory, or misleading content.\n\n" +
          "• Refrain from attempting unauthorized access to the system or interfering with the application's functionality.\n\n" +
          "Users are solely responsible for all activities conducted under their accounts.",
      },
    ],
  },
  {
    number: "4",
    heading: "Privacy and Data Collection",
    subsections: [
      {
        label: "The application may collect:",
        body:
          "• Name or username\n" +
          "• Email address\n" +
          "• Location information (with permission)\n" +
          "• User-generated reports and contributions\n" +
          "• Usage analytics and application performance data",
      },
      {
        label: "Purpose",
        body:
          "This information is collected solely to improve application functionality, enhance user experience, support research initiatives, and provide accurate public health information.",
      },
    ],
  },
];

export default function Terms() {
  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedView style={styles.headerLeft}>
          <ThemedText style={styles.title}>Terms of Use</ThemedText>
        </ThemedView>

        <ThemedView style={styles.datePill}>
          <Ionicons name="time-outline" size={12} color="#9BA8C0" />
          <ThemedText style={styles.dateText}>Last updated: May 25, 2026</ThemedText>
        </ThemedView>
      </ThemedView>

      <View style={styles.accentBar} />

      {/* Intro */}
      <ThemedView style={styles.introCard}>
        <ThemedText style={styles.introText}>
          Welcome to the AdvocAid PH mobile application. By accessing or using the application,
          you agree to comply with and be bound by the following Terms and Conditions. Please
          read them carefully before using the application.
        </ThemedText>
      </ThemedView>

      {/* Sections */}
      <ThemedView style={styles.sectionsContainer}>
        {sections.map((s) => (
          <ThemedView key={s.number} style={styles.sectionCard}>
            <ThemedView style={styles.sectionHeader}>
              <ThemedView style={styles.sectionNumber}>
                <ThemedText style={styles.sectionNumberText}>{s.number}</ThemedText>
              </ThemedView>
              <ThemedText style={styles.sectionHeading}>{s.heading}</ThemedText>
            </ThemedView>

            {s.body && (
              <ThemedText style={styles.sectionBody}>{s.body}</ThemedText>
            )}

            {s.subsections?.map((sub) => (
              <ThemedView key={sub.label} style={styles.subsection}>
                <ThemedText style={styles.subsectionLabel}>{sub.label}</ThemedText>
                <ThemedText style={styles.sectionBody}>{sub.body}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#F8F9FD",
  },

  scrollContent: {
    paddingBottom: 100,
    padding: 20,
    gap: 12,
  },

  // Header
  header: {
    gap: 8,
    backgroundColor: "transparent",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "transparent",
  },

  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#EEF0FA",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#35408E",
    lineHeight: 30
  },

  datePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "transparent",
  },

  dateText: {
    fontSize: 12,
    color: "#9BA8C0",
    fontWeight: "500",
  },

  accentBar: {
    height: 3,
    width: "100%",
    backgroundColor: "#35408E",
    borderRadius: 2,
  },

  // Intro card
  introCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    padding: 16,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  introText: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 20,
  },

  // Sections
  sectionsContainer: {
    gap: 10,
    backgroundColor: "transparent",
  },

  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F0F2F8",
    padding: 16,
    gap: 10,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "transparent",
  },

  sectionNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#35408E",
    justifyContent: "center",
    alignItems: "center",
  },

  sectionNumberText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  sectionHeading: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1F5E",
    flex: 1,
  },

  sectionBody: {
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 19,
  },

  subsection: {
    backgroundColor: "#F8F9FD",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#D1D5E8",
    padding: 10,
    gap: 4,
  },

  subsectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#35408E",
  },
});