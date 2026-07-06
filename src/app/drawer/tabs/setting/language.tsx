import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fontisto } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const LANGUAGES = [
  "English",
  "Tagalog",
  "Hiligaynon",
  "Cebuano",
  "Ilocano",
  "Bicolano",
  "Chavacano",
];

export default function Language() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView>
        <ThemedView style={styles.headerContainer}>
          <ThemedText style={styles.headerTxt}>
            Set any Language to your preference.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.line}></ThemedView>

        <ThemedView style={styles.container}>
          <ThemedView style={styles.boxBG}>
            <ThemedText style={styles.title}>
              Language
            </ThemedText>

            {LANGUAGES.map((language) => (
              <TouchableOpacity
                key={language}
                style={styles.row}
                activeOpacity={0.7}
                onPress={() => setSelectedLanguage(language)}
              >
                <Fontisto
                  name={
                    selectedLanguage === language
                      ? "radio-btn-active"
                      : "radio-btn-passive"
                  }
                  size={16}
                  color={
                    selectedLanguage === language
                      ? "#35408E"
                      : "#B0B7C3"
                  }
                />

                <ThemedText
                  style={[
                    styles.language,
                    selectedLanguage === language &&
                      styles.languageSelected,
                  ]}
                >
                  {language}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
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

  headerContainer: {
    padding: 20,
  },

  headerTxt: {
    fontSize: 12, 
    fontWeight: "400",
    textAlign: "center"
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
    paddingVertical: 10,
    gap: 20,
    alignItems: "center"
  },

  boxBG: {
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    padding: 15,
    elevation: 2,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 15,
    lineHeight: 25
  },

  container: {
    padding: 15
  },

  language: {
    fontSize: 15,
    color: "#333",
  },

  languageSelected: {
    fontWeight: "700",
    color: "#35408E",
  },
});