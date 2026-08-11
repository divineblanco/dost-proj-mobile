import { ThemedView } from '@/components/themed-view';
import { icon, isExtraTallScreen, isTallScreen, verticalScale } from '@/styles/responsive';
import { trendsFilterStyles as styles } from '@/styles/trends/trends-components-styles';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '../themed-text';


export function TrendsFilter({ onClose }: { onClose: () => void }) {

const [showCalendar, setShowCalendar] = useState(false);

const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
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


  return (
    <ThemedView style={styles.filterDropdown}>
        <ThemedView style={styles.filterContainer}>
            <Ionicons name='close' size={icon(25)} color="white" 
                onPress={onClose}
                style={styles.closeButton}/>
                <ThemedView style={styles.filterOptionContainer}>
                    
                    <ThemedView style={styles.filterOptionContent}>
                        <ThemedText type='filterLabel'>
                            Date Range
                        </ThemedText>
                        <ThemedView style={styles.filterOptionBG}>
                            <ThemedView style={styles.filterOptionChoices}>
                                <ThemedText type='filterOptions' style={styles.filterDropdownChoice}>
                                    {selectedDate}
                                </ThemedText>

                                <Ionicons
                                    name={activeDropdown === "date" ? "chevron-up-outline" : "chevron-down-outline"}
                                    size={icon(15)}
                                    color="#35408E"
                                   onPress={() => openDropdown("date")
                                    }
                                />
                            </ThemedView>
                            {/* Dropdown Options */}
                            {activeDropdown === "date" && (
                                <ThemedView style={styles.filterDropdownList}>
                                    <ScrollView style={{ maxHeight: isTallScreen || isExtraTallScreen ? verticalScale(260) : verticalScale(180) }}
                                        showsVerticalScrollIndicator={true}>
                                        {["Last 7 Days", "Last 30 Days", "Last 90 Days", "Custom Range"].map((item) => (
                                        <ThemedText
                                            type='filterOptions'
                                            key={item}
                                            style={styles.filterDropdownItem}
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
                                style={styles.filterCalendar}
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

                    <ThemedView style={styles.filterOptionContent}>
                        <ThemedText type='filterLabel'>
                            Region
                        </ThemedText>
                        <ThemedView style={styles.filterOptionBG}>
                            <ThemedView style={styles.filterOptionChoices}>
                                <ThemedText type='filterOptions' style={styles.filterDropdownChoice}>
                                    {selectedRegion}
                                </ThemedText>

                                <Ionicons
                                    name={activeDropdown === "region" ? "chevron-up-outline" : "chevron-down-outline"}
                                    size={icon(15)}
                                    color="#35408E"
                                    onPress={() => openDropdown("region")
                                    }
                                />
                            </ThemedView>
                            {/* Dropdown Options */}
                            {activeDropdown === "region" && (
                                <ThemedView style={styles.filterDropdownList}>
                                    <ScrollView style={{ maxHeight: isTallScreen || isExtraTallScreen ? verticalScale(260) : verticalScale(180) }}
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
                                            style={styles.filterDropdownItem}
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


                    {/* Only 3 fields in this filter — the last one spans the
                        full row instead of sitting alone at 47% width */}
                    <ThemedView style={[styles.filterOptionContent, styles.filterOptionContentFull]}>
                        <ThemedText type='filterLabel'>
                            Platform
                        </ThemedText>
                        <ThemedView style={styles.filterOptionBG}>
                            <ThemedView style={styles.filterOptionChoices}>
                                <ThemedText type='filterOptions' style={styles.filterDropdownChoice}>
                                    {selectedPlatform}
                                </ThemedText>

                                <Ionicons
                                    name={activeDropdown === "platform" ? "chevron-up-outline" : "chevron-down-outline"}
                                    size={icon(15)}
                                    color="#35408E"
                                    onPress={() => openDropdown("platform")
                                    }
                                />
                            </ThemedView>
                            {/* Dropdown Options */}
                            {activeDropdown === "platform" && (
                            <ThemedView style={styles.filterDropdownList}>
                                {["All Platforms", "Facebook", "Reddit", "TikTok", "X"].map((item) => (
                                <ThemedText
                                    type='filterOptions'
                                    key={item}
                                    style={styles.filterDropdownItem}
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

                    <TouchableOpacity style={styles.filterButtonApply}>
                        <ThemedText type='filterApply'>
                            APPLY
                        </ThemedText>
                    </TouchableOpacity>

                </ThemedView>
        </ThemedView>
        

    </ThemedView>
  );
}