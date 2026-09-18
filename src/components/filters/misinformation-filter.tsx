import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { colors } from "@/styles/contribute/contribute-colors";
import { sharedFilterStyles } from "@/styles/contribute/contribute-component-styles";
import { icon, useResponsive, verticalScale } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Calendar, DateData } from "react-native-calendars";

export type MisinformationFilters = {
  selectedDate: string;
  startDate: string | null;
  endDate: string | null;
  selectedType: string;
  selectedLanguage: string;
};

type DateRange = {
  startDate: string | null;
  endDate: string | null;
};

type Props = {
  onClose: () => void;
  onApply: (filters: MisinformationFilters) => void;
};

function formatDateNumeric(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
    date.getDate()
  ).padStart(2, "0")}/${date.getFullYear()}`;
}

function formatRangeLabel(range: DateRange) {
  if (!range.startDate) return "Custom Range";
  if (!range.endDate) return `${formatDateNumeric(range.startDate)} - ...`;
  return `${formatDateNumeric(range.startDate)} - ${formatDateNumeric(
    range.endDate
  )}`;
}

function buildMarkedDates(range: DateRange) {
  const marked: Record<string, any> = {};

  if (!range.startDate) return marked;

  if (!range.endDate) {
    marked[range.startDate] = {
      startingDay: true,
      endingDay: true,
      color: "#35408E",
      textColor: "white",
    };
    return marked;
  }

  const start = new Date(`${range.startDate}T00:00:00`);
  const end = new Date(`${range.endDate}T00:00:00`);
  const from = start <= end ? start : end;
  const to = start <= end ? end : start;
  const cursor = new Date(from);

  while (cursor <= to) {
    const iso = cursor.toISOString().split("T")[0];

    marked[iso] = {
      color: "#35408E",
      textColor: "white",
      startingDay: iso === range.startDate,
      endingDay: iso === range.endDate,
    };

    cursor.setDate(cursor.getDate() + 1);
  }

  return marked;
}

export function MisinformationFilter({ onClose, onApply }: Props) {
  const r = useResponsive();
  const styles = useMemo(() => sharedFilterStyles(r), [r]);

  const [showCalendar, setShowCalendar] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("Last 7 Days");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages");
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const dateOptions = [
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
    "Custom Range",
  ];

  const typeOptions = [
    "All Types",
    "False Information",
    "Conspiracy Theory",
    "Harmful Content",
    "Unverified Treatment",
  ];

  const LANGUAGE_OPTIONS = [
    "All Languages",
    "English",
    "Filipino",
    "Cebuano",
    "Ilocano",
    "Bicolano",
    "Pangasinan",
    "Chavacano",
  ];

  const openDropdown = (dropdown: string) => {
    setShowCalendar(false);
    setActiveDropdown((previous) =>
      previous === dropdown ? null : dropdown
    );
  };

  const selectType = (value: string) => {
    setSelectedType(value);
    setActiveDropdown(null);
    setShowCalendar(false);
  };

  const selectDate = (value: string) => {
    setActiveDropdown(null);

    if (value === "Custom Range") {
      setSelectedDate("Custom Range");
      setDateRange({
        startDate: null,
        endDate: null,
      });
      setShowCalendar(true);
      return;
    }

    setSelectedDate(value);
    setDateRange({
      startDate: null,
      endDate: null,
    });
    setShowCalendar(false);
  };

  const handleDayPress = (day: DateData) => {
    setDateRange((previous) => {
      if (!previous.startDate || previous.endDate) {
        return {
          startDate: day.dateString,
          endDate: null,
        };
      }

      const start = new Date(`${previous.startDate}T00:00:00`);
      const selected = new Date(`${day.dateString}T00:00:00`);

      if (selected < start) {
        return {
          startDate: day.dateString,
          endDate: null,
        };
      }

      const nextRange = {
        startDate: previous.startDate,
        endDate: day.dateString,
      };

      setSelectedDate(formatRangeLabel(nextRange));
      setShowCalendar(false);

      return nextRange;
    });
  };

  const handleApply = () => {
    onApply({
      selectedDate,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      selectedType,
      selectedLanguage,
    });

    onClose();
  };

  return (
    <ThemedView style={[styles.filterDropdown, styles.filterDropdownWide]}>
      <ThemedView style={styles.filterContainer}>
        <Ionicons
          name="close"
          size={icon(25)}
          color={colors.white}
          onPress={onClose}
          style={styles.filterCloseButton}
        />

        <ThemedView style={styles.filterOptionContainer}>
          <ThemedView style={styles.filterOptionContent}>
            <ThemedText type="filterLabel">Date Range</ThemedText>

            <ThemedView style={styles.filterOptionBG}>
              <ThemedView style={styles.filterOptionChoices}>
                <ThemedText
                  type="filterOptions"
                  style={styles.filterDropdownChoice}
                >
                  {selectedDate}
                </ThemedText>

                <Ionicons
                  name={
                    activeDropdown === "date"
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={icon(15)}
                  color={colors.primary}
                  style={styles.filterDropdownAnchor}
                  onPress={() => openDropdown("date")}
                />
              </ThemedView>

              {activeDropdown === "date" && (
                <ThemedView style={styles.filterDropdownList}>
                  <ScrollView
                    style={{ maxHeight: verticalScale(180) }}
                    showsVerticalScrollIndicator
                  >
                    {dateOptions.map((item) => (
                      <ThemedText
                        type="filterOptions"
                        key={item}
                        style={styles.filterDropdownItem}
                        onPress={() => selectDate(item)}
                      >
                        {item}
                      </ThemedText>
                    ))}
                  </ScrollView>
                </ThemedView>
              )}
            </ThemedView>

            {showCalendar && (
              <ThemedView style={styles.filterCalendarRangeContainer}>
                <ThemedText
                  type="filterOptions"
                  style={styles.filterCalendarRangeHeader}
                >
                  {dateRange.startDate && !dateRange.endDate
                    ? "Now pick an end date"
                    : "Pick a start date"}
                </ThemedText>

                <Calendar
                  markingType="period"
                  markedDates={buildMarkedDates(dateRange)}
                  onDayPress={handleDayPress}
                  maxDate={new Date().toISOString().split("T")[0]}
                  theme={{
                    todayTextColor: "#35408E",
                    arrowColor: "#35408E",
                    selectedDayBackgroundColor: "#35408E",
                    textMonthFontWeight: "600",
                    textMonthFontSize: 14,
                  }}
                />

                <ThemedView style={styles.filterCalendarRangeFooter}>
                  <TouchableOpacity
                    style={styles.filterCalendarRangeCloseButton}
                    onPress={() => setShowCalendar(false)}
                  >
                    <ThemedText
                      type="filterOptions"
                      style={styles.filterCalendarRangeCloseText}
                    >
                      CLOSE
                    </ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              </ThemedView>
            )}
          </ThemedView>

          <ThemedView style={styles.filterOptionContent}>
            <ThemedText type="filterLabel">
              Type of Misinformation
            </ThemedText>

            <ThemedView style={styles.filterOptionBG}>
              <ThemedView style={styles.filterOptionChoices}>
                <ThemedText
                  type="filterOptions"
                  style={styles.filterDropdownChoice}
                >
                  {selectedType}
                </ThemedText>

                <Ionicons
                  name={
                    activeDropdown === "type"
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={icon(15)}
                  color={colors.primary}
                  style={styles.filterDropdownAnchor}
                  onPress={() => openDropdown("type")}
                />
              </ThemedView>

              {activeDropdown === "type" && (
                <ThemedView style={styles.filterDropdownList}>
                  <ScrollView
                    style={{ maxHeight: verticalScale(180) }}
                    showsVerticalScrollIndicator
                  >
                    {typeOptions.map((item) => (
                      <ThemedText
                        type="filterOptions"
                        key={item}
                        style={styles.filterDropdownItem}
                        onPress={() => selectType(item)}
                      >
                        {item}
                      </ThemedText>
                    ))}
                  </ScrollView>
                </ThemedView>
              )}
            </ThemedView>
          </ThemedView>

          {/* LANGUAGE */}
          <ThemedView style={[styles.filterOptionContent, styles.filterOptionContentFull]}>
            <ThemedText type="filterLabel">Language</ThemedText>

            <ThemedView style={styles.filterOptionBG}>
              <ThemedView style={styles.filterOptionChoices}>
                <ThemedText
                  type="filterOptions"
                  style={styles.filterDropdownChoice}
                >
                  {selectedLanguage}
                </ThemedText>

                <Ionicons
                  name={
                    activeDropdown === "language"
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={icon(15)}
                  color={colors.primary}
                  style={styles.filterDropdownAnchor}
                  onPress={() => openDropdown("language")}
                />
              </ThemedView>

              {activeDropdown === "language" && (
                <ThemedView style={styles.filterDropdownList}>
                  <ScrollView
                    style={{ maxHeight: verticalScale(180) }}
                    showsVerticalScrollIndicator
                  >
                    {LANGUAGE_OPTIONS.map((item) => (
                      <ThemedText
                        key={item}
                        type="filterOptions"
                        style={styles.filterDropdownItem}
                        onPress={() => {
                          setSelectedLanguage(item);
                          setActiveDropdown(null);
                        }}
                      >
                        {item}
                      </ThemedText>
                    ))}
                  </ScrollView>
                </ThemedView>
              )}
            </ThemedView>
          </ThemedView>

          <TouchableOpacity
            style={styles.filterButtonApply}
            onPress={handleApply}
          >
            <ThemedText type="filterApply">APPLY</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
