import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { DropdownStyles as styles } from "@/styles/profile/profile-components-styles";
import { icon } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Modal,
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
    label: "All Statuses",
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

export type Anchor = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  anchor: Anchor | null;
  selected: StatusFilterValue;
  onSelect: (value: StatusFilterValue) => void;
};

export default function StatusFilterDropdown({
  visible,
  onClose,
  anchor,
  selected,
  onSelect,
}: Props) {
  if (!anchor) {
    return null;
  }

  const DROPDOWN_WIDTH = 172;
  const GAP = 6;
  const SCREEN_PADDING = 12;

  /*
   * The anchor comes from measureInWindow().
   *
   * Therefore:
   *
   * top = button's screen Y
   *      + button's height
   *      + desired gap
   *
   * This makes the dropdown attach directly underneath
   * the filter button.
   */
  const top = anchor.y + anchor.height + GAP;

  /*
   * Right-align the dropdown with the button.
   */
  const rightAlignedLeft =
    anchor.x + anchor.width - DROPDOWN_WIDTH;

  /*
   * Prevent the dropdown from going outside the screen.
   */
  const left = Math.max(
    SCREEN_PADDING,
    rightAlignedLeft
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
      supportedOrientations={[
        "portrait",
        "landscape",
      ]}
    >
      {/* Full-screen coordinate space */}
      <View style={styles.modalContainer}>
        {/* Outside area closes dropdown */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
        />

        {/* Dropdown */}
        <View
          style={[
            styles.dropdown,
            {
              position: "absolute",
              top: top,
              left: left,
              width: DROPDOWN_WIDTH,
            },
          ]}
        >
          {STATUS_OPTIONS.map((option) => {
            const active = selected === option.value;

            return (
              <TouchableOpacity
                key={option.value}
                activeOpacity={0.7}
                style={[
                  styles.option,
                  active && styles.optionActive,
                ]}
                onPress={() => {
                  onSelect(option.value);
                  onClose();
                }}
              >
                <ThemedView style={styles.optionLeft}>
                  <ThemedView
                    style={[
                      styles.dot,
                      {
                        backgroundColor: option.color,
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
      </View>
    </Modal>
  );
}