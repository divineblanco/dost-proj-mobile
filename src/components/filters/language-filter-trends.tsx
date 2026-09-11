import { ThemedText } from "@/components/themed-text";
import { icon, scale, useResponsive } from "@/styles/responsive";
import { languageFilterStyles } from "@/styles/trends/trends-components-styles";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useRef, useState } from "react";
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export type Language =
  | "All"
  | "English"
  | "Filipino"
  | "Ilocano"
  | "Bicolano"
  | "Cebuano"
  | "Chavacano"
  | "Pangasinan"
  | "Hiligaynon";

export const LANGUAGES: Language[] = [
  "All",
  "English",
  "Filipino",
  "Ilocano",
  "Bicolano",
  "Cebuano",
  "Chavacano",
  "Pangasinan",
  "Hiligaynon",
];

type Props = {
  selected: Language;
  onChange: (value: Language) => void;
};

export function LanguageFilter({
  selected,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  // Position of the dropdown inside the Modal
  const [pos, setPos] = useState({
    top: 0,
    left: 0,
  });

  const triggerRef = useRef<View>(null);

  const hasFilter = selected !== "All";

  const r = useResponsive();

  const styles = useMemo(
    () => languageFilterStyles(r),
    [r]
  );

  /**
   * Opens the dropdown and measures the icon button.
   *
   * The dropdown is positioned so that:
   *
   * dropdown top-right
   *          ↓
   *       ┌──────────────┐
   *       │   Dropdown   │
   *       └──────────────┘
   *                    ↑
   *                    │
   *              button bottom-right
   */
  const openDrop = () => {
  triggerRef.current?.measure(
    (x, y, width, height, pageX, pageY) => {
      const dropdownWidth = scale(150);

      setPos({
        top: pageY + height,
        left: pageX + width - dropdownWidth,
      });

      setOpen(true);
    }
  );
};

  const selectLanguage = (language: Language) => {
    onChange(language);
    setOpen(false);
  };

  return (
    <>
      {/* LANGUAGE FILTER BUTTON */}
      <TouchableOpacity
        ref={triggerRef}
        style={[
          styles.iconBtn,
          hasFilter && styles.iconBtnActive,
        ]}
        onPress={openDrop}
        activeOpacity={0.8}
      >
        <Ionicons
          name="language-outline"
          size={icon(18)}
          color={
            hasFilter
              ? "#35408E"
              : "#9BA8C0"
          }
        />

        {hasFilter && (
          <View style={styles.activeDot} />
        )}
      </TouchableOpacity>



      {/* LANGUAGE DROPDOWN */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        statusBarTranslucent
        supportedOrientations={[
          "portrait",
          "landscape",
        ]}
        onRequestClose={() => setOpen(false)}
      >
        {/* OUTSIDE AREA */}
        <TouchableWithoutFeedback
          onPress={() => setOpen(false)}
        >
          <View style={styles.modalOverlay}>
            {/* DROPDOWN CONTAINER */}
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.dropdown,
                  {
                    top: pos.top,
                    left: pos.left,
                    width: scale(150),
                  },
                ]}
              >

                {/* Header */}
                <View style={styles.dropdownHeader}>
                  <Ionicons name="language-outline" size={icon(14)} color="#35408E" />
                  <ThemedText style={styles.dropdownTitle}>Language</ThemedText>
                  {hasFilter && (
                    <TouchableOpacity
                      onPress={() => { onChange("All"); setOpen(false); }}
                      activeOpacity={0.7}
                      style={{ marginLeft: "auto" }}
                    >
                      <ThemedText style={styles.clearTxt}>Clear</ThemedText>
                    </TouchableOpacity>
                  )}
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled
                >
                  {LANGUAGES.map((language) => {
                    const isSelected =
                      selected === language;

                    return (
                      <TouchableOpacity
                        key={language}
                        style={[
                          styles.option,
                          isSelected &&
                            styles.optionSelected,
                        ]}
                        onPress={() =>
                          selectLanguage(language)
                        }
                        activeOpacity={0.7}
                      >
                          <ThemedText style={[styles.itemText, isSelected && styles.itemTextActive]}>
                          {language === "All" ? "All Languages" : language}
                        </ThemedText>
                        {isSelected && <Ionicons name="checkmark" size={icon(14)} color="#35408E" />}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}