import { ThemedView } from "@/components/themed-view";
import {
  misinformationTypeDropdownMaxHeight,
  misinformationTypeStyles,
} from "@/styles/contribute/contribute-question-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../themed-text";

type MisinformationTypeProps = {
  value: string | null;
  onChange: (value: string | null) => void;
};

export function MisinformationType({
  value,
  onChange,
}: MisinformationTypeProps) {
  const [activeDropdown, setActiveDropdown] =
    useState<string | null>(null);

  const r = useResponsive();

  const styles = useMemo(
    () => misinformationTypeStyles(r),
    [r]
  );

  const toggle = (key: string) =>
    setActiveDropdown((prev) =>
      prev === key ? null : key
    );

  const dropdownData: Record<string, string[]> = {
    misinformation: [
      "False Information",
      "Conspiracy Theory",
      "Harmful Content",
      "Unverified Treatment",
    ],
  };

  const isActive = (key: string) =>
    activeDropdown === key;

  return (
    <ThemedView style={styles.wrapper}>

      <View style={styles.row}>

        <View
          style={[
            styles.fieldCol,
            isActive("misinformation") &&
              styles.activeField,
          ]}
        >

          <ThemedText style={styles.fieldLabel}>
            Type of Misinformation
          </ThemedText>

          <TouchableOpacity
            style={[
              styles.trigger,
              isActive("misinformation") &&
                styles.triggerOpen,
              !!value && styles.triggerFilled,
            ]}
            onPress={() =>
              toggle("misinformation")
            }
            activeOpacity={0.8}
          >

            <ThemedText
              style={[
                styles.triggerText,
                !value &&
                  styles.triggerPlaceholder,
              ]}
              numberOfLines={1}
            >
              {value ??
                "Type of Misinformation"}
            </ThemedText>

            <Ionicons
              name={
                isActive("misinformation")
                  ? "chevron-up"
                  : "chevron-down"
              }
              size={icon(13)}
              color={
                isActive("misinformation")
                  ? "#35408E"
                  : "#9BA8C0"
              }
            />

          </TouchableOpacity>

          {isActive("misinformation") && (
            <View style={styles.dropdownList}>

              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                style={{
                  maxHeight:
                    misinformationTypeDropdownMaxHeight,
                }}
              >

                {dropdownData.misinformation.map(
                  (item) => {
                    const isSelected =
                      value === item;

                    return (
                      <TouchableOpacity
                        key={item}
                        style={[
                          styles.dropdownItem,
                          isSelected &&
                            styles.dropdownItemActive,
                        ]}
                        onPress={() => {
                          onChange(item);
                          setActiveDropdown(null);
                        }}
                        activeOpacity={0.7}
                      >

                        <ThemedText
                          style={[
                            styles.dropdownText,
                            isSelected &&
                              styles.dropdownTextActive,
                          ]}
                        >
                          {item}
                        </ThemedText>

                        {isSelected && (
                          <Ionicons
                            name="checkmark"
                            size={icon(13)}
                            color="#35408E"
                          />
                        )}

                      </TouchableOpacity>
                    );
                  }
                )}

              </ScrollView>

            </View>
          )}

        </View>

      </View>

    </ThemedView>
  );
}