import { ThemedView } from "@/components/themed-view";
import { colors } from "@/styles/contribute/contribute-colors";
import { contributionsCardStyles, sharedCardStyles } from "@/styles/contribute/contribute-component-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Image, ImageSourcePropType, ScrollView } from "react-native";
import { ThemedText } from "../themed-text";

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
  
  const r = useResponsive();
  
    const sharedStyles = useMemo(() => sharedCardStyles(r), [r]);
    const styles = useMemo(() => contributionsCardStyles(r), [r]);


  const contributionsData: ContributionsItem[] = [
    {
      icon: require("@/assets/images/profile.jpg"),
      name: "Anonymous User",
      type: "Public Discussion",
      sentiment: "Low",
      sentimentColor: colors.success,
      sentimentBg: colors.successBg,
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
      sentimentColor: colors.warning,
      sentimentBg: colors.warningBg,
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
      sentimentColor: colors.danger,
      sentimentBg: colors.dangerBg,
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
            <ThemedView style={sharedStyles.cardUserRow}>
              <Image source={item.icon} style={sharedStyles.cardAvatar} />
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
              <Ionicons name="calendar-outline" size={icon(13)} color={colors.metaBlue} />
              <ThemedText style={styles.metaText}>{item.date}</ThemedText>
            </ThemedView>
            <ThemedView style={sharedStyles.cardMetaDivider} />
            <ThemedView style={styles.metaItem}>
              <Ionicons name="location-outline" size={icon(13)} color={colors.metaBlue} />
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