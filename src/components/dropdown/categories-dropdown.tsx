import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { reportStyles } from "@/styles/reports-styles";
import { icon, useResponsive, verticalScale } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

type Category = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type CategoriesDropdownProps = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

const categories: Category[] = [
  {
    label: "All Types",
    icon: "layers-outline",
  },
  {
    label: "Sentiment",
    icon: "happy-outline",
  },
  {
    label: "Demographic",
    icon: "people-outline",
  },
  {
    label: "Regional",
    icon: "location-outline",
  },
  {
    label: "Trends",
    icon: "trending-up-outline",
  },
];

export default function CategoriesDropdown({
  selectedCategory,
  setSelectedCategory,
}: CategoriesDropdownProps) {
  const [open, setOpen] = useState(false);

  const selectedItem =
    categories.find(
      (category) => category.label === selectedCategory
    ) || categories[0];

  const r = useResponsive();

  const styles = useMemo(
    () => reportStyles(r),
    [r]
  );

  return (
    /*
     * IMPORTANT:
     * This wrapper becomes the positioning reference
     * for the dropdown menu.
     */
    <ThemedView style={styles.container}>

      {/* ================================================= */}
      {/* DROPDOWN BUTTON */}
      {/* ================================================= */}

      <TouchableOpacity
        style={styles.dropdownButton}
        activeOpacity={0.8}
        onPress={() => setOpen((previous) => !previous)}
      >
        <ThemedView style={styles.dropdownContent}>

          {/* LEFT SIDE */}
          <View style={styles.leftContent}>

            <Ionicons
              name={selectedItem.icon}
              size={icon(18)}
              color="#35408E"
            />

            <ThemedText
              style={styles.dropdownText}
              numberOfLines={1}
            >
              {selectedCategory || "Select Category"}
            </ThemedText>

          </View>

          {/* ARROW */}
          <Ionicons
            name={
              open
                ? "chevron-up-outline"
                : "chevron-down-outline"
            }
            size={icon(16)}
            color="#35408E"
          />

        </ThemedView>
      </TouchableOpacity>

      {/* ================================================= */}
      {/* DROPDOWN MENU */}
      {/* ================================================= */}

      {open && (
        <ThemedView style={styles.dropdownMenu}>

          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            style={{
              maxHeight: verticalScale(250),
            }}
          >
            {categories.map((item) => {

              const isActive =
                selectedCategory === item.label;

              return (
                <TouchableOpacity
                  key={item.label}
                  activeOpacity={0.8}
                  style={[
                    styles.dropdownItem,
                    isActive &&
                      styles.activeItem,
                  ]}
                  onPress={() => {
                    setSelectedCategory(
                      item.label
                    );
                    setOpen(false);
                  }}
                >

                  {/* ICON */}

                  <Ionicons
                    name={item.icon}
                    size={icon(18)}
                    color={
                      isActive
                        ? "#FFFFFF"
                        : "#35408E"
                    }
                  />

                  {/* LABEL */}

                  <ThemedText
                    style={[
                      styles.itemText,
                      isActive &&
                        styles.activeText,
                    ]}
                    numberOfLines={1}
                  >
                    {item.label}
                  </ThemedText>

                </TouchableOpacity>
              );
            })}
          </ScrollView>

        </ThemedView>
      )}

    </ThemedView>
  );
}