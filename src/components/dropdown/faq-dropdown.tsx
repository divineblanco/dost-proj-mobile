import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { icon, useResponsive } from "@/styles/responsive";
import { faqStyles } from "@/styles/settings/settings-components-styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager
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

  const r = useResponsive();
        
  const styles = useMemo(() => faqStyles(r), [r]);

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
                    size={icon(20)}
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
          size={icon(20)}
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
