import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { recentTableStyles as styles } from "@/styles/trends/trends-components-styles";
import React from "react";
import { FlatList } from "react-native";

type MentionItem = {
  id: string;
  content: string;
  platform: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  date: string;
};

const data: MentionItem[] = [
  {
    id: "1",
    content: "#HIVAwareness is trending globally and generating significant online engagement",
    platform: "X",
    sentiment: "Positive",
    date: "6/6/2026",
  },
  {
    id: "2",
    content: "New HIV treatment access updates released by health organizations",
    platform: "Facebook",
    sentiment: "Neutral",
    date: "6/9/2026",
  },
  {
    id: "3",
    content: "Misinformation about HIV spreading online causing confusion among users",
    platform: "Reddit",
    sentiment: "Negative",
    date: "6/10/2026",
  },
];

export function RecentTable() {
  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.headerRow}>
        <ThemedText style={[styles.headerCell, { flex: 2 }]}>
          Content
        </ThemedText>

        <ThemedText style={styles.headerCell}>
          Platform
        </ThemedText>

        <ThemedText style={styles.headerCell}>
          Sentiment
        </ThemedText>

        <ThemedText style={styles.headerCell}>
          Date
        </ThemedText>
      </ThemedView>

      {/* Table Rows */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <ThemedView style={styles.row}>
            {/* Content */}
            <ThemedView style={styles.contentCellContainer}>
              <ThemedText
                style={styles.cell}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.content}
              </ThemedText>
            </ThemedView>

            {/* Platform */}
            <ThemedView style={styles.cellContainer}>
              <ThemedText style={styles.cell}>
                {item.platform}
              </ThemedText>
            </ThemedView>

            {/* Sentiment */}
            <ThemedView style={styles.cellContainer}>
              <ThemedView
                style={[
                  styles.sentimentBadge,
                  item.sentiment === "Positive" && styles.positiveBadge,
                  item.sentiment === "Neutral" && styles.neutralBadge,
                  item.sentiment === "Negative" && styles.negativeBadge,
                ]}
              >
                <ThemedText
                  style={[
                    styles.sentimentText,
                    item.sentiment === "Positive" && styles.colorText,
                    item.sentiment === "Neutral" && styles.colorText,
                    item.sentiment === "Negative" && styles.colorText,
                  ]}
                >
                  {item.sentiment}
                </ThemedText>
              </ThemedView>
            </ThemedView>

            {/* Date */}
            <ThemedView style={styles.cellContainer}>
              <ThemedText style={styles.cell}>
                {item.date}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}