import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../themed-text';

export function QuestionTwo() {
  const [selectedRegion,   setSelectedRegion]   = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCity,     setSelectedCity]     = useState<string | null>(null);
  const [selectedBarangay, setSelectedBarangay] = useState<string | null>(null);
  const [activeDropdown,   setActiveDropdown]   = useState<string | null>(null);

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
          name={isActive(fieldKey) ? 'chevron-up' : 'chevron-down'}
          size={13}
          color={isActive(fieldKey) ? '#35408E' : '#9BA8C0'}
        />
      </TouchableOpacity>

      {isActive(fieldKey) && (
        <View style={styles.dropdownList}>
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ maxHeight: 180 }}>
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
                  {isSelected && <Ionicons name="checkmark" size={13} color="#35408E" />}
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
          <Ionicons name="location" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F0F3FA',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E0E4F0',
    padding: 14,
    gap: 12,
    overflow: 'visible',
  },

  topRow: {
    flexDirection: 'row',
    gap: 8,
    overflow: 'visible',
  },

  bottomRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-end',
    overflow: 'visible',
    zIndex: 2,
  },

  fieldCol: {
    flex: 1,
    position: 'relative',
    overflow: 'visible',
  },

  activeField: {
    zIndex: 9999,
    elevation: 50,
  },

  fieldLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#35408E',
    marginBottom: 5,
    letterSpacing: 0.2,
  },

  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#E0E4F0',
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 4,
  },

  triggerOpen: {
    borderColor: '#35408E',
    backgroundColor: '#F4F5FB',
  },

  triggerFilled: {
    borderColor: '#C5CAE9',
  },

  triggerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1F5E',
  },

  triggerPlaceholder: {
    color: '#9BA8C0',
    fontWeight: '400',
  },

  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E0E4F0',
    paddingVertical: 4,
    zIndex: 99999,
    elevation: 60,
    shadowColor: '#1A1F5E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 6,
  },

  dropdownItemActive: {
    backgroundColor: '#EEF0FA',
  },

  dropdownText: {
    fontSize: 12,
    color: '#374151',
  },

  dropdownTextActive: {
    color: '#35408E',
    fontWeight: '600',
  },

  locationBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#35408E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#35408E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 1,
  },
});