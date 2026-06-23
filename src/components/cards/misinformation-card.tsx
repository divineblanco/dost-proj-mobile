import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet } from 'react-native';


export function MisinformationCard() {

  return (
    <ThemedView style={styles.misinfoBG}>
        <ThemedView style={styles.redLine}></ThemedView> 

        <ThemedView style={styles.misinfoContainer}>
            <Ionicons name='warning-outline' size={20} color="red" style={styles.warningIcon}/>
            <ThemedView style={styles.misinfoInfo}>
                <ThemedText type='subtitleLight'>
                Unverified COVID-HIV connection
                </ThemedText>
                <ThemedText type='small' style={{flexShrink: 1}}>
                Viral post claiming COVID-19 vaccine impacts HIV status – no scientific basis
                </ThemedText>
                <ThemedView style={styles.priorityRow}>
                <ThemedText style={styles.priorityText}>
                    High Priority
                </ThemedText>
                <ThemedText style={styles.separator}>
                    |
                </ThemedText>
                <ThemedText style={styles.locationText}>
                    Nationwide
                </ThemedText>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    </ThemedView>

  );
}

const styles = StyleSheet.create({
  misinfoBG:{
    flexDirection: "row",
    backgroundColor: "#E4E8F0",
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",

  },
  redLine:{
    width: 25,
    backgroundColor: "#FF2A2A",
    borderRadius: 12
  },
  misinfoContainer:{
    flex: 1,
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: "flex-start",
    backgroundColor: "transparent",
  },
  misinfoInfo: {
      flex: 1,
      paddingRight: 10,
      backgroundColor: "transparent"
  },
  warningIcon: {
    marginTop: 2,
    marginRight: 10,
  },
  priorityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "transparent"
  },

  priorityText: {
    color: "#E20000",
    fontWeight: "700",
  },

  separator: {
    marginHorizontal: 12,
    color: "#35408E",
  },

  locationText: {
    color: "#35408E",
    fontWeight: "700",
  },

});
