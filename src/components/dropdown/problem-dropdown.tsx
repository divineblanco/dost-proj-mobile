import { ThemedText } from "@/components/themed-text";
import { icon, useResponsive } from "@/styles/responsive";
import { problemDropdownStyles } from "@/styles/settings/help-problem-styles";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

const PROBLEMS = [
  "Bug",
  "App Crash",
  "Login Issue",
  "Account Problem",
  "Location/Map Issue",
  "Performance Issue",
  "Incorrect Information",
  "Other",
];

type Props = {
  selectedProblem: string;
  setSelectedProblem: (value: string) => void;
};

export default function ProblemDropdown({
  selectedProblem,
  setSelectedProblem,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const r = useResponsive();
  const styles = useMemo(
    () => problemDropdownStyles(r),
    [r]
  );

  return (
    <View style={styles.container}>
      {/* Dropdown Button */}
      <TouchableOpacity
        style={styles.dropdown}
        activeOpacity={0.8}
        onPress={() => setExpanded(!expanded)}
      >
        <ThemedText style={styles.selectedText}>
          {selectedProblem}
        </ThemedText>

        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={icon(18)}
          color="#35408E"
        />
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {expanded && (
        <View style={styles.menu}>
          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={true}
            bounces={false}
          >
            {PROBLEMS.map((problem) => (
              <TouchableOpacity
                key={problem}
                style={styles.item}
                activeOpacity={0.7}
                onPress={() => {
                  setSelectedProblem(problem);
                  setExpanded(false);
                }}
              >
                <ThemedText style={styles.itemText}>
                  {problem}
                </ThemedText>

                {selectedProblem === problem && (
                  <Ionicons
                    name="checkmark"
                    size={icon(18)}
                    color="#35408E"
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
