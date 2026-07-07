import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

export default function AboutAdvocaid() {
  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Logo + identity */}
      <ThemedView style={styles.heroCard}>
        <ThemedView style={styles.logoWrapper}>
          <Image
            source={require("@/assets/images/splash-icon.png")}
            style={styles.logo}
          />
        </ThemedView>

        <ThemedText style={styles.appTitle}>AdvocAid PH</ThemedText>
        <ThemedText style={styles.appSubtitle}>
          Transforming Digital Conversations into HIV Intelligence: Geospatial AI for Public Health Surveillance
        </ThemedText>

        <ThemedView style={styles.poweredByPill}>
          <Ionicons name="school-outline" size={13} color="#FFFFFF" />
          <ThemedText style={styles.poweredByTxt}>Powered by National University</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* About section */}
      <ThemedView style={styles.sectionCard}>
        <ThemedView style={styles.sectionHeader}>
          <ThemedView style={styles.sectionIcon}>
            <Ionicons name="information-circle-outline" size={16} color="#35408E" />
          </ThemedView>
          <ThemedText style={styles.sectionTitle}>About the Project</ThemedText>
        </ThemedView>
        <View style={styles.sectionDivider} />
        <ThemedText style={styles.bodyText}>
          AdvocAid PH Toolkit is a geospatial AI-powered platform designed to transform online conversations
          into meaningful public health intelligence. The system collects and analyzes publicly available
          HIV-related discussions in multiple Philippine languages to identify trends, stigma, misinformation,
          and emerging public concerns in real time.
        </ThemedText>
        <ThemedText style={styles.bodyText}>
          By integrating advanced digital technologies with public health strategies, the project helps health
          authorities, researchers, and organizations better understand how HIV is discussed and perceived
          across different communities and regions.
        </ThemedText>
      </ThemedView>

      {/* Partner logos */}
      <ThemedView style={styles.sectionCard}>
        <ThemedView style={styles.sectionHeader}>
          <ThemedView style={styles.sectionIcon}>
            <Ionicons name="people-outline" size={16} color="#35408E" />
          </ThemedView>
          <ThemedText style={styles.sectionTitle}>Funded & Supported By</ThemedText>
        </ThemedView>
        <View style={styles.sectionDivider} />

        <ThemedView style={styles.logosRow}>
          <ThemedView style={styles.logoCard}>
            <Image
              source={require("@/assets/images/dost-logo.png")}
              style={styles.partnerLogo}
              resizeMode="contain"
            />
          </ThemedView>
          <ThemedView style={styles.logoCard}>
            <Image
              source={require("@/assets/images/dost-pchrd.png")}
              style={styles.partnerLogo}
              resizeMode="contain"
            />
          </ThemedView>
        </ThemedView>

        <ThemedText style={styles.bodyText}>
          The AdvocAid PH Toolkit is funded and supported by the{" "}
          <ThemedText style={styles.bold}>
            Department of Science and Technology – Philippine Council for Health Research and Development (DOST-PCHRD)
          </ThemedText>
          , recognizing the project's potential to contribute to innovative and data-driven public health solutions
          in the Philippines.
        </ThemedText>
        <ThemedText style={styles.bodyText}>
          Through its support, DOST-PCHRD strengthens the development of AI, Natural Language Processing (NLP),
          and geospatial analytics to address pressing national health concerns, particularly the growing HIV
          epidemic — enabling AdvocAid PH to empower health agencies, local government units, researchers, and
          communities with real-time public health intelligence.
        </ThemedText>
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
    padding: 20,
    paddingBottom: 100,
    gap: 14,
  },

  // Hero card
  heroCard: {
    backgroundColor: "#35408E",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    gap: 10,
    shadowColor: "#35408E",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  logoWrapper: {
    width: 90,
    height: 90,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  logo: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },

  appTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 4,
    lineHeight: 25
  },

  appSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
    lineHeight: 18,
  },

  poweredByPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 4,
  },

  poweredByTxt: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "600",
  },

  // Section cards
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    padding: 16,
    gap: 12,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "transparent",
  },

  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#EEF0FA",
    justifyContent: "center",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1F5E",
  },

  sectionDivider: {
    height: 1,
    backgroundColor: "#F0F2F8",
  },

  bodyText: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 20,
    textAlign: "justify",
  },

  bold: {
    fontWeight: "700",
    color: "#1A1F5E",
  },

  // Partner logos
  logosRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    backgroundColor: "transparent",
  },

  logoCard: {
    backgroundColor: "#F8F9FD",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  partnerLogo: {
    width: 120,
    height: 140,
  },
});