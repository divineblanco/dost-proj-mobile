import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { profileStyles as styles } from "@/styles/profile/profile-styles";
import { icon } from "@/styles/responsive";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

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
    <ThemedView style={styles.drCard}>
      {/* Header */}
      <ThemedView style={styles.drHeader}>
        <ThemedView style={styles.drHeaderLeft}>
          <ThemedText style={styles.drSectionTitle}>
            Downloaded Resources
          </ThemedText>
        </ThemedView>

        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/drawer/tabs/profiles/view-resources")}>
          <ThemedText style={styles.drViewAll}>
            View All
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.drDivider} />

      {/* List */}
      <ThemedView style={styles.drList}>
        {resources.map((item, index) => (
          <ThemedView key={item.id}>
            <ThemedView style={styles.drRow}>
              {/* LEFT SIDE */}
              <ThemedView style={styles.drContentContainer}>
                <ThemedView style={styles.drIconBubble}>
                  <Feather
                    name="book"
                    size={icon(20)}
                    color="#FFB633"
                  />
                </ThemedView>

                <ThemedView style={styles.drTextCol}>
                  <ThemedText
                    style={styles.drItemTitle}
                    numberOfLines={1}
                  >
                    {item.title}
                  </ThemedText>

                  <ThemedText
                    style={styles.drItemDesc}
                    numberOfLines={1}
                  >
                    {item.desc}
                  </ThemedText>

                  <ThemedView style={styles.drDateRow}>
                    <Ionicons
                      name="calendar-outline"
                      size={icon(11)}
                      color="#9BA8C0"
                    />
                    <ThemedText style={styles.drItemDate}>
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
                  size={icon(15)}
                  color="#35408E"
                />
              </TouchableOpacity>
            </ThemedView>

            {index < resources.length - 1 && (
              <ThemedView style={styles.drRowDivider} />
            )}
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedView>
  );
}