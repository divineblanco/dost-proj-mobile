import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { createAuthStyles } from "@/styles/auth-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Pressable } from "react-native";

export type RoleOption = {
  label: string;
  icon: string;
  color: string;
  bg: string;
};

export const ROLE_OPTIONS: RoleOption[] = [
  { label: "General Public", icon: "person",          color: "#41A5EE", bg: "#EEF7FE" },
  { label: "Government",     icon: "building-columns", color: "#20BF55", bg: "#EDFAF3" },
  { label: "Researcher",     icon: "magnifying-glass", color: "#E53935", bg: "#FFF0F0" },
  { label: "NGO",            icon: "building-ngo",     color: "#1C5E3F", bg: "#E8F5EE" },
  { label: "Organization",   icon: "people-group",     color: "#35408E", bg: "#EEF0FA" },
];

type Props = {
  selected: number | null;
  onSelect: (index: number) => void;
};

export function SelectRole({ selected, onSelect }: Props) {
  const r = useResponsive();
  const styles = useMemo(() => createAuthStyles(r), [r]);

  return (
    <ThemedView style={styles.grid}>
      {ROLE_OPTIONS.map((item, index) => {
        const isSelected = selected === index;
        return (
          <Pressable
            key={index}
            style={[styles.box, isSelected && styles.boxSelected]}
            onPress={() => onSelect(index)}
          >
            <ThemedView style={[styles.iconBubble, { backgroundColor: item.bg }]}>
              <FontAwesome6
                name={item.icon as keyof typeof FontAwesome6.glyphMap}
                size={icon(25)}
                color={item.color}
              />
            </ThemedView>

            <ThemedText style={[styles.boxTitle, isSelected && styles.boxTitleSelected]}>
              {item.label}
            </ThemedText>

            <ThemedView style={[styles.check, isSelected && styles.checkSelected]}>
              {isSelected && (
                <MaterialIcons name="check" size={icon(9.5)} color="#FFFFFF" />
              )}
            </ThemedView>
          </Pressable>
        );
      })}
    </ThemedView>
  );
}