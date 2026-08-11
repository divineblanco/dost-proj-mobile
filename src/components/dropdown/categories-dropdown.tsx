import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { reportStyles as styles } from "@/styles/reports-styles";
import { icon, verticalScale } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View
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
  { label: "All Types", icon: "layers-outline" },
  { label: "Sentiment", icon: "happy-outline" },
  { label: "Demographic", icon: "people-outline" },
  { label: "Regional", icon: "location-outline" },
  { label: "Trends", icon: "trending-up-outline" },
];

export default function CategoriesDropdown({
  selectedCategory,
  setSelectedCategory,
}: CategoriesDropdownProps) {
  const [open, setOpen] = useState(false);

  const selectedItem =
    categories.find((c) => c.label === selectedCategory) || null;

  return (
    <ThemedView style={styles.container}>
      {/* BUTTON */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setOpen(!open)}
      >
        <ThemedView style={styles.dropdownContent}>
          {/* LEFT SIDE (ICON + TEXT) */}
          <View style={styles.leftContent}>
            {selectedItem && (
              <Ionicons
                name={selectedItem.icon}
                size={icon(18)}
                color="#35408E"
              />
            )}

            <ThemedText style={styles.dropdownText}>
              {selectedCategory || "Select Category"}
            </ThemedText>
          </View>

          {/* ARROW */}
          <Ionicons
            name={open ? "chevron-up-outline" : "chevron-down-outline"}
            size={icon(16)}
            color="#35408E"
          />
        </ThemedView>
      </TouchableOpacity>

      {/* DROPDOWN LIST */}
      {open && (
        <ThemedView style={styles.dropdownMenu}>
          <ScrollView nestedScrollEnabled style={{ maxHeight: verticalScale(250) }}>
            {categories.map((item) => {
              const isActive = selectedCategory === item.label;

              return (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.dropdownItem,
                    isActive && styles.activeItem,
                  ]}
                  onPress={() => {
                    setSelectedCategory(item.label);
                    setOpen(false);
                  }}
                >
                  <Ionicons
                    name={item.icon}
                    size={icon(18)}
                    color={isActive ? "white" : "#35408E"}
                  />

                  <ThemedText
                    style={[
                      styles.itemText,
                      isActive && styles.activeText,
                    ]}
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