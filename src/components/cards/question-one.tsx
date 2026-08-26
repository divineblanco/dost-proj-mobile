import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { questionOneStyles } from "@/styles/contribute/contribute-question-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  Pressable,
  TextInput,
} from "react-native";

export type QuestionOneValue = {
  selected: string | null;
  otherText: string;
};

type QuestionOneProps = {
  value: QuestionOneValue;
  onChange: (value: QuestionOneValue) => void;
};

export function QuestionOne({
  value,
  onChange,
}: QuestionOneProps) {

  const options = [
    {
      label: "Public Discussion",
      icon: "person",
      color: "#41A5EE",
      bg: "#EEF7FE",
    },
    {
      label: "Resource Availability",
      icon: "verified",
      color: "#20BF55",
      bg: "#EDFAF3",
    },
    {
      label: "Healthcare Service",
      icon: "health-and-safety",
      color: "#E53935",
      bg: "#FFF0F0",
    },
    {
      label: "Community Event",
      icon: "home",
      color: "#1C5E3F",
      bg: "#E8F5EE",
    },
    {
      label: "Educational Content",
      icon: "menu-book",
      color: "#2E8292",
      bg: "#E8F6F8",
    },
    {
      label: "Other",
      icon: "more-horiz",
      color: "#6B7280",
      bg: "#F3F4F6",
    },
  ];

  const r = useResponsive();

  const styles = useMemo(
    () => questionOneStyles(r),
    [r]
  );

  const isOtherSelected =
    value.selected === "Other";

  const handleSelect = (label: string) => {

    onChange({
      selected: label,
      otherText:
        label === "Other"
          ? value.otherText
          : "",
    });
  };

  const handleOtherText = (text: string) => {

    onChange({
      ...value,
      otherText: text,
    });
  };

  return (
    <ThemedView>

      {/* OPTIONS */}

      <ThemedView style={styles.grid}>

        {options.map((item) => {

          const isSelected =
            value.selected === item.label;

          return (
            <Pressable
              key={item.label}
              style={[
                styles.box,
                isSelected &&
                  styles.boxSelected,
              ]}
              onPress={() =>
                handleSelect(item.label)
              }
            >

              {/* ICON */}

              <ThemedView
                style={[
                  styles.iconBubble,
                  {
                    backgroundColor:
                      item.bg,
                  },
                ]}
              >
                <MaterialIcons
                  name={
                    item.icon as keyof typeof MaterialIcons.glyphMap
                  }
                  size={icon(25)}
                  color={item.color}
                />
              </ThemedView>

              {/* LABEL */}

              <ThemedText
                style={[
                  styles.boxTitle,
                  isSelected &&
                    styles.boxTitleSelected,
                ]}
              >
                {item.label}
              </ThemedText>

              {/* CHECK */}

              <ThemedView
                style={[
                  styles.check,
                  isSelected &&
                    styles.checkSelected,
                ]}
              >
                {isSelected && (
                  <MaterialIcons
                    name="check"
                    size={icon(12)}
                    color="#FFFFFF"
                  />
                )}
              </ThemedView>

            </Pressable>
          );
        })}

      </ThemedView>

      {/* OTHER INPUT */}

      {isOtherSelected && (

        <ThemedView
          style={styles.otherInputContainer}
        >

          <ThemedText
            style={styles.otherInputLabel}
          >
            Please specify
          </ThemedText>

          <TextInput
            value={value.otherText}
            onChangeText={handleOtherText}
            placeholder="Tell us what you want to share..."
            placeholderTextColor="#9BA8C0"
            multiline
            textAlignVertical="top"
            style={styles.otherInput}
            maxLength={100}
          />

        </ThemedView>

      )}

    </ThemedView>
  );
}