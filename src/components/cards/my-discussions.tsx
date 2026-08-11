import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { profileStyles as styles } from "@/styles/profile-styles";
import { icon } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  TouchableOpacity
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
      <ThemedView style={styles.discussionHeader}>
        <ThemedView style={styles.headerLeft}>
          <ThemedText style={styles.discSectionTitle}>
            My HIV Discussions
          </ThemedText>
        </ThemedView>

        <TouchableOpacity activeOpacity={0.7}>
          <ThemedText style={styles.viewAll}>
            View All
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.discDivider} />

      {/* List */}
      <ThemedView style={styles.discList}>
        {discussions.map((item, index) => (
          <ThemedView key={item.id}>
            <ThemedView style={styles.row}>
              {/* LEFT SIDE */}
              <ThemedView style={styles.contentContainer}>
                <ThemedView style={styles.discIconBubble}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={icon(20)}
                    color="#333333"
                  />
                </ThemedView>

                <ThemedView style={styles.discTextCol}>
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
                      size={icon(11)}
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
              <ThemedView style={styles.discRowDivider} />
            )}
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedView>
  );
}