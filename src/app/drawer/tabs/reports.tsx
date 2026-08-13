import { ReportsCard } from "@/components/cards/reports-card";
import CategoriesDropdown from "@/components/dropdown/categories-dropdown";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { reportStyles } from "@/styles/reports-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useMemo, useState } from "react";
import {
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

/* =========================================================
   TYPES
========================================================= */

export type ReportCategory =
  | "Sentiment"
  | "Demographic"
  | "Regional"
  | "Trends";

export type Report = {
  id: number;
  title: string;
  description: string;
  date: string;
  category: ReportCategory;
};

/* =========================================================
   REPORT DATA
========================================================= */

const reports: Report[] = [
  {
    id: 1,
    title: "Q2 HIV Awareness Campaign Impact Analysis",
    description:
      "Analysis of social media engagement during the Q2 HIV awareness campaign.",
    date: "June 15, 2026",
    category: "Trends",
  },
  {
    id: 2,
    title: "HIV Social Media Sentiment Report",
    description:
      "Analysis of public sentiment and discussions related to HIV across social media platforms.",
    date: "June 10, 2026",
    category: "Sentiment",
  },
  {
    id: 3,
    title: "HIV Population Demographic Analysis",
    description:
      "Analysis of demographic patterns and characteristics observed in HIV-related social media discussions.",
    date: "June 8, 2026",
    category: "Demographic",
  },
  {
    id: 4,
    title: "HIV Misinformation Detection Report",
    description:
      "Summary of detected misinformation and misleading HIV-related claims across social media.",
    date: "June 5, 2026",
    category: "Regional",
  },
  {
    id: 5,
    title: "HIV Awareness Trends Report",
    description:
      "Overview of trending HIV-related topics and public discussions during the reporting period.",
    date: "May 28, 2026",
    category: "Trends",
  },
  {
    id: 6,
    title: "HIV Stigma and Public Sentiment Report",
    description:
      "Analysis of social media conversations related to HIV stigma, attitudes, and public sentiment.",
    date: "May 20, 2026",
    category: "Sentiment",
  },
  {
    id: 7,
    title: "Regional HIV Discussion Report",
    description:
      "Geospatial analysis of HIV-related discussions and trends across different regions.",
    date: "May 15, 2026",
    category: "Regional",
  },
  {
    id: 8,
    title: "HIV Discussion Demographic Profile",
    description:
      "Summary of demographic characteristics identified from HIV-related social media conversations.",
    date: "May 10, 2026",
    category: "Demographic",
  },
];

/* =========================================================
   DATE HELPERS
========================================================= */

/**
 * Converts a Date object into a consistent
 * YYYY-MM-DD string.
 *
 * Example:
 * June 15, 2026
 * becomes:
 * 2026-06-15
 */
const getDateKey = (date: Date): string => {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
};

/**
 * Manually parses report dates.
 *
 * This avoids relying on:
 *
 * new Date("June 15, 2026")
 *
 * which can behave inconsistently across
 * Android/iOS environments.
 */
const parseReportDate = (dateString: string): Date => {
  const parts = dateString.replace(",", "").split(" ");

  const monthName = parts[0];
  const day = Number(parts[1]);
  const year = Number(parts[2]);

  const months: Record<string, number> = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  return new Date(
    year,
    months[monthName],
    day
  );
};

/* =========================================================
   COMPONENT
========================================================= */

export default function Reports() {
  /* =======================================================
     FILTER STATES
  ======================================================= */

  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Types");

  const [searchText, setSearchText] =
    useState<string>("");

  const [showCalendar, setShowCalendar] =
    useState<boolean>(false);

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  /* =======================================================
     DATE PICKER
  ======================================================= */

  const onChangeDate = (
    event: any,
    date?: Date
  ) => {
    /*
     * Android sends a "dismissed" event
     * when the user closes the picker
     * without selecting a date.
     */
    if (event?.type === "dismissed") {
      setShowCalendar(false);
      return;
    }

    /*
     * Only update the selected date
     * when a valid date was returned.
     */
    if (date) {
      setSelectedDate(date);
    }

    /*
     * Close the calendar after selection.
     */
    setShowCalendar(false);
  };

  /* =======================================================
     FILTER REPORTS
  ======================================================= */

  const filteredReports = useMemo(() => {
    const search =
      searchText.trim().toLowerCase();

    return reports.filter((report) => {

      /* ---------------------------------------------------
         SEARCH FILTER
      --------------------------------------------------- */

      const matchesSearch =
        search.length === 0 ||
        report.title
          .toLowerCase()
          .includes(search) ||
        report.description
          .toLowerCase()
          .includes(search) ||
        report.category
          .toLowerCase()
          .includes(search);

      /* ---------------------------------------------------
         CATEGORY FILTER
      --------------------------------------------------- */

      const matchesCategory =
        selectedCategory === "All Types" ||
        report.category === selectedCategory;

      /* ---------------------------------------------------
         DATE FILTER
      --------------------------------------------------- */

      let matchesDate = true;

      if (selectedDate) {
        /*
         * Convert the report's string date
         * into a real Date object.
         */
        const reportDate =
          parseReportDate(report.date);

        /*
         * Convert both dates to the same
         * YYYY-MM-DD format.
         */
        const reportDateKey =
          getDateKey(reportDate);

        const selectedDateKey =
          getDateKey(selectedDate);

        /*
         * Exact date comparison.
         */
        matchesDate =
          reportDateKey === selectedDateKey;
      }

      /* ---------------------------------------------------
         FINAL RESULT
      --------------------------------------------------- */

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDate
      );
    });
  }, [
    searchText,
    selectedCategory,
    selectedDate,
  ]);

  /* =======================================================
     CLEAR ALL FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSearchText("");
    setSelectedCategory("All Types");
    setSelectedDate(null);
    setShowCalendar(false);
  };

  /* =======================================================
     RESPONSIVE STYLES
  ======================================================= */

  const r = useResponsive();

  const styles = useMemo(
    () => reportStyles(r),
    [r]
  );

  /* =======================================================
     UI
  ======================================================= */

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <ThemedView>

        {/* =================================================
            HEADER
        ================================================= */}

        <ThemedView
          style={styles.headerContainer}
        >
          <ThemedText
            type="title"
            style={{
              textAlign: "left",
            }}
          >
            HIV Social Media Reports
          </ThemedText>

          <ThemedText
            style={styles.default}
          >
            Access reports on HIV-related social
            media discussions.
          </ThemedText>
        </ThemedView>

        {/* =================================================
            SEARCH
        ================================================= */}

        <ThemedView style={styles.search}>

          <Ionicons
            name="search"
            size={icon(20)}
            color="#868686"
          />

          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search reports by title or description..."
            placeholderTextColor="#868686"
            style={styles.searchInput}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
          />

          {/* CLEAR SEARCH */}

          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() =>
                setSearchText("")
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name="close-circle"
                size={icon(18)}
                color="#868686"
              />
            </TouchableOpacity>
          )}

        </ThemedView>

        {/* =================================================
            FILTER ROW
        ================================================= */}

        <ThemedView
          style={styles.filterRow}
        >

          {/* CATEGORY DROPDOWN */}

          <CategoriesDropdown
            selectedCategory={
              selectedCategory
            }
            setSelectedCategory={
              setSelectedCategory
            }
          />

          {/* CALENDAR */}

          <ThemedView
            style={styles.calendarWrapper}
          >

            <TouchableOpacity
              style={styles.calendarButton}
              onPress={() =>
                setShowCalendar(true)
              }
              activeOpacity={0.8}
            >
              <Ionicons
                name="calendar-outline"
                size={icon(24)}
                color="white"
              />
            </TouchableOpacity>

            {/* CALENDAR PICKER */}

            <ThemedView
              style={styles.calendarContainer}
            >
              {showCalendar && (
                <DateTimePicker
                  style={styles.calendar}
                  value={
                    selectedDate ||
                    new Date()
                  }
                  mode="date"
                  display={
                    Platform.OS === "ios"
                      ? "inline"
                      : "default"
                  }
                  onChange={
                    onChangeDate
                  }
                />
              )}
            </ThemedView>

          </ThemedView>

        </ThemedView>

        {/* =================================================
            SELECTED DATE
        ================================================= */}

        {selectedDate && (
          <ThemedView
            style={
              styles.selectedDateContainer
            }
          >

            <ThemedText
              style={styles.dateText}
            >
              Selected:{" "}
              {selectedDate.toDateString()}
            </ThemedText>

            {/* CLEAR DATE */}

            <TouchableOpacity
              onPress={() =>
                setSelectedDate(null)
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name="close-circle"
                size={icon(17)}
                color="#868686"
              />
            </TouchableOpacity>

          </ThemedView>
        )}

        {/* =================================================
            RESULTS
        ================================================= */}

        <ThemedView
          style={styles.resultsContainer}
        >

          {/* =================================================
              NO RESULTS
          ================================================= */}

          {filteredReports.length === 0 ? (

            <ThemedView
              style={styles.emptyState}
            >

              <Ionicons
                name="document-text-outline"
                size={icon(34)}
                color="#B7C0D6"
              />

              <ThemedText
                style={styles.emptyText}
              >
                No reports found.
              </ThemedText>

              <ThemedText
                style={styles.emptySubText}
              >
                Try changing your search
                or filters.
              </ThemedText>

              {/* CLEAR FILTERS */}

              <TouchableOpacity
                style={
                  styles.clearFiltersButton
                }
                onPress={clearFilters}
                activeOpacity={0.8}
              >
                <ThemedText
                  style={
                    styles.clearFiltersText
                  }
                >
                  Clear Filters
                </ThemedText>
              </TouchableOpacity>

            </ThemedView>

          ) : (

            /* =================================================
               REPORT CARDS
            ================================================= */

            filteredReports.map(
              (report) => (
                <ReportsCard
                  key={report.id}
                  title={report.title}
                  description={
                    report.description
                  }
                  date={report.date}
                  category={
                    report.category
                  }
                />
              )
            )

          )}

        </ThemedView>

      </ThemedView>
    </ScrollView>
  );
}