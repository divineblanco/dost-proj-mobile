import { ThemedView } from '@/components/themed-view';
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './themed-text';


export function ReportsCard() {

  return (
    <ThemedView style={styles.reportsBG}>
        <ThemedView style={styles.line}></ThemedView> 

        <ThemedView style={styles.labelContainer}>
          <ThemedView style={styles.iconBG}>
            <Ionicons name='document-text-outline' size={50} color="#4A7CA8"></Ionicons>
          </ThemedView>
          <ThemedView style={styles.labelBG}>
            <ThemedText style={styles.label}>Trends</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.reportContent}>
          <ThemedView style={styles.titleDownload}>
            <ThemedText style={styles.title}>
              Q2 HIV Awareness Campaign Impact Analysis
            </ThemedText>
            <TouchableOpacity style={styles.download}>
              <Ionicons name='download-outline' size={20} color="#35408E"></Ionicons>
            </TouchableOpacity>
          </ThemedView>
          <ThemedView style={styles.dateContainer}>
            <Ionicons name='calendar-outline' size={15} color="#4A7CA8"></Ionicons>
            <ThemedText style={styles.date}>
              June 15, 2026
            </ThemedText>
          </ThemedView>

          <ThemedText type='default'>
            Analysis of social media engagement during the Quarter 2 HIV awareness capaign.
          </ThemedText>
        </ThemedView>

    </ThemedView>

  );
}

const styles = StyleSheet.create({
  reportsBG:{
    flexDirection: "row",
    backgroundColor: "#E4E8F0",
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
    gap: 15,
    height: 160,

  },
  line:{
    width: 15,
    backgroundColor: "#35408E",
    borderRadius: 12,
  },
  labelContainer: {
    flexDirection: "column", 
    gap: 10, 
    backgroundColor: "transparent", 
    paddingVertical: 10, 
    justifyContent: "center"
  },
  iconBG: {
    backgroundColor: "white", 
    padding: 15,
    borderRadius: 10
  },
  labelBG: {
    backgroundColor: "#B5DBFB", 
    width: "auto",
    height: 25, 
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#3781C1",
    justifyContent: "center"
  },
  label: {
    fontSize: 12,
    fontWeight: "400",
    color: "#3781C1",
    textAlign: "center"
  },
  reportContent: {
    flexDirection: "column", 
    paddingVertical: 20, 
    marginRight: 15, 
    flexShrink: 1, 
    gap: 5, 
    justifyContent: "center", 
    backgroundColor: "transparent"
  },
  titleDownload: {
    flexDirection: "row", 
    backgroundColor: "transparent", 
    marginRight: 28
  },
  title: {
    fontSize: 15, 
    fontWeight: "bold", 
    backgroundColor: "transparent"
  },
  download: {
    backgroundColor: "white", 
    width: 26, 
    height: 24, 
    borderRadius: 5, 
    borderWidth: 1, 
    borderColor: "#35408E", 
    justifyContent: "center", 
    alignItems: "center",
    elevation: 2
  },
  dateContainer: {
    flexDirection: "row", 
    gap: 10, 
    backgroundColor: "transparent"
  },
  date: {
    color: "#4A7CA8", fontSize: 11
  }

});
