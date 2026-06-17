import CategoriesDropdown from "@/components/categories-dropdown";
import { ReportsCard } from "@/components/reports-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";

export default function Reports() {
  const [selectedCategory, setSelectedCategory] = useState("All Types");

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const onChangeDate = (event: any, date?: Date) => {
    setShowCalendar(false); // close after selection (Android behavior)
    if (date) setSelectedDate(date);
  };

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView>
        <ThemedView style={styles.headerContainer}>
          <ThemedText type="title" style={{ textAlign: "left" }}>
            HIV Social Media Reports
          </ThemedText>

          <ThemedText type="default">
            Access reports on HIV-related social media discussions.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.search}>
          <Ionicons name="search" size={20} color="#868686" />
          <TextInput
            placeholder="Search reports by title or description..."
            placeholderTextColor="#868686"
            style={styles.searchInput}
          />
        </ThemedView>

        <ThemedView style={styles.filterRow}>
          <CategoriesDropdown
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <TouchableOpacity
            style={styles.calendarButton}
            onPress={() => setShowCalendar(true)}
          >
            <Ionicons name="calendar-outline" size={24} color="white" />
          </TouchableOpacity>
        </ThemedView>

        {selectedDate && (
          <ThemedText style={styles.dateText}>
            Selected: {selectedDate.toDateString()}
          </ThemedText>
        )}

        {showCalendar && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangeDate}
          />
        )}

        <ThemedView style={{padding: 10, gap: 10}}>
          <ReportsCard/>
          <ReportsCard/>
          <ReportsCard/>
          <ReportsCard/>
          <ReportsCard/>
        </ThemedView>



      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
  },
  scrollContent: {
    paddingBottom: 90,
  },

  headerContainer: {
    padding: 10,
  },

  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E4E8F0",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    gap: 10,
  },

  searchInput: {
    fontSize: 12,
    color: "#868686",
    flex: 1,
  },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },

  calendarButton: {
    backgroundColor: "#35408E",
    width: 45,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  dateText: {
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: 10,
    fontSize: 12,
    color: "#35408E",
    fontWeight: "600",
  },
});