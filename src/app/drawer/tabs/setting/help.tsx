import FaqDropdown from "@/components/dropdown/faq-dropdown";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
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
                  <Ionicons name="warning" size={18} color="#C62828" />
                </ThemedView>
                <ThemedView style={{ gap: 2, backgroundColor: "transparent" }}>
                  <ThemedText style={styles.reportTitle}>Report a Problem</ThemedText>
                  <ThemedText style={styles.reportSubtitle}>
                    Encountered a bug or issue? Let us know.
                  </ThemedText>
                </ThemedView>
              </ThemedView>
              <Ionicons name="chevron-forward" size={16} color="white" />
            </TouchableOpacity>
        </ThemedView>
        

        <ThemedView style={styles.line}></ThemedView>



        <ThemedView style={styles.questionContainer}>
          <ThemedText style={styles.title}>
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

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
  },
  scrollContent: {
    paddingBottom: 95,
  },

  reportContainer: {
    padding: 20
  },

  reportBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#c91010c6",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#FECACA",
    padding: 14,
    shadowColor: "#c91010c6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
 
  reportBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "transparent",
    flex: 1,
  },
 
  reportIconBubble: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
  },
 
  reportTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
  },
 
  reportSubtitle: {
    fontSize: 11,
    color: "white",
  },

  line: {
    backgroundColor: "#c7c7c7",
    padding: 0.5,
    width: "85%",
    alignSelf: "center",
    marginBottom: 15
  },

  row: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between"
  },

  boxBG: {
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    padding: 5,
    elevation: 2,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },

  title: {
    fontSize: 15,
    fontWeight: "bold",
    paddingBlockStart: 10,
  },
  
  questionContainer: {
    padding: 15,
    gap: 10
  },

  questionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    flex: 1,
  },

  question: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    flexWrap: "wrap",
  },

});