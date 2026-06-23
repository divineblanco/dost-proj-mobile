import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './themed-text';


export function ContributionsFilter({ onClose }: { onClose: () => void }) {

const [showCalendar, setShowCalendar] = useState(false);

const [selectedSentiment, setSelectedSentiment] = useState("All Sentiment");
const [selectedCategories, setSelectedCategories] = useState("All Categories");
const [selectedRegion, setSelectedRegion] = useState("All Regions");
const [selectedDate, setSelectedDate] = useState("Last 7 Days");

const [activeDropdown, setActiveDropdown] = useState<string | null>(null);


  return (
    <ThemedView style={styles.filterDropdown}>
        <ThemedView style={styles.filterContainer}>
            <Ionicons name='close' size={25} color="white" 
                onPress={onClose}
                style={styles.closeButton}/>
                <ThemedView style={styles.optionContainer}>
                    
                    <ThemedView style={styles.optionContent}>
                        <ThemedText type='filterLabel'>
                            Date Range
                        </ThemedText>
                        <ThemedView style={styles.optionBG}>
                            <ThemedView style={styles.optionChoices}>
                                <ThemedText type='filterOptions' style={styles.dropdownChoice}>
                                    {selectedDate}
                                </ThemedText>

                                <Ionicons
                                    name={activeDropdown === "date" ? "chevron-up-outline" : "chevron-down-outline"}
                                    size={15}
                                    color="#35408E"
                                    style={styles.dropdown}
                                    onPress={() =>
                                    setActiveDropdown(activeDropdown === "date" ? null : "date")
                                    }
                                />
                            </ThemedView>
                            {/* Dropdown Options */}
                            {activeDropdown === "date" && (
                                <ThemedView style={styles.dropdownList}>
                                    <ScrollView style={{ maxHeight: 180 }}
                                        showsVerticalScrollIndicator={true}>
                                        {["Last 7 Days", "Last 30 Days", "Last 90 Days", "Custom Range"].map((item) => (
                                        <ThemedText
                                            type='filterOptions'
                                            key={item}
                                            style={styles.dropdownItem}
                                            onPress={() => {
                                            setSelectedDate(item);
                                            setActiveDropdown(null);

                                                if (item === "Custom Range") {
                                                    setShowCalendar(true);
                                                }
                                            }}
                                        >
                                            {item}
                                        </ThemedText>
                                        ))}
                                    </ScrollView>
                                </ThemedView>
                            )}

                            
                        </ThemedView>
                        {showCalendar && (
                            <DateTimePicker
                                style={styles.calendar}
                                value={new Date()}
                                mode="date"
                                display="default"
                                accentColor='#35408E'
                                onChange={(event, date) => {
                                setShowCalendar(false);

                                if (date) {
                                    setSelectedDate(date.toDateString());
                                }
                                }}
                            />
                        )}
                        
                    </ThemedView>

                    <ThemedView style={styles.optionContent}>
                        <ThemedText type='filterLabel'>
                            Region
                        </ThemedText>
                        <ThemedView style={styles.optionBG}>
                            <ThemedView style={styles.optionChoices}>
                                <ThemedText type='filterOptions' style={styles.dropdownChoice}>
                                    {selectedRegion}
                                </ThemedText>

                                <Ionicons
                                    name={activeDropdown === "region" ? "chevron-up-outline" : "chevron-down-outline"}
                                    size={15}
                                    color="#35408E"
                                    style={styles.dropdown}
                                    onPress={() =>
                                    setActiveDropdown(activeDropdown === "region" ? null : "region")
                                    }
                                />
                            </ThemedView>
                            {/* Dropdown Options */}
                            {activeDropdown === "region" && (
                                <ThemedView style={styles.dropdownList}>
                                    <ScrollView style={{ maxHeight: 180 }}
                                        showsVerticalScrollIndicator={true}>
                                        {["All Regions", "Region I", "Region II",
                                        "Region III", "Region IV-A", "Region V",
                                        "Region VI", "Region VII", "Region VIII",
                                        "Region IX", "Region X", "Region XI",
                                        "Region XII", "National Capital Region (NCR)", "Region XIII",
                                        "Region IV-B"].map((item) => (
                                        <ThemedText
                                            type='filterOptions'
                                            key={item}
                                            style={styles.dropdownItem}
                                            onPress={() => {
                                            setSelectedRegion(item);
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

                    <ThemedView style={styles.optionContent}>
                        <ThemedText type='filterLabel'>
                            Category
                        </ThemedText>
                        <ThemedView style={styles.optionBG}>
                            <ThemedView style={styles.optionChoices}>
                                <ThemedText type='filterOptions' style={styles.dropdownChoice}>
                                    {selectedCategories}
                                </ThemedText>

                                <Ionicons
                                    name={activeDropdown === "categories" ? "chevron-up-outline" : "chevron-down-outline"}
                                    size={15}
                                    color="#35408E"
                                    style={styles.dropdown}
                                    onPress={() =>
                                    setActiveDropdown(activeDropdown === "categories" ? null : "ages")
                                    }
                                />
                            </ThemedView>
                            {/* Dropdown Options */}
                            {activeDropdown === "ages" && (
                            <ThemedView style={styles.dropdownList}>
                                <ScrollView style={{ maxHeight: 180 }}
                                    showsVerticalScrollIndicator={true}>
                                    {["All Categories", "Personal Experience", "Community Event", "Educational Content", "Resource Availability", "Healthcare Service"].map((item) => (
                                    <ThemedText
                                        type='filterOptions'
                                        key={item}
                                        style={styles.dropdownItem}
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

                    <ThemedView style={styles.optionContent}>
                        <ThemedText type='filterLabel'>
                            Sentiment
                        </ThemedText>
                        <ThemedView style={styles.optionBG}>
                            <ThemedView style={styles.optionChoices}>
                                <ThemedText type='filterOptions' style={styles.dropdownChoice}>
                                    {selectedSentiment}
                                </ThemedText>

                                <Ionicons
                                    name={activeDropdown === "sentiment" ? "chevron-up-outline" : "chevron-down-outline"}
                                    size={15}
                                    color="#35408E"
                                    style={styles.dropdown}
                                    onPress={() =>
                                    setActiveDropdown(activeDropdown === "sentiment" ? null : "sentiment")
                                    }
                                />
                            </ThemedView>
                            {/* Dropdown Options */}
                            {activeDropdown === "sentiment" && (
                            <ThemedView style={styles.dropdownList}>
                                {["All Sentiment", "Low", "Medium", "High"].map((item) => (
                                <ThemedText
                                    type='filterOptions'
                                    key={item}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                    setSelectedSentiment(item);
                                    setActiveDropdown(null);
                                    }}
                                >
                                    {item}
                                </ThemedText>
                                ))}
                            </ThemedView>
                            )}
                        </ThemedView>
                    </ThemedView>

                    <TouchableOpacity style={styles.buttonApply}>
                        <ThemedText type='filterApply'>
                            APPLY
                        </ThemedText>
                    </TouchableOpacity>

                </ThemedView>
        </ThemedView>
        

    </ThemedView>
  );
}

const styles = StyleSheet.create({

  closeButton: {
    position: "absolute",
    top: 8,
    right: 12,
    zIndex: 1,
  },
  filterDropdown: {
    position: "absolute",
    top: 60,
    right: 15,
    width: "93%",
    backgroundColor: "#35408E",
    borderRadius: 10,
    padding: 8,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 5,
    zIndex: 999,
},
filterContainer: {
    flexDirection: "column", 
    justifyContent: "space-evenly",
    backgroundColor: "transparent",
    padding: 15,
},
optionContainer: {
    backgroundColor: "transparent", 
    marginTop: 10,
    padding: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 25,
},
optionContent: {
    backgroundColor: "transparent", 
    gap: 8
},
optionBG: {
    backgroundColor: "#E4E8F0", 
    padding: 10, 
    width: 135, 
    borderRadius: 8
},
optionChoices: {
    flexDirection: "row",  
    backgroundColor: "transparent",
},
buttonApply: {
    backgroundColor: "#FFB633",
    alignContent: "center",
    justifyContent: "center",
    width: "100%", 
    height: 50, 
    borderRadius: 13,
    elevation: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: '#000',

},
dropdownList: {
  marginTop: 40,
  backgroundColor: "#ffffff",
  borderRadius: 8,
  padding: 8,
  elevation: 5,
  width: 130,
  position: "absolute",
  zIndex: 2,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  shadowColor: '#000',
  maxHeight: 200,
},

dropdownItem: {
  paddingVertical: 10,
  paddingHorizontal: 8,
},

dropdownChoice: {
  paddingHorizontal: 1,
  position: "absolute",
},

dropdown: {
    left: 102,
},
scrollContent: {
    paddingBottom: 20

},
scroller: {
    position: "relative"
},
calendar: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,
    marginTop: 60,
    width: "100%", 
    zIndex: 999,
    position: "absolute",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: '#000',
    maxHeight: 200,
},

});
