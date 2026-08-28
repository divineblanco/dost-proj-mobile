import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { settingsStyles } from "@/styles/settings/settings-styles";
import { Fontisto } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  TouchableOpacity
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

      const r = useResponsive();
            
      const styles = useMemo(() => settingsStyles(r), [r]);

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

        <ThemedView style={styles.dividerLine}></ThemedView>

        <ThemedView style={styles.languageContainer}>
          <ThemedView style={styles.boxBG}>
            <ThemedText style={styles.languageTitle}>
              Language
            </ThemedText>

            {LANGUAGES.map((language) => (
              <TouchableOpacity
                key={language}
                style={styles.languageRow}
                activeOpacity={0.7}
                onPress={() => setSelectedLanguage(language)}
              >
                <Fontisto
                  name={
                    selectedLanguage === language
                      ? "radio-btn-active"
                      : "radio-btn-passive"
                  }
                  size={icon(16)}
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