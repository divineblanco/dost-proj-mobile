import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const discussions = [
  {
    id: 1,
    title: "Personal Experience",
    desc: "Sharing my experience on how regular testing helped me stay healthy...",
    date: "May 19, 2026",
  },
  {
    id: 2,
    title: "Stigma or Discrimination",
    desc: "Stigma is still a big issue in our communities. Let’s create...",
    date: "May 16, 2026",
  },
  {
    id: 3,
    title: "HIV Resource Information",
    desc: "Here are simple prevention tips we should all keep in mind...",
    date: "May 12, 2026",
  },
];

export default function MyDiscussions() {
  return (
    <ThemedView style={styles.card}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedView style={styles.headerLeft}>
          <ThemedText style={styles.sectionTitle}>
            My HIV Discussions
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
        {discussions.map((item, index) => (
          <ThemedView key={item.id}>
            <ThemedView style={styles.row}>
              {/* LEFT SIDE */}
              <ThemedView style={styles.contentContainer}>
                <ThemedView style={styles.iconBubble}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={20}
                    color="#333333"
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

              {/* DOWNLOAD IMAGE BUTTON */}
             <Image
                  source={require("@/assets/images/social-media.jpg")}
                  style={styles.image}
                  resizeMode="cover"
                />
            </ThemedView>

            {index < discussions.length - 1 && (
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
    fontWeight: "700",
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
    backgroundColor: "#87868631",
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

  image: {
    width: 44,
    height: 44,
    borderRadius: 10
  },

  rowDivider: {
    height: 1,
    backgroundColor: "#F0F2F8",
  },
});