import { ThemedView } from '@/components/themed-view';
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../themed-text';

export function ReportsCard() {
  return (
    // OUTER WRAPPER (shadow lives here)
    <ThemedView style={styles.shadowWrapper}>
      
      {/* INNER CARD (clips content + rounded corners) */}
      <ThemedView style={styles.card}>
        {/* Accent bar */}
        <ThemedView style={styles.accentBar} />

        {/* Left column */}
        <ThemedView style={styles.leftCol}>
          <ThemedView style={styles.iconContainer}>
            <Ionicons name="document-text-outline" size={24} color="#4A7CA8" />
          </ThemedView>

          <ThemedView style={styles.labelPill}>
            <ThemedText style={styles.labelText}>Trends</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Divider */}
        <ThemedView style={styles.verticalDivider} />

        {/* Content */}
        <ThemedView style={styles.content}>
          <ThemedView style={styles.titleRow}>
            <ThemedText style={styles.title} numberOfLines={2}>
              Q2 HIV Awareness Campaign Impact Analysis
            </ThemedText>

            <TouchableOpacity style={styles.downloadBtn}>
              <Ionicons name="download-outline" size={16} color="#35408E" />
            </TouchableOpacity>
          </ThemedView>

          <ThemedView style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={13} color="#4A7CA8" />
            <ThemedText style={styles.dateText}>June 15, 2026</ThemedText>
          </ThemedView>

          <ThemedView style={styles.horizontalDivider} />

          <ThemedText style={styles.description} numberOfLines={2}>
            Analysis of social media engagement during the Q2 HIV awareness campaign.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    borderRadius: 12,

    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,

    elevation: 5, // Android shadow

    backgroundColor: "transparent",
  },

  card: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    minHeight: 130,
  },

  accentBar: {
    width: 7,
    backgroundColor: "#35408E",
    alignSelf: "stretch",
  },

  leftCol: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 16,
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#EEF4FB",
    justifyContent: "center",
    alignItems: "center",
  },

  labelPill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: "#E8F3FD",
  },

  labelText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#3781C1",
  },

  verticalDivider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: "#F0F2F8",
  },

  content: {
    flex: 1,
    padding: 14,
    gap: 6,
    justifyContent: "center",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },

  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#35408E",
    lineHeight: 20,
  },

  downloadBtn: {
    width: 30,
    height: 30,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#D1D5E8",
    backgroundColor: "#F8F9FD",
    justifyContent: "center",
    alignItems: "center",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  dateText: {
    fontSize: 11,
    color: "#4A7CA8",
    fontWeight: "500",
  },

  horizontalDivider: {
    height: 1,
    backgroundColor: "#F0F2F8",
  },

  description: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 18,
  },
});