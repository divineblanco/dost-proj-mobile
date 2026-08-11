import { ThemedView } from '@/components/themed-view';
import {
  questionTwoDropdownMaxHeight,
  questionTwoStyles,
} from '@/styles/contribute/contribute-question-styles';
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../themed-text';

export function QuestionTwo() {
  const [selectedRegion,   setSelectedRegion]   = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCity,     setSelectedCity]     = useState<string | null>(null);
  const [selectedBarangay, setSelectedBarangay] = useState<string | null>(null);
  const [activeDropdown,   setActiveDropdown]   = useState<string | null>(null);

  const r = useResponsive();
      
        const styles = useMemo(() => questionTwoStyles(r), [r]);

  const toggle = (key: string) =>
    setActiveDropdown(prev => (prev === key ? null : key));

  const dropdownData: Record<string, string[]> = {
    region:   ['Region I','Region II','Region III','Region IV-A','Region IV-B','Region V','Region VI','Region VII','Region VIII','Region IX','Region X','Region XI','Region XII','Region XIII','NCR'],
    province: ['Laguna', 'Batangas', 'Cavite', 'Quezon', 'Rizal'],
    city:     ['Calamba', 'San Pedro', 'Biñan', 'Sta. Rosa', 'Cabuyao', 'Los Baños'],
    barangay: ['Barangay 1', 'Barangay 2', 'Barangay 3', 'Barangay 4', 'Barangay 5'],
  };

  const topFields = [
    { key: 'region',   label: 'Region',           value: selectedRegion,   setter: setSelectedRegion   },
    { key: 'province', label: 'Province',          value: selectedProvince, setter: setSelectedProvince },
    { key: 'city',     label: 'City/Municipality', value: selectedCity,     setter: setSelectedCity     },
  ] as const;

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
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ maxHeight: questionTwoDropdownMaxHeight }}>
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
                  {isSelected && <Ionicons name="checkmark" size={icon(13)} color="#35408E" />}
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

      {/* Top row: Region · Province · City */}
      <View style={styles.topRow}>
        {topFields.map(({ key, label, value, setter }) => (
          <DropdownField key={key} fieldKey={key} label={label} value={value} setter={setter} />
        ))}
      </View>

      {/* Bottom row: Barangay + pin button */}
      <View style={styles.bottomRow}>
        <DropdownField
          fieldKey="barangay"
          label="Barangay"
          value={selectedBarangay}
          setter={setSelectedBarangay}
        />
        <TouchableOpacity style={styles.locationBtn} activeOpacity={0.85}>
          <Ionicons name="location" size={icon(18)} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

    </ThemedView>
  );
}