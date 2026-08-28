import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useResponsive } from "@/styles/responsive";
import { legalStyles } from "@/styles/settings/about-styles";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";

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

  const r = useResponsive();
              
  const styles = useMemo(() => legalStyles(r), [r]);

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