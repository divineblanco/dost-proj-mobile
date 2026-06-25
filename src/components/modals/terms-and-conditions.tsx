import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
};

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
    body: "Users agree to provide accurate and truthful information when creating an account, use the application only for lawful purposes, and refrain from attempting unauthorized access to the system or interfering with the application's functionality. Users are solely responsible for all activities conducted under their accounts.",
  },
  {
    number: "4",
    heading: "Privacy and Data Collection",
    body: "The application may collect certain user information, including name or username, email address, location-based data, and user-generated content and interactions. Collected information will be used solely for improving system functionality, analytics, research, and public health monitoring, in accordance with applicable data privacy laws.",
  },
  {
    number: "5",
    heading: "Geolocation and Mapping Features",
    body: "Some features of the application may utilize location-based services to provide geospatial insights and nearby health-related resources. By enabling location access, users consent to the collection and processing of location information for application functionality.",
  },
];

export default function TermsAndConditions({ visible, onClose }: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent={false} statusBarTranslucent>
      <View style={styles.screen}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <ThemedText style={styles.headerTitle}>TERMS AND CONDITIONS</ThemedText>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
            <Ionicons name="close" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.headerDivider} />

        {/* Intro */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText style={styles.intro}>
            Welcome to AdvocAid PH. By accessing or using the application, you agree to comply with
            and be bound by the following terms. Please read them carefully before using the app.
          </ThemedText>

          {/* Sections */}
          {sections.map((s) => (
            <View key={s.number} style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionNumber}>
                  <ThemedText style={styles.sectionNumberText}>{s.number}</ThemedText>
                </View>
                <ThemedText style={styles.sectionHeading}>{s.heading}</ThemedText>
              </View>
              <ThemedText style={styles.sectionBody}>{s.body}</ThemedText>
            </View>
          ))}

          <View style={styles.bottomPad} />
        </ScrollView>

        {/* Footer action */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.agreeBtn} onPress={onClose} activeOpacity={0.85}>
            <ThemedText style={styles.agreeBtnText}>I Agree and Understand</ThemedText>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F9FD",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1F5E",
    lineHeight: 25
  },

  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  headerDivider: {
    height: 3,
    backgroundColor: "#35408E",
    marginHorizontal: 20,
    borderRadius: 2,
  },

  // Scroll
  scroll: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
    gap: 4,
  },

  intro: {
    fontSize: 13,
    color: "#35408E",
    lineHeight: 20,
    marginBottom: 16,
  },

  // Section
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F0F2F8",
    gap: 8,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  sectionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    opacity: 0.55,
    backgroundColor: "#35408E",
    justifyContent: "center",
    alignItems: "center",
  },

  sectionNumberText: {
    fontSize: 11,
    fontWeight: "700",
    color: "white",
  },

  sectionHeading: {
    fontSize: 13,
    fontWeight: "700",
    color: "#35408E",
    flex: 1,
  },

  sectionBody: {
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 19,
  },

  bottomPad: {
    height: 8,
  },

  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F2F8",
  },

  agreeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    backgroundColor: "#35408E",
    paddingVertical: 13,
    borderRadius: 10,
    shadowColor: "#35408E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 5,
  },

  agreeBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});