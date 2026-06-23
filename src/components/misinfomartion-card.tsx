import { ThemedView } from "@/components/themed-view";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
} from "react-native";
import { ThemedText } from "./themed-text";

type MisinformationItem = {
  icon: ImageSourcePropType;
  name: string;
  type: string;
  typeBg: string;
  image: ImageSourcePropType;
  date: string;
  platform: string;
  title: string;
  post: string;
};

export function MisinformationPost() {
  const contributionsData: MisinformationItem[] = [
    {
      icon: require("@/assets/images/profile.jpg"),
      name: "Anonymous User",
      type: "False Information",
      typeBg: "#FFF0F0",
      image: require("@/assets/images/social-media.jpg"),
      date: "May 15, 2026",
      platform: "Facebook",
      title: "Unverified COVID-HIV connection",
      post: "Viral post claiming COVID-19 vaccine impacts HIV status – no scientific basis.",
    },
    {
      icon: require("@/assets/images/profile.jpg"),
      name: "Anonymous User",
      type: "Conspiracy Theory",
      typeBg: "#FFF0F0",
      image: require("@/assets/images/social-media.jpg"),
      date: "May 1, 2026",
      platform: "Reddit",
      title: "Unverified COVID-HIV connection",
      post: "Viral post claiming COVID-19 vaccine impacts HIV status – no scientific basis.",
    },
    {
      icon: require("@/assets/images/profile.jpg"),
      name: "Anonymous User",
      type: "Harmful Content",
      typeBg: "#FFF0F0",
      image: require("@/assets/images/social-media.jpg"),
      date: "April 24, 2026",
      platform: "X",
      title: "Unverified COVID-HIV connection",
      post: "Viral post claiming COVID-19 vaccine impacts HIV status – no scientific basis.",
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {contributionsData.map((item, index) => (
        <ThemedView key={index} style={styles.cardShadow}>
          <ThemedView style={styles.card}>
            {/* Red alert bar */}
            <ThemedView style={styles.alertBar} />

            {/* Header */}
            <ThemedView style={styles.headerRow}>
              <ThemedView style={styles.userRow}>
                <Image source={item.icon} style={styles.avatar} />

                <ThemedView style={{ backgroundColor: "transparent" }}>
                  <ThemedText style={styles.nameText}>
                    {item.name}
                  </ThemedText>

                  <ThemedView
                    style={[
                      styles.typePill,
                      { backgroundColor: item.typeBg },
                    ]}
                  >
                    <ThemedText style={styles.typeText}>
                      {item.type}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
              </ThemedView>

              {/* Warning icon badge */}
              <ThemedView style={styles.warnBadge}>
                <Ionicons
                  name="warning-outline"
                  size={16}
                  color="#C62828"
                />
              </ThemedView>
            </ThemedView>

            {/* Post image */}
            <Image
              source={item.image}
              style={styles.postImage}
              resizeMode="cover"
            />

            {/* Meta info */}
            <ThemedView style={styles.metaRow}>
              <ThemedView style={styles.metaItem}>
                <Ionicons
                  name="calendar-outline"
                  size={13}
                  color="#4A7CA8"
                />
                <ThemedText style={styles.metaText}>
                  {item.date}
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.metaDivider} />

              <ThemedView style={styles.metaItem}>
                <Fontisto
                  name="world-o"
                  size={12}
                  color="#4A7CA8"
                />
                <ThemedText style={styles.metaText}>
                  {item.platform}
                </ThemedText>
              </ThemedView>
            </ThemedView>

            {/* Divider */}
            <ThemedView style={styles.divider} />

            {/* Title + Post */}
            <ThemedView
              style={{
                gap: 4,
                backgroundColor: "transparent",
              }}
            >
              <ThemedText style={styles.titleText}>
                {item.title}
              </ThemedText>

              <ThemedText style={styles.postText}>
                {item.post}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    gap: 14,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },

  // OUTER CONTAINER = SHADOW
  cardShadow: {
    borderRadius: 14,

    // iOS Shadow
    shadowColor: "#1A1F5E",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,

    // Android Shadow
    elevation: 6,
  },

  // INNER CONTAINER = CLIPPING
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
  },

  alertBar: {
    height: 4,
    backgroundColor: "#E20000",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 14,
    paddingTop: 14,
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
    marginBottom: 3,
  },

  typePill: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },

  typeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#C62828",
    letterSpacing: 0.2,
  },

  warnBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
  },

  postImage: {
    width: "100%",
    height: 180,
    marginTop: 12,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "transparent",
    paddingHorizontal: 14,
    paddingTop: 12,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
  },

  divider: {
    height: 1,
    backgroundColor: "#F0F2F8",
    marginHorizontal: 14,
    marginTop: 12,
  },

  titleText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#35408E",
    paddingHorizontal: 14,
    paddingTop: 12,
  },

  postText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#35408E",
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
});