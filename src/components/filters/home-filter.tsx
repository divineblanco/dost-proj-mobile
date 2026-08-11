import { ThemedView } from '@/components/themed-view';
import { homeFilterStyles } from '@/styles/home-styles';
import { icon, useResponsive, verticalScale } from '@/styles/responsive';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '../themed-text';


export function HomeFilter({ onClose }: { onClose: () => void }) {

const [showCalendar, setShowCalendar] = useState(false);

const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
const [selectedAges, setSelectedAges] = useState("All Ages");
const [selectedRegion, setSelectedRegion] = useState("All Regions");
const [selectedDate, setSelectedDate] = useState("Last 7 Days");

const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

const openDropdown = (dropdown: string) => {
  // Close the calendar whenever another dropdown is opened
  setShowCalendar(false);

  // Toggle the dropdown
  setActiveDropdown(prev => (prev === dropdown ? null : dropdown));
};

const selectDropdownItem = (
  value: string,
  setter: React.Dispatch<React.SetStateAction<string>>
) => {
  setter(value);
  setActiveDropdown(null);
  setShowCalendar(false);
};

const r = useResponsive();

const styles = useMemo(
    () => homeFilterStyles(r),[r]
);


  return (
    <ThemedView style={styles.filterDropdown}>
        <ThemedView style={styles.filterContainer}>
            <Ionicons name='close' size={icon(25)} color="white" 
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
                                    size={icon(15)}
                                    color="#35408E"
                                    style={styles.dropdown}
                                    onPress={() => openDropdown("date")
                                    }
                                />
                            </ThemedView>
                            {/* Dropdown Options */}
                            {activeDropdown === "date" && (
                                <ThemedView style={styles.dropdownList}>
                                    <ScrollView style={{ maxHeight: verticalScale(180) }}
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
                                                } else {
                                                    setShowCalendar(false);
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
                                display="spinner"
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
                                    size={icon(15)}
                                    color="#35408E"
                                    style={styles.dropdown}
                                    onPress={() => openDropdown("region")
                                    }
                                />
                            </ThemedView>
                            {/* Dropdown Options */}
                            {activeDropdown === "region" && (
                                <ThemedView style={styles.dropdownList}>
                                    <ScrollView style={{ maxHeight: verticalScale(180) }}
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
                                                selectDropdownItem(item, setSelectedRegion);
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
                            Age Group
                        </ThemedText>
                        <ThemedView style={styles.optionBG}>
                            <ThemedView style={styles.optionChoices}>
                                <ThemedText type='filterOptions' style={styles.dropdownChoice}>
                                    {selectedAges}
                                </ThemedText>

                                <Ionicons
                                    name={activeDropdown === "ages" ? "chevron-up-outline" : "chevron-down-outline"}
                                    size={icon(15)}
                                    color="#35408E"
                                    style={styles.dropdown}
                                    onPress={() => openDropdown("ages")
                                    }
                                />
                            </ThemedView>
                            {/* Dropdown Options */}
                            {activeDropdown === "ages" && (
                            <ThemedView style={styles.dropdownList}>
                                <ScrollView style={{ maxHeight: verticalScale(180) }}
                                    showsVerticalScrollIndicator={true}>
                                    {["All Ages", "15-24", "25-34", "35-44", "45-54", "55-64", "65-74", "75+"].map((item) => (
                                    <ThemedText
                                        type='filterOptions'
                                        key={item}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            selectDropdownItem(item, setSelectedAges);
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
                            Platform
                        </ThemedText>
                        <ThemedView style={styles.optionBG}>
                            <ThemedView style={styles.optionChoices}>
                                <ThemedText type='filterOptions' style={styles.dropdownChoice}>
                                    {selectedPlatform}
                                </ThemedText>

                                <Ionicons
                                    name={activeDropdown === "platform" ? "chevron-up-outline" : "chevron-down-outline"}
                                    size={icon(15)}
                                    color="#35408E"
                                    style={styles.dropdown}
                                    onPress={() => openDropdown("platform")
                                    }
                                />
                            </ThemedView>
                            {/* Dropdown Options */}
                            {activeDropdown === "platform" && (
                            <ThemedView style={styles.dropdownList}>
                                {["All Platforms", "Facebook", "Reddit", "TikTok", "X"].map((item) => (
                                <ThemedText
                                    type='filterOptions'
                                    key={item}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        selectDropdownItem(item, setSelectedPlatform);
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