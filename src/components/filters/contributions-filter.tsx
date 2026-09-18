import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { GeomItem, getRegions } from "@/lib/services/geomApi";
import { colors } from "@/styles/contribute/contribute-colors";
import { sharedFilterStyles } from "@/styles/contribute/contribute-component-styles";
import { icon, useResponsive, verticalScale } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Calendar, DateData } from "react-native-calendars";

export type ContributionFilters = {
  selectedDate: string;
  startDate: string | null;
  endDate: string | null;
  selectedRegion: string;
  selectedRegionCode: string | null;
  selectedCategories: string;
  selectedSentiment: string;
  selectedLanguage: string;
};

type DateRange = {
  startDate: string | null;
  endDate: string | null;
};

type Props = {
  onClose: () => void;
  onApply: (filters: ContributionFilters) => void;
};

const DATE_OPTIONS = [
  "Last 7 Days",
  "Last 30 Days",
  "Last 90 Days",
  "Custom Range",
];

const CATEGORY_OPTIONS = [
  "All Categories",
  "Personal Experience",
  "Community Event",
  "Educational Content",
  "Resource Availability",
  "Healthcare Service",
];

const SENTIMENT_OPTIONS = [
  "All Sentiment",
  "Positive",
  "Neutral",
  "Negative",
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

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
    date.getDate()
  ).padStart(2, "0")}/${date.getFullYear()}`;
}

function formatRange(range: DateRange) {
  if (!range.startDate) return "Custom Range";
  if (!range.endDate) {
    return `${formatDate(range.startDate)} - ...`;
  }

  return `${formatDate(range.startDate)} - ${formatDate(range.endDate)}`;
}

function buildMarkedDates(range: DateRange) {
  const marked: Record<string, any> = {};

  if (!range.startDate) return marked;

  if (!range.endDate) {
    marked[range.startDate] = {
      startingDay: true,
      endingDay: true,
      color: "#35408E",
      textColor: "#fff",
    };
    return marked;
  }

  const start = new Date(`${range.startDate}T00:00:00`);
  const end = new Date(`${range.endDate}T00:00:00`);
  const from = start <= end ? start : end;
  const to = start <= end ? end : start;

  const cursor = new Date(from);

  while (cursor <= to) {
    const date = cursor.toISOString().split("T")[0];

    marked[date] = {
      color: "#35408E",
      textColor: "#fff",
      startingDay: date === range.startDate,
      endingDay: date === range.endDate,
    };

    cursor.setDate(cursor.getDate() + 1);
  }

  return marked;
}

export function ContributionsFilter({ onClose, onApply }: Props) {
  const r = useResponsive();
  const styles = useMemo(() => sharedFilterStyles(r), [r]);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const [selectedDate, setSelectedDate] = useState("Last 7 Days");
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedRegionCode, setSelectedRegionCode] = useState<string | null>(
    null
  );
  const [regions, setRegions] = useState<GeomItem[]>([]);
  const [regionsLoading, setRegionsLoading] = useState(false);

  const [selectedCategories, setSelectedCategories] =
    useState("All Categories");

  const [selectedSentiment, setSelectedSentiment] =
    useState("All Sentiment");

  const [selectedLanguage, setSelectedLanguage] =
    useState("All Languages");

  useEffect(() => {
    let mounted = true;

    async function loadRegions() {
      try {
        setRegionsLoading(true);
        const data = await getRegions();

        if (mounted) {
          setRegions(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load regions:", error);

        if (mounted) {
          setRegions([]);
        }
      } finally {
        if (mounted) {
          setRegionsLoading(false);
        }
      }
    }

    loadRegions();

    return () => {
      mounted = false;
    };
  }, []);

  const openDropdown = (name: string) => {
    setShowCalendar(false);
    setActiveDropdown((current) => (current === name ? null : name));
  };

  const handleDateOption = (value: string) => {
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
      const tapped = new Date(`${day.dateString}T00:00:00`);

      if (tapped < start) {
        return {
          startDate: day.dateString,
          endDate: null,
        };
      }

      const nextRange = {
        startDate: previous.startDate,
        endDate: day.dateString,
      };

      setSelectedDate("Custom Range");
      setShowCalendar(false);

      return nextRange;
    });
  };

  const handleApply = () => {
    onApply({
      selectedDate,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      selectedRegion,
      selectedRegionCode,
      selectedCategories,
      selectedSentiment,
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
          {/* DATE */}
          <ThemedView style={styles.filterOptionContent}>
            <ThemedText type="filterLabel">Date Range</ThemedText>

            <ThemedView style={styles.filterOptionBG}>
              <ThemedView style={styles.filterOptionChoices}>
                <ThemedText
                  type="filterOptions"
                  style={styles.filterDropdownChoice}
                >
                  {selectedDate === "Custom Range" &&
                  dateRange.startDate &&
                  dateRange.endDate
                    ? formatRange(dateRange)
                    : selectedDate}
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
                    {DATE_OPTIONS.map((item) => (
                      <ThemedText
                        key={item}
                        type="filterOptions"
                        style={styles.filterDropdownItem}
                        onPress={() => handleDateOption(item)}
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

          {/* REGION */}
          <ThemedView style={styles.filterOptionContent}>
            <ThemedText type="filterLabel">Region</ThemedText>

            <ThemedView style={styles.filterOptionBG}>
              <ThemedView style={styles.filterOptionChoices}>
                <ThemedText
                  type="filterOptions"
                  style={styles.filterDropdownChoice}
                >
                  {selectedRegion}
                </ThemedText>

                <Ionicons
                  name={
                    activeDropdown === "region"
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={icon(15)}
                  color={colors.primary}
                  style={styles.filterDropdownAnchor}
                  onPress={() => openDropdown("region")}
                />
              </ThemedView>

              {activeDropdown === "region" && (
                <ThemedView style={styles.filterDropdownList}>
                  <ScrollView
                    style={{ maxHeight: verticalScale(180) }}
                    showsVerticalScrollIndicator
                  >
                    <ThemedText
                      type="filterOptions"
                      style={styles.filterDropdownItem}
                      onPress={() => {
                        setSelectedRegion("All Regions");
                        setSelectedRegionCode(null);
                        setActiveDropdown(null);
                      }}
                    >
                      All Regions
                    </ThemedText>

                    {regionsLoading ? (
                      <ThemedText
                        type="filterOptions"
                        style={styles.filterDropdownItem}
                      >
                        Loading regions...
                      </ThemedText>
                    ) : regions.length === 0 ? (
                      <ThemedText
                        type="filterOptions"
                        style={styles.filterDropdownItem}
                      >
                        No regions available
                      </ThemedText>
                    ) : (
                      regions.map((region) => (
                        <ThemedText
                          key={String(region.code)}
                          type="filterOptions"
                          style={styles.filterDropdownItem}
                          onPress={() => {
                            setSelectedRegion(region.name);
                            setSelectedRegionCode(String(region.code));
                            setActiveDropdown(null);
                          }}
                        >
                          {region.name}
                        </ThemedText>
                      ))
                    )}
                  </ScrollView>
                </ThemedView>
              )}
            </ThemedView>
          </ThemedView>

          {/* CATEGORY */}
          <ThemedView style={styles.filterOptionContent}>
            <ThemedText type="filterLabel">Category</ThemedText>

            <ThemedView style={styles.filterOptionBG}>
              <ThemedView style={styles.filterOptionChoices}>
                <ThemedText
                  type="filterOptions"
                  style={styles.filterDropdownChoice}
                >
                  {selectedCategories}
                </ThemedText>

                <Ionicons
                  name={
                    activeDropdown === "categories"
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={icon(15)}
                  color={colors.primary}
                  style={styles.filterDropdownAnchor}
                  onPress={() => openDropdown("categories")}
                />
              </ThemedView>

              {activeDropdown === "categories" && (
                <ThemedView style={styles.filterDropdownList}>
                  <ScrollView>
                    {CATEGORY_OPTIONS.map((item) => (
                      <ThemedText
                        key={item}
                        type="filterOptions"
                        style={styles.filterDropdownItem}
                        onPress={() => {
                          setSelectedCategories(item);
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

          {/* SENTIMENT */}
          <ThemedView style={styles.filterOptionContent}>
            <ThemedText type="filterLabel">Sentiment</ThemedText>

            <ThemedView style={styles.filterOptionBG}>
              <ThemedView style={styles.filterOptionChoices}>
                <ThemedText
                  type="filterOptions"
                  style={styles.filterDropdownChoice}
                >
                  {selectedSentiment}
                </ThemedText>

                <Ionicons
                  name={
                    activeDropdown === "sentiment"
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={icon(15)}
                  color={colors.primary}
                  style={styles.filterDropdownAnchor}
                  onPress={() => openDropdown("sentiment")}
                />
              </ThemedView>

              {activeDropdown === "sentiment" && (
                <ThemedView style={styles.filterDropdownList}>
                  <ScrollView>
                    {SENTIMENT_OPTIONS.map((item) => (
                      <ThemedText
                        key={item}
                        type="filterOptions"
                        style={styles.filterDropdownItem}
                        onPress={() => {
                          setSelectedSentiment(item);
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
