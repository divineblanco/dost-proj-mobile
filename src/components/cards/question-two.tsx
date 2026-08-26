import { ThemedView } from "@/components/themed-view";
import {
  questionTwoDropdownMaxHeight,
  questionTwoStyles,
} from "@/styles/contribute/contribute-question-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../themed-text";

export type QuestionTwoValue = {
  region: string | null;
  province: string | null;
  city: string | null;
  barangay: string | null;
};

type QuestionTwoProps = {
  value: QuestionTwoValue;
  onChange: (value: QuestionTwoValue) => void;
};

export function QuestionTwo({
  value,
  onChange,
}: QuestionTwoProps) {

  const [activeDropdown, setActiveDropdown] =
    useState<string | null>(null);

  const r = useResponsive();

  const styles = useMemo(
    () => questionTwoStyles(r),
    [r]
  );

  const dropdownData: Record<
    string,
    string[]
  > = {

    region: [
      "Region I",
      "Region II",
      "Region III",
      "Region IV-A",
      "Region IV-B",
      "Region V",
      "Region VI",
      "Region VII",
      "Region VIII",
      "Region IX",
      "Region X",
      "Region XI",
      "Region XII",
      "Region XIII",
      "NCR",
    ],

    province: [
      "Laguna",
      "Batangas",
      "Cavite",
      "Quezon",
      "Rizal",
    ],

    city: [
      "Calamba",
      "San Pedro",
      "Biñan",
      "Sta. Rosa",
      "Cabuyao",
      "Los Baños",
    ],

    barangay: [
      "Barangay 1",
      "Barangay 2",
      "Barangay 3",
      "Barangay 4",
      "Barangay 5",
    ],
  };

  const toggle = (key: string) => {
    setActiveDropdown((prev) =>
      prev === key ? null : key
    );
  };

  const updateValue = (
    key: keyof QuestionTwoValue,
    selectedValue: string
  ) => {

    onChange({
      ...value,
      [key]: selectedValue,
    });

    setActiveDropdown(null);
  };

  const topFields = [
    {
      key: "region",
      label: "Region",
      value: value.region,
    },
    {
      key: "province",
      label: "Province",
      value: value.province,
    },
    {
      key: "city",
      label: "City/Municipality",
      value: value.city,
    },
  ] as const;

  const DropdownField = ({
    fieldKey,
    value: fieldValue,
    label,
  }: {
    fieldKey: keyof QuestionTwoValue;
    value: string | null;
    label: string;
  }) => {

    const isActive =
      activeDropdown === fieldKey;

    return (
      <View
        style={[
          styles.fieldCol,
          isActive &&
            styles.activeField,
        ]}
      >

        <ThemedText style={styles.fieldLabel}>
          {label}
        </ThemedText>

        <TouchableOpacity
          style={[
            styles.trigger,
            isActive &&
              styles.triggerOpen,
            !!fieldValue &&
              styles.triggerFilled,
          ]}
          onPress={() =>
            toggle(fieldKey)
          }
          activeOpacity={0.8}
        >

          <ThemedText
            style={[
              styles.triggerText,
              !fieldValue &&
                styles.triggerPlaceholder,
            ]}
            numberOfLines={1}
          >
            {fieldValue ?? label}
          </ThemedText>

          <Ionicons
            name={
              isActive
                ? "chevron-up"
                : "chevron-down"
            }
            size={icon(13)}
            color={
              isActive
                ? "#35408E"
                : "#9BA8C0"
            }
          />

        </TouchableOpacity>

        {isActive && (

          <View
            style={styles.dropdownList}
          >

            <ScrollView
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              style={{
                maxHeight:
                  questionTwoDropdownMaxHeight,
              }}
            >

              {dropdownData[
                fieldKey
              ].map((item) => {

                const isSelected =
                  fieldValue === item;

                return (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.dropdownItem,
                      isSelected &&
                        styles.dropdownItemActive,
                    ]}
                    onPress={() =>
                      updateValue(
                        fieldKey,
                        item
                      )
                    }
                    activeOpacity={0.7}
                  >

                    <ThemedText
                      style={[
                        styles.dropdownText,
                        isSelected &&
                          styles.dropdownTextActive,
                      ]}
                    >
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
  };

  return (
    <ThemedView style={styles.wrapper}>

      {/* TOP */}

      <View style={styles.topRow}>

        {topFields.map(
          ({
            key,
            label,
            value: fieldValue,
          }) => (

            <DropdownField
              key={key}
              fieldKey={key}
              label={label}
              value={fieldValue}
            />

          )
        )}

      </View>

      {/* BOTTOM */}

      <View style={styles.bottomRow}>

        <DropdownField
          fieldKey="barangay"
          label="Barangay"
          value={value.barangay}
        />

        <TouchableOpacity
          style={styles.locationBtn}
          activeOpacity={0.85}
        >
          <Ionicons
            name="location"
            size={icon(18)}
            color="#FFFFFF"
          />
        </TouchableOpacity>

      </View>

    </ThemedView>
  );
}