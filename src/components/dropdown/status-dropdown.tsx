import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { DropdownStyles } from "@/styles/profile/profile-components-styles";
import { icon, scale, useResponsive, verticalScale } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export type StatusFilterValue =
  | "All"
  | "Verified"
  | "Pending"
  | "Declined";

const STATUS_OPTIONS: {
  label: string;
  value: StatusFilterValue;
  color: string;
}[] = [
  {
    label: "All Status",
    value: "All",
    color: "#6B7690",
  },
  {
    label: "Verified",
    value: "Verified",
    color: "#1F9254",
  },
  {
    label: "Pending",
    value: "Pending",
    color: "#B8860B",
  },
  {
    label: "Declined",
    value: "Declined",
    color: "#C0392B",
  },
];

type Props = {
  visible: boolean;
  onClose: () => void;
  selected: StatusFilterValue;
  onSelect: (value: StatusFilterValue) => void;
};

export default function StatusFilterDropdown({
  visible,
  onClose,
  selected,
  onSelect,
}: Props) {
  const r = useResponsive();

  const styles = useMemo(
    () => DropdownStyles(r),
    [r]
  );

  if (!visible) {
    return null;
  }

  return (
    <>
      {/* 
        Invisible backdrop.
        This closes the dropdown when the user
        taps outside of it.
      */}
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={onClose}
      />

      {/* 
        Dropdown is positioned relative to the
        wrapper around the filter button.
      */}
      <View
        style={[
          styles.dropdown,
          {
            position: "absolute",

            /*
             * 100% means the bottom edge of this
             * dropdown's parent.
             */
            top: "100%",

            /*
             * Align the right edge of the dropdown
             * with the right edge of the filter button.
             */
            right: 0,

            width: scale(172),

            /*
             * Small gap between button and dropdown.
             */
            marginTop: verticalScale(6),

            /*
             * Make sure it renders above nearby content.
             */
            zIndex: 9999,
            elevation: 9999,
          },
        ]}
      >
        {STATUS_OPTIONS.map((option) => {
          const active =
            selected === option.value;

          return (
            <TouchableOpacity
              key={option.value}
              activeOpacity={0.7}
              style={[
                styles.option,
                active &&
                  styles.optionActive,
              ]}
              onPress={() => {
                onSelect(option.value);
                onClose();
              }}
            >
              <ThemedView
                style={styles.optionLeft}
              >
                <ThemedView
                  style={[
                    styles.dot,
                    {
                      backgroundColor:
                        option.color,
                    },
                  ]}
                />

                <ThemedText
                  style={[
                    styles.optionText,
                    active &&
                      styles.optionTextActive,
                  ]}
                >
                  {option.label}
                </ThemedText>
              </ThemedView>

              {active && (
                <Ionicons
                  name="checkmark"
                  size={icon(16)}
                  color="#35408E"
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}
