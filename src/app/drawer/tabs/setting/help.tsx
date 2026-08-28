import FaqDropdown from "@/components/dropdown/faq-dropdown";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { settingsStyles } from "@/styles/settings/settings-styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import {
  ScrollView,
  TouchableOpacity
} from "react-native";

const FAQS = [
  {
    question: "What is AdvocAid PH?",
    answer:
      "AdvocAid PH is a mobile application designed to provide HIV-related educational resources, awareness tools, and geospatial insights to support public health understanding and research.",
  },
  {
    question:
      "Is the information in the app a substitute for medical advice?",
    answer:
      "No. The app is for educational and informational purposes only. It should not be used as a substitute for professional medical consultation, diagnosis, or treatment.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Yes. AdvocAid PH uses security measures such as encryption and secure storage to protect your data. However, no system is completely secure, so users are encouraged to practice safe usage.",
  },
  {
    question:
      "What should I do if I encounter a problem or bug in the app?",
    answer:
      "You can report issues by contacting the support team. Providing details such as your device type, screenshots, and the steps to reproduce the issue will help resolve it faster.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact the AdvocAid PH support team through the in-app Report a Problem section or by using the official email address provided in the application settings.",
  },
  {
    question: "What platforms is AdvocAid PH available on?",
    answer:
      "AdvocAid PH is available on both Android and iOS devices. Support for additional platforms may be introduced in future updates.",
  },
  {
    question: "Is AdvocAid PH free to use?",
    answer:
      "Yes. AdvocAid PH is completely free to download and use. There are no subscription fees or hidden charges for accessing its core features.",
  },
  {
    question: "Do I need internet access to use the app?",
    answer:
      "Some features, such as maps, updates, and online resources, require an internet connection. However, certain educational content may remain available offline after it has been downloaded.",
  },
  {
    question:
      "Can I trust the health information provided in the app?",
    answer:
      "Yes. The educational information provided in AdvocAid PH is based on reliable public health resources. However, it should always be supplemented by advice from qualified healthcare professionals when making medical decisions.",
  },
];

export default function Help() {

      const r = useResponsive();
            
      const styles = useMemo(() => settingsStyles(r), [r]);
      
  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView>
        <ThemedView style={styles.reportContainer}>
            <TouchableOpacity
                style={styles.reportBanner}
                onPress={() => router.push("/drawer/tabs/setting/problem/report-problem")}
                activeOpacity={0.85}
            >
              <ThemedView style={styles.reportBannerLeft}>
                <ThemedView style={styles.reportIconBubble}>
                  <Ionicons name="warning" size={icon(18)} color="#C62828" />
                </ThemedView>
                <ThemedView style={{ gap: 2, backgroundColor: "transparent" }}>
                  <ThemedText style={styles.reportTitle}>Report a Problem</ThemedText>
                  <ThemedText style={styles.reportSubtitle}>
                    Encountered a bug or issue? Let us know.
                  </ThemedText>
                </ThemedView>
              </ThemedView>
              <Ionicons name="chevron-forward" size={icon(16)} color="white" />
            </TouchableOpacity>
        </ThemedView>
        

        <ThemedView style={styles.dividerLine}></ThemedView>



        <ThemedView style={styles.questionContainer}>
          <ThemedText style={styles.helpTitle}>
            Frequently Asked Questions
          </ThemedText>

          {FAQS.map((faq, index) => (
            <FaqDropdown
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </ThemedView>

      </ThemedView>
    </ScrollView>
  );
}