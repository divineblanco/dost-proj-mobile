import { ThemedView } from "@/components/themed-view";
import { colors } from "@/styles/contribute/contribute-colors";
import { misinformationPostStyles, sharedCardStyles } from "@/styles/contribute/contribute-component-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
} from "react-native";
import { ThemedText } from "../themed-text";

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
  const r = useResponsive();
    
      const sharedStyles = useMemo(() => sharedCardStyles(r), [r]);
      const styles = useMemo(() => misinformationPostStyles(r), [r]);
  
  const contributionsData: MisinformationItem[] = [
    {
      icon: require("@/assets/images/profile.jpg"),
      name: "Anonymous User",
      type: "False Information",
      typeBg: colors.dangerBg,
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
      typeBg: colors.dangerBg,
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
      typeBg: colors.dangerBg,
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
              <ThemedView style={sharedStyles.cardUserRow}>
                <Image source={item.icon} style={sharedStyles.cardAvatar} />

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
                  size={icon(16)}
                  color={colors.danger}
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
                  size={icon(13)}
                  color={colors.metaBlue}
                />
                <ThemedText style={styles.metaText}>
                  {item.date}
                </ThemedText>
              </ThemedView>

              <ThemedView style={sharedStyles.cardMetaDivider} />

              <ThemedView style={styles.metaItem}>
                <Fontisto
                  name="world-o"
                  size={icon(12)}
                  color={colors.metaBlue}
                />
                <ThemedText style={styles.metaText}>
                  {item.platform}
                </ThemedText>
              </ThemedView>
            </ThemedView>

            {/* Divider */}
            <ThemedView style={styles.divider} />

            {/* Title + Post */}
            <ThemedView style={styles.titlePostWrap}>
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