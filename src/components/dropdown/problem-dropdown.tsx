import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
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

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdown}
        activeOpacity={0.8}
        onPress={() => setExpanded(!expanded)}
      >
        <ThemedText style={styles.selectedText}>
          {selectedProblem}
        </ThemedText>

        <Ionicons
          name={
            expanded
              ? "chevron-up"
              : "chevron-down"
          }
          size={18}
          color="#35408E"
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.menu}>
            <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={true}
            >
            {PROBLEMS.map((problem) => (
                <TouchableOpacity
                key={problem}
                style={styles.item}
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
                    size={18}
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

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#F0F3FA",
    borderWidth: 1.5,
    borderColor: "#E8EAF0",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  selectedText: {
    fontSize: 14,
    color: "#374151",
  },

  menu: {
    marginTop: 50,
    maxHeight: 240,
    width: "100%",
    borderWidth: 1,
    borderColor: "#E8EAF0",
    borderRadius: 10,
    backgroundColor: "#FFF",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    position: "absolute",
    zIndex: 999,
  },

  item: {
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemText: {
    fontSize: 14,
  },
});