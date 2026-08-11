import { ThemedView } from '@/components/themed-view';
import { colors } from '@/styles/contribute/contribute-colors';
import { sharedFilterStyles } from '@/styles/contribute/contribute-component-styles';
import { icon, useResponsive, verticalScale } from '@/styles/responsive';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '../themed-text';


export function MisinformationFilter({ onClose }: { onClose: () => void }) {

const [showCalendar, setShowCalendar] = useState(false);

const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
const [selectedType, setSelectedType] = useState("All Types");
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
    
      const styles = useMemo(() => sharedFilterStyles(r), [r]);

  return (
    <ThemedView style={[styles.filterDropdown, styles.filterDropdownWide]}>
        <ThemedView style={styles.filterContainer}>
            <Ionicons name='close' size={icon(25)} color={colors.white}
                onPress={onClose}
                style={styles.filterCloseButton}/>
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
                                    color={colors.primary}
                                    style={styles.filterDropdownAnchor}
                                    onPress={() => openDropdown("date")
                                    }
                                />
                            </ThemedView>
                            {/* Dropdown Options */}
                            {activeDropdown === "date" && (
                                <ThemedView style={styles.filterDropdownList}>
                                    <ScrollView style={{ maxHeight: verticalScale(180) }}
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

                    <ThemedView style={styles.filterOptionContent}>
                        <ThemedText type='filterLabel'>
                            Type of Misinformation
                        </ThemedText>
                        <ThemedView style={styles.filterOptionBG}>
                            <ThemedView style={styles.filterOptionChoices}>
                                <ThemedText type='filterOptions' style={styles.filterDropdownChoice}>
                                    {selectedType}
                                </ThemedText>

                                <Ionicons
                                    name={activeDropdown === "type" ? "chevron-up-outline" : "chevron-down-outline"}
                                    size={icon(15)}
                                    color={colors.primary}
                                    style={styles.filterDropdownAnchor}
                                    onPress={() => openDropdown("type")
                                    }
                                />
                            </ThemedView>
                            {/* Dropdown Options */}
                            {activeDropdown === "type" && (
                                <ThemedView style={styles.filterDropdownList}>
                                    <ScrollView style={{ maxHeight: verticalScale(180) }}
                                        showsVerticalScrollIndicator={true}>
                                        {["All Types", "False Information", "Conspiracy Theory",
                                        "Harmful Content", "Unverified Treatment"].map((item) => (
                                        <ThemedText
                                            type='filterOptions'
                                            key={item}
                                            style={styles.filterDropdownItem}
                                            onPress={() => {
                                                selectDropdownItem(item, setSelectedType);
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
                                    color={colors.primary}
                                    style={styles.filterDropdownAnchor}
                                    onPress={() => openDropdown("platform")
                                    }
                                />
                            </ThemedView>
                            {/* Dropdown Options */}
                            {activeDropdown === "platform" && (
                            <ThemedView style={styles.filterDropdownList}>
                               <ScrollView>
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
                               </ScrollView>
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