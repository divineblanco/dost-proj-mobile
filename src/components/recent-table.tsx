import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 5,
    elevation: 5,
    overflow: "visible",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.20,
    shadowRadius: 8,
  },

  headerRow: {
    flexDirection: "row",
    backgroundColor: "#35408E",
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 5,
  },

  headerCell: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 55,
    backgroundColor: "#E4E8F0",
    borderBottomWidth: 1,
    borderBottomColor: "#D0D6E0",
  },

  contentCellContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    backgroundColor: "transparent",
  },

  cellContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    backgroundColor: "transparent",
  },

  cell: {
    width: "100%",
    textAlign: "center",
    fontSize: 12,
  },

  colorText: {
    color: "white",
    fontWeight: "600",
  },

  sentimentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 75,
    alignItems: "center",
    justifyContent: "center",
  },

  positiveBadge: {
    backgroundColor: "#3BB329",
  },

  neutralBadge: {
    backgroundColor: "#FFA400",
  },

  negativeBadge: {
    backgroundColor: "#E20000",
  },

  sentimentText: {
    fontSize: 11,
    fontWeight: "700",
  },
});