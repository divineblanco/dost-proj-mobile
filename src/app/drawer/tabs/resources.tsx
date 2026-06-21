import { ExternalResources } from "@/components/external-resources";
import { ResourcesCard } from "@/components/resources-card";
import ResourcesDropdown from "@/components/resources-dropdown";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TextInput
} from "react-native";

export default function Resources() {
  const [selectedResources, setSelectectedResources] = useState("All Categories");

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const onChangeDate = (event: any, date?: Date) => {
    setShowCalendar(false); 
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
            HIV Educational Resources
          </ThemedText>

          <ThemedText style={{fontSize: 12, fontWeight: "400"}}>
            Read educational materials about HIV prevention, treatment, awareness, and more.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.search}>
          <Ionicons name="search" size={20} color="#868686" />
          <TextInput
            placeholder="Search educational resources..."
            placeholderTextColor="#868686"
            style={styles.searchInput}
          />
        </ThemedView>

        <ThemedView style={styles.filterRow}>
          <ResourcesDropdown
            selectedResources={selectedResources}
            setSelectectedResources={setSelectectedResources}
          />
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

        <ThemedView style={{padding: 10}}>
          <ResourcesCard/>
        </ThemedView>

        <ThemedView style={{padding: 10, marginBottom: 10}}>
          <ThemedText style={{fontSize: 20, fontWeight: "bold", lineHeight: 20}}>
            External Resources
          </ThemedText>

          <ExternalResources/>

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
    paddingBottom: 95,
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