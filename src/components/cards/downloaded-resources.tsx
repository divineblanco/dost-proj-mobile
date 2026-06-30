import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const resources = [
  {
    id: 1,
    title: "HIV Prevention Guide",
    desc: "Prevention methods and safer practices.",
    date: "May 20, 2026",
  },
  {
    id: 2,
    title: "Understanding PrEP",
    desc: "A guide to Pre-Exposure Prophylaxis.",
    date: "May 18, 2026",
  },
  {
    id: 3,
    title: "HIV Testing Centers Directory",
    desc: "Verified testing sites in the Philippines.",
    date: "May 15, 2026",
  },
];

export default function ResourcesDownload() {
  return (
    <ThemedView style={styles.card}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedView style={styles.headerLeft}>
          <ThemedText style={styles.sectionTitle}>
            Downloaded Resources
          </ThemedText>
        </ThemedView>

        <TouchableOpacity activeOpacity={0.7}>
          <ThemedText style={styles.viewAll}>
            View All
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.divider} />

      {/* List */}
      <ThemedView style={styles.list}>
        {resources.map((item, index) => (
          <ThemedView key={item.id}>
            <ThemedView style={styles.row}>
              {/* LEFT SIDE */}
              <ThemedView style={styles.contentContainer}>
                <ThemedView style={styles.iconBubble}>
                  <Feather
                    name="book"
                    size={20}
                    color="#FFB633"
                  />
                </ThemedView>

                <ThemedView style={styles.textCol}>
                  <ThemedText
                    style={styles.itemTitle}
                    numberOfLines={1}
                  >
                    {item.title}
                  </ThemedText>

                  <ThemedText
                    style={styles.itemDesc}
                    numberOfLines={1}
                  >
                    {item.desc}
                  </ThemedText>

                  <ThemedView style={styles.dateRow}>
                    <Ionicons
                      name="calendar-outline"
                      size={11}
                      color="#9BA8C0"
                    />
                    <ThemedText style={styles.itemDate}>
                      {item.date}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
              </ThemedView>

              {/* FIXED DOWNLOAD BUTTON */}
              <TouchableOpacity
                style={styles.downloadBtn}
                activeOpacity={0.75}
              >
                <Feather
                  name="download"
                  size={15}
                  color="#35408E"
                />
              </TouchableOpacity>
            </ThemedView>

            {index < resources.length - 1 && (
              <ThemedView style={styles.rowDivider} />
            )}
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    padding: 16,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    backgroundColor: "transparent",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 25,
  },

  viewAll: {
    fontSize: 12,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#F0F2F8",
    marginBottom: 12,
  },

  list: {
    backgroundColor: "transparent",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "transparent",
  },

  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    marginRight: 12,
  },

  iconBubble: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#FFF4EC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  textCol: {
    flex: 1,
    flexShrink: 1,
    backgroundColor: "transparent",
  },

  itemTitle: {
    fontSize: 15,
    fontWeight: "700",
  },

  itemDesc: {
    fontSize: 11,
    color: "#6B7280",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "transparent",
  },

  itemDate: {
    fontSize: 11,
    color: "#9BA8C0",
  },

  downloadBtn: {
    width: 34,
    minWidth: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#D1D5E8",
    backgroundColor: "#F8F9FD",
    justifyContent: "center",
    alignItems: "center",
  },

  rowDivider: {
    height: 1,
    backgroundColor: "#F0F2F8",
  },
});