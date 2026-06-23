import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

export function QuestionOne() {
  const [selected, setSelected] = useState<number | null>(null);

  const options = [
    { label: "Public Discussion",     icon: "person",            color: "#41A5EE", bg: "#EEF7FE" },
    { label: "Resource Availability", icon: "verified",          color: "#20BF55", bg: "#EDFAF3" },
    { label: "Healthcare Service",    icon: "health-and-safety", color: "#E53935", bg: "#FFF0F0" },
    { label: "Community Event",       icon: "home",              color: "#1C5E3F", bg: "#E8F5EE" },
    { label: "Educational Content",   icon: "menu-book",         color: "#2e8292", bg: "#E8F6F8" },
    { label: "Other",                 icon: "more-horiz",        color: "#6B7280", bg: "#F3F4F6" },
  ];

  return (
    <ThemedView style={styles.grid}>
      {options.map((item, index) => {
        const isSelected = selected === index;
        return (
          <Pressable
            key={index}
            style={[
              styles.box,
              isSelected && styles.boxSelected,
            ]}
            onPress={() => setSelected(index)}
          >
            {/* Icon bubble */}
            <ThemedView style={[styles.iconBubble, { backgroundColor: item.bg }]}>
              <MaterialIcons
                name={item.icon as keyof typeof MaterialIcons.glyphMap}
                color={item.color}
                size={25}
              />
            </ThemedView>

            <ThemedText style={[styles.boxTitle, isSelected && styles.boxTitleSelected]}>
              {item.label}
            </ThemedText>

            {/* Checkmark when selected */}
            <ThemedView style={[styles.check, isSelected && styles.checkSelected]}>
              {isSelected && (
                <MaterialIcons name="check" size={12} color="#FFFFFF" />
              )}
            </ThemedView>
          </Pressable>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  box: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E8EAF0',
    shadowColor: '#1A1F5E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  boxSelected: {
    borderColor: '#35408E',
    backgroundColor: '#F4F5FB',
  },

  iconBubble: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxTitle: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
    lineHeight: 16,
  },

  boxTitleSelected: {
    color: '#35408E',
  },

  check: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#D1D5E8',
    backgroundColor: '#F8F9FD',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkSelected: {
    borderColor: '#35408E',
    backgroundColor: '#35408E',
  },
});