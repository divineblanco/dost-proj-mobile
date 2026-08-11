import { ReportsCard } from "@/components/cards/reports-card";
import CategoriesDropdown from "@/components/dropdown/categories-dropdown";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { reportStyles as styles } from "@/styles/reports-styles";
import { icon, scale } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
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
          <Ionicons name="search" size={icon(20)} color="#868686" />
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
            <Ionicons name="calendar-outline" size={icon(24)} color="white" />
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

        <ThemedView style={{padding: scale(10), gap: scale(10)}}>
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