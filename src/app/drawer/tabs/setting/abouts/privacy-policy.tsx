import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const sections = [
  {
    number: "1",
    heading: "Information We Collect",
    subsections: [
      {
        label: "1.1 Personal Information",
        body: "Name or username, email address, and account credentials (stored encrypted).",
      },
      {
        label: "1.2 Usage Data",
        body: "App interactions and navigation behavior, features accessed and time spent in the app, and error logs and performance data.",
      },
      {
        label: "1.3 Location Data",
        body: "Approximate or precise location (if enabled by the user) for geospatial mapping and health resource features.",
      },
    ],
  },
  {
    number: "2",
    heading: "How We Use Your Information",
    body: "The collected data is used to provide and maintain app functionality, improve user experience and system performance, support geospatial mapping and health-related insights, conduct research and analytics for public health awareness, and communicate updates, alerts, or important notices.",
  },
  {
    number: "3",
    heading: "Data Sharing and Disclosure",
    body: "We do not sell your personal data. Information may be shared with authorized research or academic partners (in anonymized form), when required by law or legal process, or to protect the rights, safety, or security of users and the application.",
  },
];

export default function PrivacyPolicy() {
  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedView style={styles.headerLeft}>
          <ThemedText style={styles.title}>Privacy Policy</ThemedText>
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
          This Privacy Policy describes how AdvocAid PH collects, uses, stores, and protects
          your information when you use the mobile application. By using the app, you agree to
          the practices described in this policy.
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