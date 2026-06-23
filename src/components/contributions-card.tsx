import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ImageSourcePropType, ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";

type ContributionsItem = {
  icon: ImageSourcePropType;
  name: string;
  type: string;
  sentiment: string;
  sentimentColor: string;
  sentimentBg: string;
  image: ImageSourcePropType;
  date: string;
  location: string;
  post: string;
};

export function ContributionsCard() {
  const contributionsData: ContributionsItem[] = [
    {
      icon: require("@/assets/images/profile.jpg"),
      name: "Anonymous User",
      type: "Public Discussion",
      sentiment: "Low",
      sentimentColor: "#1E7C10",
      sentimentBg: "#EAFBE7",
      image: require("@/assets/images/social-media.jpg"),
      date: "May 15, 2026",
      location: "Barangay 1, Calamba, Laguna, Region IV-A",
      post: "HIV awareness starts with education and understanding. Getting tested early and learning the facts can help save lives and reduce stigma in our communities.",
    },
    {
      icon: require("@/assets/images/profile.jpg"),
      name: "Anonymous User",
      type: "Community Event",
      sentiment: "Medium",
      sentimentColor: "#B36B00",
      sentimentBg: "#FFF4E0",
      image: require("@/assets/images/social-media.jpg"),
      date: "May 1, 2026",
      location: "Barangay 1, Calamba, Laguna, Region IV-A",
      post: "HIV awareness starts with education and understanding. Getting tested early and learning the facts can help save lives and reduce stigma in our communities.",
    },
    {
      icon: require("@/assets/images/profile.jpg"),
      name: "Anonymous User",
      type: "Educational Content",
      sentiment: "High",
      sentimentColor: "#C62828",
      sentimentBg: "#FFF0F0",
      image: require("@/assets/images/social-media.jpg"),
      date: "April 24, 2026",
      location: "Barangay 1, Calamba, Laguna, Region IV-A",
      post: "HIV awareness starts with education and understanding. Getting tested early and learning the facts can help save lives and reduce stigma in our communities.",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      {contributionsData.map((item, index) => (
        <ThemedView key={index} style={styles.card}>

          {/* Header */}
          <ThemedView style={styles.headerRow}>
            <ThemedView style={styles.userRow}>
              <Image source={item.icon} style={styles.avatar} />
              <ThemedView style={{ backgroundColor: "transparent" }}>
                <ThemedText style={styles.nameText}>{item.name}</ThemedText>
                <ThemedText style={styles.typeText}>{item.type}</ThemedText>
              </ThemedView>
            </ThemedView>

            {/* Sentiment pill */}
            <ThemedView style={[styles.sentimentPill, { backgroundColor: item.sentimentBg }]}>
              <ThemedView style={[styles.sentimentDot, { backgroundColor: item.sentimentColor }]} />
              <ThemedText style={[styles.sentimentText, { color: item.sentimentColor }]}>
                {item.sentiment}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Post image */}
          <Image source={item.image} style={styles.postImage} resizeMode="cover" />

          {/* Meta info */}
          <ThemedView style={styles.metaRow}>
            <ThemedView style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={13} color="#4A7CA8" />
              <ThemedText style={styles.metaText}>{item.date}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.metaDivider} />
            <ThemedView style={styles.metaItem}>
              <Ionicons name="location-outline" size={13} color="#4A7CA8" />
              <ThemedText style={styles.metaText} numberOfLines={1}>{item.location}</ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Divider */}
          <ThemedView style={styles.divider} />

          {/* Post text */}
          <ThemedText style={styles.postText}>{item.post}</ThemedText>

        </ThemedView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    gap: 14,
    paddingVertical: 4,
    paddingHorizontal: 4
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    overflow: "visible",
    padding: 15,
    gap: 12,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.20,
    shadowRadius: 8,
    elevation: 5,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "transparent",
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#E8EAF0",
  },

  nameText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1F5E",
  },

  typeText: {
    fontSize: 11,
    color: "#9BA8C0",
    marginTop: 1,
  },

  sentimentPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  sentimentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  sentimentText: {
    fontSize: 11,
    fontWeight: "600",
  },

  postImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "transparent",
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flex: 1,
    backgroundColor: "transparent",
  },

  metaDivider: {
    width: 1,
    height: 12,
    backgroundColor: "#E8EAF0",
  },

  metaText: {
    fontSize: 11,
    color: "#4A7CA8",
    flex: 1,
  },

  divider: {
    height: 1,
    backgroundColor: "#F0F2F8",
  },

  postText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#35408E",
    textAlign: "justify",
  },
});