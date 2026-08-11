import { ThemedView } from '@/components/themed-view';
import {
  misinformationTypeDropdownMaxHeight,
  misinformationTypeStyles
} from '@/styles/contribute/contribute-question-styles';
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../themed-text';

export function MisinformationType() {
  const [selectedMisinformation, setSelectedMisinformation] = useState<string | null>(null);
  const [activeDropdown,   setActiveDropdown]   = useState<string | null>(null);

  const r = useResponsive();
      
        const styles = useMemo(() => misinformationTypeStyles(r), [r]);

  const toggle = (key: string) =>
    setActiveDropdown(prev => (prev === key ? null : key));

  const dropdownData: Record<string, string[]> = {
    misinformation: ['False Information', 'Conspiracy Theory', 'Harmful Content', 'Unverified Treatment'],
  };

  const isActive = (key: string) => activeDropdown === key;

  const DropdownField = ({
    fieldKey, value, setter, label,
  }: {
    fieldKey: string;
    value: string | null;
    setter: (v: string) => void;
    label: string;
  }) => (
    <View style={[styles.fieldCol, isActive(fieldKey) && styles.activeField]}>
      <ThemedText style={styles.fieldLabel}>{label}</ThemedText>

      <TouchableOpacity
        style={[
          styles.trigger,
          isActive(fieldKey) && styles.triggerOpen,
          !!value && styles.triggerFilled,
        ]}
        onPress={() => toggle(fieldKey)}
        activeOpacity={0.8}
      >
        <ThemedText
          style={[styles.triggerText, !value && styles.triggerPlaceholder]}
          numberOfLines={1}
        >
          {value ?? label}
        </ThemedText>
        <Ionicons
          name={isActive(fieldKey) ? "chevron-up" : "chevron-down"}
          size={icon(13)}
          color={isActive(fieldKey) ? "#35408E" : "#9BA8C0"}
        />
      </TouchableOpacity>

      {isActive(fieldKey) && (
        <View style={styles.dropdownList}>
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ maxHeight: misinformationTypeDropdownMaxHeight }}>
            {dropdownData[fieldKey].map((item) => {
              const isSelected = value === item;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.dropdownItem, isSelected && styles.dropdownItemActive]}
                  onPress={() => { setter(item); setActiveDropdown(null); }}
                  activeOpacity={0.7}
                >
                  <ThemedText style={[styles.dropdownText, isSelected && styles.dropdownTextActive]}>
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
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );

  return (
    <ThemedView style={styles.wrapper}>
      <View style={styles.row}>
        <DropdownField
          fieldKey="misinformation"
          label="Type of Misinformation"
          value={selectedMisinformation}
          setter={setSelectedMisinformation}
        />
      </View>

    </ThemedView>
  );
}