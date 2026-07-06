import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    LayoutAnimation,
    Platform,
    StyleSheet,
    TouchableOpacity,
    UIManager,
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  question: string;
  answer: string;
};

export default function FaqDropdown({
  question,
  answer,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );
    setExpanded(!expanded);
  };

  return (
    <ThemedView style={styles.box}>
      <TouchableOpacity
        style={styles.header}
        activeOpacity={0.8}
        onPress={toggleDropdown}
      >
        <ThemedView style={styles.questionRow}>
            <ThemedView style={styles.iconBG}>
                <Feather
                    name="help-circle"
                    size={20}
                    color="#35408E"
                />
            </ThemedView>
          

          <ThemedText style={styles.question}>
            {question}
          </ThemedText>
        </ThemedView>

        <Ionicons
          name={
            expanded
              ? "chevron-up"
              : "chevron-forward"
          }
          size={20}
          color="#35408E"
        />
      </TouchableOpacity>

      {expanded && (
        <>
          <ThemedView style={styles.divider} />

          <ThemedText style={styles.answer}>
            {answer}
          </ThemedText>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    padding: 5,
    elevation: 2,
    shadowColor: "#1A1F5E",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  questionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    flex: 1,
  },

  question: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 20,
    marginBottom: 15,
  },

  answer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    fontSize: 13,
    lineHeight: 22,
    color: "#555",
  },

  iconBG: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#f0f0ff",
    justifyContent: "center",
    alignItems: "center",
  },
});