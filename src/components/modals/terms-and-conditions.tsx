import { ThemedText } from "@/components/themed-text";
import { authStyles as styles } from "@/styles/auth-styles";
import { icon } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onAccept: () => void;
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

export default function TermsAndConditions({
  visible,
  onClose,
  onAccept,
}: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      statusBarTranslucent
      supportedOrientations={[
      "portrait",
      "landscape",
    ]}
    >
      <View style={styles.tcScreen}>

        {/* Header */}
        <View style={styles.tcHeader}>
          <View style={styles.tcHeaderLeft}>
            <ThemedText style={styles.tcHeaderTitle}>
              TERMS AND CONDITIONS
            </ThemedText>
          </View>

          <TouchableOpacity
            onPress={onClose}
            style={styles.tcCloseBtn}
            activeOpacity={0.7}
          >
            <Ionicons
              name="close"
              size={icon(16)}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.tcHeaderDivider} />

        <ScrollView
          style={styles.tcScroll}
          contentContainerStyle={styles.tcScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText style={styles.tcIntro}>
            Welcome to AdvocAid PH. By accessing or using the application,
            you agree to comply with and be bound by the following terms.
            Please read them carefully before using the app.
          </ThemedText>

          {sections.map((s) => (
            <View key={s.number} style={styles.tcSection}>
              <View style={styles.tcSectionHeader}>
                <View style={styles.tcSectionNumber}>
                  <ThemedText style={styles.tcSectionNumberText}>
                    {s.number}
                  </ThemedText>
                </View>

                <ThemedText style={styles.tcSectionHeading}>
                  {s.heading}
                </ThemedText>
              </View>

              <ThemedText style={styles.tcSectionBody}>
                {s.body}
              </ThemedText>
            </View>
          ))}

          <View style={styles.tcBottomPad} />
        </ScrollView>

        <View style={styles.tcFooter}>
          <TouchableOpacity
            style={[styles.modalButton, { shadowColor: "#35408E" }]}
            activeOpacity={0.85}
            onPress={() => {
              onAccept();
              onClose();
            }}
          >
            <ThemedText style={styles.modalButtonText}>
              I Agree and Understand
            </ThemedText>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
}