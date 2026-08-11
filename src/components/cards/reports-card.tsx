import { ThemedView } from '@/components/themed-view';
import { reportStyles as styles } from '@/styles/reports-styles';
import { icon } from '@/styles/responsive';
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { TouchableOpacity } from 'react-native';
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
            <Ionicons name="document-text-outline" size={icon(24)} color="#4A7CA8" />
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
              <Ionicons name="download-outline" size={icon(16)} color="#35408E" />
            </TouchableOpacity>
          </ThemedView>

          <ThemedView style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={icon(13)} color="#4A7CA8" />
            <ThemedText style={styles.cardDateText}>June 15, 2026</ThemedText>
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